import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { Container } from "@/app/components/system/Container";
import { SectionIntro } from "@/app/components/system/SectionIntro";
import { PostList } from "@/app/components/blog/PostList";
import { getPublishedPosts } from "@/app/lib/blog";
import { localeHref, type Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/getDictionary";
import { SpaceBackdrop } from "@/app/components/system/SpaceBackdrop";

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
      <SpaceBackdrop variant="writing" />
      <Container>
        <SectionIntro
          label={copy.label}
          title={copy.title}
          description={copy.intro}
          id="latest-writing-heading"
          align="split"
        />
        <PostList
          posts={posts}
          copy={blogCopy}
          locale={locale}
          headingLevel={3}
          className="writing-section__list motion-section-content"
        />
        <Link href={localeHref(locale, "/blog")} className="text-action">
          {copy.allWriting}
          <HiArrowRight aria-hidden="true" />
        </Link>
      </Container>
    </section>
  );
}
