import { ReactNode } from "react";
import { CardBodyText } from "./CardBodyText";

interface CardListProps {
  items: string[] | ReactNode[];
  className?: string;
}

export function CardList({ items, className = "" }: CardListProps) {
  return (
    <ul
      className={`list-disc pl-5 space-y-2.5 marker:text-blue-400/60 marker:text-[1.2em] ${className}`}
    >
      {items.map((item, index) => (
        <li key={index}>
          {typeof item === "string" ? (
            <CardBodyText>{item}</CardBodyText>
          ) : (
            item
          )}
        </li>
      ))}
    </ul>
  );
}




