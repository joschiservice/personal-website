import type { Locale } from "./config";

/**
 * Text for 404 and error pages. These render in client components, so it's kept
 * apart from the dictionaries to avoid sending every translation to the browser.
 */
export const statusCopy = {
  en: {
    notFound: {
      label: "404",
      title: "This page doesn’t exist.",
      action: "Back to the homepage",
    },
    error: {
      label: "Error",
      title: "Something went wrong on this page.",
      retry: "Try again",
    },
  },
  ja: {
    notFound: {
      label: "404",
      title: "このページは存在しません。",
      action: "ホームに戻る",
    },
    error: {
      label: "エラー",
      title: "このページで問題が発生しました。",
      retry: "もう一度試す",
    },
  },
} satisfies Record<Locale, unknown>;
