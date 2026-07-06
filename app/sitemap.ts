import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/app/lib/blog";
import { siteConfig } from "@/app/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/imprint`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const posts: MetadataRoute.Sitemap = getPublishedPosts().map((post) => ({
    url: new URL(post.url, siteConfig.url).toString(),
    lastModified: new Date(`${post.updatedAt ?? post.publishedAt}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...posts];
}
