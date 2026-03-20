import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// GET = list user's signatures
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { env } = getRequestContext();
    const db = env.DB as D1Database;

    // Find user
    const user = await db.prepare("SELECT id FROM users WHERE email = ?")
      .bind(session.user.email).first<{ id: string }>();

    if (!user) {
      return NextResponse.json({ signatures: [] });
    }

    const result = await db.prepare(
      "SELECT * FROM signatures WHERE user_id = ? ORDER BY updated_at DESC"
    ).bind(user.id).all();

    return NextResponse.json({ signatures: result.results });
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// POST = create new signature
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json() as Record<string, unknown>;
  const name = body.name as string | undefined;
  const template = body.template as string;
  const data = body.data as Record<string, unknown>;
  const photo_url = body.photo_url as string | undefined;

  if (!template || !data) {
    return NextResponse.json({ error: "Template and data required" }, { status: 400 });
  }

  // Input validation
  const allowedTemplates = ["minimal", "modern", "corporate", "creative", "bold", "elegant", "startup", "compact"];
  if (!allowedTemplates.includes(template)) {
    return NextResponse.json({ error: "Invalid template" }, { status: 400 });
  }

  const dataStr = JSON.stringify(data);
  if (dataStr.length > 50000) {
    return NextResponse.json({ error: "Signature data too large" }, { status: 400 });
  }

  if (name && name.length > 100) {
    return NextResponse.json({ error: "Name too long" }, { status: 400 });
  }

  try {
    const { env } = getRequestContext();
    const db = env.DB as D1Database;

    // Find or create user
    let user = await db.prepare("SELECT id, plan FROM users WHERE email = ?")
      .bind(session.user.email).first<{ id: string; plan: string }>();

    if (!user) {
      const userId = crypto.randomUUID();
      await db.prepare("INSERT INTO users (id, email, name, avatar_url) VALUES (?, ?, ?, ?)")
        .bind(userId, session.user.email, session.user.name || null, session.user.image || null).run();
      user = { id: userId, plan: "free" };
    }

    // Check signature limit for free users
    if (user.plan === "free") {
      const count = await db.prepare("SELECT COUNT(*) as cnt FROM signatures WHERE user_id = ?")
        .bind(user.id).first<{ cnt: number }>();
      if (count && count.cnt >= 3) {
        return NextResponse.json({
          error: "Free plan allows up to 3 signatures. Upgrade to Pro for unlimited.",
        }, { status: 403 });
      }
    }

    const sigId = crypto.randomUUID();
    await db.prepare(
      "INSERT INTO signatures (id, user_id, name, template, data, photo_url) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(sigId, user.id, name || "My Signature", template, JSON.stringify(data), photo_url || null).run();

    return NextResponse.json({ id: sigId, success: true });
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// PUT = update signature
export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json() as Record<string, unknown>;
  const id = body.id as string;
  const name = body.name as string | undefined;
  const template = body.template as string;
  const data = body.data as Record<string, unknown>;
  const photo_url = body.photo_url as string | undefined;

  if (!id) {
    return NextResponse.json({ error: "Signature ID required" }, { status: 400 });
  }

  try {
    const { env } = getRequestContext();
    const db = env.DB as D1Database;

    const user = await db.prepare("SELECT id FROM users WHERE email = ?")
      .bind(session.user.email).first<{ id: string }>();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await db.prepare(
      "UPDATE signatures SET name = ?, template = ?, data = ?, photo_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?"
    ).bind(
      name || "My Signature",
      template,
      JSON.stringify(data),
      photo_url || null,
      id,
      user.id
    ).run();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// DELETE = delete signature
export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Signature ID required" }, { status: 400 });
  }

  try {
    const { env } = getRequestContext();
    const db = env.DB as D1Database;

    const user = await db.prepare("SELECT id FROM users WHERE email = ?")
      .bind(session.user.email).first<{ id: string }>();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await db.prepare("DELETE FROM signatures WHERE id = ? AND user_id = ?")
      .bind(id, user.id).run();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
