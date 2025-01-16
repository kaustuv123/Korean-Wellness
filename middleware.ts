import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === "/auth/login" || path === "/auth/signup";

  // Get token from cookies
  const token = request.cookies.get("jsonToken")?.value || "";

  // If user is logged in and tries to access login/signup pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Protected routes - add your protected routes here
  const protectedPaths = [
    "/profile",
    "/cart",
    "/orders",
    "/wishlist",
    // Add other protected routes
  ];

  // Check if current path is protected
  const isProtectedPath = protectedPaths.some((route) =>
    path.startsWith(route)
  );

  // If trying to access protected route without token
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
