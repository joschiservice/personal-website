"use client"

import Link from "next/link";

interface Props {
  text: string;
  href: string;
}

export function TextLink({ text, href }: Props) {
  return (
    <Link
      href={href}
      className="text-white no-underline transition-colors duration-300 ease-in-out hover:text-[#29b5f6]"
    >
      {text}
    </Link>
  )
}