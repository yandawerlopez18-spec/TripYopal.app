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

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/** year is null for legacy free-text dates ("15 julio") that carry no year info. */
export type ParsedEventDate = { day: number; monthIndex: number; year: number | null };

const ISO_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function parseEventDate(dateStr: string): ParsedEventDate | null {
  const isoMatch = dateStr.match(ISO_DATE_RE);
  if (isoMatch) {
    return { year: Number(isoMatch[1]), monthIndex: Number(isoMatch[2]) - 1, day: Number(isoMatch[3]) };
  }

  const dayMatch = dateStr.match(/(\d{1,2})/);
  if (!dayMatch) return null;

  const lower = dateStr.toLowerCase();
  const monthIndex = MONTH_NAMES.findIndex((month) => lower.includes(month));
  if (monthIndex === -1) return null;

  return { day: Number(dayMatch[1]), monthIndex, year: null };
}

/** Converts a stored event date (ISO or legacy free text) into a human-readable Spanish string. */
export function formatEventDate(dateStr: string): string {
  const parsed = parseEventDate(dateStr);
  if (!parsed || parsed.year === null) return dateStr;

  const date = new Date(parsed.year, parsed.monthIndex, parsed.day);
  return date.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Returns events that haven't happened yet, soonest first. An event whose date has
 * already passed is dropped entirely (not carried over to "next year") — as soon as
 * one expires, whichever event was next in line moves up to fill its spot.
 */
export function getUpcomingEvents(events: EventItem[], limit?: number): EventItem[] {
  const now = new Date();
  const todayOrdinal = now.getMonth() * 31 + now.getDate();
  const todayTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const parsed = events
    .map((event) => ({ event, parsed: parseEventDate(event.date) }))
    .filter((entry): entry is { event: EventItem; parsed: ParsedEventDate } => entry.parsed !== null);

  const withDistance = parsed
    .map((entry) => {
      if (entry.parsed.year !== null) {
        const eventTime = new Date(entry.parsed.year, entry.parsed.monthIndex, entry.parsed.day).getTime();
        return { ...entry, distance: eventTime - todayTime, expired: eventTime < todayTime };
      }

      // Legacy free-text dates ("15 julio") carry no year — assume the current year.
      const ordinal = entry.parsed.monthIndex * 31 + entry.parsed.day;
      const distanceDays = ordinal - todayOrdinal;
      return { ...entry, distance: distanceDays * ONE_DAY_MS, expired: distanceDays < 0 };
    })
    .filter((entry) => !entry.expired);

  withDistance.sort((a, b) => a.distance - b.distance);

  const sortedEvents = withDistance.map((entry) => entry.event);
  return limit ? sortedEvents.slice(0, limit) : sortedEvents;
}

export function getNextUpcomingEvent(events: EventItem[]): EventItem | null {
  return getUpcomingEvents(events, 1)[0] ?? null;
}
