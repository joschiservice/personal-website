import type { Locale } from "./config";

/**
 * Text for the error page. It's a client component, so this is kept apart from
 * the dictionaries to avoid sending every translation to the browser.
 */
export const errorCopy = {
  en: {
    label: "Error",
    title: "Something went wrong on this page.",
    retry: "Try again",
  },
  ja: {
    label: "エラー",
    title: "このページで問題が発生しました。",
    retry: "もう一度試す",
  },
} satisfies Record<Locale, unknown>;
