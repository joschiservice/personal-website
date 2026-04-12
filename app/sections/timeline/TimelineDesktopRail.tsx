"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getFormattedTimeSpan } from "../../lib/date";
import styles from "./TimelineSection.module.css";
import { EXPERIENCE_STOPS } from "./timelineData";
import { AttachedMilestoneCard, ExperienceCard } from "./timelineShared";

function formatProgress(currentIndex: number, total: number) {
  return `${String(currentIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}

export function TimelineDesktopRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const stopRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frameId: number | null = null;

    const syncActiveIndex = () => {
      const nextIndex = stopRefs.current.reduce((closestIndex, stop, index) => {
        if (!stop) return closestIndex;

        const currentDistance = Math.abs(stop.offsetLeft - rail.scrollLeft);
        const closestStop = stopRefs.current[closestIndex];
        const closestDistance = closestStop
          ? Math.abs(closestStop.offsetLeft - rail.scrollLeft)
          : Number.POSITIVE_INFINITY;

        return currentDistance < closestDistance ? index : closestIndex;
      }, 0);

      setActiveIndex((previousIndex) =>
        previousIndex === nextIndex ? previousIndex : nextIndex
      );
    };

    const handleScroll = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        syncActiveIndex();
      });
    };

    syncActiveIndex();
    rail.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      rail.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  function scrollToIndex(index: number) {
    const rail = railRef.current;
    const target = stopRefs.current[index];
    if (!rail || !target) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";

    rail.scrollTo({
      left: target.offsetLeft,
      behavior,
    });

    const primaryNav = document.querySelector('nav[aria-label="Primary"]');
    const navHeight =
      primaryNav instanceof HTMLElement ? primaryNav.getBoundingClientRect().height : 0;
    const desiredTopOffset = navHeight + 28;
    const targetTop = target.getBoundingClientRect().top;

    if (targetTop < desiredTopOffset) {
      window.scrollTo({
        top: window.scrollY + targetTop - desiredTopOffset,
        behavior,
      });
    }
  }

  const activeLabel = formatProgress(activeIndex, EXPERIENCE_STOPS.length);

  return (
    <div className={styles.desktopViewport}>
      <div className={styles.edgeFadeLeft} aria-hidden="true" />
      <div className={styles.edgeFadeRight} aria-hidden="true" />

      <div ref={railRef} className={styles.desktopRail}>
        {EXPERIENCE_STOPS.map(({ experience, attachedMilestones }, index) => (
          <div
            key={experience.id}
            ref={(element) => {
              stopRefs.current[index] = element;
            }}
            className={styles.desktopStop}
          >
            <div className={styles.desktopStopHeader}>
              <div className={styles.desktopStopMeta}>
                <div className={styles.markerShell} aria-hidden="true">
                  <span className={styles.markerCore} />
                </div>
                <div>
                  <p className={styles.routeLabel}>{experience.routeLabel}</p>
                  <p className={styles.routeMeta}>
                    {getFormattedTimeSpan(experience.start, experience.end)}
                  </p>
                </div>
              </div>

              <div className={styles.desktopStopControls}>
                <div
                  className={`${styles.progressBadge} min-w-[92px] justify-center`}
                  aria-live="polite"
                >
                  {activeLabel}
                </div>
                <button
                  type="button"
                  className={styles.navButton}
                  onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
                  disabled={activeIndex === 0}
                  aria-label="Show newer career stop"
                >
                  <FaChevronLeft aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={styles.navButton}
                  onClick={() =>
                    scrollToIndex(Math.min(activeIndex + 1, EXPERIENCE_STOPS.length - 1))
                  }
                  disabled={activeIndex === EXPERIENCE_STOPS.length - 1}
                  aria-label="Show older career stop"
                >
                  <FaChevronRight aria-hidden="true" />
                </button>
              </div>
            </div>

            <ExperienceCard experience={experience} />

            {attachedMilestones.length ? (
              <div className={styles.attachedRail}>
                {attachedMilestones.map((milestone) => (
                  <AttachedMilestoneCard key={milestone.id} milestone={milestone} />
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
