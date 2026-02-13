import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const isAdmin = request.cookies.get("is_admin")?.value;
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin") && isAdmin !== "true") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname.startsWith("/login") && isAdmin === "true") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
