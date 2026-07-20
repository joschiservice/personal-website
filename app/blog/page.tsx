import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { BlogPostGrid } from "@/app/components/blog/BlogPostGrid";
import { Container } from "@/app/components/system/Container";
import { getDevelopmentDrafts, getPublishedPosts } from "@/app/lib/blog";
import { localeAlternates, localeHref } from "@/app/i18n/config";
import { getRequestDictionary } from "@/app/i18n/getDictionary";
import { siteConfig } from "@/app/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dictionary } = await getRequestDictionary();
  const canonical = localeHref(locale, "/blog");
  return {
    title: dictionary.blog.metadataTitle,
    description: dictionary.blog.metadataDescription,
    alternates: {
      canonical,
      languages: localeAlternates("/blog"),
      types: { "application/rss+xml": "/blog/rss.xml" },
    },
    openGraph: {
      title: `${dictionary.blog.metadataTitle} · ${siteConfig.name}`,
      description: dictionary.blog.metadataDescription,
      url: canonical,
    },
  };
}

export default async function BlogPage() {
  const { locale, dictionary } = await getRequestDictionary();
  const copy = dictionary.blog;
  const posts = getPublishedPosts();
  const drafts = getDevelopmentDrafts();

  return (
    <div className="journal-page">
      <section className="journal-hero">
        <div className="journal-hero__art" aria-hidden="true" />
        <Container>
          <p className="system-label">{copy.label}</p>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
          <a href="/blog/rss.xml" className="text-action">
            {copy.rss}
            <HiArrowRight aria-hidden="true" />
          </a>
        </Container>
      </section>

      <section className="journal-index editorial-section">
        <Container>
          {posts.length > 0 ? (
            <BlogPostGrid posts={posts} locale={locale} copy={copy} />
          ) : (
            <div className="journal-empty">
              <p className="system-label">{copy.emptyLabel}</p>
              <h2>{copy.emptyTitle}</h2>
              <p>{copy.emptyBody}</p>
              <Link href={localeHref(locale, "/#experience")} className="text-action">
                {copy.exploreWork}
                <HiArrowRight aria-hidden="true" />
              </Link>
            </div>
          )}

          {drafts.length > 0 ? (
            <section className="journal-drafts" aria-labelledby="blog-drafts-title">
              <div>
                <p className="system-label">{copy.localOnly}</p>
                <h2 id="blog-drafts-title">{copy.drafts}</h2>
                <p>{copy.draftsBody}</p>
              </div>
              <BlogPostGrid posts={drafts} locale={locale} copy={copy} />
            </section>
          ) : null}
        </Container>
      </section>
    </div>
  );
}
