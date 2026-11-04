import { enabledLocales } from "@/app/i18n/config";
import en from "@/app/i18n/dictionaries/en";
import { renderOgImage } from "@/app/lib/og";
import { siteConfig } from "@/app/lib/site";

export const alt = `${en.blog.title} · ${siteConfig.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return enabledLocales.map((locale) => ({ locale }));
}

export default function Image() {
  return renderOgImage({
    eyebrow: en.blog.title,
    title: en.blog.intro,
  });
}
