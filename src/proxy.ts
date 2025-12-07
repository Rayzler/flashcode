import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user has session cookie
  const sessionToken =
    request.cookies.get("authjs.session-token") ||
    request.cookies.get("__Secure-authjs.session-token");

  const isLoggedIn = !!sessionToken;
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  const isEditorPage = pathname.startsWith("/editor");
  const isPublicPage = pathname === "/" || pathname.startsWith("/api/auth");

  // Allow public pages
  if (isPublicPage) {
    return NextResponse.next();
  }

  // Redirect to login if accessing editor without auth
  if (isEditorPage && !isLoggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect to editor if logged in and trying to access auth pages
  if (isAuthPage && isLoggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/editor";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure which routes to protect
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api/auth (NextAuth routes)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)"
  ]
};
