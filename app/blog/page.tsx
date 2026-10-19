import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowRight, HiOutlineRss } from "react-icons/hi2";
import { PostList } from "@/app/components/blog/PostList";
import { Container } from "@/app/components/system/Container";
import { PageTransition } from "@/app/components/system/PageTransition";
import { getDevelopmentDrafts, getPublishedPosts } from "@/app/lib/blog";
import { localeAlternates, localeHref } from "@/app/i18n/config";
import { getRequestDictionary } from "@/app/i18n/getDictionary";
import { siteConfig } from "@/app/lib/site";
import { SpaceBackdrop } from "@/app/components/system/SpaceBackdrop";

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
      type: "website",
      siteName: siteConfig.name,
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
    <PageTransition>
      <div className="blog-index">
        <div className="blog-index__glow" aria-hidden="true" />
        <SpaceBackdrop variant="blog" />
        <Container className="blog-index__inner">
          <header className="blog-index__header">
            <div>
              <h1>{copy.title}</h1>
              <p>{copy.intro}</p>
            </div>
            <a href="/blog/rss.xml" className="blog-index__rss">
              <HiOutlineRss aria-hidden="true" />
              {copy.rss}
            </a>
          </header>

          {posts.length > 0 ? (
            <PostList posts={posts} locale={locale} copy={copy} priorityFirst />
          ) : (
            <div className="blog-index__empty">
              <h2>{copy.emptyTitle}</h2>
              <p>{copy.emptyBody}</p>
              <Link href={localeHref(locale, "/#experience")} className="text-action">
                {copy.exploreWork}
                <HiArrowRight aria-hidden="true" />
              </Link>
            </div>
          )}

          {drafts.length > 0 ? (
            <section className="blog-index__drafts" aria-labelledby="blog-drafts-title">
              <div className="blog-index__drafts-head">
                <h2 id="blog-drafts-title">{copy.drafts}</h2>
                <p>
                  {copy.localOnly}. {copy.draftsBody}
                </p>
              </div>
              <PostList posts={drafts} locale={locale} copy={copy} priorityFirst={posts.length === 0} />
            </section>
          ) : null}
        </Container>
      </div>
    </PageTransition>
  );
}
