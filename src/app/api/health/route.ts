import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// POST — run health scan on a signature and save results
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { env } = getRequestContext();
    const db = env.DB as D1Database;

    const user = await db.prepare("SELECT id, plan FROM users WHERE email = ?")
      .bind(session.user.email).first<{ id: string; plan: string }>();

    if (!user || user.plan === "free") {
      return NextResponse.json({ error: "Pro plan required" }, { status: 403 });
    }

    const body = await request.json() as {
      signatureId: string;
      score: number;
      checksPassed: number;
      checksTotal: number;
      results: Record<string, unknown>;
    };

    if (!body.signatureId) {
      return NextResponse.json({ error: "signatureId required" }, { status: 400 });
    }

    // Verify ownership
    const sig = await db.prepare("SELECT id FROM signatures WHERE id = ? AND user_id = ?")
      .bind(body.signatureId, user.id).first();
    if (!sig) {
      return NextResponse.json({ error: "Signature not found" }, { status: 404 });
    }

    const scanId = crypto.randomUUID();
    await db.prepare(
      "INSERT INTO health_scans (id, signature_id, user_id, score, checks_passed, checks_total, results) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      scanId,
      body.signatureId,
      user.id,
      body.score || 0,
      body.checksPassed || 0,
      body.checksTotal || 6,
      JSON.stringify(body.results || {})
    ).run();

    return NextResponse.json({ success: true, scanId });
  } catch (err) {
    console.error("Health scan error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// GET — get latest health scan for user's signatures
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { env } = getRequestContext();
    const db = env.DB as D1Database;

    const user = await db.prepare("SELECT id FROM users WHERE email = ?")
      .bind(session.user.email).first<{ id: string }>();
    if (!user) return NextResponse.json({ scans: [] });

    const result = await db.prepare(`
      SELECT h.*, s.name as signature_name
      FROM health_scans h
      JOIN signatures s ON h.signature_id = s.id
      WHERE h.user_id = ?
      ORDER BY h.created_at DESC
      LIMIT 50
    `).bind(user.id).all();

    return NextResponse.json({ scans: result.results });
  } catch (err) {
    console.error("Health scan fetch error:", err);
    return NextResponse.json({ scans: [], error: String(err) });
  }
}
