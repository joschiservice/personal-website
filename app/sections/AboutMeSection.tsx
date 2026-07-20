import { Container } from "@/app/components/system/Container";
import { SectionIntro } from "@/app/components/system/SectionIntro";
import type { Dictionary } from "@/app/i18n/getDictionary";

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
      <div className="about-section__atmosphere" aria-hidden="true">
        <span className="about-section__orb" />
        <span className="about-section__coordinate">51.1657° N / 10.4515° E</span>
      </div>

      <Container>
        <SectionIntro
          label={copy.label}
          title={copy.statement}
          description={copy.paragraphs[0]}
          id="about-heading"
          align="split"
        />

        <div className="about-section__body">
          <div className="about-section__narrative">
            {copy.paragraphs.slice(1).map((paragraph, index) => (
              <p
                key={paragraph}
                className={index === 0 ? "about-section__lead-story" : undefined}
                data-paragraph={String(index + 1).padStart(2, "0")}
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

            <div className="about-section__annotation-group">
              <p className="system-label">{copy.principlesLabel}</p>
              <dl className="principle-list">
                {copy.principles.map(([title, description], index) => (
                  <div key={title}>
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <dt>{title}</dt>
                      <dd>{description}</dd>
                    </div>
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
