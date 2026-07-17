import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/app/i18n/config";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  const requestedLocale = segments[0];

  if (isLocale(requestedLocale)) {
    requestHeaders.set("x-site-locale", requestedLocale);
    const url = request.nextUrl.clone();
    url.pathname = `/${segments.slice(1).join("/")}` || "/";
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }

  requestHeaders.set("x-site-locale", defaultLocale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next|monitoring|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|gif|svg|ico|pdf|txt)$).*)"],
};
