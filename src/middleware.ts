import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // App subdomain: app.neatstamp.com
  const isAppSubdomain = hostname.startsWith("app.");

  // Marketing pages that should redirect TO app subdomain when accessed on main domain
  const appPaths = ["/editor", "/dashboard", "/login"];
  const isAppPath = appPaths.some((p) => pathname.startsWith(p));

  // If on main domain and accessing app paths → redirect to app subdomain
  if (!isAppSubdomain && isAppPath) {
    const appUrl = new URL(pathname, `https://app.${hostname}`);
    appUrl.search = request.nextUrl.search;
    return NextResponse.redirect(appUrl);
  }

  // If on app subdomain and accessing marketing paths → redirect to main domain
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
  ];
  const isMarketingPath =
    marketingPaths.some((p) => pathname.startsWith(p)) ||
    (pathname === "/" && isAppSubdomain === false);

  if (isAppSubdomain && isMarketingPath) {
    const mainHost = hostname.replace("app.", "");
    const mainUrl = new URL(pathname, `https://${mainHost}`);
    mainUrl.search = request.nextUrl.search;
    return NextResponse.redirect(mainUrl);
  }

  // If on app subdomain and hitting root → show editor
  if (isAppSubdomain && pathname === "/") {
    return NextResponse.rewrite(new URL("/editor", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api routes
     * - static files
     * - _next internal
     */
    "/((?!api|_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image|logos|images|logo).*)",
  ],
};
