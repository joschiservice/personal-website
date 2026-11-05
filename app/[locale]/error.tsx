"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { Container } from "@/app/components/system/Container";
import { statusCopy } from "@/app/i18n/statusCopy";
import { useRouteLocale } from "@/app/i18n/useRouteLocale";
import styles from "../components/system/LegalPage.module.css";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const copy = statusCopy[useRouteLocale()].error;

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className={styles.root}>
      <Container>
        <p className="system-label">{copy.label}</p>
        <h1>{copy.title}</h1>
        <button type="button" className="action-link action-link--primary" onClick={retry}>
          <span>{copy.retry}</span>
          <HiOutlineArrowPath aria-hidden="true" />
        </button>
      </Container>
    </div>
  );
}
