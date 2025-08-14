"use client"

import Link from "next/link";

interface Props {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function OptionalLink({href, children, className = "text-white no-underline transition-colors duration-300 ease-in-out hover:text-[#29b5f6] flex items-center"}: Props) {
  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {children}
      </Link>
    );
  }

  return children;
}