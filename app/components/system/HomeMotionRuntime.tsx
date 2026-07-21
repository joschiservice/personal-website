"use client";

import { useEffect } from "react";

/**
 * Adds the small amount of state CSS cannot retain on its own: metrics reveal
 * once, then stay visible if the visitor scrolls back up the page.
 */
export function HomeMotionRuntime() {
  useEffect(() => {
    const root = document.documentElement;
    const metrics = Array.from(
      document.querySelectorAll<HTMLElement>("[data-motion-metric]")
    );
    const timeline = document.querySelector<HTMLElement>("[data-timeline-root]");
    const timelineMarkers = timeline
      ? Array.from(timeline.querySelectorAll<HTMLElement>("[data-timeline-marker]"))
      : [];
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

    let routeFrame = 0;
    const desktopRoute = window.matchMedia("(min-width: 901px)");

    const updateTimelineRoute = () => {
      routeFrame = 0;
      if (!timeline || timelineMarkers.length < 2) return;
      if (!desktopRoute.matches) {
        timeline.style.removeProperty("--timeline-route-fill");
        delete timeline.dataset.routeComplete;
        return;
      }

      const timelineRect = timeline.getBoundingClientRect();
      const firstMarker = timelineMarkers[0].getBoundingClientRect();
      const routeStart = firstMarker.top + firstMarker.height / 2;
      const routeInset = routeStart - timelineRect.top;
      const routeEnd = timelineRect.bottom - routeInset;
      const viewportProgressPoint = window.innerHeight * 0.72;
      const visibleRouteEnd = Math.min(routeEnd, viewportProgressPoint);
      const fill = Math.max(0, visibleRouteEnd - routeStart);

      timeline.style.setProperty("--timeline-route-fill", `${fill}px`);
      timeline.dataset.routeComplete = String(routeEnd <= viewportProgressPoint);
    };

    const requestTimelineUpdate = () => {
      if (routeFrame) return;
      routeFrame = window.requestAnimationFrame(updateTimelineRoute);
    };

    if (!prefersReducedMotion && timeline && timelineMarkers.length >= 2) {
      updateTimelineRoute();
      window.addEventListener("scroll", requestTimelineUpdate, { passive: true });
      window.addEventListener("resize", requestTimelineUpdate);
      desktopRoute.addEventListener("change", requestTimelineUpdate);
    }

    return () => {
      observer?.disconnect();
      if (routeFrame) window.cancelAnimationFrame(routeFrame);
      window.removeEventListener("scroll", requestTimelineUpdate);
      window.removeEventListener("resize", requestTimelineUpdate);
      desktopRoute.removeEventListener("change", requestTimelineUpdate);
      timeline?.style.removeProperty("--timeline-route-fill");
      if (timeline) delete timeline.dataset.routeComplete;
      delete root.dataset.motionReady;
    };
  }, []);

  return null;
}
