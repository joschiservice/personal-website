import Link from "next/link";
import type { Dictionary } from "@/app/i18n/getDictionary";
import type { Locale } from "@/app/i18n/config";
import { localeHref } from "@/app/i18n/config";
import { Container } from "./Container";
import { ActionLink } from "./ActionLink";
import { SpaceBackdrop } from "./SpaceBackdrop";

export function SiteFooter({
  locale,
  copy,
}: {
  locale: Locale;
  copy: Dictionary["footer"];
}) {
  return (
    <footer className="site-footer" id="contact">
      <SpaceBackdrop variant="footer" />
      <div className="site-footer__horizon" aria-hidden="true" />
      <Container>
        <div className="site-footer__cta">
          <p className="system-label">{copy.label}</p>
          <h2>{copy.title}</h2>
          <p>{copy.body}</p>
          <ActionLink href={localeHref(locale, "/contact")} variant="primary">
            {copy.contact}
          </ActionLink>
        </div>
        <div className="site-footer__meta">
          <span>© {new Date().getFullYear()} Joschua Haß. {copy.copyright}</span>
          <Link href={localeHref(locale, "/imprint")}>{copy.imprint}</Link>
        </div>
      </Container>
    </footer>
  );
}
