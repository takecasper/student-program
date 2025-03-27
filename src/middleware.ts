import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check for the session cookie
  const mockSession = request.cookies.get("mockSession")?.value;

  // For debugging
  console.log("Middleware checking session:", mockSession);
  console.log("Current path:", request.nextUrl.pathname);

  // Check if the user is trying to access a protected route
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // If no session exists, redirect to the signin page
    if (!mockSession) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // If the user is already logged in and trying to access signin page
  if (request.nextUrl.pathname === "/signin" && mockSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/signin"],
};
