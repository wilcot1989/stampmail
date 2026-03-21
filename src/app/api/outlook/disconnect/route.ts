// POST /api/outlook/disconnect — Clears the user's stored Microsoft tokens.
// The user will need to go through the OAuth flow again to reconnect.
// This does NOT revoke the token at Microsoft's end — for full revocation the
// user should also visit https://myapps.microsoft.com and remove the app.

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { logAudit } from "@/lib/audit";

export const runtime = "edge";

export async function POST(request: NextRequest): Promise<Response> {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { env } = getRequestContext();
  const db = env.DB as D1Database;

  const user = await db
    .prepare("SELECT id FROM users WHERE email = ?")
    .bind(session.user.email)
    .first<{ id: string }>();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

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

  await logAudit(db, "signature_updated", {
    userId: user.id,
    email: session.user.email,
    detail: "Microsoft 365 disconnected — tokens cleared",
    ip: request.headers.get("cf-connecting-ip") || undefined,
  });

  return NextResponse.json({ success: true });
}
