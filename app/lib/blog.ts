import { allPosts } from "content-collections";
import type { BlogPost } from "@/content-types";

export type { BlogPost } from "@/content-types";

const posts = allPosts as BlogPost[];
const blogDateFormatters = new Map<string, Intl.DateTimeFormat>();

function comparePosts(left: BlogPost, right: BlogPost) {
  const byDate = right.publishedAt.localeCompare(left.publishedAt);
  return byDate || left.slug.localeCompare(right.slug);
}

export function getPublishedPosts() {
  return posts.filter((post) => !post.draft).toSorted(comparePosts);
}

export function getDevelopmentDrafts() {
  if (process.env.NODE_ENV !== "development") return [];
  return posts.filter((post) => post.draft).toSorted(comparePosts);
}

export function getPostBySlug(slug: string) {
  const post = posts.find((candidate) => candidate.slug === slug);
  if (!post) return undefined;
  if (post.draft && process.env.NODE_ENV !== "development") return undefined;
  return post;
}

export function getRelatedPosts(post: BlogPost, limit = 2) {
  const tags = new Set(post.tags);

  return getPublishedPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      sharedTags: candidate.tags.filter((tag) => tags.has(tag)).length,
    }))
    .filter(({ sharedTags }) => sharedTags > 0)
    .toSorted(
      (left, right) =>
        right.sharedTags - left.sharedTags ||
        comparePosts(left.candidate, right.candidate)
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function getPostNavigation(post: BlogPost) {
  const posts = getPublishedPosts();
  const index = posts.findIndex((candidate) => candidate.slug === post.slug);

  if (index === -1) return { newer: undefined, older: undefined };

  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}

export function formatBlogDate(date: string, locale = "en") {
  let formatter = blogDateFormatters.get(locale);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
    blogDateFormatters.set(locale, formatter);
  }

  return formatter.format(new Date(`${date}T00:00:00.000Z`));
}
