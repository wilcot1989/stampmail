// GET /api/auth/microsoft — Initiates the Microsoft OAuth flow.
// Redirects the user to Microsoft's authorization endpoint.

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getMicrosoftAuthUrl } from "@/lib/microsoft";

export const runtime = "edge";

export async function GET(): Promise<Response> {
  // User must be logged in to NeatStamp before connecting Microsoft
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.redirect(
      new URL("/login?redirect=/dashboard", process.env.NEXTAUTH_URL || "https://neatstamp.com")
    );
  }

  // Generate a CSRF state token — a random 32-byte hex string
  const stateBytes = new Uint8Array(32);
  crypto.getRandomValues(stateBytes);
  const state = Array.from(stateBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  let authUrl: string;
  try {
    authUrl = getMicrosoftAuthUrl(state);
  } catch (err) {
    console.error("Failed to build Microsoft auth URL:", err);
    return NextResponse.json(
      { error: "Microsoft integration not configured" },
      { status: 503 }
    );
  }

  // Store state in a short-lived, HttpOnly cookie for CSRF verification
  const response = NextResponse.redirect(authUrl);
  response.cookies.set("ms_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes — enough time to complete the OAuth flow
    path: "/",
  });

  return response;
}
