"use client";

import { useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import { HiChevronDown, HiOutlineArrowDownTray } from "react-icons/hi2";
import { ActionLink } from "@/app/components/system/ActionLink";

export function CvDownloadAction({
  locale,
  localizedCvAvailable,
  label,
  ariaLabel,
  menuLabel,
}: {
  locale: string;
  localizedCvAvailable: boolean;
  label: string;
  ariaLabel: string;
  menuLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pinnedOpenRef = useRef(false);

  if (!localizedCvAvailable || locale === "en") {
    return (
      <ActionLink
        href="/cv?lang=en"
        target="_blank"
        variant="secondary"
        icon="download"
        ariaLabel={ariaLabel}
      >
        {label}
      </ActionLink>
    );
  }

  const languageNames = new Intl.DisplayNames([locale], { type: "language" });
  const localizedLanguage = languageNames.of(locale) ?? locale.toUpperCase();
  const englishLanguage = languageNames.of("en") ?? "English";

  function closeWhenFocusLeaves(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      pinnedOpenRef.current = false;
      setOpen(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      pinnedOpenRef.current = false;
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    setOpen(true);

    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]')
    );
    const currentIndex = items.indexOf(document.activeElement as HTMLAnchorElement);
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? items.length - 1
        : event.key === "ArrowUp"
          ? currentIndex <= 0 ? items.length - 1 : currentIndex - 1
          : currentIndex >= items.length - 1 ? 0 : currentIndex + 1;

    requestAnimationFrame(() => items[nextIndex]?.focus());
  }

  return (
    <div
      className="cv-download"
      data-open={open}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        pinnedOpenRef.current = false;
        setOpen(false);
      }}
      onBlur={closeWhenFocusLeaves}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={triggerRef}
        type="button"
        className="action-link action-link--secondary cv-download__trigger"
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="cv-language-menu"
        onFocus={(event) => {
          if (event.currentTarget.matches(":focus-visible")) setOpen(true);
        }}
        onClick={() => {
          if (pinnedOpenRef.current) {
            pinnedOpenRef.current = false;
            setOpen(false);
            return;
          }

          pinnedOpenRef.current = true;
          setOpen(true);
        }}
      >
        <span>{label}</span>
        <HiChevronDown aria-hidden="true" />
      </button>
      <div
        id="cv-language-menu"
        className="cv-download__menu"
        role="menu"
        aria-label={menuLabel}
        aria-hidden={!open}
        hidden={!open}
      >
        <a href={`/cv?lang=${locale}`} target="_blank" rel="noreferrer" role="menuitem">
          <span>{localizedLanguage}</span>
          <HiOutlineArrowDownTray aria-hidden="true" />
        </a>
        <a href="/cv?lang=en" target="_blank" rel="noreferrer" role="menuitem">
          <span>{englishLanguage}</span>
          <HiOutlineArrowDownTray aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
