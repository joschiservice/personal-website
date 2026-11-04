import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  isEnabledLocale,
  isLocale,
  pathWithoutLocale,
} from "@/app/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [requestedLocale] = pathname.split("/").filter(Boolean);
  const url = request.nextUrl.clone();

  if (isLocale(requestedLocale)) {
    if (isEnabledLocale(requestedLocale)) return NextResponse.next();

    // Disabled locales send visitors to the default-language version of the page.
    url.pathname = pathWithoutLocale(pathname);
    return NextResponse.redirect(url, 307);
  }

  // Pages live under app/[locale], so URLs without a locale serve the default one.
  url.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

// cv, sitemap.xml and blog/rss.xml aren't localized, so they live outside app/[locale].
export const config = {
  matcher: ["/((?!_next|monitoring|cv$|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|gif|svg|ico|pdf|txt|xml)$).*)"],
};
