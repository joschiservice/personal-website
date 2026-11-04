"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { Container } from "@/app/components/system/Container";
import styles from "../components/system/LegalPage.module.css";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className={styles.root}>
      <Container>
        <p className="system-label">Error</p>
        <h1>Something went wrong on this page.</h1>
        <button type="button" className="action-link action-link--primary" onClick={retry}>
          <span>Try again</span>
          <HiOutlineArrowPath aria-hidden="true" />
        </button>
      </Container>
    </div>
  );
}
