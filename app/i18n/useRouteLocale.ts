import { useParams } from "next/navigation";
import { defaultLocale, isEnabledLocale, type Locale } from "./config";

/** The locale for 404 and error pages, which don't receive params as props. */
export function useRouteLocale(): Locale {
  const locale = useParams<{ locale?: string }>()?.locale;
  return isEnabledLocale(locale) ? locale : defaultLocale;
}
