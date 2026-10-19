import { Container } from "@/app/components/system/Container";
import { SectionIntro } from "@/app/components/system/SectionIntro";
import type { Dictionary } from "@/app/i18n/getDictionary";
import { SpaceBackdrop } from "@/app/components/system/SpaceBackdrop";

export function AboutMeSection({
  copy,
}: {
  copy: Dictionary["about"];
}) {
  return (
    <section
      id="about-me"
      className="editorial-section about-section"
      aria-labelledby="about-heading"
    >
      <div className="about-section__atmosphere" aria-hidden="true" />
      <SpaceBackdrop variant="about" />

      <Container>
        <SectionIntro
          label={copy.label}
          title={copy.statement}
          description={copy.paragraphs[0]}
          id="about-heading"
          align="split"
        />

        <div className="about-section__body motion-section-content">
          <div className="about-section__narrative">
            {copy.paragraphs.slice(1).map((paragraph, index) => (
              <p
                key={paragraph}
                className={index === 0 ? "about-section__lead-story" : undefined}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <aside className="about-section__annotations" aria-label={copy.annotationsLabel}>
            <div className="about-section__annotation-group">
              <p className="system-label">{copy.profileFactsLabel}</p>
              <dl className="profile-fact-list">
                {copy.profileFacts.map(([title, description]) => (
                  <div key={title}>
                    <dt>{title}</dt>
                    <dd>{description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
