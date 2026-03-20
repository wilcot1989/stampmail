export const runtime = "edge";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest, NextResponse } from "next/server";

// 1x1 transparent GIF
const TRANSPARENT_GIF = new Uint8Array([
  0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x80, 0x00,
  0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x21, 0xf9, 0x04, 0x01, 0x00,
  0x00, 0x00, 0x00, 0x2c, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00,
  0x00, 0x02, 0x02, 0x44, 0x01, 0x00, 0x3b,
]);

function pixelResponse() {
  return new NextResponse(TRANSPARENT_GIF.slice(), {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  // Always return the pixel — tracking failures must never break email display
  try {
    const { id: signatureId } = await params;
    const ctx = getRequestContext();
    const db = ctx.env.DB as D1Database;

    // Ensure tracking table exists, then record the open
    ctx.ctx.waitUntil(recordOpen(db, signatureId));
  } catch {
    // Ignore all errors
  }

  return pixelResponse();
}

async function recordOpen(db: D1Database, signatureId: string): Promise<void> {
  try {
    // Create table if it doesn't exist yet
    await db.prepare(
      `CREATE TABLE IF NOT EXISTS signature_tracking (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        signature_id TEXT NOT NULL,
        event_type TEXT NOT NULL DEFAULT 'open',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`
    ).run();

    await db.prepare(
      "INSERT INTO signature_tracking (signature_id, event_type, created_at) VALUES (?, 'open', datetime('now'))"
    ).bind(signatureId).run();
  } catch {
    // Silently swallow — tracking must never break anything
  }
}
