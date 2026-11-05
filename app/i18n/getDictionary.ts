import { notFound } from "next/navigation";
import { defaultLocale, isEnabledLocale, type Locale } from "./config";

type StructuralLiteral =
  | "experience"
  | "project"
  | "certificate"
  | "primary"
  | "secondary";

type WidenDictionary<T> = T extends StructuralLiteral
  ? T
  : T extends string
    ? string
  : T extends (...args: infer Args) => infer Result
    ? (...args: Args) => Result
  : T extends Date
    ? Date
  : T extends readonly (infer Item)[]
    ? readonly WidenDictionary<Item>[]
    : T extends object
      ? { [Key in keyof T]: WidenDictionary<T[Key]> }
      : T;

export type Dictionary = WidenDictionary<
  typeof import("./dictionaries/en").default
>;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((module) => module.default),
  ja: () => import("./dictionaries/ja").then((module) => module.default),
};

/** Params of every page under app/[locale]. */
export interface LocaleParams {
  params: Promise<{ locale: string }>;
}

export async function getLocaleDictionary({ params }: LocaleParams) {
  const { locale } = await params;
  if (!isEnabledLocale(locale)) notFound();

  return { locale, dictionary: await dictionaries[locale]() };
}

/**
 * For the root layout. URLs the proxy skips, like /foo.png, reach it with an invalid
 * locale. A not-found thrown here would skip not-found.tsx, which renders inside this
 * layout, so it falls back to the default locale and lets the page throw instead.
 */
export async function getLayoutDictionary({ params }: LocaleParams) {
  const { locale: requested } = await params;
  const locale = isEnabledLocale(requested) ? requested : defaultLocale;

  return { locale, dictionary: await dictionaries[locale]() };
}
