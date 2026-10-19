import Link from "next/link";
import { FaBluesky, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { HiArrowLeft, HiArrowRight, HiOutlineEnvelope } from "react-icons/hi2";
import type { Dictionary } from "@/app/i18n/getDictionary";
import { localeHref, type Locale } from "@/app/i18n/config";
import { siteConfig } from "@/app/lib/site";

/** Closes an article: who wrote it, ways to share it, and the way back. */
export function ArticleEnd({
  title,
  url,
  copy,
  locale,
  newTabLabel,
}: {
  title: string;
  url: string;
  copy: Dictionary["blog"];
  locale: Locale;
  newTabLabel: string;
}) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const shareLinks = [
    {
      platform: "X",
      href: `https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`,
      icon: FaXTwitter,
    },
    {
      platform: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: FaLinkedinIn,
    },
    {
      platform: "Bluesky",
      href: `https://bsky.app/intent/compose?text=${encodeURIComponent(`${title} ${url}`)}`,
      icon: FaBluesky,
    },
  ];

  return (
    <footer className="article-end">
      <div className="article-end__author">
        <span className="article-end__monogram" aria-hidden="true">
          JH
        </span>
        <div>
          <p className="article-end__byline">
            {copy.writtenBy} <strong>{siteConfig.name}</strong>
          </p>
          <p className="article-end__bio">{copy.authorBio}</p>
          <Link href={localeHref(locale, "/contact")} className="article-end__contact">
            {copy.getInTouch}
            <HiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="article-end__share">
        <p>{copy.share}</p>
        <ul>
          {shareLinks.map(({ platform, href, icon: Icon }) => (
            <li key={platform}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${copy.shareOn(platform)} · ${newTabLabel}`}
                title={copy.shareOn(platform)}
              >
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
              aria-label={copy.shareByEmail}
              title={copy.shareByEmail}
            >
              <HiOutlineEnvelope aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>

      <Link
        href={localeHref(locale, "/blog")}
        className="article-end__back"
        transitionTypes={["nav-back"]}
      >
        <HiArrowLeft aria-hidden="true" />
        {copy.backToAll}
      </Link>
    </footer>
  );
}
