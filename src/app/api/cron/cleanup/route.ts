import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// Cleanup endpoint — call daily via external cron (e.g. cron-job.org)
// URL: https://neatstamp.com/api/cron/cleanup?secret=xxx
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cleaned: Record<string, number> = {};

  try {
    const { env } = getRequestContext();
    const db = env.DB as D1Database;

    // Each cleanup step is wrapped in try/catch so missing tables don't break others
    const safeRun = async (label: string, sql: string) => {
      try {
        const result = await db.prepare(sql).run();
        cleaned[label] = result.meta.changes ?? 0;
      } catch {
        cleaned[label] = -1; // indicates table doesn't exist yet
      }
    };

    await safeRun("expired_tokens", "DELETE FROM magic_tokens WHERE expires_at < datetime('now', '-1 hour')");
    await safeRun("old_tracking", "DELETE FROM signature_tracking WHERE created_at < datetime('now', '-90 days')");

    return NextResponse.json({ success: true, cleaned });
  } catch (err) {
    console.error("Cleanup error:", err);
    return NextResponse.json({ error: "Cleanup failed", cleaned }, { status: 500 });
  }
}
