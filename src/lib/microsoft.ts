// Microsoft Graph API helper for NeatStamp
//
// Required environment variables:
//   MICROSOFT_CLIENT_ID      — from Azure AD App Registration
//   MICROSOFT_CLIENT_SECRET  — from Azure AD App Registration
//   MICROSOFT_REDIRECT_URI   — https://neatstamp.com/api/auth/microsoft/callback
//
// Azure AD App Registration setup:
//   1. Go to portal.azure.com → Azure Active Directory → App registrations → New registration
//   2. Set redirect URI to https://neatstamp.com/api/auth/microsoft/callback (Web platform)
//   3. Under API permissions, add: MailboxSettings.ReadWrite, offline_access, User.Read
//   4. Under Certificates & secrets, create a new client secret
//   5. Copy Application (client) ID and the secret value to env vars

const MICROSOFT_AUTHORITY = "https://login.microsoftonline.com/common";
const MICROSOFT_GRAPH_BASE = "https://graph.microsoft.com/v1.0";

const SCOPES = [
  "MailboxSettings.ReadWrite",
  "offline_access",
  "User.Read",
].join(" ");

// ---------------------------------------------------------------------------
// OAuth helpers
// ---------------------------------------------------------------------------

/**
 * Returns the Microsoft OAuth authorization URL. Redirect users here to start
 * the OAuth flow. The state parameter should be a random CSRF token.
 */
export function getMicrosoftAuthUrl(state: string): string {
  const clientId = process.env.MICROSOFT_CLIENT_ID;
  const redirectUri = process.env.MICROSOFT_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    throw new Error("MICROSOFT_CLIENT_ID and MICROSOFT_REDIRECT_URI must be set");
  }

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: SCOPES,
    state,
    response_mode: "query",
    // prompt=select_account lets users choose which M365 account to connect
    prompt: "select_account",
  });

  return `${MICROSOFT_AUTHORITY}/oauth2/v2.0/authorize?${params.toString()}`;
}

/**
 * Exchanges an authorization code for access and refresh tokens.
 * Called in the OAuth callback handler.
 */
export async function exchangeCodeForTokens(code: string): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
}> {
  const clientId = process.env.MICROSOFT_CLIENT_ID;
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET;
  const redirectUri = process.env.MICROSOFT_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error(
      "MICROSOFT_CLIENT_ID, MICROSOFT_CLIENT_SECRET, and MICROSOFT_REDIRECT_URI must be set"
    );
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });

  const response = await fetch(
    `${MICROSOFT_AUTHORITY}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${response.status} ${error}`);
  }

  const data = await response.json() as {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
  };

  if (!data.access_token) {
    throw new Error("No access_token in token exchange response");
  }

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
  };
}

/**
 * Refreshes an expired access token using a stored refresh token.
 * Returns new access_token and expires_in; the refresh token may or may not
 * rotate depending on the tenant policy (store the new one if present).
 */
export async function refreshAccessToken(refreshToken: string): Promise<{
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}> {
  const clientId = process.env.MICROSOFT_CLIENT_ID;
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET;
  const redirectUri = process.env.MICROSOFT_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error(
      "MICROSOFT_CLIENT_ID, MICROSOFT_CLIENT_SECRET, and MICROSOFT_REDIRECT_URI must be set"
    );
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
    scope: SCOPES,
  });

  const response = await fetch(
    `${MICROSOFT_AUTHORITY}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token refresh failed: ${response.status} ${error}`);
  }

  const data = await response.json() as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  };

  if (!data.access_token) {
    throw new Error("No access_token in refresh response");
  }

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
  };
}

// ---------------------------------------------------------------------------
// Graph API helpers
// ---------------------------------------------------------------------------

/**
 * Pushes an HTML email signature to the user's Outlook mailbox via the
 * Microsoft Graph API. Sets signatures for both new messages and replies.
 *
 * Works across: OWA (Outlook Web App), New Outlook (Windows), Outlook Mobile.
 * Classic Outlook desktop reads from a local file and is not affected by this.
 *
 * Returns true on success, throws on failure.
 */
export async function pushSignatureToOutlook(
  accessToken: string,
  signatureHtml: string,
  signatureText: string
): Promise<boolean> {
  const response = await fetch(
    `${MICROSOFT_GRAPH_BASE}/me/mailboxSettings`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Both properties accept raw HTML strings (v1.0 endpoint)
        signatureForNewMessages: signatureHtml,
        signatureForReplies: signatureHtml,
      }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Graph API signature push failed: ${response.status} ${errorBody}`
    );
  }

  return true;
}

/**
 * Retrieves the current mailbox settings for the signed-in user.
 * Useful for verifying the connection is still valid and inspecting the
 * current signature state.
 */
export async function getMailboxSettings(accessToken: string): Promise<{
  signatureForNewMessages?: string;
  signatureForReplies?: string;
  [key: string]: unknown;
}> {
  const response = await fetch(
    `${MICROSOFT_GRAPH_BASE}/me/mailboxSettings`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Graph API mailboxSettings fetch failed: ${response.status} ${errorBody}`
    );
  }

  return response.json();
}

/**
 * Retrieves the signed-in user's Microsoft profile (email, displayName).
 * Used to show which Microsoft account is connected.
 */
export async function getMicrosoftUserProfile(accessToken: string): Promise<{
  id: string;
  displayName: string;
  mail: string;
  userPrincipalName: string;
}> {
  const response = await fetch(
    `${MICROSOFT_GRAPH_BASE}/me?$select=id,displayName,mail,userPrincipalName`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Graph API user profile fetch failed: ${response.status} ${errorBody}`
    );
  }

  return response.json();
}

// ---------------------------------------------------------------------------
// Token utilities
// ---------------------------------------------------------------------------

/**
 * Returns true if the stored token expiry timestamp (ISO string) indicates
 * the token has expired or will expire within the next 5 minutes.
 */
export function isTokenExpired(expiresAt: string): boolean {
  const expiryMs = new Date(expiresAt).getTime();
  const bufferMs = 5 * 60 * 1000; // 5-minute buffer
  return Date.now() + bufferMs >= expiryMs;
}

/**
 * Converts expires_in (seconds from now) to an ISO expiry timestamp string
 * for storage in D1.
 */
export function tokenExpiresAt(expiresIn: number): string {
  return new Date(Date.now() + expiresIn * 1000).toISOString();
}
