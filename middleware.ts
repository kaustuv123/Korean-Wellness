import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === "/auth/login" || path === "/auth/signup";

  // Get token from cookies
  const token = request.cookies.get("jsonToken")?.value || "";

  // If user is logged in and tries to access login/signup pages, redirect to home
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Protected routes - add your protected routes here
  const protectedPaths = [
    "/profile",
    "/cart",
    "/orders",
    "/wishlist",
    "/checkout",
  ];

  // Check if current path is protected
  const isProtectedPath = protectedPaths.some((route) =>
    path.startsWith(route)
  );

  // If user is not authenticated and tries to access a protected route, redirect to login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL(`/auth/login?redirect=${path}`, request.nextUrl));
  }

  // Allow authenticated users to access protected routes without redirection
  return NextResponse.next();
}
