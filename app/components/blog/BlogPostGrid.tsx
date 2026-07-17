import type { BlogPost } from "@/app/lib/blog";
import { BlogCard } from "./BlogCard";
import type { Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/getDictionary";

export function BlogPostGrid({
  posts,
  copy,
  locale = "en",
}: {
  posts: BlogPost[];
  copy: Dictionary["blog"];
  locale?: Locale;
}) {
  if (posts.length === 0) return null;

  if (posts.length === 1) {
    return <BlogCard post={posts[0]} variant="feature" priority locale={locale} copy={copy} />;
  }

  if (posts.length === 2) {
    return (
      <div className="blog-grid blog-grid--pair">
        {posts.map((post, index) => (
          <BlogCard
            key={post.slug}
            post={post}
            priority={index === 0}
            locale={locale}
            copy={copy}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="blog-grid blog-grid--editorial">
      {posts.map((post, index) => (
        <BlogCard
          key={post.slug}
          post={post}
          variant={index === 0 ? "feature" : "standard"}
          priority={index === 0}
          locale={locale}
          copy={copy}
        />
      ))}
    </div>
  );
}
