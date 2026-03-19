import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createProCheckout } from "@/lib/lemonsqueezy";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.email || !session?.user?.id) {
    return NextResponse.json(
      { error: "You must be signed in to upgrade" },
      { status: 401 }
    );
  }

  const body = await request.json() as Record<string, unknown>;
  const variant = (body as Record<string, unknown>).variant === "yearly" ? "yearly" : "monthly";

  try {
    const checkoutUrl = await createProCheckout(
      session.user.email,
      session.user.id,
      variant as "monthly" | "yearly"
    );

    if (!checkoutUrl) {
      return NextResponse.json(
        { error: "Failed to create checkout" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
