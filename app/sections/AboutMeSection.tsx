import { Container } from "@/app/components/system/Container";
import { SectionIntro } from "@/app/components/system/SectionIntro";
import type { Dictionary } from "@/app/i18n/getDictionary";
import { SpaceBackdrop } from "@/app/components/system/SpaceBackdrop";
import styles from "./AboutMeSection.module.css";

export function AboutMeSection({
  copy,
}: {
  copy: Dictionary["about"];
}) {
  return (
    <section
      id="about-me"
      className={`editorial-section ${styles.root}`}
      aria-labelledby="about-heading"
    >
      <div className={styles.atmosphere} aria-hidden="true" />
      <SpaceBackdrop variant="about" />

      <Container>
        <SectionIntro
          label={copy.label}
          title={copy.statement}
          description={copy.paragraphs[0]}
          id="about-heading"
          align="split"
        />

        <div className={`${styles.body} motion-section-content`}>
          <div className={styles.narrative} data-testid="about-narrative">
            {copy.paragraphs.slice(1).map((paragraph, index) => (
              <p
                key={paragraph}
                data-testid={index === 0 ? "about-lead-story" : undefined}
                className={index === 0 ? styles.leadStory : undefined}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <aside className={styles.annotations} data-testid="about-annotations" aria-label={copy.annotationsLabel}>
            <div className={styles.annotationGroup}>
              <p className="system-label">{copy.profileFactsLabel}</p>
              <dl className={styles.profileFactList} data-testid="about-facts">
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
