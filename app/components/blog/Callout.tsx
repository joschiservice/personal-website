import type { ReactNode } from "react";
import { HiOutlineSparkles } from "react-icons/hi2";
import styles from "./Callout.module.css";

export function Callout({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className={styles.root}>
      <HiOutlineSparkles aria-hidden="true" />
      <div>
        {title ? <strong>{title}</strong> : null}
        <div>{children}</div>
      </div>
    </aside>
  );
}
