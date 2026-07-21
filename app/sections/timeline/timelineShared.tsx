import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import type { CareerMilestone } from "@/app/data/timelineSection";
import type { Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/getDictionary";
import { getFormattedTimeSpan } from "@/app/lib/date";
import styles from "./TimelineSection.module.css";
import { ExperienceDetails } from "./ExperienceDetails";

type TimelineCopy = Dictionary["timeline"];

export function ExperienceCard({
  experience,
  copy,
}: {
  experience: CareerMilestone;
  copy: TimelineCopy;
}) {
  return (
    <div className={styles.primary}>
      <div className={styles.primaryMeta}>
        <span>{copy.kinds[experience.kind]}</span>
        <span>{experience.subTitle}</span>
      </div>
      <MilestoneHeading milestone={experience} />
      <p className={styles.summary}>{experience.summary}</p>
      {experience.impact?.length ? (
        <dl
          className={styles.impactGrid}
          aria-label={`${experience.organization ?? experience.title} ${copy.impactLabel}`}
        >
          {experience.impact.map((item) => (
            <div key={item.label} data-motion-metric>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <ExperienceDetails tasks={experience.tasks} label={copy.readMore} />
      {experience.skills?.length ? (
        <div className={styles.skills}>
          {experience.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function AttachedMilestoneCard({
  milestone,
  copy,
  locale,
}: {
  milestone: CareerMilestone;
  copy: TimelineCopy;
  locale: Locale;
}) {
  const className =
    milestone.emphasis === "primary"
      ? `${styles.attached} ${styles.attachedFeatured}`
      : styles.attached;

  return (
    <article className={className}>
      <div className={styles.attachedMeta}>
        <span>{copy.kinds[milestone.kind]}</span>
        <span>
          {getFormattedTimeSpan(
            milestone.start,
            milestone.end,
            locale,
            copy.present
          )}
        </span>
      </div>
      <p className={styles.attachedRoute}>{milestone.routeLabel}</p>
      <MilestoneHeading milestone={milestone} />
      <p className={styles.attachedSubtitle}>{milestone.subTitle}</p>
      <p className={styles.attachedSummary}>{milestone.summary}</p>
      <ExperienceDetails tasks={milestone.tasks} label={copy.readMore} />
      {milestone.skills?.length ? (
        <div className={styles.smallSkills}>
          {milestone.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function MilestoneHeading({ milestone }: { milestone: CareerMilestone }) {
  const content = (
    <>
      <span>{milestone.title}</span>
      {milestone.link ? <HiArrowUpRight aria-hidden="true" /> : null}
    </>
  );

  return (
    <div className={styles.heading}>
      {milestone.link ? (
        <Link href={milestone.link} target="_blank" rel="noreferrer">
          {content}
        </Link>
      ) : (
        <h3>{content}</h3>
      )}
      {milestone.organization ? <p>{milestone.organization}</p> : null}
    </div>
  );
}
