import { FaRoute } from "react-icons/fa";
import { SectionHeading } from "@/app/components/SectionHeading";
import { SectionBodyText } from "@/app/components/SectionBodyText";
import {
  EXPERIENCE_STOPS,
  timelineSectionContent,
} from "@/app/data/timelineSection";
import { getFormattedTimeSpan } from "../../lib/date";
import styles from "./TimelineSection.module.css";
import { TimelineDesktopRail } from "./TimelineDesktopRail";
import { AttachedMilestoneCard, ExperienceCard } from "./timelineShared";

export function TimelineSection() {
  return (
    <section
      className="py-16 sm:py-20 md:py-28 overflow-hidden"
      id="experience"
      aria-labelledby="career-timeline-heading"
    >
      <div className="container mx-auto max-w-360 px-4 sm:px-6 md:px-8">
        <SectionHeading
          title={timelineSectionContent.title}
          icon={FaRoute}
          gradient="from-cyan-500/40 to-blue-300/40"
          id="career-timeline-heading"
        />

        <SectionBodyText className="mb-12 sm:mb-16">
          {timelineSectionContent.description}
        </SectionBodyText>

        <div className="hidden lg:block">
          <TimelineDesktopRail />
        </div>

        <div className="space-y-8 lg:hidden">
          {EXPERIENCE_STOPS.map(({ experience, attachedMilestones }, index) => (
            <div key={experience.id} className={styles.mobileStop}>
              <div className={styles.mobileRail} aria-hidden="true">
                <span className={styles.mobileMarker} />
                {index !== EXPERIENCE_STOPS.length - 1 ? (
                  <span className={styles.mobileConnector} />
                ) : null}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-3">
                  <p className={styles.routeLabel}>{experience.routeLabel}</p>
                  <p className={styles.routeMeta}>
                    {getFormattedTimeSpan(experience.start, experience.end)}
                  </p>
                </div>

                <ExperienceCard experience={experience}>
                  {attachedMilestones.length ? (
                    <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
                      {attachedMilestones.map((milestone) => (
                        <AttachedMilestoneCard
                          key={milestone.id}
                          milestone={milestone}
                        />
                      ))}
                    </div>
                  ) : null}
                </ExperienceCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
