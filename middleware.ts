import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isSystemPath = pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".");
  if (isSystemPath) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = segments[0];

  if (currentLocale && isLocale(currentLocale)) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"]
};
