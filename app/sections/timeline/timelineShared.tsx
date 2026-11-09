import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import type { CareerMilestone } from "@/app/data/timelineSection";
import type { Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/getDictionary";
import { getFormattedTimeSpan } from "@/app/lib/date";
import styles from "./TimelineSection.module.css";
import { ExperienceDetails } from "./ExperienceDetails";
import { ImpactValue } from "./ImpactValue";
import { getSkillIcon } from "./skillIcons";

type TimelineCopy = Dictionary["timeline"];

export function ExperienceCard({
  experience,
  copy,
}: {
  experience: CareerMilestone;
  copy: TimelineCopy;
}) {
  return (
    <div>
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
          {experience.impact.map((item, index, impact) => (
            <div key={item.label} data-motion-metric>
              <dt>{item.label}</dt>
              <dd>
                <ImpactValue
                  value={item.value}
                  earlierValues={impact.slice(0, index).map((earlier) => earlier.value)}
                />
              </dd>
            </div>
          ))}
        </dl>
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
      {skills.map((skill) => {
        const icon = getSkillIcon(skill);

        return (
          <li key={skill}>
            {icon && (
              <icon.Icon
                aria-hidden="true"
                style={{ "--skill-color": icon.color } as React.CSSProperties}
              />
            )}
            {skill}
          </li>
        );
      })}
    </ul>
  );
}
