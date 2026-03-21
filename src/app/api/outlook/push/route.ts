// POST /api/outlook/push — Pushes the user's email signature to their
// Microsoft 365 mailbox via the Graph API. Works for OWA, New Outlook, and
// Outlook Mobile.

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { logAudit } from "@/lib/audit";
import {
  pushSignatureToOutlook,
  refreshAccessToken,
  isTokenExpired,
  tokenExpiresAt,
} from "@/lib/microsoft";

export const runtime = "edge";

interface PushRequestBody {
  // Raw HTML to push. If omitted, falls back to the user's cached signature HTML.
  html?: string;
  // Plain-text fallback (currently unused by Graph API but kept for future use)
  signatureText?: string;
  // Whether to also set the signature for reply/forward threads (default: true)
  setForReplies?: boolean;
  // Optional: signature ID to fetch from DB when html is not provided
  signatureId?: string;
}

interface StoredUserTokens {
  id: string;
  email: string;
  microsoft_access_token: string | null;
  microsoft_refresh_token: string | null;
  microsoft_token_expires_at: string | null;
}

export async function POST(request: NextRequest): Promise<Response> {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: PushRequestBody = {};
  try {
    body = (await request.json()) as PushRequestBody;
  } catch {
    // Body is optional — an empty body is fine if the user has a cached signature
  }

  const { env } = getRequestContext();
  const db = env.DB as D1Database;

  // ── 1. Load user + Microsoft tokens ──────────────────────────────────────

  const user = await db
    .prepare(
      `SELECT id, email,
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

  if (!user.microsoft_access_token || !user.microsoft_refresh_token) {
    return NextResponse.json(
      { error: "Microsoft account not connected", code: "not_connected" },
      { status: 400 }
    );
  }

  // ── 2. Refresh token if expired ───────────────────────────────────────────

  let accessToken = user.microsoft_access_token;

  if (user.microsoft_token_expires_at && isTokenExpired(user.microsoft_token_expires_at)) {
    try {
      const refreshed = await refreshAccessToken(user.microsoft_refresh_token);
      accessToken = refreshed.access_token;
      const newExpiresAt = tokenExpiresAt(refreshed.expires_in);

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
          newExpiresAt,
          user.id
        )
        .run();
    } catch (err) {
      console.error("Microsoft token refresh failed:", err);

      // Clear stored tokens — user must reconnect
      await db
        .prepare(
          `UPDATE users
           SET microsoft_access_token = NULL,
               microsoft_refresh_token = NULL,
               microsoft_token_expires_at = NULL,
               updated_at = CURRENT_TIMESTAMP
           WHERE id = ?`
        )
        .bind(user.id)
        .run();

      await logAudit(db, "token_invalid", {
        userId: user.id,
        email: user.email,
        detail: "Microsoft token refresh failed — tokens cleared, reconnect required",
        ip: request.headers.get("cf-connecting-ip") || undefined,
      });

      return NextResponse.json(
        {
          error: "Microsoft session expired. Please reconnect your Microsoft account.",
          code: "token_expired",
        },
        { status: 401 }
      );
    }
  }

  // ── 3. Resolve signature HTML ─────────────────────────────────────────────

  let signatureHtml = body.html ?? "";
  const signatureText = body.signatureText ?? "";

  // If no HTML was provided in the request body, try to load it from the DB
  if (!signatureHtml) {
    let sig: { html_cache: string | null } | null = null;

    if (body.signatureId) {
      sig = await db
        .prepare(
          "SELECT html_cache FROM signatures WHERE id = ? AND user_id = ?"
        )
        .bind(body.signatureId, user.id)
        .first<{ html_cache: string | null }>();
    } else {
      // Fall back to the most recently updated active signature
      sig = await db
        .prepare(
          `SELECT html_cache FROM signatures
           WHERE user_id = ? AND is_active = 1
           ORDER BY updated_at DESC LIMIT 1`
        )
        .bind(user.id)
        .first<{ html_cache: string | null }>();
    }

    if (!sig?.html_cache) {
      return NextResponse.json(
        { error: "No signature HTML provided or found in your account" },
        { status: 400 }
      );
    }

    signatureHtml = sig.html_cache;
  }

  if (!signatureHtml.trim()) {
    return NextResponse.json({ error: "Signature HTML is empty" }, { status: 400 });
  }

  // ── 4. Push to Outlook ────────────────────────────────────────────────────

  try {
    await pushSignatureToOutlook(accessToken, signatureHtml, signatureText);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Graph API push error:", message);

    await logAudit(db, "signature_updated", {
      userId: user.id,
      email: user.email,
      detail: `Outlook push FAILED: ${message.slice(0, 200)}`,
      ip: request.headers.get("cf-connecting-ip") || undefined,
    });

    // If the Graph API responded with 401, the token is invalid — clear it
    if (message.includes("401")) {
      await db
        .prepare(
          `UPDATE users
           SET microsoft_access_token = NULL,
               microsoft_refresh_token = NULL,
               microsoft_token_expires_at = NULL,
               updated_at = CURRENT_TIMESTAMP
           WHERE id = ?`
        )
        .bind(user.id)
        .run();

      return NextResponse.json(
        {
          error: "Microsoft session expired. Please reconnect your Microsoft account.",
          code: "token_expired",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to push signature to Outlook. Please try again." },
      { status: 502 }
    );
  }

  // ── 5. Audit log + success ────────────────────────────────────────────────

  await logAudit(db, "signature_updated", {
    userId: user.id,
    email: user.email,
    detail: "Signature pushed to Microsoft 365 (OWA, New Outlook, Outlook Mobile)",
    ip: request.headers.get("cf-connecting-ip") || undefined,
  });

  return NextResponse.json({
    success: true,
    message: "Signature is now live in OWA, New Outlook, and Outlook Mobile",
  });
}
