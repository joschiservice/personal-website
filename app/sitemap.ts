import type { MetadataRoute } from "next";
import {
  localeAlternates,
  localeHref,
  locales,
} from "@/app/i18n/config";
import { getPublishedPosts } from "@/app/lib/blog";
import { siteConfig } from "@/app/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPageDefinitions = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/imprint", changeFrequency: "yearly", priority: 0.2 },
  ] as const;
  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPageDefinitions.map(({ path, ...page }) => ({
      url: new URL(localeHref(locale, path), siteConfig.url).toString(),
      ...page,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(localeAlternates(path)).map(([language, href]) => [
            language,
            new URL(href, siteConfig.url).toString(),
          ])
        ),
      },
    }))
  );

  const posts: MetadataRoute.Sitemap = getPublishedPosts().map((post) => ({
    url: new URL(post.url, siteConfig.url).toString(),
    lastModified: new Date(`${post.updatedAt ?? post.publishedAt}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...posts];
}
