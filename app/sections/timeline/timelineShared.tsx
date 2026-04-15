import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import {
  type CareerMilestone,
  getMilestoneBadgeLabel,
} from "@/app/data/timelineSection";
import { getFormattedTimeSpan } from "../../lib/date";
import styles from "./TimelineSection.module.css";
import { ExperienceDetails } from "./ExperienceDetails";

export function ExperienceCard({
  experience,
  children,
}: {
  experience: CareerMilestone;
  children?: React.ReactNode;
}) {
  return (
    <article className={styles.primaryCard}>
      <div className={styles.cardTopRow}>
        <span className={styles.primaryBadge}>
          {getMilestoneBadgeLabel(experience.kind)}
        </span>
        <span className={styles.subTitleBadge}>{experience.subTitle}</span>
      </div>

      <div className="mt-5" data-emphasis={experience.emphasis}>
        <MilestoneHeading
          title={experience.title}
          organization={experience.organization}
          link={experience.link}
        />
      </div>

      <p className="mt-5 text-[15px] leading-7 text-white/80">
        {experience.summary}
      </p>

      <ExperienceDetails tasks={experience.tasks} />

      {experience.skills?.length ? (
        <div className={styles.skillRow}>
          {experience.skills.map((skill) => (
            <span key={skill} className={styles.primarySkillChip}>
              {skill}
            </span>
          ))}
        </div>
      ) : null}

      {children}
    </article>
  );
}

export function AttachedMilestoneCard({
  milestone,
}: {
  milestone: CareerMilestone;
}) {
  const isCertificate = milestone.kind === "certificate";

  return (
    <article
      className={`${styles.attachedCard} ${
        isCertificate ? styles.certificateCard : styles.projectCard
      }`}
    >
      <div className={styles.attachedStem} aria-hidden="true" />
      <div className="flex items-center justify-between gap-3">
        <span className={styles.secondaryBadge}>
          {getMilestoneBadgeLabel(milestone.kind)}
        </span>
        <span className={styles.routeMeta}>
          {getFormattedTimeSpan(milestone.start, milestone.end)}
        </span>
      </div>

      <p className={`${styles.routeLabel} mt-4`}>{milestone.routeLabel}</p>

      <div className="mt-3" data-emphasis={milestone.emphasis}>
        <MilestoneHeading
          title={milestone.title}
          organization={milestone.subTitle}
          link={milestone.link}
        />
      </div>

      <p className="mt-4 text-sm leading-6 text-white/75">{milestone.summary}</p>

      {milestone.skills?.length ? (
        <div className={styles.secondarySkillRow}>
          {milestone.skills.map((skill) => (
            <span
              key={skill}
              className={
                isCertificate
                  ? styles.certificateSkillChip
                  : styles.secondarySkillChip
              }
            >
              {skill}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function MilestoneHeading({
  title,
  organization,
  link,
}: {
  title: string;
  organization?: string;
  link?: string;
}) {
  const titleContent = (
    <>
      <span className="text-2xl font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-cyan-100">
        {title}
      </span>
      {link ? (
        <FiExternalLink
          className="mt-1 h-4 w-4 shrink-0 text-cyan-200/80 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  return (
    <div>
      {link ? (
        <Link
          href={link}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-start gap-2 text-left"
        >
          {titleContent}
        </Link>
      ) : (
        <div className="inline-flex items-start gap-2 text-left">{titleContent}</div>
      )}

      {organization ? (
        <p className="mt-2 text-sm uppercase tracking-[0.3em] text-cyan-100/55">
          {organization}
        </p>
      ) : null}
    </div>
  );
}
