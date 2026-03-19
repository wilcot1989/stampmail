import { NextRequest, NextResponse } from "next/server";

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

  switch (eventName) {
    case "subscription_created":
      console.log(`[Webhook] Subscription created for user ${userId}`, {
        subscriptionId: payload.data.id,
        status: subscriptionData.status,
        variantId: subscriptionData.variant_id,
      });
      // TODO: Update user plan in D1 database
      break;

    case "subscription_updated":
      console.log(`[Webhook] Subscription updated for user ${userId}`, {
        subscriptionId: payload.data.id,
        status: subscriptionData.status,
      });
      break;

    case "subscription_cancelled":
      console.log(`[Webhook] Subscription cancelled for user ${userId}`, {
        subscriptionId: payload.data.id,
        endsAt: subscriptionData.ends_at,
      });
      break;

    case "subscription_payment_failed":
      console.log(`[Webhook] Payment failed for user ${userId}`);
      break;

    case "order_created":
      console.log(`[Webhook] Order created for user ${userId}`, {
        orderId: payload.data.id,
        total: subscriptionData.total_formatted,
      });
      break;

    default:
      console.log(`[Webhook] Unhandled event: ${eventName}`);
  }

  return NextResponse.json({ received: true });
}
