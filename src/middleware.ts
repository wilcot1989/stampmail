import { NextRequest, NextResponse } from "next/server";

// Security headers applied to every response
const securityHeaders: Record<string, string> = {
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.neatstamp.com https://accounts.google.com https://api.resend.com; frame-src 'self' https://accounts.google.com; object-src 'none'; base-uri 'self'; form-action 'self' https://accounts.google.com;",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

// Simple in-memory rate limiter for API routes
// Resets on each deployment (edge workers are stateless across requests on different nodes)
// For production: use Cloudflare Rate Limiting rules instead
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 120; // 120 requests per minute per IP for API routes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;
  const isApi = pathname.startsWith("/api/");

  // Rate limit API routes
  if (isApi) {
    const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return new NextResponse(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
        headers: { "Content-Type": "application/json", "Retry-After": "60", ...securityHeaders },
      });
    }
  }

  // Only apply subdomain routing on the real domain, not on pages.dev
  const isProductionDomain = hostname.includes("neatstamp.com");
  if (!isProductionDomain) {
    const response = NextResponse.next();
    for (const [key, value] of Object.entries(securityHeaders)) {
      response.headers.set(key, value);
    }
    return response;
  }

  const isAppSubdomain = hostname.startsWith("app.");

  // CORS headers for cross-subdomain requests
  const origin = request.headers.get("origin") || "";
  const isNeatStampOrigin = origin.includes("neatstamp.com");
  const corsHeaders: Record<string, string> = isNeatStampOrigin
    ? {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-URL",
        "Access-Control-Allow-Credentials": "true",
      }
    : {};

  // Handle CORS preflight
  if (request.method === "OPTIONS" && isNeatStampOrigin) {
    return new NextResponse(null, { status: 204, headers: { ...corsHeaders, ...securityHeaders } });
  }

  const addHeaders = (response: NextResponse) => {
    for (const [key, value] of Object.entries({ ...corsHeaders, ...securityHeaders })) {
      response.headers.set(key, value);
    }
    return response;
  };

  // App paths that should live on app.neatstamp.com
  const appPaths = ["/editor", "/dashboard", "/login", "/auth/verify"];
  const isAppPath = appPaths.some((p) => pathname.startsWith(p));

  // If on main domain and accessing app paths → redirect to app subdomain
  if (!isAppSubdomain && isAppPath) {
    const appUrl = new URL(pathname, "https://app.neatstamp.com");
    appUrl.search = request.nextUrl.search;
    return NextResponse.redirect(appUrl, 301);
  }

  // Marketing paths that should live on neatstamp.com (not app subdomain)
  const marketingPaths = [
    "/pricing", "/about", "/blog", "/privacy", "/terms", "/templates",
    "/examples", "/email-signature-", "/alternative-to-", "/professional-",
    "/html-", "/best-", "/ai-", "/small-", "/christmas-", "/holiday-", "/new-year-",
  ];
  const isMarketingPath = marketingPaths.some((p) => pathname.startsWith(p));

  // If on app subdomain and accessing marketing paths → redirect to main domain
  if (isAppSubdomain && isMarketingPath) {
    const mainUrl = new URL(pathname, "https://neatstamp.com");
    mainUrl.search = request.nextUrl.search;
    return NextResponse.redirect(mainUrl, 301);
  }

  // If on app subdomain and hitting root → show editor
  if (isAppSubdomain && pathname === "/") {
    return addHeaders(NextResponse.rewrite(new URL("/editor", request.url)));
  }

  return addHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image|logos|images|logo).*)",
  ],
};
