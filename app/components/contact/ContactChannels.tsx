"use client";

import { useEffect, useRef, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import {
  HiArrowRight,
  HiArrowUpRight,
  HiEnvelope,
  HiOutlineCheck,
  HiOutlineClipboard,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import type { Dictionary } from "@/app/i18n/getDictionary";
import styles from "./contact.module.css";

type CopyState = "idle" | "copied" | "failed";

type ContactChannelsProps = {
  copy: Dictionary["contact"];
  email?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  newTabLabel: string;
};

export function ContactChannels({
  copy,
  email,
  linkedin,
  github,
  instagram,
  newTabLabel,
}: ContactChannelsProps) {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(
    () => () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    },
    []
  );

  async function copyEmail() {
    if (!email) return;
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }

    resetTimerRef.current = setTimeout(() => setCopyState("idle"), 1800);
  }

  const copyLabel =
    copyState === "copied"
      ? copy.copied
      : copyState === "failed"
        ? copy.copyFailed
        : copy.copyEmail;

  const CopyIcon =
    copyState === "copied"
      ? HiOutlineCheck
      : copyState === "failed"
        ? HiOutlineExclamationTriangle
        : HiOutlineClipboard;

  return (
    <div className={styles.channels}>
      <article className={`${styles.channel} ${styles.channelEmail}`}>
        <div className={styles.channelTopline}>
          <span className={styles.channelIndex}>{copy.emailLabel}</span>
          <span className={styles.channelPriority}>{copy.primaryChannel}</span>
        </div>

        <div className={styles.channelBody}>
          <span className={styles.channelIcon} aria-hidden="true">
            <HiEnvelope />
          </span>
          <div>
            <h3>{copy.emailTitle}</h3>
            <p>{copy.emailIntro}</p>
          </div>
        </div>

        {email ? (
          <div className={styles.channelEmailActions}>
            <a href={`mailto:${email}`} className={styles.channelEmailLink}>
              <span>{email}</span>
              <span className={styles.channelArrow} aria-hidden="true">
                <HiArrowRight />
              </span>
            </a>
            <button
              type="button"
              className={styles.channelCopy}
              data-state={copyState}
              onClick={copyEmail}
              aria-live="polite"
            >
              <CopyIcon aria-hidden="true" />
              <span>{copyLabel}</span>
            </button>
          </div>
        ) : (
          <p className={styles.channelUnavailable}>{copy.unavailable}</p>
        )}
      </article>

      <div className={styles.proof} aria-label={copy.proofLabel}>
        {linkedin ? (
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className={`${styles.channel} ${styles.channelProof} ${styles.channelLinkedin}`}
            aria-label={`LinkedIn · ${newTabLabel}`}
          >
            <span className={styles.channelIndex}>{copy.professionalProfile}</span>
            <span className={styles.channelIcon} aria-hidden="true">
              <FaLinkedinIn />
            </span>
            <span className={styles.channelProofCopy}>
              <strong>LinkedIn</strong>
              <small>{copy.socials.linkedin}</small>
              <em>{copy.linkedinProof}</em>
            </span>
            <span className={styles.channelArrow} aria-hidden="true">
              <HiArrowUpRight />
            </span>
          </a>
        ) : null}

        {github ? (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className={`${styles.channel} ${styles.channelProof} ${styles.channelGithub}`}
            aria-label={`GitHub · ${newTabLabel}`}
          >
            <span className={styles.channelIndex}>{copy.buildingInPublic}</span>
            <span className={styles.channelIcon} aria-hidden="true">
              <FaGithub />
            </span>
            <span className={styles.channelProofCopy}>
              <strong>GitHub</strong>
              <small>{copy.socials.github}</small>
              <em>{copy.githubProof}</em>
            </span>
            <span className={styles.channelArrow} aria-hidden="true">
              <HiArrowUpRight />
            </span>
          </a>
        ) : null}
      </div>

      {instagram ? (
        <a
          href={instagram}
          target="_blank"
          rel="noreferrer"
          className={styles.personalLink}
          aria-label={`Instagram · ${newTabLabel}`}
        >
          <span className={styles.personalLinkLabel}>
            <FaInstagram aria-hidden="true" />
            {copy.personalLabel}
          </span>
          <span>{copy.socials.instagram}</span>
          <span className={styles.personalLinkAction}>
            Instagram
            <HiArrowUpRight aria-hidden="true" />
          </span>
        </a>
      ) : null}
    </div>
  );
}
