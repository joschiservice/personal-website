import dayjs from "dayjs";

export function getFormattedTimeSpan(start: Date, end?: Date) {
  if (!end) {
    return dayjs(start).format('MMM YYYY') + " - Present";
  }

  if (start.getFullYear() === end.getFullYear()) {
    if (start.getMonth() === end.getMonth()) {
      return dayjs(start).format('MMM YYYY');
    }

    return dayjs(start).format('MMM') + " - " + dayjs(end).format('MMM YYYY')
  }

  return dayjs(start).format('MMM YYYY') + " - " + dayjs(end).format('MMM YYYY');
}