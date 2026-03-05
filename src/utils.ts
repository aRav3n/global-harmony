export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const parseDate = (dateString: string): Date => {
  return new Date(dateString + 'T00:00:00');
};

export const convertToTimezone = (date: Date, timezone: string): Date => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return new Date(formatter.format(date));
};

export const getTimezoneAbbreviation = (timezone: string): string => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'short',
  });
  const parts = formatter.formatToParts(new Date());
  const timeZonePart = parts.find((p) => p.type === 'timeZoneName');
  return timeZonePart?.value || timezone;
};
