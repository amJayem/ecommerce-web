import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for common auth cookie names
  const token =
    request.cookies.get("Authentication")?.value ||
    request.cookies.get("token")?.value ||
    request.cookies.get("access_token")?.value;

  const refreshToken = request.cookies.get("refresh_token")?.value;

  const { pathname } = request.nextUrl;

  // auth/login and auth/register are in account folder now, so we need to be careful.

  const authRoutes = ["/account/login", "/account/register"];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Protected routes: everything in /account EXCEPT login and register
  const isProtectedAccountRoute =
    pathname.startsWith("/account") && !isAuthRoute;

  if (isProtectedAccountRoute && !token && !refreshToken) {
    const loginUrl = new URL("/account/login", request.url);
    loginUrl.searchParams.set("from", pathname); // Save original destination
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/account/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*"],
};
