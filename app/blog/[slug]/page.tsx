import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import {
  HiArrowLeft,
  HiArrowRight,
  HiOutlineClock,
} from "react-icons/hi2";
import { BlogCard } from "@/app/components/blog/BlogCard";
import { CopyLinkButton } from "@/app/components/blog/CopyLinkButton";
import { mdxComponents } from "@/app/components/blog/MdxComponents";
import { TableOfContents } from "@/app/components/blog/TableOfContents";
import { ZoomableBlogImage } from "@/app/components/blog/ZoomableBlogImage";
import {
  formatBlogDate,
  getDevelopmentDrafts,
  getPostBySlug,
  getPostNavigation,
  getPublishedPosts,
  getRelatedPosts,
} from "@/app/lib/blog";
import { siteConfig } from "@/app/lib/site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [...getPublishedPosts(), ...getDevelopmentDrafts()].map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const cover = new URL(post.cover.src, siteConfig.url).toString();

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: post.url,
    },
    robots: post.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url: post.url,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      images: [{ url: cover, width: 1600, height: 900, alt: post.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [cover],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = post.draft ? [] : getRelatedPosts(post);
  const { newer, older } = post.draft
    ? { newer: undefined, older: undefined }
    : getPostNavigation(post);
  const canonicalUrl = new URL(post.url, siteConfig.url).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: canonicalUrl,
    image: new URL(post.cover.src, siteConfig.url).toString(),
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <div className="blog-article-shell">
      <div className="blog-ambient blog-ambient--article" aria-hidden="true" />
      {!post.draft ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}

      <article className="relative z-10 pb-24 pt-28 sm:pt-36">
        <header className="blog-article-header container mx-auto max-w-screen-lg px-4 sm:px-6 md:px-8">
          <Link href="/blog" className="blog-back-link">
            <HiArrowLeft aria-hidden="true" />
            All writing
          </Link>

          {post.draft ? <span className="blog-draft-badge">Draft preview</span> : null}
          <div className="blog-article-tags" aria-label="Tags">
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <h1>{post.title}</h1>
          <p className="blog-article-description">{post.description}</p>
          <div className="blog-article-meta">
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>
              <HiOutlineClock aria-hidden="true" />
              {post.readingTimeMinutes} min read
            </span>
            <CopyLinkButton />
          </div>
        </header>

        <div className="blog-cover container mx-auto max-w-screen-lg px-4 sm:px-6 md:px-8">
          <ZoomableBlogImage
            src={post.cover.src}
            alt={post.cover.alt}
            width={1600}
            height={900}
            preload
            sizes="(max-width: 768px) 100vw, 1152px"
            className="pointer-events-none h-auto w-full object-cover"
            style={{ width: "100%", height: "auto" }}
            frameClassName="blog-cover-frame"
            aspectRatio={16 / 9}
          />
        </div>

        <div className="blog-reader container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <TableOfContents toc={post.toc} />
          <div className="blog-prose">
            <MDXContent code={post.compiledContent} components={mdxComponents} />
          </div>
        </div>

        {newer || older ? (
          <nav className="blog-post-navigation container mx-auto max-w-4xl px-4 sm:px-6 md:px-8" aria-label="More articles">
            {newer ? (
              <Link href={newer.url} className="blog-post-nav-link blog-post-nav-link--newer">
                <HiArrowLeft aria-hidden="true" />
                <span><small>Newer</small>{newer.title}</span>
              </Link>
            ) : <span />}
            {older ? (
              <Link href={older.url} className="blog-post-nav-link blog-post-nav-link--older">
                <span><small>Older</small>{older.title}</span>
                <HiArrowRight aria-hidden="true" />
              </Link>
            ) : null}
          </nav>
        ) : null}

        {relatedPosts.length > 0 ? (
          <section className="blog-related container mx-auto max-w-6xl px-4 sm:px-6 md:px-8" aria-labelledby="related-writing-title">
            <div className="blog-related-heading">
              <span>Keep reading</span>
              <h2 id="related-writing-title">Related writing</h2>
            </div>
            <div className="blog-grid blog-grid--pair">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} variant="compact" />
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </div>
  );
}
