import { notFound } from "next/navigation";
import { isEnabledLocale, type Locale } from "./config";

type StructuralLiteral =
  | "experience"
  | "project"
  | "certificate"
  | "primary"
  | "secondary"
  | "rocket"
  | "car"
  | "cog"
  | "coffee";

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
