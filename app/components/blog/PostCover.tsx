import Image from "next/image";
import type { BlogPost } from "@/app/lib/blog";

/**
 * A post's cover image, or for posts without one a quiet tile tinted per post,
 * so lists keep their rhythm either way.
 */
export function PostCover({
  post,
  sizes,
  preload = false,
}: {
  post: BlogPost;
  sizes: string;
  preload?: boolean;
}) {
  if (post.cover) {
    return (
      <Image
        src={post.cover.src}
        alt=""
        fill
        preload={preload}
        sizes={sizes}
        className="pointer-events-none object-cover"
      />
    );
  }

  return (
    <span
      className="post-cover-fallback"
      style={{ "--cover-hue": hueFor(post.slug) } as React.CSSProperties}
      aria-hidden="true"
    >
      <span>{post.tags[0]}</span>
    </span>
  );
}

function hueFor(slug: string) {
  let hash = 0;
  for (const character of slug) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  // Stay in the site's blue-to-violet range.
  return 200 + (hash % 70);
}
