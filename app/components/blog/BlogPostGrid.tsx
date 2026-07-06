import type { BlogPost } from "@/app/lib/blog";
import { BlogCard } from "./BlogCard";

export function BlogPostGrid({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  if (posts.length === 1) {
    return <BlogCard post={posts[0]} variant="feature" priority />;
  }

  if (posts.length === 2) {
    return (
      <div className="blog-grid blog-grid--pair">
        {posts.map((post, index) => (
          <BlogCard key={post.slug} post={post} priority={index === 0} />
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
        />
      ))}
    </div>
  );
}
