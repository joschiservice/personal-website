import { ReactNode } from "react";
import { FiExternalLink } from "react-icons/fi";
import { OptionalLink } from "../OptionalLink";

interface CardTitleProps {
  title: string;
  link?: string;
  color?: "blue" | "purple" | "emerald" | "amber" | "teal";
  children?: ReactNode;
}

export function CardTitle({
  title,
  link,
  color = "blue",
  children,
}: CardTitleProps) {
  return (
    <>
      <OptionalLink
        href={link}
        className={`text-xl sm:text-2xl font-medium text-white hover:text-${color}-200/90 transition-colors duration-300 flex items-center`}
      >
        <span className="flex-1 break-words">{title}</span>
        {link && (
          <FiExternalLink className={`ml-2 flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 text-${color}-400/70`} />
        )}
      </OptionalLink>
      {children}
    </>
  );
}
