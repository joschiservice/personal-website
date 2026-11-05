"use client";

import { ActionLink } from "@/app/components/system/ActionLink";
import { Container } from "@/app/components/system/Container";
import { SpaceBackdrop } from "@/app/components/system/SpaceBackdrop";
import { localeHref } from "@/app/i18n/config";
import { statusCopy } from "@/app/i18n/statusCopy";
import { useRouteLocale } from "@/app/i18n/useRouteLocale";
import styles from "./LegalPage.module.css";

export function NotFoundContent() {
  const locale = useRouteLocale();
  const copy = statusCopy[locale].notFound;

  return (
    <div className={styles.root}>
      <SpaceBackdrop variant="legal" />
      <Container>
        <p className="system-label">{copy.label}</p>
        <h1>{copy.title}</h1>
        <ActionLink href={localeHref(locale, "/")}>{copy.action}</ActionLink>
      </Container>
    </div>
  );
}
