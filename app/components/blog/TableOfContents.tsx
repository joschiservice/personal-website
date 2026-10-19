"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { BlogTocItem } from "@/content-types";

/** Share of the viewport height a heading must pass before its section counts as current. */
const READING_LINE = 0.3;

export function TableOfContents({
  toc,
  label = "On this page",
  ariaLabel = "Table of contents",
}: {
  toc: BlogTocItem[];
  label?: string;
  ariaLabel?: string;
}) {
  const activeId = useActiveHeading(toc);
  const trackRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // One marker for the whole list, moved to the current entry so it glides
  // along the rail instead of blinking from item to item.
  useLayoutEffect(() => {
    const track = trackRef.current;
    const indicator = indicatorRef.current;
    if (!track || !indicator) return;

    const place = () => {
      const link = activeId
        ? track.querySelector<HTMLAnchorElement>(`a[href="#${CSS.escape(activeId)}"]`)
        : null;

      if (!link) {
        indicator.dataset.visible = "false";
        return;
      }

      // Appearing after being hidden: jump into place instead of sliding from
      // wherever the marker was last.
      const wasHidden = indicator.dataset.visible !== "true";
      if (wasHidden) indicator.style.transition = "none";
      indicator.style.setProperty("--indicator-y", `${link.offsetTop}px`);
      indicator.style.setProperty("--indicator-h", `${link.offsetHeight}px`);
      if (wasHidden) {
        void indicator.offsetHeight;
        indicator.style.transition = "";
      }
      indicator.dataset.visible = "true";
    };

    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [activeId]);

  if (toc.length === 0) return null;

  const links = (
    <ol>
      {toc.map((item) => (
        <li key={item.id} data-level={item.level}>
          <a
            href={`#${item.id}`}
            aria-current={item.id === activeId ? "location" : undefined}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <details className="blog-toc-mobile">
        <summary>{label}</summary>
        {links}
      </details>
      <aside className="blog-toc-desktop" aria-label={ariaLabel}>
        <p>{label}</p>
        <div ref={trackRef} className="blog-toc-track">
          <span ref={indicatorRef} className="blog-toc-indicator" aria-hidden="true" />
          {links}
        </div>
      </aside>
    </>
  );
}

/**
 * The current section is the last heading that has scrolled past the reading
 * line. Once the page bottom is reached the final heading wins, even if it is
 * too close to the end to ever cross the line.
 */
function useActiveHeading(toc: BlogTocItem[]) {
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const headings = toc
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => heading !== null);
    if (headings.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * READING_LINE;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      let current: string | undefined;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= line) current = heading.id;
        else break;
      }
      if (atBottom && window.scrollY > 0) current = headings[headings.length - 1].id;

      setActiveId(current);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [toc]);

  return activeId;
}
