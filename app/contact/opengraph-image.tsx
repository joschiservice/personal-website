import en from "@/app/i18n/dictionaries/en";
import { renderOgImage } from "@/app/lib/og";
import { siteConfig } from "@/app/lib/site";

export const alt = `${en.contact.metadataTitle} · ${siteConfig.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: en.contact.label,
    title: `${en.contact.titleLead} ${en.contact.titleAccent}`,
    description: en.contact.intro,
  });
}
