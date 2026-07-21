import { Container } from "@/app/components/system/Container";
import { SectionIntro } from "@/app/components/system/SectionIntro";
import type { Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/getDictionary";
import { getFormattedTimeSpan } from "@/app/lib/date";
import styles from "./TimelineSection.module.css";
import { AttachedMilestoneCard, ExperienceCard } from "./timelineShared";

export function TimelineSection({
  copy,
  locale,
}: {
  copy: Dictionary["timeline"];
  locale: Locale;
}) {
  return (
    <section
      id="experience"
      className="editorial-section career-section"
      aria-labelledby="career-timeline-heading"
    >
      <Container>
        <SectionIntro
          label={copy.label}
          title={copy.title}
          description={copy.description}
          id="career-timeline-heading"
          align="split"
        />

        <div className={styles.timeline}>
          {copy.stops.map(({ experience, attachedMilestones }, index) => (
            <article
              className={`${styles.stop} motion-section-content`}
              key={experience.id}
            >
              <div className={styles.route} data-timeline-route>
                <span className={styles.stopNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.marker} data-timeline-marker aria-hidden="true" />
                <div>
                  <p className={styles.routeLabel}>{experience.routeLabel}</p>
                  <p className={styles.routeMeta}>
                    {getFormattedTimeSpan(
                      experience.start,
                      experience.end,
                      locale,
                      copy.present
                    )}
                  </p>
                </div>
              </div>

              <div className={styles.content}>
                <ExperienceCard experience={experience} copy={copy} />
                {attachedMilestones.length ? (
                  <div className={styles.attachedList}>
                    {attachedMilestones.map((milestone) => (
                      <AttachedMilestoneCard
                        key={milestone.id}
                        milestone={milestone}
                        copy={copy}
                        locale={locale}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
