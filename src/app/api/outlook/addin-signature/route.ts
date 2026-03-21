// GET /api/outlook/addin-signature?id=<signatureId>
//
// Returns the fully-rendered HTML for a single signature, used by the
// Outlook add-in taskpane when inserting or caching a signature.
//
// Response: { html: string }
//
// We regenerate the HTML on every call so it always reflects the latest
// data from the DB (rather than relying on the html_cache column which
// may be stale or missing).  The Edge runtime keeps this fast.

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { generateSignatureHtml } from "@/lib/generateSignature";
import { SignatureData, TemplateName } from "@/lib/types"; // TemplateName used via data.template cast

export const runtime = "edge";

interface DbSignature {
  id: string;
  user_id: string;
  name: string;
  template: string;
  data: string;
  photo_url: string | null;
  html_cache: string | null;
}

export async function GET(request: NextRequest): Promise<Response> {
  // ── 1. Auth ────────────────────────────────────────────────────────────
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const sigId = searchParams.get("id");
  if (!sigId) {
    return NextResponse.json({ error: "Signature ID required" }, { status: 400 });
  }

  // ── 2. Load signature row ──────────────────────────────────────────────
  const { env } = getRequestContext();
  const db = env.DB as D1Database;

  const user = await db
    .prepare("SELECT id, plan FROM users WHERE email = ?")
    .bind(session.user.email)
    .first<{ id: string; plan: string }>();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const sig = await db
    .prepare("SELECT * FROM signatures WHERE id = ? AND user_id = ?")
    .bind(sigId, user.id)
    .first<DbSignature>();

  if (!sig) {
    return NextResponse.json({ error: "Signature not found" }, { status: 404 });
  }

  // ── 3. Render HTML ─────────────────────────────────────────────────────
  let html: string;

  try {
    const data = JSON.parse(sig.data) as SignatureData;
    // Ensure the template field on the data object matches the DB column
    data.template = sig.template as TemplateName;
    html = generateSignatureHtml(data, {
      plan: (user.plan as "free" | "pro" | "team") ?? "free",
      signatureId: sig.id,
      imageUrl: sig.photo_url ?? undefined,
    });
  } catch {
    // If regeneration fails, fall back to cached HTML
    if (sig.html_cache) {
      html = sig.html_cache;
    } else {
      return NextResponse.json(
        { error: "Could not render signature HTML" },
        { status: 500 }
      );
    }
  }

  // ── 4. Optionally update the html_cache column ────────────────────────
  // Fire-and-forget — don't block the response
  db.prepare("UPDATE signatures SET html_cache = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
    .bind(html, sig.id)
    .run()
    .catch(() => { /* non-fatal */ });

  return NextResponse.json(
    { html, name: sig.name, id: sig.id },
    {
      status: 200,
      headers: {
        // Allow the Office.js iframe to call this endpoint cross-origin
        "Access-Control-Allow-Origin": "https://neatstamp.com",
        "Access-Control-Allow-Credentials": "true",
        // Short cache — signatures change frequently
        "Cache-Control": "private, max-age=60",
      },
    }
  );
}
