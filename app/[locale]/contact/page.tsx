import type { Metadata } from "next";
import { ContactChannels } from "@/app/components/contact/ContactChannels";
import { Container } from "@/app/components/system/Container";
import { quietFooterPage } from "@/app/components/system/SiteFooter";
import { localeAlternates, localeHref } from "@/app/i18n/config";
import { getLocaleDictionary, type LocaleParams } from "@/app/i18n/getDictionary";
import { siteConfig } from "@/app/lib/site";
import { SpaceBackdrop } from "@/app/components/system/SpaceBackdrop";
import styles from "../../components/contact/contact.module.css";

export async function generateMetadata(props: LocaleParams): Promise<Metadata> {
  const { locale, dictionary } = await getLocaleDictionary(props);
  const canonical = localeHref(locale, "/contact");

  return {
    title: dictionary.contact.metadataTitle,
    description: dictionary.contact.metadataDescription,
    alternates: { canonical, languages: localeAlternates("/contact") },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: `${dictionary.contact.metadataTitle} · ${siteConfig.name}`,
      description: dictionary.contact.metadataDescription,
      url: canonical,
    },
  };
}

export default async function ContactPage(props: LocaleParams) {
  const { locale, dictionary } = await getLocaleDictionary(props);
  const copy = dictionary.contact;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <div className={`${styles.page} ${quietFooterPage}`}>
      <section className={styles.hero} aria-labelledby="contact-title">
        <div className={styles.heroArt} aria-hidden="true" />
        <SpaceBackdrop variant="contact" />

        <Container className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className="system-label">{copy.label}</p>
            <h1
              id="contact-title"
              style={
                locale === "ja"
                  ? { fontSize: "clamp(3rem, 5.4vw, 5.8rem)" }
                  : undefined
              }
            >
              <span>{copy.titleLead}</span>
              <span>{copy.titleAccent}</span>
            </h1>
            <p>{copy.intro}</p>
          </div>
        </Container>
      </section>

      <section className={styles.directory} aria-labelledby="contact-directory-title">
        <Container>
          <div className={styles.directoryIntro}>
            <p className="system-label">{copy.directoryLabel}</p>
            <h2 id="contact-directory-title">{copy.directoryTitle}</h2>
          </div>

          <ContactChannels
            copy={copy}
            email={email}
            linkedin={process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN}
            github={process.env.NEXT_PUBLIC_SOCIAL_GITHUB}
            instagram={process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM}
            newTabLabel={dictionary.accessibility.opensNewTab}
          />

          <p className={styles.directoryNote}>{copy.note}</p>
        </Container>
      </section>
    </div>
  );
}
