// GET /api/outlook/status — Returns the user's Microsoft 365 connection status.
// Tells the client whether tokens are stored and whether they are still valid.

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRequestContext } from "@cloudflare/next-on-pages";
import {
  getMicrosoftUserProfile,
  refreshAccessToken,
  isTokenExpired,
  tokenExpiresAt,
} from "@/lib/microsoft";

export const runtime = "edge";

interface StatusResponse {
  connected: boolean;
  email?: string;       // The Microsoft account email, when connected
  canPush: boolean;     // True only when we have a valid, usable access token
  error?: string;       // Human-readable reason when canPush is false
}

interface StoredUserTokens {
  id: string;
  microsoft_access_token: string | null;
  microsoft_refresh_token: string | null;
  microsoft_token_expires_at: string | null;
}

export async function GET(): Promise<Response> {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { env } = getRequestContext();
  const db = env.DB as D1Database;

  const user = await db
    .prepare(
      `SELECT id,
              microsoft_access_token,
              microsoft_refresh_token,
              microsoft_token_expires_at
       FROM users WHERE email = ?`
    )
    .bind(session.user.email)
    .first<StoredUserTokens>();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // No tokens stored at all
  if (!user.microsoft_access_token || !user.microsoft_refresh_token) {
    return NextResponse.json<StatusResponse>({
      connected: false,
      canPush: false,
    });
  }

  let accessToken = user.microsoft_access_token;

  // Try to refresh if expired
  if (user.microsoft_token_expires_at && isTokenExpired(user.microsoft_token_expires_at)) {
    try {
      const refreshed = await refreshAccessToken(user.microsoft_refresh_token);
      accessToken = refreshed.access_token;

      // Persist the refreshed token in the background (best-effort)
      await db
        .prepare(
          `UPDATE users
           SET microsoft_access_token = ?,
               microsoft_refresh_token = ?,
               microsoft_token_expires_at = ?,
               updated_at = CURRENT_TIMESTAMP
           WHERE id = ?`
        )
        .bind(
          refreshed.access_token,
          refreshed.refresh_token ?? user.microsoft_refresh_token,
          tokenExpiresAt(refreshed.expires_in),
          user.id
        )
        .run();
    } catch {
      // Refresh failed — tokens are stale
      return NextResponse.json<StatusResponse>({
        connected: true, // We had tokens, but they're no longer usable
        canPush: false,
        error: "Microsoft session expired. Please reconnect your Microsoft account.",
      });
    }
  }

  // Verify the token is usable by fetching the Microsoft profile
  try {
    const profile = await getMicrosoftUserProfile(accessToken);
    const microsoftEmail = profile.mail || profile.userPrincipalName;

    return NextResponse.json<StatusResponse>({
      connected: true,
      canPush: true,
      email: microsoftEmail,
    });
  } catch {
    // Token is present but Graph API rejected it
    return NextResponse.json<StatusResponse>({
      connected: true,
      canPush: false,
      error: "Microsoft token is invalid. Please reconnect your Microsoft account.",
    });
  }
}
