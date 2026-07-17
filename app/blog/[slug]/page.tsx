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
import { createMdxComponents } from "@/app/components/blog/MdxComponents";
import { TableOfContents } from "@/app/components/blog/TableOfContents";
import { ZoomableBlogImage } from "@/app/components/blog/ZoomableBlogImage";
import { Container } from "@/app/components/system/Container";
import {
  formatBlogDate,
  getDevelopmentDrafts,
  getPostBySlug,
  getPostNavigation,
  getPublishedPosts,
  getRelatedPosts,
} from "@/app/lib/blog";
import { siteConfig } from "@/app/lib/site";
import { getRequestDictionary } from "@/app/i18n/getDictionary";
import { localeHref } from "@/app/i18n/config";

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
  const { locale } = await getRequestDictionary();
  const post = getPostBySlug(slug);
  if (!post) return {};

  const cover = new URL(post.cover.src, siteConfig.url).toString();

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: localeHref(locale, post.url),
    },
    robots: post.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url: localeHref(locale, post.url),
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
  const { locale, dictionary } = await getRequestDictionary();
  const copy = dictionary.blog;
  const mdxComponents = createMdxComponents(copy);
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const readingTimeLabel = locale === "ja"
    ? `${post.readingTimeMinutes}${copy.minRead}`
    : `${post.readingTimeMinutes} ${copy.minRead}`;

  const relatedPosts = post.draft ? [] : getRelatedPosts(post);
  const { newer, older } = post.draft
    ? { newer: undefined, older: undefined }
    : getPostNavigation(post);
  const canonicalUrl = new URL(localeHref(locale, post.url), siteConfig.url).toString();
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
      <div className="blog-reading-progress" aria-hidden="true" />
      {!post.draft ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}

      <article>
        <section className="blog-article-hero">
          <div className="blog-article-hero__art" aria-hidden="true">
            <span className="blog-article-hero__arc blog-article-hero__arc--blue" />
            <span className="blog-article-hero__arc blog-article-hero__arc--warm" />
            <span className="blog-article-hero__orbit" />
          </div>

          <Container as="header" className="blog-article-header">
            <Link href={localeHref(locale, "/blog")} className="blog-back-link">
              <HiArrowLeft aria-hidden="true" />
              {copy.allWriting}
            </Link>

            {post.draft ? <span className="blog-draft-badge">{copy.draftPreview}</span> : null}
            <div className="blog-article-tags" aria-label={copy.tags}>
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <h1>{post.title}</h1>
            <p className="blog-article-description">{post.description}</p>
            <div className="blog-article-meta">
              <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt, locale)}</time>
              <span aria-hidden="true">/</span>
              <span>
                <HiOutlineClock aria-hidden="true" />
                {readingTimeLabel}
              </span>
              <CopyLinkButton
                label={copy.copyLink}
                copiedLabel={copy.copied}
                failedLabel={copy.copyFailed}
              />
            </div>
          </Container>
        </section>

        <Container className="blog-cover">
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
            enlargeLabel={copy.enlargeImage}
            fullscreenLabel={copy.fullscreenImage}
            closeLabel={copy.closeFullscreenImage}
          />
        </Container>

        <section className="blog-article-body">
          <Container className="blog-reader">
            <TableOfContents toc={post.toc} label={copy.onThisPage} ariaLabel={copy.tableOfContents} />
            <div className="blog-prose">
              <MDXContent code={post.compiledContent} components={mdxComponents} />
            </div>
          </Container>
        </section>

        {newer || older ? (
          <nav className="site-container blog-post-navigation" aria-label={copy.moreArticles}>
            {newer ? (
              <Link href={localeHref(locale, newer.url)} className="blog-post-nav-link blog-post-nav-link--newer">
                <HiArrowLeft aria-hidden="true" />
                <span><small>{copy.newer}</small>{newer.title}</span>
              </Link>
            ) : <span />}
            {older ? (
              <Link href={localeHref(locale, older.url)} className="blog-post-nav-link blog-post-nav-link--older">
                <span><small>{copy.older}</small>{older.title}</span>
                <HiArrowRight aria-hidden="true" />
              </Link>
            ) : null}
          </nav>
        ) : null}

        {relatedPosts.length > 0 ? (
          <section className="site-container blog-related" aria-labelledby="related-writing-title">
            <div className="blog-related-heading">
              <span>{copy.keepReading}</span>
              <h2 id="related-writing-title">{copy.related}</h2>
            </div>
            <div className="blog-grid blog-grid--pair">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.slug}
                  post={relatedPost}
                  variant="compact"
                  locale={locale}
                  copy={copy}
                />
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </div>
  );
}
