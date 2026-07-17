import type { Metadata } from "next";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HiArrowUpRight, HiEnvelope } from "react-icons/hi2";
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
  const socialLinks = [
    {
      label: "LinkedIn",
      detail: copy.socials.linkedin,
      href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
      icon: FaLinkedinIn,
    },
    {
      label: "GitHub",
      detail: copy.socials.github,
      href: process.env.NEXT_PUBLIC_SOCIAL_GITHUB,
      icon: FaGithub,
    },
    {
      label: "Instagram",
      detail: copy.socials.instagram,
      href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
      icon: FaInstagram,
    },
  ].filter((social) => Boolean(social.href));

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

          <div className="contact-directory__grid">
            <div className="contact-email">
              <span className="contact-channel__index">01 / {copy.emailLabel}</span>
              <div className="contact-email__icon" aria-hidden="true">
                <HiEnvelope />
              </div>
              <p>{copy.emailIntro}</p>
              {email ? (
                <a href={`mailto:${email}`}>
                  <span>{email}</span>
                  <HiArrowUpRight aria-hidden="true" />
                </a>
              ) : (
                <p className="contact-channel__unavailable">{copy.unavailable}</p>
              )}
            </div>

            <div className="contact-socials" aria-label={copy.socialsLabel}>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-social"
                    aria-label={`${social.label} · ${dictionary.accessibility.opensNewTab}`}
                  >
                    <span className="contact-channel__index">
                      {String(index + 2).padStart(2, "0")}
                    </span>
                    <Icon aria-hidden="true" />
                    <span className="contact-social__copy">
                      <strong>{social.label}</strong>
                      <small>{social.detail}</small>
                    </span>
                    <HiArrowUpRight className="contact-social__arrow" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <p className="contact-directory__note">{copy.note}</p>
        </Container>
      </section>
    </div>
  );
}
