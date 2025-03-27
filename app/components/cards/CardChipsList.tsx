interface CardChipsListProps {
  items: string[];
  color?: "blue" | "teal" | "purple";
  className?: string;
}

export function CardChipsList({
  items,
  color = "blue",
  className = "",
}: CardChipsListProps) {
  const colorStyles = {
    blue: "bg-blue-900/30 text-blue-200/90 border-blue-500/20 hover:border-blue-400/30 hover:bg-blue-800/30",
    teal: "bg-teal-900/20 text-teal-200/90 border-teal-500/20 hover:border-teal-400/30 hover:bg-teal-800/30",
    purple: "bg-purple-900/30 text-purple-200/90 border-purple-500/20 hover:border-purple-400/30 hover:bg-purple-800/30",
  };

  return (
    <div className={`flex flex-wrap gap-1.5 sm:gap-2 ${className}`}>
      {items.map((item, pos) => (
        <div
          key={pos}
          className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-md text-xs sm:text-sm border transition-colors ${colorStyles[color]}`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
