import Link from "next/link";
import { HiArrowRight, HiArrowUpRight } from "react-icons/hi2";
import type { CareerMilestone } from "@/app/data/timelineSection";
import { localeHref, type Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/getDictionary";
import { getFormattedTimeSpan } from "@/app/lib/date";
import styles from "./TimelineSection.module.css";
import { ExperienceDetails } from "./ExperienceDetails";

type TimelineCopy = Dictionary["timeline"];

export function ExperienceCard({
  experience,
  copy,
  locale,
}: {
  experience: CareerMilestone;
  copy: TimelineCopy;
  locale: Locale;
}) {
  return (
    <div className={styles.experience}>
      <h3 className={styles.role}>{experience.title}</h3>
      {experience.organization ? (
        <p className={styles.organization}>
          {experience.link ? (
            <Link href={experience.link} target="_blank" rel="noreferrer">
              {experience.organization}
              <HiArrowUpRight aria-hidden="true" />
            </Link>
          ) : (
            experience.organization
          )}
        </p>
      ) : null}
      <p className={styles.summary}>{experience.summary}</p>
      {experience.impact?.length ? (
        <dl
          className={styles.highlights}
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
      {experience.invitation ? (
        <div className={styles.invitation}>
          <p>{experience.invitation}</p>
          <Link href={localeHref(locale, "/contact")}>
            {copy.sendMessage}
            <HiArrowRight aria-hidden="true" />
          </Link>
        </div>
      ) : null}
      <ExperienceDetails tasks={experience.tasks} label={copy.readMore} />
      <SkillList skills={experience.skills} />
    </div>
  );
}

export function AlongsideItem({
  milestone,
  copy,
  locale,
}: {
  milestone: CareerMilestone;
  copy: TimelineCopy;
  locale: Locale;
}) {
  const title = (
    <>
      {milestone.title}
      {milestone.link ? <HiArrowUpRight aria-hidden="true" /> : null}
    </>
  );

  return (
    <li className={styles.alongsideItem}>
      <p className={styles.alongsideMeta}>
        <span>{copy.kinds[milestone.kind]}</span>
        <span>
          {getFormattedTimeSpan(milestone.start, milestone.end, locale, copy.present)}
        </span>
      </p>
      <div>
        <h4 className={styles.alongsideTitle}>
          {milestone.link ? (
            <Link href={milestone.link} target="_blank" rel="noreferrer">
              {title}
            </Link>
          ) : (
            title
          )}
        </h4>
        <p className={styles.alongsideSubtitle}>{milestone.subTitle}</p>
        <p className={styles.alongsideSummary}>{milestone.summary}</p>
        <ExperienceDetails tasks={milestone.tasks} label={copy.readMore} />
        <SkillList skills={milestone.skills} small />
      </div>
    </li>
  );
}

function SkillList({
  skills,
  small = false,
}: {
  skills?: readonly string[];
  small?: boolean;
}) {
  if (!skills?.length) return null;

  return (
    <ul className={small ? `${styles.skills} ${styles.skillsSmall}` : styles.skills}>
      {skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  );
}
