const dateFormatters = new Map<
  string,
  { full: Intl.DateTimeFormat; month: Intl.DateTimeFormat }
>();

function getDateFormatters(locale: string) {
  const cached = dateFormatters.get(locale);
  if (cached) return cached;

  const formatters = {
    full: new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }),
    month: new Intl.DateTimeFormat(locale, { month: "short" }),
  };
  dateFormatters.set(locale, formatters);
  return formatters;
}

export function getFormattedTimeSpan(
  start: Date,
  end?: Date,
  locale = "en",
  presentLabel = "Present"
) {
  const { full, month } = getDateFormatters(locale);
  if (!end) {
    return `${full.format(start)} – ${presentLabel}`;
  }

  if (start.getFullYear() === end.getFullYear()) {
    if (start.getMonth() === end.getMonth()) {
      return full.format(start);
    }

    return `${month.format(start)} – ${full.format(end)}`;
  }

  return `${full.format(start)} – ${full.format(end)}`;
}
