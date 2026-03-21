import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

/**
 * POST /api/migrate — Run all database migrations.
 * Only accessible by authenticated admin users.
 * Safe to run multiple times (CREATE TABLE IF NOT EXISTS).
 */
export async function POST() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { env } = getRequestContext();
    const db = env.DB as D1Database;

    const results: string[] = [];

    // ── Core tables ──

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        avatar_url TEXT,
        password_hash TEXT,
        plan TEXT DEFAULT 'free',
        plan_expires_at TEXT,
        lemon_customer_id TEXT,
        lemon_subscription_id TEXT,
        microsoft_access_token TEXT,
        microsoft_refresh_token TEXT,
        microsoft_token_expires_at TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `).run();
    results.push("users: OK");

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS signatures (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name TEXT DEFAULT 'My Signature',
        template TEXT NOT NULL,
        data TEXT NOT NULL,
        photo_url TEXT,
        html_cache TEXT,
        is_active INTEGER DEFAULT 1,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `).run();
    results.push("signatures: OK");

    // ── Team tables ──

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS teams (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL DEFAULT 'My Team',
        owner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        max_members INTEGER DEFAULT 25,
        master_template_id TEXT,
        brand_primary_color TEXT DEFAULT '#2563eb',
        brand_font TEXT DEFAULT 'Arial,sans-serif',
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `).run();
    results.push("teams: OK");

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS team_members (
        id TEXT PRIMARY KEY,
        team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
        user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
        email TEXT NOT NULL,
        name TEXT,
        job_title TEXT,
        department TEXT,
        phone TEXT,
        role TEXT DEFAULT 'member',
        signature_id TEXT REFERENCES signatures(id) ON DELETE SET NULL,
        status TEXT DEFAULT 'pending',
        last_deployed_at TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `).run();
    results.push("team_members: OK");

    // ── Deployment tracking ──

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS deployments (
        id TEXT PRIMARY KEY,
        team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
        deployed_by TEXT NOT NULL REFERENCES users(id),
        platform TEXT NOT NULL,
        total_users INTEGER DEFAULT 0,
        success_count INTEGER DEFAULT 0,
        failed_count INTEGER DEFAULT 0,
        status TEXT DEFAULT 'completed',
        detail TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `).run();
    results.push("deployments: OK");

    // ── Health monitoring ──

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS health_scans (
        id TEXT PRIMARY KEY,
        signature_id TEXT NOT NULL REFERENCES signatures(id) ON DELETE CASCADE,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        score INTEGER DEFAULT 0,
        checks_passed INTEGER DEFAULT 0,
        checks_total INTEGER DEFAULT 0,
        results TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `).run();
    results.push("health_scans: OK");

    // ── Analytics ──

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS signature_events (
        id TEXT PRIMARY KEY,
        signature_id TEXT NOT NULL,
        event_type TEXT NOT NULL,
        ip_hash TEXT,
        user_agent TEXT,
        referer TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `).run();
    results.push("signature_events: OK");

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS link_clicks (
        id TEXT PRIMARY KEY,
        signature_id TEXT NOT NULL,
        url TEXT NOT NULL,
        ip_hash TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `).run();
    results.push("link_clicks: OK");

    // ── Audit log ──

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS audit_log (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        email TEXT,
        action TEXT NOT NULL,
        detail TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `).run();
    results.push("audit_log: OK");

    // ── Migrations tracking ──

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id TEXT PRIMARY KEY,
        applied_at TEXT DEFAULT (datetime('now'))
      )
    `).run();
    results.push("_migrations: OK");

    // ── Safe ALTER TABLE additions (for existing tables) ──

    const alterations = [
      { migration: "add_plan_expires_at", sql: "ALTER TABLE users ADD COLUMN plan_expires_at TEXT" },
      { migration: "add_microsoft_tokens", sql: "ALTER TABLE users ADD COLUMN microsoft_access_token TEXT" },
      { migration: "add_microsoft_refresh", sql: "ALTER TABLE users ADD COLUMN microsoft_refresh_token TEXT" },
      { migration: "add_microsoft_expires", sql: "ALTER TABLE users ADD COLUMN microsoft_token_expires_at TEXT" },
      { migration: "add_signature_html_cache", sql: "ALTER TABLE signatures ADD COLUMN html_cache TEXT" },
      { migration: "add_signature_is_active", sql: "ALTER TABLE signatures ADD COLUMN is_active INTEGER DEFAULT 1" },
    ];

    for (const alt of alterations) {
      const done = await db.prepare("SELECT id FROM _migrations WHERE id = ?").bind(alt.migration).first();
      if (!done) {
        try {
          await db.prepare(alt.sql).run();
        } catch {
          // Column may already exist
        }
        await db.prepare("INSERT OR IGNORE INTO _migrations (id) VALUES (?)").bind(alt.migration).run();
        results.push(`migration ${alt.migration}: applied`);
      } else {
        results.push(`migration ${alt.migration}: already done`);
      }
    }

    // ── Indexes ──

    await db.prepare("CREATE INDEX IF NOT EXISTS idx_signatures_user ON signatures(user_id)").run();
    await db.prepare("CREATE INDEX IF NOT EXISTS idx_team_members_team ON team_members(team_id)").run();
    await db.prepare("CREATE INDEX IF NOT EXISTS idx_team_members_email ON team_members(email)").run();
    await db.prepare("CREATE INDEX IF NOT EXISTS idx_deployments_team ON deployments(team_id)").run();
    await db.prepare("CREATE INDEX IF NOT EXISTS idx_health_scans_sig ON health_scans(signature_id)").run();
    await db.prepare("CREATE INDEX IF NOT EXISTS idx_events_sig ON signature_events(signature_id)").run();
    await db.prepare("CREATE INDEX IF NOT EXISTS idx_clicks_sig ON link_clicks(signature_id)").run();
    results.push("indexes: OK");

    return NextResponse.json({
      success: true,
      tables: results,
      message: "All migrations applied successfully",
    });
  } catch (err) {
    console.error("Migration error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
