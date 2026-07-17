import Image from "next/image";
import Link from "next/link";
import { HiArrowUpRight, HiOutlineClock } from "react-icons/hi2";
import { formatBlogDate, type BlogPost } from "@/app/lib/blog";
import { localeHref, type Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/getDictionary";

interface BlogCardProps {
  post: BlogPost;
  variant?: "feature" | "standard" | "compact";
  priority?: boolean;
  locale?: Locale;
  copy: Dictionary["blog"];
}

export function BlogCard({
  post,
  variant = "standard",
  priority = false,
  locale = "en",
  copy,
}: BlogCardProps) {
  const readingTimeLabel = locale === "ja"
    ? `${post.readingTimeMinutes}${copy.minRead}`
    : `${post.readingTimeMinutes} ${copy.minRead}`;

  return (
    <article className={`blog-card blog-card--${variant}`}>
      <Link
        href={localeHref(locale, post.url)}
        className="blog-card-link"
        aria-label={locale === "ja" ? `${post.title}を読む` : `${copy.read} ${post.title}`}
      >
        <div className="blog-card-image relative">
          <Image
            src={post.cover.src}
            alt=""
            fill
            preload={priority}
            sizes={
              variant === "feature"
                ? "(max-width: 768px) 100vw, 1200px"
                : "(max-width: 768px) 100vw, 600px"
            }
            className="pointer-events-none object-cover"
          />
          <div className="blog-card-image-wash" aria-hidden="true" />
        </div>
        <div className="blog-card-content">
          <div className="blog-card-meta">
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt, locale)}</time>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <HiOutlineClock aria-hidden="true" />
              {readingTimeLabel}
            </span>
          </div>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <div className="blog-card-footer">
            <div className="blog-card-tags" aria-label={copy.tags}>
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <HiArrowUpRight className="blog-card-arrow" aria-hidden="true" />
          </div>
        </div>
      </Link>
    </article>
  );
}
