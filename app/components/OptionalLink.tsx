"use client"

import Link from "next/link";

interface Props {
  href?: string;
  children: React.ReactNode;
}

export function OptionalLink({href, children}: Props) {
  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        className="text-white no-underline transition-colors duration-300 ease-in-out hover:text-[#29b5f6] flex items-center"
      >
        {children}
      </Link>
    );
  }

  return children;
}