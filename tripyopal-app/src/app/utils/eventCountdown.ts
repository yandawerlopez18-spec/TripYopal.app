import { parseEventDate } from "./eventDate";

export type Countdown = { days: number; hours: number; minutes: number; seconds: number; started: boolean };

/** Combines an event's date + free-text time ("9:00 p. m.") into a real Date, for a live countdown. */
export function parseEventDateTime(dateStr: string, timeStr?: string): Date | null {
  const parsedDate = parseEventDate(dateStr);
  if (!parsedDate) return null;

  const year = parsedDate.year ?? new Date().getFullYear();

  let hour = 0;
  let minute = 0;

  if (timeStr) {
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*([ap])/i);
    if (match) {
      hour = Number(match[1]) % 12;
      minute = Number(match[2]);
      if (match[3].toLowerCase() === "p") hour += 12;
    }
  }

  return new Date(year, parsedDate.monthIndex, parsedDate.day, hour, minute, 0);
}

export function computeCountdown(target: Date | null): Countdown {
  if (!target) return { days: 0, hours: 0, minutes: 0, seconds: 0, started: true };

  const diffMs = target.getTime() - Date.now();
  if (diffMs <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, started: true };

  const totalSeconds = Math.floor(diffMs / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    started: false,
  };
}
