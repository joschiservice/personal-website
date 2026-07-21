import Link from "next/link";
import type { ReactNode } from "react";
import { HiArrowRight, HiOutlineArrowDownTray } from "react-icons/hi2";

export function ActionLink({
  href,
  children,
  variant = "primary",
  icon = "arrow",
  target,
  ariaLabel,
  newTabLabel = "opens in a new tab",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  icon?: "arrow" | "download";
  target?: "_blank";
  ariaLabel?: string;
  newTabLabel?: string;
}) {
  const resolvedAriaLabel = target === "_blank" && ariaLabel
    ? `${ariaLabel} · ${newTabLabel}`
    : ariaLabel;
  const content = (
    <>
      <span>{children}</span>
      {icon === "download" ? (
        <HiOutlineArrowDownTray aria-hidden="true" />
      ) : (
        <HiArrowRight aria-hidden="true" />
      )}
      {target === "_blank" && !ariaLabel ? (
        <span className="sr-only"> · {newTabLabel}</span>
      ) : null}
    </>
  );

  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        target={target}
        rel={target ? "noopener noreferrer" : undefined}
        className={`action-link action-link--${variant}`}
        aria-label={resolvedAriaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      target={target}
      rel={target ? "noopener noreferrer" : undefined}
      className={`action-link action-link--${variant}`}
      aria-label={resolvedAriaLabel}
    >
      {content}
    </Link>
  );
}
