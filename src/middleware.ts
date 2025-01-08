import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  // Allow access to "/verifyemail" without redirection
  // if (path === "/verifyemail") {
  //   return NextResponse.next();
  // }

  //* If you want to verification on login as well then remove verifyemail option from public path
  const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail";

  // If the user is trying to access public paths (login/signup) and they already have a token, redirect to home
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the user is trying to access a protected path and does not have a token, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile",
    "/verifyemail",
    "/profile/:path*",
  ],
};
