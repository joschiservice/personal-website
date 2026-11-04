import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  isEnabledLocale,
  isLocale,
  LOCALE_HEADER,
  pathWithoutLocale,
} from "@/app/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [requestedLocale] = pathname.split("/").filter(Boolean);
  // Always overwritten, because clients can send this header too.
  const requestHeaders = new Headers(request.headers);

  if (!isLocale(requestedLocale)) {
    requestHeaders.set(LOCALE_HEADER, defaultLocale);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const url = request.nextUrl.clone();
  url.pathname = pathWithoutLocale(pathname);

  // Disabled locales send visitors to the default-language version of the page.
  if (!isEnabledLocale(requestedLocale)) {
    return NextResponse.redirect(url, 307);
  }

  requestHeaders.set(LOCALE_HEADER, requestedLocale);
  return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next|monitoring|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|gif|svg|ico|pdf|txt)$).*)"],
};
