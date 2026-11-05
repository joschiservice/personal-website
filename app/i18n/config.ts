const locales = ["en", "ja"] as const;

export type Locale = (typeof locales)[number];

export const localeNames = {
  en: "English",
  ja: "日本語",
} satisfies Record<Locale, string>;

export const defaultLocale: Locale = "en";

/**
 * Locales the site currently serves. Japanese is switched off for now; add "ja"
 * back here to bring back the /ja pages, hreflang links and language switcher.
 * <html lang> in app/layout.tsx and app/not-found.tsx would still be English.
 */
export const enabledLocales: readonly Locale[] = ["en"];

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function isEnabledLocale(value: string | null | undefined): value is Locale {
  return enabledLocales.includes(value as Locale);
}

/** Pages under app/[locale]. Add new pages here, so a mistyped internal link fails type checking. */
export type LocalePath =
  | "/"
  | `/#${string}`
  | "/blog"
  | `/blog/${string}`
  | "/contact"
  | "/imprint";

/** Params for generateStaticParams in every route under app/[locale]. */
export function localeStaticParams() {
  return enabledLocales.map((locale) => ({ locale }));
}

/** Adds the locale to a path only known at runtime. Use localeHref for links written in code. */
export function withLocale(locale: Locale, path: string) {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function localeHref(locale: Locale, href: LocalePath) {
  return withLocale(locale, href);
}

export function pathWithoutLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (isLocale(segments[0])) segments.shift();
  return `/${segments.join("/")}`;
}

export function localeAlternates(
  href: LocalePath
): Partial<Record<Locale, string>> & { "x-default": string } {
  const localized = Object.fromEntries(
    enabledLocales.map((locale) => [locale, localeHref(locale, href)])
  ) as Partial<Record<Locale, string>>;

  return { ...localized, "x-default": localeHref(defaultLocale, href) };
}
