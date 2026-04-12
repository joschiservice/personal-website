"use client";

import { useId, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "./TimelineSection.module.css";

export function ExperienceDetails({ tasks }: { tasks?: string[] }) {
  if (!tasks?.length) return null;

  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  // Native <details> closes immediately when `open` is removed, which prevents
  // the panel collapse transition from playing consistently across browsers.
  return (
    <div
      className={styles.detailsDisclosure}
      data-open={isOpen ? "true" : "false"}
    >
      <button
        type="button"
        className={styles.detailsSummary}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        <span className={styles.detailsSummaryMeta}>
          Read more
          <FaChevronDown className={styles.detailsIcon} aria-hidden="true" />
        </span>
      </button>

      <div
        id={panelId}
        className={styles.detailsPanel}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className={styles.detailsPanelInner}>
          <ul className={`${styles.detailsPanelContent} ${styles.detailsList}`}>
            {tasks.map((task) => (
              <li key={task} className={`${styles.detailsListItem} text-[15px] leading-7`}>
                {task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
