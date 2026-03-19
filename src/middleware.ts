import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // Only apply subdomain routing on the real domain, not on pages.dev
  const isProductionDomain = hostname.includes("neatstamp.com");
  if (!isProductionDomain) {
    return NextResponse.next();
  }

  const isAppSubdomain = hostname.startsWith("app.");

  // Handle CORS preflight for cross-subdomain requests
  if (request.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 200 });
    response.headers.set("Access-Control-Allow-Origin", "https://app.neatstamp.com");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-URL");
    return response;
  }

  // Add CORS headers to all responses for cross-subdomain requests
  const origin = request.headers.get("origin");
  const addCorsHeaders = (response: NextResponse) => {
    if (origin && (origin.includes("neatstamp.com"))) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set("Access-Control-Allow-Credentials", "true");
    }
    return response;
  };

  // App paths that should live on app.neatstamp.com
  const appPaths = ["/editor", "/dashboard", "/login"];
  const isAppPath = appPaths.some((p) => pathname.startsWith(p));

  // If on main domain and accessing app paths → redirect to app subdomain
  if (!isAppSubdomain && isAppPath) {
    const appUrl = new URL(pathname, "https://app.neatstamp.com");
    appUrl.search = request.nextUrl.search;
    return NextResponse.redirect(appUrl, 301);
  }

  // Marketing paths that should live on neatstamp.com (not app subdomain)
  const marketingPaths = [
    "/pricing",
    "/about",
    "/blog",
    "/privacy",
    "/terms",
    "/templates",
    "/examples",
    "/email-signature-",
    "/alternative-to-",
    "/professional-",
    "/html-",
    "/best-",
    "/ai-",
    "/small-",
    "/christmas-",
    "/holiday-",
    "/new-year-",
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
    return NextResponse.rewrite(new URL("/editor", request.url));
  }

  const response = NextResponse.next();
  return addCorsHeaders(response);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image|logos|images|logo).*)",
  ],
};
