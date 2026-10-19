import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { MDXContent } from "@content-collections/mdx/react";
import {
  HiArrowLeft,
  HiArrowRight,
  HiOutlineClock,
} from "react-icons/hi2";
import { ArticleEnd } from "@/app/components/blog/ArticleEnd";
import { BlogCard } from "@/app/components/blog/BlogCard";
import { CopyLinkButton } from "@/app/components/blog/CopyLinkButton";
import { createMdxComponents } from "@/app/components/blog/MdxComponents";
import { TableOfContents } from "@/app/components/blog/TableOfContents";
import { ZoomableBlogImage } from "@/app/components/blog/ZoomableBlogImage";
import { Container } from "@/app/components/system/Container";
import {
  PageTransition,
  postCoverTransitionName,
} from "@/app/components/system/PageTransition";
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
import { SpaceBackdrop } from "@/app/components/system/SpaceBackdrop";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

const TERMINAL_TITLE_PUNCTUATION = /([.!?…。！？]+)$/u;

function renderArticleTitle(title: string) {
  const punctuationMatch = title.match(TERMINAL_TITLE_PUNCTUATION);

  if (!punctuationMatch) {
    return (
      <>
        {title}
        <span className="blog-article-title-punctuation" aria-hidden="true">.</span>
      </>
    );
  }

  const punctuation = punctuationMatch[0];

  return (
    <>
      {title.slice(0, -punctuation.length)}
      <span className="blog-article-title-punctuation">{punctuation}</span>
    </>
  );
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
  const { locale } = await getRequestDictionary();

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    alternates: {
      canonical: localeHref(locale, post.url),
      types: { "application/rss+xml": "/blog/rss.xml" },
    },
    robots: post.draft ? { index: false, follow: false } : undefined,
    // The share image comes from ./opengraph-image.tsx.
    openGraph: {
      type: "article",
      siteName: siteConfig.name,
      locale: "en_US",
      url: localeHref(locale, post.url),
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [siteConfig.url],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const { locale, dictionary } = await getRequestDictionary();
  const copy = dictionary.blog;
  const mdxComponents = createMdxComponents(copy);
  const { cover } = post;
  const readingTimeLabel = locale === "ja"
    ? `${post.readingTimeMinutes}${copy.minRead}`
    : `${post.readingTimeMinutes} ${copy.minRead}`;

  const relatedPosts = post.draft ? [] : getRelatedPosts(post);
  const { newer, older } = post.draft
    ? { newer: undefined, older: undefined }
    : getPostNavigation(post);
  const canonicalUrl = new URL(localeHref(locale, post.url), siteConfig.url).toString();
  const authorProfiles = [
    process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
    process.env.NEXT_PUBLIC_SOCIAL_GITHUB,
    process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
  ].filter((profile): profile is string => Boolean(profile));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: canonicalUrl,
    image: [
      new URL(`${post.url}/opengraph-image`, siteConfig.url).toString(),
      ...(post.cover ? [new URL(post.cover.src, siteConfig.url).toString()] : []),
    ],
    inLanguage: locale,
    keywords: post.tags.join(", "),
    timeRequired: `PT${post.readingTimeMinutes}M`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
      sameAs: authorProfiles,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    isPartOf: {
      "@type": "Blog",
      name: `${siteConfig.name} · ${copy.metadataTitle}`,
      url: new URL("/blog", siteConfig.url).toString(),
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteConfig.name, item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: copy.metadataTitle,
        item: new URL("/blog", siteConfig.url).toString(),
      },
      { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
    ],
  };

  return (
    <PageTransition>
      <div className="blog-article-shell">
        <div className="blog-reading-progress" aria-hidden="true" />
        {!post.draft ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([jsonLd, breadcrumbJsonLd]).replace(/</g, "\\u003c"),
            }}
          />
        ) : null}

        <article>
          <section className="blog-article-hero">
            <div className="blog-article-hero__art" aria-hidden="true" />
            <SpaceBackdrop variant="article" />

            <Container as="header" className="blog-article-header">
              <Link
                href={localeHref(locale, "/blog")}
                className="blog-back-link"
                transitionTypes={["nav-back"]}
              >
                <HiArrowLeft aria-hidden="true" />
                {copy.allWriting}
              </Link>

              {post.draft ? <span className="blog-draft-badge">{copy.draftPreview}</span> : null}
              <div className="blog-article-tags" aria-label={copy.tags}>
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <h1>{renderArticleTitle(post.title)}</h1>
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

          {cover ? (
            <Container className="blog-cover">
              <ViewTransition
                name={postCoverTransitionName(post.slug)}
                share="morph"
                default="none"
              >
                <ZoomableBlogImage
                  src={cover.src}
                  alt={cover.alt}
                  width={1600}
                  height={900}
                  preload
                  sizes="(max-width: 768px) 100vw, 760px"
                  className="pointer-events-none h-auto w-full object-cover"
                  style={{ width: "100%", height: "auto" }}
                  frameClassName="blog-cover-frame"
                  aspectRatio={16 / 9}
                  enlargeLabel={copy.enlargeImage}
                  fullscreenLabel={copy.fullscreenImage}
                  closeLabel={copy.closeFullscreenImage}
                />
              </ViewTransition>
            </Container>
          ) : null}

          <section className="blog-article-body">
            <Container className="blog-reader">
              <TableOfContents toc={post.toc} label={copy.onThisPage} ariaLabel={copy.tableOfContents} />
              <div className="blog-prose">
                <MDXContent code={post.compiledContent} components={mdxComponents} />
              </div>
              <ArticleEnd
                title={post.title}
                url={canonicalUrl}
                copy={copy}
                locale={locale}
                newTabLabel={dictionary.accessibility.opensNewTab}
              />
            </Container>
          </section>

          {newer || older ? (
            <nav className="site-container blog-post-navigation" aria-label={copy.moreArticles}>
              {newer ? (
                <Link
                  href={localeHref(locale, newer.url)}
                  className="blog-post-nav-link blog-post-nav-link--newer"
                  transitionTypes={["nav-back"]}
                >
                  <HiArrowLeft aria-hidden="true" />
                  <span><small>{copy.newer}</small>{newer.title}</span>
                </Link>
              ) : <span />}
              {older ? (
                <Link
                  href={localeHref(locale, older.url)}
                  className="blog-post-nav-link blog-post-nav-link--older"
                  transitionTypes={["nav-forward"]}
                >
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
    </PageTransition>
  );
}
