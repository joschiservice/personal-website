import { Container } from "@/app/components/system/Container";
import { ActionLink } from "@/app/components/system/ActionLink";
import { CvDownloadAction } from "@/app/components/system/CvDownloadAction";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import type { Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/getDictionary";

export function HomePageHeroSection({
  copy,
  locale,
  localizedCvAvailable,
  newTabLabel,
}: {
  copy: Dictionary["hero"];
  locale: Locale;
  localizedCvAvailable: boolean;
  newTabLabel: string;
}) {
  const socialLinks = [
    {
      label: "LinkedIn",
      href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
      icon: FaLinkedinIn,
    },
    {
      label: "GitHub",
      href: process.env.NEXT_PUBLIC_SOCIAL_GITHUB,
      icon: FaGithub,
    },
  ].filter((social): social is typeof social & { href: string } => Boolean(social.href));

  return (
    <section className="hero" id="root" aria-labelledby="hero-title">
      <div className="hero__art" aria-hidden="true">
        <span className="hero__arc hero__arc--blue" />
        <span className="hero__arc hero__arc--warm" />
        <span className="hero__orbit" />
      </div>
      <Container className="hero__inner">
        <div className="hero__copy">
          <p className="system-label">{copy.label}</p>
          <h1
            id="hero-title"
            style={
              locale === "ja"
                ? { fontSize: "clamp(2.45rem, 5.2vw, 5.25rem)" }
                : undefined
            }
          >
            <span>{copy.headlineLead}</span>
            <span>{copy.headlineAccent}</span>
          </h1>
          <p className="hero__description">{copy.description}</p>
          <div className="hero__actions">
            <ActionLink href="#experience" variant="primary">
              {copy.primaryAction}
            </ActionLink>
            <CvDownloadAction
              locale={locale}
              localizedCvAvailable={localizedCvAvailable}
              label={copy.secondaryAction}
              ariaLabel={copy.secondaryActionLabel}
              menuLabel={copy.cvLanguageMenuLabel}
              newTabLabel={newTabLabel}
            />
          </div>
          {socialLinks.length > 0 ? (
            <nav className="hero__socials" aria-label={copy.socialsLabel}>
              <span className="hero__socials-label">{copy.socialsLabel}</span>
              <span className="hero__socials-links">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} · ${newTabLabel}`}
                    >
                      <Icon aria-hidden="true" />
                      <span>{social.label}</span>
                      <HiArrowUpRight className="hero__social-arrow" aria-hidden="true" />
                    </a>
                  );
                })}
              </span>
            </nav>
          ) : null}
        </div>

        <a className="hero__continuation" href="#about-me" aria-label={copy.nextSectionLabel}>
          <span />
          <span />
        </a>
      </Container>
    </section>
  );
}
