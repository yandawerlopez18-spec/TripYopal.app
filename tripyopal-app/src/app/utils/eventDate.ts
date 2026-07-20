import type { EventItem } from "../types";

export const MONTH_NAMES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export type ParsedEventDate = { day: number; monthIndex: number };

export function parseEventDate(dateStr: string): ParsedEventDate | null {
  const dayMatch = dateStr.match(/(\d{1,2})/);
  if (!dayMatch) return null;

  const lower = dateStr.toLowerCase();
  const monthIndex = MONTH_NAMES.findIndex((month) => lower.includes(month));
  if (monthIndex === -1) return null;

  return { day: Number(dayMatch[1]), monthIndex };
}

export function getNextUpcomingEvent(events: EventItem[]): EventItem | null {
  const now = new Date();
  const todayOrdinal = now.getMonth() * 31 + now.getDate();

  const parsed = events
    .map((event) => ({ event, parsed: parseEventDate(event.date) }))
    .filter((entry): entry is { event: EventItem; parsed: ParsedEventDate } => entry.parsed !== null);

  if (parsed.length === 0) return null;

  const withDistance = parsed.map((entry) => {
    const ordinal = entry.parsed.monthIndex * 31 + entry.parsed.day;
    const distance = ordinal >= todayOrdinal ? ordinal - todayOrdinal : ordinal - todayOrdinal + 12 * 31;
    return { ...entry, distance };
  });

  withDistance.sort((a, b) => a.distance - b.distance);

  return withDistance[0].event;
}
