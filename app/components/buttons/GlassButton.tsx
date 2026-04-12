import { ReactNode } from "react"
import styles from "./GlassButton.module.css"

interface GlassButtonProps {
  href: string
  children: ReactNode
  icon?: ReactNode
  target?: string
  ariaLabel?: string
  color?: "blue" | "white"
  onClick?: () => void
}

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ")
}

export function GlassButton({
  href,
  children,
  icon,
  target,
  ariaLabel,
  color = "blue",
  onClick
}: GlassButtonProps) {
  const newTabDescriptionId = `${ariaLabel?.replace(/\s+/g, "-").toLowerCase() || "link"}-new-tab`

  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noreferrer" : undefined}
      aria-describedby={target === "_blank" ? newTabDescriptionId : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      className={classNames(styles.root, styles[color])}
    >
      <span aria-hidden="true" className={styles.topline}></span>
      <span aria-hidden="true" className={styles.reflectionPrimary}></span>
      <span aria-hidden="true" className={styles.reflectionSecondary}></span>

      <span className={styles.content}>
        {icon && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}
        <span className={styles.label}>{children}</span>
      </span>

      {target === "_blank" && (
        <span id={newTabDescriptionId} className="sr-only">
          (opens in a new tab)
        </span>
      )}
    </a>
  )
}
