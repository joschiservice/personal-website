import type { ElementType, ReactNode } from "react";

export function Container<T extends ElementType = "div">({
  as,
  className = "",
  children,
}: {
  as?: T;
  className?: string;
  children: ReactNode;
}) {
  const Component = as ?? "div";
  return <Component className={`site-container ${className}`}>{children}</Component>;
}
