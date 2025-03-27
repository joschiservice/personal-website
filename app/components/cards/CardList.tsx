import { ReactNode } from "react";
import { CardBodyText } from "./CardBodyText";

interface CardListProps {
  items: string[] | ReactNode[];
  className?: string;
}

export function CardList({ items, className = "" }: CardListProps) {
  return (
    <ul className={`space-y-2.5 list-none ${className}`}>
      {items.map((item, index) => (
        <li className="flex items-start" key={index}>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mt-1.5 mr-3"></div>
          {typeof item === "string" ? (
            <CardBodyText className="flex-1">{item}</CardBodyText>
          ) : (
            <div className="flex-1">{item}</div>
          )}
        </li>
      ))}
    </ul>
  );
}
