// GET /api/auth/microsoft/callback — Handles the Microsoft OAuth callback.
// Verifies state, exchanges code for tokens, stores tokens in D1, redirects
// back to the dashboard with a success flag.

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { logAudit } from "@/lib/audit";
import {
  exchangeCodeForTokens,
  getMicrosoftUserProfile,
  tokenExpiresAt,
} from "@/lib/microsoft";

export const runtime = "edge";

const BASE_URL = process.env.NEXTAUTH_URL || "https://neatstamp.com";

export async function GET(request: NextRequest): Promise<Response> {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.redirect(`${BASE_URL}/login?redirect=/dashboard`);
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const returnedState = searchParams.get("state");
  const errorParam = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  // Microsoft returned an error (e.g. user cancelled, consent denied)
  if (errorParam) {
    console.warn("Microsoft OAuth error:", errorParam, errorDescription);
    return NextResponse.redirect(
      `${BASE_URL}/dashboard?microsoft=error&reason=${encodeURIComponent(errorParam)}`
    );
  }

  if (!code || !returnedState) {
    return NextResponse.redirect(`${BASE_URL}/dashboard?microsoft=error&reason=missing_params`);
  }

  // CSRF: verify the state matches what we set in the initiation cookie
  const storedState = request.cookies.get("ms_oauth_state")?.value;
  if (!storedState || storedState !== returnedState) {
    console.error("Microsoft OAuth state mismatch — possible CSRF attempt");
    return NextResponse.redirect(
      `${BASE_URL}/dashboard?microsoft=error&reason=state_mismatch`
    );
  }

  let tokens: { access_token: string; refresh_token: string; expires_in: number };
  try {
    tokens = await exchangeCodeForTokens(code);
  } catch (err) {
    console.error("Microsoft token exchange error:", err);
    return NextResponse.redirect(
      `${BASE_URL}/dashboard?microsoft=error&reason=token_exchange_failed`
    );
  }

  // Fetch the user's Microsoft email for display purposes
  let microsoftEmail: string | null = null;
  try {
    const profile = await getMicrosoftUserProfile(tokens.access_token);
    microsoftEmail = profile.mail || profile.userPrincipalName || null;
  } catch (err) {
    // Non-fatal — we still have valid tokens even if profile fetch fails
    console.warn("Microsoft profile fetch error (non-fatal):", err);
  }

  try {
    const { env } = getRequestContext();
    const db = env.DB as D1Database;

    // Look up the NeatStamp user
    const user = await db
      .prepare("SELECT id FROM users WHERE email = ?")
      .bind(session.user.email)
      .first<{ id: string }>();

    if (!user) {
      console.error("Microsoft callback: NeatStamp user not found for", session.user.email);
      return NextResponse.redirect(
        `${BASE_URL}/dashboard?microsoft=error&reason=user_not_found`
      );
    }

    const expiresAt = tokenExpiresAt(tokens.expires_in);

    // TODO: Consider encrypting tokens at rest using AES-GCM with a
    // MICROSOFT_TOKEN_ENCRYPTION_KEY env var before storing in D1.
    // For now they are stored as plaintext — D1 is not accessible publicly,
    // but encrypting them would provide defence in depth.
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
        tokens.access_token,
        tokens.refresh_token,
        expiresAt,
        user.id
      )
      .run();

    await logAudit(db, "signature_updated", {
      userId: user.id,
      email: session.user.email,
      detail: `Microsoft 365 connected${microsoftEmail ? ` (${microsoftEmail})` : ""}`,
      ip: request.headers.get("cf-connecting-ip") || undefined,
    });
  } catch (err) {
    console.error("Microsoft callback: DB error:", err);
    return NextResponse.redirect(
      `${BASE_URL}/dashboard?microsoft=error&reason=db_error`
    );
  }

  // Clear the CSRF cookie and redirect to dashboard with success flag
  const successUrl = `${BASE_URL}/dashboard?microsoft=connected${
    microsoftEmail ? `&email=${encodeURIComponent(microsoftEmail)}` : ""
  }`;
  const response = NextResponse.redirect(successUrl);
  response.cookies.set("ms_oauth_state", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 0, // Delete the cookie
    path: "/",
  });

  return response;
}
