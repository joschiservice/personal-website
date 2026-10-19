import Link from "next/link";
import { ViewTransition } from "react";
import { PostCover } from "@/app/components/blog/PostCover";
import { postCoverTransitionName } from "@/app/components/system/PageTransition";
import { formatBlogDate, type BlogPost } from "@/app/lib/blog";
import { localeHref, type Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/getDictionary";

/** The blog index: one scannable row per post, newest first. */
export function PostList({
  posts,
  copy,
  locale,
  priorityFirst = false,
  headingLevel = 2,
  className,
}: {
  posts: BlogPost[];
  copy: Dictionary["blog"];
  locale: Locale;
  priorityFirst?: boolean;
  /** Level of each post title, so the list fits under the page's own headings. */
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const Title = headingLevel === 3 ? "h3" : "h2";

  return (
    <ol className={className ? `post-list ${className}` : "post-list"}>
      {posts.map((post, index) => (
        <li key={post.slug} className="post-row">
          <Link
            href={localeHref(locale, post.url)}
            className="post-row__link"
            aria-label={copy.readArticle(post.title)}
            transitionTypes={["nav-forward"]}
          >
            <p className="post-row__meta">
              <time dateTime={post.publishedAt}>
                {formatBlogDate(post.publishedAt, locale)}
              </time>
              <span>{copy.readingTime(post.readingTimeMinutes)}</span>
            </p>

            <div className="post-row__text">
              <Title className="post-row__title">{post.title}</Title>
              <p className="post-row__description">{post.description}</p>
              <ul className="post-row__tags" aria-label={copy.tags}>
                {post.tags.slice(0, 3).map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>

            <ViewTransition
              name={postCoverTransitionName(post.slug)}
              share="morph"
              default="none"
            >
              <div
                className="post-row__cover"
                data-fallback={post.cover ? undefined : "true"}
              >
                <PostCover
                  post={post}
                  preload={priorityFirst && index === 0}
                  sizes="(max-width: 760px) 100vw, 18rem"
                />
              </div>
            </ViewTransition>
          </Link>
        </li>
      ))}
    </ol>
  );
}
