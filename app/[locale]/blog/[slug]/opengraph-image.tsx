import { notFound } from "next/navigation";
import en from "@/app/i18n/dictionaries/en";
import {
  formatBlogDate,
  getDevelopmentDrafts,
  getPostBySlug,
  getPublishedPosts,
} from "@/app/lib/blog";
import { renderOgImage } from "@/app/lib/og";

export const alt = "Blog post · Joschua Haß";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Render every post's image at build time, like the post pages themselves.
export function generateStaticParams() {
  return [...getPublishedPosts(), ...getDevelopmentDrafts()].map((post) => ({
    slug: post.slug,
  }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return renderOgImage({
    eyebrow: post.tags.slice(0, 3).join("  ·  "),
    title: post.title,
    meta: `${formatBlogDate(post.publishedAt, "en")}  ·  ${en.blog.readingTime(post.readingTimeMinutes)}`,
  });
}
