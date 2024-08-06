import { NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(request) {
  const cookies = parse(request.headers.get("cookie") || "");
  const currentUser = cookies.user ? JSON.parse(cookies.user) : null;

  // If the user is authenticated and trying to access the login page, redirect to home
  if (currentUser && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the user is not authenticated and trying to access protected routes, redirect to login
  if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If no redirection is necessary, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile", "/details", "/login"],
};
