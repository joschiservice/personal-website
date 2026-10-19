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
          <dc:creator>${escapeXml(siteConfig.name)}</dc:creator>
          <pubDate>${new Date(`${post.publishedAt}T00:00:00.000Z`).toUTCString()}</pubDate>
          ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("")}
        </item>`;
    })
    .join("");

  const feedUrl = `${siteConfig.url}/blog/rss.xml`;
  const newest = posts.reduce<string | undefined>(
    (latest, post) => (!latest || post.publishedAt > latest ? post.publishedAt : latest),
    undefined
  );

  return `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <channel>
        <title>${escapeXml(siteConfig.name)} — Blog</title>
        <link>${escapeXml(`${siteConfig.url}/blog`)}</link>
        <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
        <description>${escapeXml("Whatever I’ve been thinking about, learning or building lately.")}</description>
        <language>en</language>${newest ? `
        <lastBuildDate>${new Date(`${newest}T00:00:00.000Z`).toUTCString()}</lastBuildDate>` : ""}
        ${items}
      </channel>
    </rss>`;
}
