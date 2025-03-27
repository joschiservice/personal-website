import { ReactNode } from "react";

interface SectionBodyTextProps {
  children: ReactNode;
  className?: string;
}

export function SectionBodyText({ children, className }: SectionBodyTextProps) {
  return (
    <p className={`text-white/80 leading-relaxed text-base sm:text-lg max-w-prose mx-auto ${className}`}>
      {children}
    </p>
  );
}
