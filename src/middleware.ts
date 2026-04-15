import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VALID_TOKEN = process.env.ACCESS_TOKEN;
const TOKEN_PARAM = "token";
const PUBLIC_PATHS = ["/api", "/studio", "/_next", "/favicon.ico", "/og-image.png", "/fonts", "/public", "/unauthorized"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check token
  const queryToken = request.nextUrl.searchParams.get(TOKEN_PARAM);
  const headerToken = request.headers.get("x-access-token");
  const cookieToken = request.cookies.get(TOKEN_PARAM)?.value;
  const providedToken = queryToken || headerToken || cookieToken;

  if (!VALID_TOKEN) {
    console.warn("[middleware] ACCESS_TOKEN not set — allowing access (dev mode only)");
    return NextResponse.next();
  }

  if (providedToken !== VALID_TOKEN) {
    const loginUrl = new URL("/unauthorized", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Valid token — set cookie if came via URL param
  if (queryToken) {
    const url = request.nextUrl.clone();
    url.searchParams.delete(TOKEN_PARAM);
    const redirectResponse = NextResponse.redirect(url);
    redirectResponse.cookies.set(TOKEN_PARAM, queryToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return redirectResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/|studio/|_next/static|_next/image|favicon.ico|og-image.png|fonts/|public/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
