"use client";

import { useEffect, useRef, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import {
  HiArrowRight,
  HiArrowUpRight,
  HiCheck,
  HiClipboard,
  HiEnvelope,
  HiExclamationTriangle,
} from "react-icons/hi2";
import type { Dictionary } from "@/app/i18n/getDictionary";

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
      ? HiCheck
      : copyState === "failed"
        ? HiExclamationTriangle
        : HiClipboard;

  return (
    <div className="contact-channels">
      <article className="contact-channel contact-channel--email">
        <div className="contact-channel__topline">
          <span className="contact-channel__index">01 / {copy.emailLabel}</span>
          <span className="contact-channel__priority">{copy.primaryChannel}</span>
        </div>

        <div className="contact-channel__body">
          <span className="contact-channel__icon" aria-hidden="true">
            <HiEnvelope />
          </span>
          <div>
            <h3>{copy.emailTitle}</h3>
            <p>{copy.emailIntro}</p>
          </div>
        </div>

        {email ? (
          <div className="contact-channel__email-actions">
            <a href={`mailto:${email}`} className="contact-channel__email-link">
              <span>{email}</span>
              <span className="contact-channel__arrow" aria-hidden="true">
                <HiArrowRight />
              </span>
            </a>
            <button
              type="button"
              className="contact-channel__copy"
              data-state={copyState}
              onClick={copyEmail}
              aria-live="polite"
            >
              <CopyIcon aria-hidden="true" />
              <span>{copyLabel}</span>
            </button>
          </div>
        ) : (
          <p className="contact-channel__unavailable">{copy.unavailable}</p>
        )}
      </article>

      <div className="contact-proof" aria-label={copy.proofLabel}>
        {linkedin ? (
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="contact-channel contact-channel--proof contact-channel--linkedin"
            aria-label={`LinkedIn · ${newTabLabel}`}
          >
            <span className="contact-channel__index">02 / {copy.professionalProfile}</span>
            <span className="contact-channel__icon" aria-hidden="true">
              <FaLinkedinIn />
            </span>
            <span className="contact-channel__proof-copy">
              <strong>LinkedIn</strong>
              <small>{copy.socials.linkedin}</small>
              <em>{copy.linkedinProof}</em>
            </span>
            <span className="contact-channel__arrow" aria-hidden="true">
              <HiArrowUpRight />
            </span>
          </a>
        ) : null}

        {github ? (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="contact-channel contact-channel--proof contact-channel--github"
            aria-label={`GitHub · ${newTabLabel}`}
          >
            <span className="contact-channel__index">03 / {copy.buildingInPublic}</span>
            <span className="contact-channel__icon" aria-hidden="true">
              <FaGithub />
            </span>
            <span className="contact-channel__proof-copy">
              <strong>GitHub</strong>
              <small>{copy.socials.github}</small>
              <em>{copy.githubProof}</em>
            </span>
            <span className="contact-channel__arrow" aria-hidden="true">
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
          className="contact-personal-link"
          aria-label={`Instagram · ${newTabLabel}`}
        >
          <span className="contact-personal-link__label">
            <FaInstagram aria-hidden="true" />
            {copy.personalLabel}
          </span>
          <span>{copy.socials.instagram}</span>
          <span className="contact-personal-link__action">
            Instagram
            <HiArrowUpRight aria-hidden="true" />
          </span>
        </a>
      ) : null}
    </div>
  );
}
