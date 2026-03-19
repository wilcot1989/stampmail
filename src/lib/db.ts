// Cloudflare D1 database helper
// Access via: getDB() in edge runtime API routes

export interface Env {
  DB: D1Database;
}

// Get D1 database from Cloudflare runtime context
export function getDB(): D1Database {
  const db = process.env.DB as unknown as D1Database;
  if (!db) {
    throw new Error("D1 database binding not found. Check wrangler.toml and Cloudflare Pages settings.");
  }
  return db;
}

// Type definitions
export interface DBUser {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  plan: "free" | "pro" | "team";
  lemon_customer_id: string | null;
  lemon_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBSignature {
  id: string;
  user_id: string;
  name: string;
  template: string;
  data: string; // JSON string
  photo_url: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface DBMagicToken {
  id: string;
  email: string;
  token: string;
  expires_at: string;
  used: number;
  created_at: string;
}

// User operations
export async function findUserByEmail(db: D1Database, email: string): Promise<DBUser | null> {
  return db.prepare("SELECT * FROM users WHERE email = ?").bind(email).first<DBUser>();
}

export async function findUserById(db: D1Database, id: string): Promise<DBUser | null> {
  return db.prepare("SELECT * FROM users WHERE id = ?").bind(id).first<DBUser>();
}

export async function createUser(db: D1Database, user: { id: string; email: string; name?: string; avatar_url?: string }): Promise<DBUser> {
  await db.prepare(
    "INSERT INTO users (id, email, name, avatar_url) VALUES (?, ?, ?, ?)"
  ).bind(user.id, user.email, user.name || null, user.avatar_url || null).run();
  return findUserById(db, user.id) as Promise<DBUser>;
}

export async function updateUserPlan(db: D1Database, userId: string, plan: string, lemonCustomerId?: string, lemonSubscriptionId?: string): Promise<void> {
  await db.prepare(
    "UPDATE users SET plan = ?, lemon_customer_id = ?, lemon_subscription_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
  ).bind(plan, lemonCustomerId || null, lemonSubscriptionId || null, userId).run();
}

// Signature operations
export async function getUserSignatures(db: D1Database, userId: string): Promise<DBSignature[]> {
  const result = await db.prepare(
    "SELECT * FROM signatures WHERE user_id = ? ORDER BY created_at DESC"
  ).bind(userId).all<DBSignature>();
  return result.results;
}

export async function createSignature(db: D1Database, sig: { id: string; user_id: string; name: string; template: string; data: string; photo_url?: string }): Promise<void> {
  await db.prepare(
    "INSERT INTO signatures (id, user_id, name, template, data, photo_url) VALUES (?, ?, ?, ?, ?, ?)"
  ).bind(sig.id, sig.user_id, sig.name, sig.template, sig.data, sig.photo_url || null).run();
}

export async function updateSignature(db: D1Database, id: string, userId: string, sig: { name?: string; template?: string; data?: string; photo_url?: string }): Promise<void> {
  const fields: string[] = [];
  const values: (string | null)[] = [];

  if (sig.name !== undefined) { fields.push("name = ?"); values.push(sig.name); }
  if (sig.template !== undefined) { fields.push("template = ?"); values.push(sig.template); }
  if (sig.data !== undefined) { fields.push("data = ?"); values.push(sig.data); }
  if (sig.photo_url !== undefined) { fields.push("photo_url = ?"); values.push(sig.photo_url); }
  fields.push("updated_at = CURRENT_TIMESTAMP");

  values.push(id, userId);
  await db.prepare(
    `UPDATE signatures SET ${fields.join(", ")} WHERE id = ? AND user_id = ?`
  ).bind(...values).run();
}

export async function deleteSignature(db: D1Database, id: string, userId: string): Promise<void> {
  await db.prepare("DELETE FROM signatures WHERE id = ? AND user_id = ?").bind(id, userId).run();
}

// Magic token operations
export async function createMagicToken(db: D1Database, email: string): Promise<string> {
  const id = crypto.randomUUID();
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 minutes

  await db.prepare(
    "INSERT INTO magic_tokens (id, email, token, expires_at) VALUES (?, ?, ?, ?)"
  ).bind(id, email, token, expiresAt).run();

  return token;
}

export async function validateMagicToken(db: D1Database, token: string): Promise<string | null> {
  const row = await db.prepare(
    "SELECT * FROM magic_tokens WHERE token = ? AND used = 0 AND expires_at > datetime('now')"
  ).bind(token).first<DBMagicToken>();

  if (!row) return null;

  // Mark as used
  await db.prepare("UPDATE magic_tokens SET used = 1 WHERE id = ?").bind(row.id).run();

  return row.email;
}

// Cleanup expired tokens (call periodically)
export async function cleanupExpiredTokens(db: D1Database): Promise<void> {
  await db.prepare("DELETE FROM magic_tokens WHERE expires_at < datetime('now')").run();
}
