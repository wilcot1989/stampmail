import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { hashPassword } from "@/lib/password";
import { logAudit } from "@/lib/audit";

export const runtime = "edge";

// POST with action = "request" → send reset email
// POST with action = "reset" → set new password
export async function POST(request: NextRequest) {
  const body = await request.json() as { action?: string; email?: string; token?: string; password?: string };
  const ip = request.headers.get("cf-connecting-ip") || "unknown";

  const { env } = getRequestContext();
  const db = env.DB as D1Database;

  // === REQUEST RESET LINK ===
  if (body.action === "request") {
    const email = body.email?.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Rate limit: max 3 reset requests per email per hour
    const recent = await db.prepare(
      "SELECT COUNT(*) as cnt FROM magic_tokens WHERE email = ? AND created_at > datetime('now', '-1 hour')"
    ).bind(email).first<{ cnt: number }>();

    if (recent && recent.cnt >= 3) {
      // Still return success to prevent email enumeration
      return NextResponse.json({ sent: true });
    }

    // Check if user exists (any auth method — they can set/reset a password)
    const user = await db.prepare(
      "SELECT id FROM users WHERE email = ?"
    ).bind(email).first<{ id: string }>();

    if (!user) {
      // User doesn't exist — still return success (prevent enumeration)
      return NextResponse.json({ sent: true });
    }

    // Create reset token (reuse magic_tokens table)
    const id = crypto.randomUUID();
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 min

    await db.prepare(
      "INSERT INTO magic_tokens (id, email, token, expires_at) VALUES (?, ?, ?, ?)"
    ).bind(id, email, token, expiresAt).run();

    // Send reset email
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const resetUrl = `https://neatstamp.com/auth/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "NeatStamp <noreply@neatstamp.com>",
        to: email,
        subject: "Reset your NeatStamp password",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="font-size: 24px; color: #0f172a; margin: 0;">NeatStamp</h1>
              <p style="color: #64748b; font-size: 14px; margin-top: 8px;">Password reset</p>
            </div>
            <p style="color: #334155; font-size: 16px; line-height: 1.6;">
              Someone requested a password reset for your account. Click the button below to choose a new password. This link expires in 30 minutes.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                Reset my password
              </a>
            </div>
            <p style="color: #94a3b8; font-size: 12px; line-height: 1.5;">
              If you didn't request this, you can safely ignore this email. Your password won't change.
            </p>
          </div>
        `,
      }),
    });

    await logAudit(db, "magic_link_sent", { email, ip, detail: "password reset requested" });
    return NextResponse.json({ sent: true });
  }

  // === SET NEW PASSWORD ===
  if (body.action === "reset") {
    const token = body.token;
    const email = body.email?.toLowerCase().trim();
    const password = body.password;

    if (!token || !email || !password) {
      return NextResponse.json({ error: "Token, email and password required" }, { status: 400 });
    }

    if (password.length < 8 || password.length > 128) {
      return NextResponse.json({ error: "Password must be 8-128 characters" }, { status: 400 });
    }

    // Validate token
    const row = await db.prepare(
      "SELECT * FROM magic_tokens WHERE token = ? AND email = ? AND used = 0 AND expires_at > datetime('now')"
    ).bind(token, email).first<{ id: string }>();

    if (!row) {
      return NextResponse.json({ error: "Invalid or expired reset link. Request a new one." }, { status: 400 });
    }

    // Mark token as used
    await db.prepare("UPDATE magic_tokens SET used = 1 WHERE id = ?").bind(row.id).run();

    // Hash new password and update
    const hashedPassword = await hashPassword(password);
    await db.prepare(
      "UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?"
    ).bind(hashedPassword, email).run();

    await logAudit(db, "magic_link_sent", { email, ip, detail: "password reset completed" });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
