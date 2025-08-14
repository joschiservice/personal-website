import { ReactNode } from "react";
import { FiExternalLink } from "react-icons/fi";
import { OptionalLink } from "../OptionalLink";

interface CardTitleProps {
  title: string;
  link?: string;
  color?: "blue" | "purple" | "emerald" | "amber" | "teal";
  children?: ReactNode;
}

const hoverTextColorByTheme: Record<NonNullable<CardTitleProps["color"]>, string> = {
  blue: "hover:text-blue-200/90",
  purple: "hover:text-purple-200/90",
  emerald: "hover:text-emerald-200/90",
  amber: "hover:text-amber-200/90",
  teal: "hover:text-teal-200/90",
};

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
        className={`text-xl sm:text-2xl font-medium text-white transition-colors duration-300 flex items-center ${hoverTextColorByTheme[color]}`}
      >
        <span className="flex-1 break-words">{title}</span>
        {link && (
          <FiExternalLink className="ml-2 flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 opacity-90 transition-colors" />
        )}
      </OptionalLink>
      {children}
    </>
  );
}
