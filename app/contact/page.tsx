import type { Metadata } from "next";
import { ContactChannels } from "@/app/components/contact/ContactChannels";
import { Container } from "@/app/components/system/Container";
import { localeAlternates, localeHref } from "@/app/i18n/config";
import { getRequestDictionary } from "@/app/i18n/getDictionary";
import { siteConfig } from "@/app/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dictionary } = await getRequestDictionary();
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

export default async function ContactPage() {
  const { locale, dictionary } = await getRequestDictionary();
  const copy = dictionary.contact;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <div className="contact-page">
      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="contact-hero__art" aria-hidden="true">
          <span className="contact-hero__arc contact-hero__arc--blue" />
          <span className="contact-hero__arc contact-hero__arc--warm" />
          <span className="contact-hero__orbit" />
        </div>

        <Container className="contact-hero__inner">
          <div className="contact-hero__copy">
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
              {" "}
              <span>{copy.titleAccent}</span>
            </h1>
            <p>{copy.intro}</p>
          </div>
        </Container>
      </section>

      <section className="contact-directory" aria-labelledby="contact-directory-title">
        <Container>
          <div className="contact-directory__intro">
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

          <p className="contact-directory__note">{copy.note}</p>
        </Container>
      </section>
    </div>
  );
}
