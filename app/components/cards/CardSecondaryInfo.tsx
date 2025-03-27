import { getFormattedTimeSpan } from "../../lib/date";

interface CardSecondaryInfoProps {
  start: Date;
  end?: Date;
  subTitle: string;
}

export function CardSecondaryInfo({
  start,
  end,
  subTitle,
}: CardSecondaryInfoProps) {
  return (
    <div className="w-full md:w-[180px] shrink-0">
      <div className="text-white/90 font-medium text-lg sm:text-xl mb-1 sm:mb-2">
        {getFormattedTimeSpan(start, end)}
      </div>
      <p className="text-blue-300/70 font-medium text-sm sm:text-base">{subTitle}</p>
    </div>
  );
}
