export const runtime = "edge";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(): Promise<NextResponse> {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { env } = getRequestContext();
    const db = env.DB as D1Database;

    const user = await db
      .prepare("SELECT id, plan FROM users WHERE email = ?")
      .bind(session.user.email)
      .first<{ id: string; plan: string }>();

    if (!user || (user.plan !== "pro" && user.plan !== "team")) {
      return NextResponse.json(
        { error: "Analytics requires a Pro or Team plan" },
        { status: 403 }
      );
    }

    // Try to query tracking data — if table doesn't exist, return empty
    try {
      const openRows = await db
        .prepare(
          `SELECT
             s.id   AS signature_id,
             s.name AS name,
             COUNT(CASE WHEN t.created_at >= datetime('now', '-7 days')  THEN 1 END) AS opens_7d,
             COUNT(CASE WHEN t.created_at >= datetime('now', '-30 days') THEN 1 END) AS opens_30d
           FROM signatures s
           LEFT JOIN signature_tracking t
             ON t.signature_id = s.id
             AND t.created_at >= datetime('now', '-30 days')
           WHERE s.user_id = ?
           GROUP BY s.id, s.name`
        )
        .bind(user.id)
        .all<{ signature_id: string; name: string; opens_7d: number; opens_30d: number }>();

      const signatures = openRows.results.map((row) => ({
        id: row.signature_id,
        name: row.name,
        opens_7d: row.opens_7d,
        opens_30d: row.opens_30d,
        clicks: [],
      }));

      return NextResponse.json({ signatures });
    } catch {
      // Table doesn't exist yet — return empty analytics
      return NextResponse.json({ signatures: [] });
    }
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ signatures: [] });
  }
}
