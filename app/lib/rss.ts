import type { BlogPost } from "@/content-types";
import { siteConfig } from "@/app/lib/site";

export type RssPost = Pick<
  BlogPost,
  "title" | "description" | "publishedAt" | "tags" | "url"
>;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function buildRssFeed(posts: readonly RssPost[]) {
  const items = posts
    .toSorted(
      (left, right) =>
        right.publishedAt.localeCompare(left.publishedAt) ||
        left.url.localeCompare(right.url)
    )
    .map((post) => {
      const url = new URL(post.url, siteConfig.url).toString();
      const escapedUrl = escapeXml(url);

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${escapedUrl}</link>
          <guid isPermaLink="true">${escapedUrl}</guid>
          <description>${escapeXml(post.description)}</description>
          <pubDate>${new Date(`${post.publishedAt}T00:00:00.000Z`).toUTCString()}</pubDate>
          ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("")}
        </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(siteConfig.name)} — Blog</title>
        <link>${escapeXml(`${siteConfig.url}/blog`)}</link>
        <description>${escapeXml("Notes on software engineering, product craft, and building reliable systems.")}</description>
        <language>en</language>
        ${items}
      </channel>
    </rss>`;
}
