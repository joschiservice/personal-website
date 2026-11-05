"use client";

import { useEffect } from "react";

/**
 * Adds the small amount of state CSS cannot retain on its own: metrics reveal
 * once and stay visible, and the timeline tracks the reading position.
 */
export function HomeMotionRuntime() {
  useEffect(() => {
    const root = document.documentElement;
    const metrics = Array.from(
      document.querySelectorAll<HTMLElement>("[data-motion-metric]")
    );
    const timelineStops = Array.from(
      document.querySelectorAll<HTMLElement>("[data-timeline-stop]")
    );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let observer: IntersectionObserver | undefined;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      metrics.forEach((metric) => {
        metric.dataset.revealed = "true";
      });
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const metric = entry.target as HTMLElement;
            metric.dataset.revealed = "true";
            observer?.unobserve(metric);
          });
        },
        { rootMargin: "0px 0px -12%", threshold: 0.2 }
      );

      metrics.forEach((metric) => observer?.observe(metric));
      root.dataset.motionReady = "true";
    }

    // The timeline's date blocks stick just below the nav. That sticky line is
    // the reading position: stops above it are reached, the one it falls in is
    // active, and each stop's rail fills down to it. CSS fills the rail where it can,
    // because a scroll-driven animation doesn't fall behind fast scrolling. Safari draws
    // that animation wrongly once a stop changes height, so it stays on the script.
    const isSafari = /^((?!chrome|chromium|android|crios|fxios|edg).)*safari/i.test(
      navigator.userAgent
    );
    const fillRailInScript =
      !prefersReducedMotion && (isSafari || !CSS.supports("animation-timeline: view()"));
    if (isSafari) root.dataset.timelineRail = "script";
    let timelineFrame = 0;

    const updateTimeline = () => {
      timelineFrame = 0;
      const readingLine = getReadingLine(timelineStops[0]);

      // Read everything before writing, so a write doesn't force a layout for the next stop.
      const states = timelineStops.map((stop) => {
        const rect = stop.getBoundingClientRect();
        const railStart = Number.parseFloat(
          getComputedStyle(stop).getPropertyValue("--rail-start")
        ) || 0;

        return {
          stop,
          reached: String(readingLine >= rect.top + railStart),
          active: String(readingLine >= rect.top && readingLine < rect.bottom),
          fill: Math.min(
            Math.max(readingLine - rect.top - railStart, 0),
            rect.height - railStart
          ),
        };
      });

      states.forEach(({ stop, reached, active, fill }) => {
        if (stop.dataset.reached !== reached) stop.dataset.reached = reached;
        if (stop.dataset.active !== active) stop.dataset.active = active;
        if (fillRailInScript) stop.style.setProperty("--rail-fill", `${fill}px`);
      });
    };

    const requestTimelineUpdate = () => {
      if (timelineFrame) return;
      timelineFrame = window.requestAnimationFrame(updateTimeline);
    };

    if (timelineStops.length) {
      updateTimeline();
      window.addEventListener("scroll", requestTimelineUpdate, { passive: true });
      window.addEventListener("resize", requestTimelineUpdate);
    }

    return () => {
      observer?.disconnect();
      if (timelineFrame) window.cancelAnimationFrame(timelineFrame);
      window.removeEventListener("scroll", requestTimelineUpdate);
      window.removeEventListener("resize", requestTimelineUpdate);
      timelineStops.forEach((stop) => {
        stop.style.removeProperty("--rail-fill");
        delete stop.dataset.reached;
        delete stop.dataset.active;
      });
      delete root.dataset.motionReady;
      delete root.dataset.timelineRail;
    };
  }, []);

  return null;
}

function getReadingLine(stop: HTMLElement | undefined) {
  const fallback = window.innerHeight * 0.3;
  const marker = stop?.querySelector<HTMLElement>("[data-timeline-marker]");
  const when = marker?.parentElement;
  if (!marker || !when) return fallback;

  const styles = getComputedStyle(when);
  if (styles.position !== "sticky") return fallback;

  // Sticky top plus the marker's offset inside the date block.
  return Number.parseFloat(styles.top) + marker.offsetTop + marker.offsetHeight / 2;
}
