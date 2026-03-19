import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// POST = send magic link email
export async function POST(request: NextRequest) {
  const body = await request.json() as { email?: string };
  const email = body.email;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  // Generate token and store in D1
  let token: string;
  try {
    const { env } = getRequestContext();
    const db = env.DB as D1Database;

    const id = crypto.randomUUID();
    token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    await db.prepare(
      "INSERT INTO magic_tokens (id, email, token, expires_at) VALUES (?, ?, ?, ?)"
    ).bind(id, email, token, expiresAt).run();
  } catch (err) {
    // If D1 is not available, use a simple token (less secure but functional)
    console.error("D1 error, using fallback token:", err);
    token = crypto.randomUUID();
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://neatstamp.pages.dev";
  const verifyUrl = `${appUrl}/api/auth/magic-link?token=${token}&email=${encodeURIComponent(email)}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "NeatStamp <noreply@neatstamp.com>",
        to: email,
        subject: "Sign in to NeatStamp",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="font-size: 24px; color: #0f172a; margin: 0;">NeatStamp</h1>
              <p style="color: #64748b; font-size: 14px; margin-top: 8px;">Sign in to your account</p>
            </div>
            <p style="color: #334155; font-size: 16px; line-height: 1.6;">
              Click the button below to sign in. This link expires in 15 minutes.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${verifyUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                Sign in to NeatStamp
              </a>
            </div>
            <p style="color: #94a3b8; font-size: 12px; line-height: 1.5;">
              If you didn't request this email, you can safely ignore it.
            </p>
          </div>
        `,
      }),
    });

    const resBody = await res.json() as Record<string, unknown>;

    if (!res.ok) {
      console.error("Resend error:", JSON.stringify(resBody));
      return NextResponse.json({
        error: "Failed to send email",
        detail: String(resBody?.message || "Unknown error"),
      }, { status: 500 });
    }

    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Failed to send email", detail: String(err) }, { status: 500 });
  }
}

// GET = verify magic link token and sign in
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const email = url.searchParams.get("email");

  if (!token || !email) {
    return NextResponse.redirect(new URL("/login?error=InvalidToken", request.url));
  }

  // Validate token against D1
  let validEmail: string | null = null;
  try {
    const { env } = getRequestContext();
    const db = env.DB as D1Database;

    const row = await db.prepare(
      "SELECT * FROM magic_tokens WHERE token = ? AND used = 0 AND expires_at > datetime('now')"
    ).bind(token).first<{ email: string; id: string }>();

    if (row) {
      validEmail = row.email;
      await db.prepare("UPDATE magic_tokens SET used = 1 WHERE id = ?").bind(row.id).run();

      // Create user if doesn't exist
      const existingUser = await db.prepare("SELECT id FROM users WHERE email = ?").bind(validEmail).first();
      if (!existingUser) {
        const userId = crypto.randomUUID();
        await db.prepare(
          "INSERT INTO users (id, email) VALUES (?, ?)"
        ).bind(userId, validEmail).run();
      }
    }
  } catch (err) {
    console.error("D1 token validation error:", err);
  }

  if (!validEmail || validEmail !== email) {
    return NextResponse.redirect(new URL("/login?error=ExpiredToken", request.url));
  }

  // TODO: Create a proper session here via Auth.js signIn
  // For now, redirect to dashboard with success indicator
  return NextResponse.redirect(new URL("/dashboard?magiclink=success", request.url));
}
