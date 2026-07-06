"use client";

import { useState } from "react";
import { HiOutlineCheck, HiOutlineLink } from "react-icons/hi2";

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copyLink}
      className="blog-copy-link"
      aria-live="polite"
    >
      {copied ? (
        <HiOutlineCheck aria-hidden="true" />
      ) : (
        <HiOutlineLink aria-hidden="true" />
      )}
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
