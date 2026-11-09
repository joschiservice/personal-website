import Link from "next/link";
import { ViewTransition } from "react";
import { PostCover } from "@/app/components/blog/PostCover";
import { postCoverTransitionName } from "@/app/components/system/PageTransition";
import { formatBlogDate, type BlogPost } from "@/app/lib/blog";
import { localeHref, type Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/getDictionary";
import styles from "./PostList.module.css";

/** The blog index: one scannable row per post, newest first. */
export function PostList({
  posts,
  copy,
  locale,
  priorityFirst = false,
  headingLevel = 2,
  compact = false,
  className,
}: {
  posts: BlogPost[];
  copy: Dictionary["blog"];
  locale: Locale;
  priorityFirst?: boolean;
  /** Level of each post title, so the list fits under the page's own headings. */
  headingLevel?: 2 | 3;
  /** Tighter rows for showing a few posts inside another page. */
  compact?: boolean;
  className?: string;
}) {
  const Title = headingLevel === 3 ? "h3" : "h2";
  const listClassName = [styles.list, compact && styles.compact, className]
    .filter(Boolean)
    .join(" ");

  return (
    <ol className={listClassName}>
      {posts.map((post, index) => (
        <li key={post.slug} className={styles.row}>
          <Link
            href={localeHref(locale, post.url)}
            className={styles.rowLink}
            aria-label={copy.readArticle(post.title)}
            transitionTypes={["nav-forward"]}
          >
            <p className={styles.rowMeta}>
              <time dateTime={post.publishedAt}>
                {formatBlogDate(post.publishedAt, locale)}
              </time>
              <span>{copy.readingTime(post.readingTimeMinutes)}</span>
            </p>

            <div>
              <Title className={styles.rowTitle}>{post.title}</Title>
              <p className={styles.rowDescription}>{post.description}</p>
              <ul className={styles.rowTags} aria-label={copy.tags}>
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
                className={styles.rowCover}
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
