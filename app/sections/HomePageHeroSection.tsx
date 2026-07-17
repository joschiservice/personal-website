import { Container } from "@/app/components/system/Container";
import { ActionLink } from "@/app/components/system/ActionLink";
import { CvDownloadAction } from "@/app/components/system/CvDownloadAction";
import type { Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/getDictionary";

export function HomePageHeroSection({
  copy,
  locale,
  localizedCvAvailable,
}: {
  copy: Dictionary["hero"];
  locale: Locale;
  localizedCvAvailable: boolean;
}) {
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
            />
          </div>
        </div>

        <a className="hero__continuation" href="#about-me" aria-label={copy.nextSectionLabel}>
          <span />
          <span />
        </a>
      </Container>
    </section>
  );
}
