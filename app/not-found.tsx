import type { Metadata } from "next";
import { Navbar } from "@/app/components/navbar";
import { ActionLink } from "@/app/components/system/ActionLink";
import { Container } from "@/app/components/system/Container";
import styles from "@/app/components/system/LegalPage.module.css";
import { SiteFooter } from "@/app/components/system/SiteFooter";
import { SpaceBackdrop } from "@/app/components/system/SpaceBackdrop";
import { defaultLocale } from "@/app/i18n/config";
import en from "@/app/i18n/dictionaries/en";
import { siteConfig } from "@/app/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${en.notFound.title} · ${siteConfig.name}`,
};

// Sits outside app/[locale], which only matches known pages, so it gets its own navbar and footer.
export default function NotFound() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        {en.accessibility.skipToContent}
      </a>
      <Navbar locale={defaultLocale} copy={en.nav} />
      <main id="main-content" tabIndex={-1}>
        <div className={styles.root}>
          <SpaceBackdrop variant="legal" />
          <Container>
            <p className="system-label">{en.notFound.label}</p>
            <h1>{en.notFound.title}</h1>
            <ActionLink href="/">{en.notFound.action}</ActionLink>
          </Container>
        </div>
      </main>
      <SiteFooter locale={defaultLocale} copy={en.footer} />
    </>
  );
}
