import { parseEventDate, type ParsedEventDate } from "./eventDate";
import type { VenueEvent } from "../services/prestadores";

export type SplitVenueEvents = {
  /** Not yet happened, soonest first. Events with an unparseable date are kept at the end. */
  upcoming: VenueEvent[];
  /** Already happened, most recently passed first. */
  past: VenueEvent[];
};

function eventTime(parsed: ParsedEventDate, now: Date): number {
  const year = parsed.year ?? now.getFullYear();
  return new Date(year, parsed.monthIndex, parsed.day).getTime();
}

/**
 * Splits a venue's events into upcoming (soonest first) and past (most recently
 * passed first), based on today's date. Used so business detail pages can show
 * upcoming events separately and automatically archive expired ones into a gallery.
 */
export function splitVenueEvents(events: VenueEvent[]): SplitVenueEvents {
  const now = new Date();
  const todayTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const upcoming: { event: VenueEvent; time: number }[] = [];
  const past: { event: VenueEvent; time: number }[] = [];
  const unparsed: VenueEvent[] = [];

  for (const event of events) {
    const parsed = parseEventDate(event.date);
    if (!parsed) {
      unparsed.push(event);
      continue;
    }
    const time = eventTime(parsed, now);
    if (time < todayTime) {
      past.push({ event, time });
    } else {
      upcoming.push({ event, time });
    }
  }

  upcoming.sort((a, b) => a.time - b.time);
  past.sort((a, b) => b.time - a.time);

  return {
    upcoming: [...upcoming.map((entry) => entry.event), ...unparsed],
    past: past.map((entry) => entry.event),
  };
}
