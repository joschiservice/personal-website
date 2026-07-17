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
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  icon?: "arrow" | "download";
  target?: "_blank";
  ariaLabel?: string;
}) {
  const content = (
    <>
      <span>{children}</span>
      {icon === "download" ? (
        <HiOutlineArrowDownTray aria-hidden="true" />
      ) : (
        <HiArrowRight aria-hidden="true" />
      )}
    </>
  );

  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        target={target}
        rel={target ? "noreferrer" : undefined}
        className={`action-link action-link--${variant}`}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      target={target}
      rel={target ? "noreferrer" : undefined}
      className={`action-link action-link--${variant}`}
      aria-label={ariaLabel}
    >
      {content}
    </Link>
  );
}
