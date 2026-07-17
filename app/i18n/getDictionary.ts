import { headers } from "next/headers";
import { cache } from "react";
import { defaultLocale, isLocale, type Locale } from "./config";

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

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export async function getRequestLocale(): Promise<Locale> {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-site-locale");
  return isLocale(locale) ? locale : defaultLocale;
}

export const getRequestDictionary = cache(async function getRequestDictionary() {
  const locale = await getRequestLocale();
  const dictionary = await getDictionary(locale);
  return { locale, dictionary };
});
