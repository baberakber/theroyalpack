/** Saudi Arabia official time (AST, UTC+3) — not UTC+5 */
export const SAUDI_TIMEZONE = 'Asia/Riyadh';

const WEEKDAY_TO_INDEX: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export function getRiyadhDayHourMinute(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: SAUDI_TIMEZONE,
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(date);

  const weekdayName = parts.find((p) => p.type === 'weekday')?.value ?? 'Sunday';
  const hour = parseInt(parts.find((p) => p.type === 'hour')?.value ?? '0', 10);
  const minute = parseInt(parts.find((p) => p.type === 'minute')?.value ?? '0', 10);

  return {
    dayIndex: WEEKDAY_TO_INDEX[weekdayName] ?? 0,
    hour,
    minute,
    weekdayName,
  };
}

/**
 * Mon–Sun 8:00–18:00 AST except Friday (closed).
 */
export function isOpenNowInRiyadh(date = new Date()): boolean {
  const { dayIndex, hour } = getRiyadhDayHourMinute(date);
  if (dayIndex === 5) return false;
  return hour >= 8 && hour < 18;
}

export function formatRiyadhDateTime(locale: string, date = new Date()): string {
  const loc = locale === 'ar' ? 'ar-SA' : 'en-GB';
  return new Intl.DateTimeFormat(loc, {
    timeZone: SAUDI_TIMEZONE,
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  }).format(date);
}
