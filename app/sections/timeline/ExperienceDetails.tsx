"use client";

import { useId, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import styles from "./TimelineSection.module.css";

/**
 * Animating a disclosure's grid row reflows the career section on every frame.
 * Some browsers leave stale paint trails from its 1px bottom border while that
 * boundary moves. Temporarily locking the section to the transition's target
 * height lets the panel keep its smooth animation while the border moves once.
 * The shared lock also prevents overlapping disclosures from releasing it early.
 */
const SECTION_LOCK_FALLBACK_MS = 400;
const sectionLocks = new WeakMap<
  HTMLElement,
  { owner: HTMLDivElement; timer: ReturnType<typeof setTimeout> }
>();

function unlockSection(section: HTMLElement, owner: HTMLDivElement) {
  const lock = sectionLocks.get(section);
  if (!lock || lock.owner !== owner) return;

  clearTimeout(lock.timer);
  section.style.minHeight = "";
  sectionLocks.delete(section);
}

export function ExperienceDetails({
  tasks,
  label,
}: {
  tasks?: readonly string[];
  label: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const detailsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  if (!tasks?.length) return null;

  const toggleDetails = () => {
    const nextIsOpen = !isOpen;
    const section = detailsRef.current?.closest<HTMLElement>(".career-section");
    const panel = panelRef.current;

    if (!section || !panel) {
      setIsOpen(nextIsOpen);
      return;
    }

    const pendingLock = sectionLocks.get(section);
    if (pendingLock) clearTimeout(pendingLock.timer);

    section.style.minHeight = "";
    const currentSectionHeight = section.getBoundingClientRect().height;
    const currentPanelHeight = panel.getBoundingClientRect().height;
    // A collapsed 0fr grid reports no panel scroll height, but its list retains
    // the exact intrinsic (including fractional-pixel) expanded height.
    const expandedPanelHeight =
      panel.firstElementChild?.firstElementChild?.getBoundingClientRect().height ??
      panel.firstElementChild?.scrollHeight ??
      0;
    const targetSectionHeight = nextIsOpen
      ? currentSectionHeight + expandedPanelHeight - currentPanelHeight
      : currentSectionHeight - currentPanelHeight;

    section.style.minHeight = `${Math.max(currentSectionHeight, targetSectionHeight)}px`;
    setIsOpen(nextIsOpen);

    const unlockTimer = setTimeout(() => {
      unlockSection(section, panel);
    }, SECTION_LOCK_FALLBACK_MS);
    sectionLocks.set(section, { owner: panel, timer: unlockTimer });
  };

  return (
    <div
      ref={detailsRef}
      className={styles.details}
      data-open={isOpen ? "true" : "false"}
    >
      <button
        type="button"
        onClick={toggleDetails}
        aria-expanded={isOpen}
        aria-controls={id}
      >
        {label}
        <HiChevronDown aria-hidden="true" />
      </button>
      <div
        ref={panelRef}
        id={id}
        className={styles.detailsPanel}
        aria-hidden={!isOpen}
        inert={!isOpen}
        onTransitionEnd={(event) => {
          if (
            event.target !== event.currentTarget ||
            event.propertyName !== "grid-template-rows"
          ) {
            return;
          }

          const section = detailsRef.current?.closest<HTMLElement>(".career-section");
          if (section) unlockSection(section, event.currentTarget);
        }}
      >
        <div className={styles.detailsPanelInner}>
          <ul>
            {tasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
