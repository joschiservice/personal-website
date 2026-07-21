import { getPublishedPosts } from "@/app/lib/blog";
import { buildRssFeed } from "@/app/lib/rss";

export const dynamic = "force-static";

export function GET() {
  const xml = buildRssFeed(getPublishedPosts());

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
