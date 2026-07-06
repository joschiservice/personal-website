import Link from "next/link";
import { HiArrowRight, HiOutlinePencilSquare } from "react-icons/hi2";
import { SectionHeading } from "@/app/components/SectionHeading";
import { BlogCard } from "@/app/components/blog/BlogCard";
import { getPublishedPosts } from "@/app/lib/blog";

export function LatestPostsSection() {
  const posts = getPublishedPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section
      id="latest-writing"
      aria-labelledby="latest-writing-heading"
      className="latest-writing-section"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <SectionHeading
          title="Latest Writing"
          icon={HiOutlinePencilSquare}
          gradient="from-cyan-500/50 via-blue-400/50 to-violet-400/50"
          id="latest-writing-heading"
        />
        <p className="latest-writing-intro">
          Notes on building thoughtful products, navigating technical tradeoffs,
          and the occasional rabbit hole worth sharing.
        </p>

        <div className={`latest-writing-grid latest-writing-grid--${posts.length}`}>
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              variant={posts.length === 1 ? "feature" : "standard"}
            />
          ))}
        </div>

        <div className="latest-writing-action">
          <Link href="/blog">
            Explore all writing
            <HiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
