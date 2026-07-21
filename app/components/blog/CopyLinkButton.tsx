"use client";

import { useEffect, useRef, useState } from "react";
import { HiOutlineCheck, HiOutlineExclamationTriangle, HiOutlineLink } from "react-icons/hi2";

type CopyStatus = "idle" | "copied" | "failed";

export function CopyLinkButton({
  label = "Copy link",
  copiedLabel = "Copied",
  failedLabel = "Copy failed",
}: {
  label?: string;
  copiedLabel?: string;
  failedLabel?: string;
}) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(
    () => () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    },
    []
  );

  async function copyLink() {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(window.location.href);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }

    resetTimerRef.current = setTimeout(() => setStatus("idle"), 1800);
  }

  const currentLabel =
    status === "copied" ? copiedLabel : status === "failed" ? failedLabel : label;

  return (
    <button
      type="button"
      onClick={copyLink}
      className="blog-copy-link"
      aria-live="polite"
    >
      {status === "copied" ? (
        <HiOutlineCheck aria-hidden="true" />
      ) : status === "failed" ? (
        <HiOutlineExclamationTriangle aria-hidden="true" />
      ) : (
        <HiOutlineLink aria-hidden="true" />
      )}
      {currentLabel}
    </button>
  );
}
