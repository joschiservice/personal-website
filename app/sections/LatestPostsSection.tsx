import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { Container } from "@/app/components/system/Container";
import { SectionIntro } from "@/app/components/system/SectionIntro";
import { BlogCard } from "@/app/components/blog/BlogCard";
import { getPublishedPosts } from "@/app/lib/blog";
import { localeHref, type Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/getDictionary";

export function LatestPostsSection({
  copy,
  blogCopy,
  locale,
}: {
  copy: Dictionary["writing"];
  blogCopy: Dictionary["blog"];
  locale: Locale;
}) {
  const posts = getPublishedPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section
      id="latest-writing"
      className="editorial-section writing-section"
      aria-labelledby="latest-writing-heading"
    >
      <Container>
        <SectionIntro
          number="02"
          label={copy.label}
          title={copy.title}
          description={copy.intro}
          id="latest-writing-heading"
          align="split"
        />
        <div className="writing-section__grid motion-section-content">
          {posts.map((post, index) => (
            <BlogCard
              key={post.slug}
              post={post}
              variant={index === 0 ? "feature" : "standard"}
              locale={locale}
              copy={blogCopy}
            />
          ))}
        </div>
        <Link href={localeHref(locale, "/blog")} className="text-action">
          {copy.allWriting}
          <HiArrowRight aria-hidden="true" />
        </Link>
      </Container>
    </section>
  );
}
