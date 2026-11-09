"use client";

import { useEffect, useRef } from "react";
import styles from "./TimelineSection.module.css";

const COUNT_DURATION_MS = 800;
/** Matches the cross-out and wipe-in transitions in TimelineSection.module.css. */
const REPLACE_DURATION_MS = 820;
const GAP_BETWEEN_STATS_MS = 120;
const IMPROVEMENT_SEPARATOR = " → ";

function parseCount(text: string) {
  const match = /^(\D*)(\d[\d,]*)(.*)$/u.exec(text);
  if (!match) return null;

  const [, prefix = "", digits = "", suffix = ""] = match;
  return { prefix, digits, suffix };
}

function getPlayTime(value: string) {
  const [before = value, after] = value.split(IMPROVEMENT_SEPARATOR);

  return (
    (parseCount(before) ? COUNT_DURATION_MS : 0) +
    (after === undefined ? 0 : REPLACE_DURATION_MS) +
    GAP_BETWEEN_STATS_MS
  );
}

/**
 * Counts a stat's number up when it scrolls into view. An improvement such as
 * "10+ min → seconds" then crosses out the old value and wipes in the new one.
 * A row of stats plays one after another, so each waits for those before it.
 * The server renders the finished value, so it's complete without JavaScript.
 */
export function ImpactValue({
  value,
  earlierValues,
}: {
  value: string;
  earlierValues: readonly string[];
}) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  const [before = value, after] = value.split(IMPROVEMENT_SEPARATOR);
  const count = parseCount(before);
  const sequenceDelay = earlierValues.reduce((total, earlier) => total + getPlayTime(earlier), 0);

  useEffect(() => {
    const root = rootRef.current;
    const number = numberRef.current;
    if (
      !root ||
      (!number && !after) ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    let startTimer: ReturnType<typeof setTimeout> | undefined;
    const finalDigits = number?.textContent ?? "";
    const groupDigits = finalDigits.includes(",");
    const target = Number(finalDigits.replaceAll(",", ""));

    const finish = () => {
      if (number) number.textContent = finalDigits;
      delete root.dataset.state;
    };

    const countUp = (startedAt: number, now: number) => {
      if (!number) return;

      const progress = Math.min((now - startedAt) / COUNT_DURATION_MS, 1);
      if (progress === 1) {
        finish();
        return;
      }

      const eased = 1 - (1 - progress) ** 3;
      const current = Math.round(target * eased);
      number.textContent = groupDigits ? current.toLocaleString("en-US") : String(current);
      frame = window.requestAnimationFrame((time) => countUp(startedAt, time));
    };

    const start = () => {
      root.dataset.state = "playing";

      if (!number) {
        finish();
        return;
      }
      frame = window.requestAnimationFrame((time) => countUp(time, time));
    };

    root.dataset.state = "waiting";
    if (number) number.textContent = "0";

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        startTimer = setTimeout(start, sequenceDelay);
      },
      { rootMargin: "0px 0px -12%", threshold: 0.2 }
    );
    observer.observe(root.closest("dl") ?? root);

    return () => {
      observer.disconnect();
      clearTimeout(startTimer);
      window.cancelAnimationFrame(frame);
      finish();
    };
  }, [after, sequenceDelay]);

  const beforeContent = count ? (
    <>
      {count.prefix}
      <span ref={numberRef} className={styles.impactNumber}>
        {count.digits}
      </span>
      {count.suffix}
    </>
  ) : (
    before
  );

  if (after === undefined) {
    return (
      <span ref={rootRef} className={styles.impactValue}>
        {beforeContent}
      </span>
    );
  }

  return (
    <span ref={rootRef} className={`${styles.impactValue} ${styles.improvement}`}>
      <s className={styles.improvementBefore}>{beforeContent}</s>
      <span className="sr-only">{IMPROVEMENT_SEPARATOR}</span>{" "}
      <span className={styles.improvementAfter}>{after}</span>
    </span>
  );
}
