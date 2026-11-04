import { Container } from "@/app/components/system/Container";
import { ActionLink } from "@/app/components/system/ActionLink";
import { CvDownloadAction } from "@/app/components/system/CvDownloadAction";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HiArrowUpRight } from "react-icons/hi2";
import type { Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/getDictionary";
import { SpaceBackdrop } from "@/app/components/system/SpaceBackdrop";
import styles from "./HomePageHeroSection.module.css";

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
    <section className={styles.root} data-testid="hero" id="root" aria-labelledby="hero-title">
      <div className={styles.art} aria-hidden="true">
        <SpaceBackdrop variant="hero">
          <span className={`${styles.glow} ${styles.glowBlue}`} />
          <span className={`${styles.glow} ${styles.glowViolet}`} />
          <span className={`${styles.glow} ${styles.glowWarm}`} />
        </SpaceBackdrop>
      </div>
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <p className="system-label">{copy.label}</p>
          <h1
            id="hero-title"
            style={
              locale === "ja"
                ? { fontSize: "clamp(2.2rem, 4.2vw, 4.25rem)" }
                : undefined
            }
          >
            <span>{copy.headlineLead}</span>
            <span>{copy.headlineAccent}</span>
          </h1>
          <p className={styles.description}>{copy.description}</p>
          <div className={styles.actions} data-testid="hero-actions">
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
            <nav className={styles.socials} aria-label={copy.socialsLabel}>
              <span className={styles.socialsLabel}>{copy.socialsLabel}</span>
              <span className={styles.socialsLinks}>
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
                      <HiArrowUpRight className={styles.socialArrow} aria-hidden="true" />
                    </a>
                  );
                })}
              </span>
            </nav>
          ) : null}
        </div>

        <a className={styles.continuation} data-testid="hero-continuation" href="#about-me" aria-label={copy.nextSectionLabel}>
          <span className={styles.continuationWheel} aria-hidden="true" />
        </a>
      </Container>
    </section>
  );
}
