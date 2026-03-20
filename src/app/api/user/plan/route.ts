import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { env } = getRequestContext();
    const db = env.DB as D1Database;

    // Query only columns that are guaranteed to exist
    const user = await db
      .prepare("SELECT plan FROM users WHERE email = ?")
      .bind(session.user.email)
      .first<{ plan: string }>();

    if (!user) {
      return NextResponse.json({ plan: "free" });
    }

    return NextResponse.json({ plan: user.plan || "free" });
  } catch (err) {
    console.error("DB error fetching plan:", err);
    // Return free as fallback instead of 500 — don't break the UI
    return NextResponse.json({ plan: "free" });
  }
}
