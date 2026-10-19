import { Container } from "@/app/components/system/Container";
import { SectionIntro } from "@/app/components/system/SectionIntro";
import type { CareerMilestone } from "@/app/data/timelineSection";
import type { Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/getDictionary";
import { getFormattedTimeSpan } from "@/app/lib/date";
import styles from "./TimelineSection.module.css";
import { AlongsideItem, ExperienceCard } from "./timelineShared";
import { SpaceBackdrop } from "@/app/components/system/SpaceBackdrop";

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
      <SpaceBackdrop variant="experience" />
      <Container>
        <SectionIntro
          label={copy.label}
          title={copy.title}
          description={copy.description}
          id="career-timeline-heading"
          align="split"
        />

        <ol className={styles.timeline} data-timeline-root>
          {copy.stops.map(({ experience, attachedMilestones }) => (
            <li className={styles.stop} key={experience.id} data-timeline-stop>
              <div className={styles.when}>
                <span className={styles.marker} data-timeline-marker aria-hidden="true" />
                <p className={styles.period}>{formatYears(experience, copy.now)}</p>
                <p className={styles.periodDetail}>
                  <span>{experience.subTitle}</span>
                  <span>
                    {getFormattedTimeSpan(
                      experience.start,
                      experience.end,
                      locale,
                      copy.present
                    )}
                  </span>
                </p>
              </div>

              <div className={styles.content}>
                <ExperienceCard experience={experience} copy={copy} locale={locale} />
                {attachedMilestones.length ? (
                  <section className={styles.alongside} aria-label={copy.alongside}>
                    <p className={styles.alongsideLabel}>{copy.alongside}</p>
                    <ul>
                      {attachedMilestones.map((milestone) => (
                        <AlongsideItem
                          key={milestone.id}
                          milestone={milestone}
                          copy={copy}
                          locale={locale}
                        />
                      ))}
                    </ul>
                  </section>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function formatYears(milestone: CareerMilestone, nowLabel: string) {
  const start = milestone.start.getFullYear();
  if (!milestone.end) return `${start} – ${nowLabel}`;

  const end = milestone.end.getFullYear();
  return start === end ? String(start) : `${start} – ${end}`;
}
