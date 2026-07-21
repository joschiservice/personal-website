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
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      metrics.forEach((metric) => {
        metric.dataset.revealed = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const metric = entry.target as HTMLElement;
          metric.dataset.revealed = "true";
          observer.unobserve(metric);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.2 }
    );

    metrics.forEach((metric) => observer.observe(metric));
    root.dataset.motionReady = "true";

    return () => {
      observer.disconnect();
      delete root.dataset.motionReady;
    };
  }, []);

  return null;
}
