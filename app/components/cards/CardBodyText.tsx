import { ReactNode } from "react";

interface CardBodyTextProps {
  children: ReactNode;
  className?: string;
}

export function CardBodyText({ children, className = "" }: CardBodyTextProps) {
  return (
    <p className={`text-white/80 leading-relaxed text-[15px] ${className}`}>
      {children}
    </p>
  );
}
