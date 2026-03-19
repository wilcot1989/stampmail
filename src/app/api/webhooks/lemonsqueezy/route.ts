import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// Verify HMAC signature using Web Crypto API (edge-compatible)
async function verifySignature(
  rawBody: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signed = await crypto.subtle.sign("HMAC", key, encoder.encode(rawBody));
  const digest = Array.from(new Uint8Array(signed))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return digest === signature;
}

// LemonSqueezy webhook handler
export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "";

  const signature = request.headers.get("x-signature");
  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 401 });
  }

  const valid = await verifySignature(rawBody, signature, secret);
  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const eventName = payload.meta.event_name;
  const customData = payload.meta.custom_data;
  const userId = customData?.user_id;

  if (!userId) {
    return NextResponse.json(
      { error: "No user_id in custom data" },
      { status: 400 }
    );
  }

  const subscriptionData = payload.data.attributes;

  // Update D1 database
  try {
    const { env } = getRequestContext();
    const db = env.DB as D1Database;

    switch (eventName) {
      case "subscription_created":
      case "subscription_updated":
        await db.prepare(
          "UPDATE users SET plan = 'pro', lemon_customer_id = ?, lemon_subscription_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
        ).bind(
          String(subscriptionData.customer_id),
          String(payload.data.id),
          userId
        ).run();
        console.log(`[Webhook] ${eventName} for user ${userId} → plan=pro`);
        break;

      case "subscription_cancelled":
        await db.prepare(
          "UPDATE users SET plan = 'free', updated_at = CURRENT_TIMESTAMP WHERE id = ?"
        ).bind(userId).run();
        console.log(`[Webhook] Cancelled for user ${userId} → plan=free`);
        break;

      case "subscription_payment_failed":
        console.log(`[Webhook] Payment failed for user ${userId}`);
        break;

      case "order_created":
        // Lifetime deal
        await db.prepare(
          "UPDATE users SET plan = 'pro', lemon_customer_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
        ).bind(String(subscriptionData.customer_id), userId).run();
        console.log(`[Webhook] Order (lifetime) for user ${userId} → plan=pro`);
        break;

      default:
        console.log(`[Webhook] Unhandled event: ${eventName}`);
    }
  } catch (err) {
    console.error("[Webhook] D1 error:", err);
  }

  return NextResponse.json({ received: true });
}
