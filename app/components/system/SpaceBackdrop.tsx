"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./SpaceBackdrop.module.css";

/**
 * A quiet space backdrop: a faint starfield plus one celestial feature per
 * variant (a moon, an orbit, a ring, flight arcs, a horizon). Purely
 * decorative; each variant's look lives in SpaceBackdrop.module.css, in the class of the same name.
 */
export type SpaceVariant =
  | "hero"
  | "about"
  | "writing"
  | "experience"
  | "tools"
  | "interests"
  | "travel"
  | "footer"
  | "blog"
  | "article"
  | "contact"
  | "legal";

export function SpaceBackdrop({
  variant,
  children,
}: {
  variant: SpaceVariant;
  /** Extra decorative layers that should pause along with the backdrop. */
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    return observeVisibility(element);
  }, []);

  return (
    <div ref={ref} className={`${styles.root} ${styles[variant]}`} aria-hidden="true">
      <span className={styles.stars} />
      <span className={styles.feature} />
      <span className={styles.accent} />
      {children}
    </div>
  );
}

// One observer for every backdrop on the page. A backdrop that is scrolled out
// of view gets `data-paused`, which stops its looping animations so the browser
// isn't repainting something nobody can see.
let observer: IntersectionObserver | undefined;

function observeVisibility(element: HTMLElement) {
  if (!("IntersectionObserver" in window)) return;

  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) delete target.dataset.paused;
        else target.dataset.paused = "";
      }
    },
    // Start again a little before the backdrop scrolls into view.
    { rootMargin: "200px 0px" }
  );

  observer.observe(element);
  return () => observer?.unobserve(element);
}
