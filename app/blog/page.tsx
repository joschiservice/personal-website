import type { Metadata } from "next";
import Link from "next/link";
import { FaRss } from "react-icons/fa";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BlogPostGrid } from "@/app/components/blog/BlogPostGrid";
import { getDevelopmentDrafts, getPublishedPosts } from "@/app/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from Joschua Haß on software engineering, product craft, and building reliable systems.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/blog/rss.xml",
    },
  },
  openGraph: {
    title: "Blog · Joschua Haß",
    description:
      "Notes on software engineering, product craft, and building reliable systems.",
    url: "/blog",
  },
};

export default function BlogPage() {
  const posts = getPublishedPosts();
  const drafts = getDevelopmentDrafts();

  return (
    <div className="blog-page-shell">
      <div className="blog-ambient" aria-hidden="true" />
      <section className="blog-index-hero">
        <div className="container relative z-10 mx-auto max-w-screen-lg px-4 sm:px-6 md:px-8">
          <header className="blog-index-header">
            <div className="blog-index-kicker">
              <HiOutlinePencilSquare aria-hidden="true" />
              Field notes
            </div>
            <h1>
              Ideas, tradeoffs, and things <span>worth writing down.</span>
            </h1>
            <p>
              Notes on building thoughtful products, untangling technical systems,
              and what I learn along the way.
            </p>
            <Link href="/blog/rss.xml" className="blog-rss-link">
              <FaRss aria-hidden="true" />
              Follow via RSS
            </Link>
          </header>
        </div>
      </section>

      <div className="blog-index-content container relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6 md:px-8">

        {posts.length > 0 ? (
          <BlogPostGrid posts={posts} />
        ) : (
          <section className="blog-empty-state" aria-labelledby="blog-empty-title">
            <HiOutlinePencilSquare className="blog-empty-icon" aria-hidden="true" />
            <div>
              <p className="blog-empty-label">First dispatch pending</p>
              <h2 id="blog-empty-title">The notebook is open.</h2>
              <p>
                I am shaping the first few pieces now. In the meantime, the rest
                of the site has plenty of projects and stories to explore.
              </p>
              <Link href="/#experience">Explore my work</Link>
            </div>
          </section>
        )}

        {drafts.length > 0 ? (
          <section className="blog-drafts" aria-labelledby="blog-drafts-title">
            <div className="blog-drafts-heading">
              <div>
                <span>Local development only</span>
                <h2 id="blog-drafts-title">Draft previews</h2>
              </div>
              <p>These entries are never included in a production build.</p>
            </div>
            <BlogPostGrid posts={drafts} />
          </section>
        ) : null}
      </div>
    </div>
  );
}
