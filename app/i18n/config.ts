export const locales = ["en", "ja"] as const;

export type Locale = (typeof locales)[number];

export const localeNames = {
  en: "English",
  ja: "日本語",
} satisfies Record<Locale, string>;

export const defaultLocale: Locale = "en";

/**
 * Locales the site currently serves. Japanese is switched off for now; add "ja"
 * back here to bring back the /ja pages, hreflang links and language switcher.
 */
export const enabledLocales: readonly Locale[] = ["en"];

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function isEnabledLocale(value: string | null | undefined): value is Locale {
  return enabledLocales.includes(value as Locale);
}

export function localeHref(locale: Locale, href: string) {
  if (locale === defaultLocale || !href.startsWith("/")) return href;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

export function pathWithoutLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (isLocale(segments[0])) segments.shift();
  return `/${segments.join("/")}`;
}

export function localeAlternates(
  href: string
): Partial<Record<Locale, string>> & { "x-default": string } {
  const localized = Object.fromEntries(
    enabledLocales.map((locale) => [locale, localeHref(locale, href)])
  ) as Partial<Record<Locale, string>>;

  return { ...localized, "x-default": localeHref(defaultLocale, href) };
}
