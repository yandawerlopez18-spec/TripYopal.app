"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { featuredEvents } from "../../services/content";
import { sectionText } from "../../services/siteContent";
import { formatEventDate, getUpcomingEvents } from "../../utils/eventDate";
import { computeCountdown, parseEventDateTime, type Countdown } from "../../utils/eventCountdown";
import { CalendarIcon, ChevronRightIcon, ClockIcon, EventPinIcon } from "./infoIcons";

/**
 * Unlike getNextUpcomingEvent (day-level only), this also drops an event once its
 * specific start time has passed, so the card advances to the next one as soon as
 * the current one's time arrives instead of lingering on it all day.
 */
function getActiveEvent(events: (typeof featuredEvents)[number][]) {
  const upcoming = getUpcomingEvents(events, events.length);
  return (
    upcoming.find((event) => {
      if (!event.time) return true;
      const target = parseEventDateTime(event.date, event.time);
      return !target || target.getTime() > Date.now();
    }) ?? null
  );
}

function CountdownTile({ value, label }: { value: number | null; label: string }) {
  return (
    <div className="min-w-0 flex-1 rounded-xl border border-forest-700 bg-forest-950 px-2 py-2 text-center">
      <p className="font-[family-name:var(--font-brand)] text-lg font-bold text-brand-400">
        {value === null ? "--" : String(value).padStart(2, "0")}
      </p>
      <p className="truncate text-[11px] text-slate-400">{label}</p>
    </div>
  );
}

export default function NextEventCard() {
  const [, forceTick] = useState(0);
  const event = getActiveEvent(featuredEvents);
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  useEffect(() => {
    if (!event) return;

    const target = parseEventDateTime(event.date, event.time);
    const tick = () => {
      setCountdown(computeCountdown(target));
      // Also re-render every second so getActiveEvent() re-evaluates and swaps
      // to the next event as soon as this one's start time arrives.
      forceTick((n) => n + 1);
    };
    const immediate = setTimeout(tick, 0);
    const interval = setInterval(tick, 1000);
    return () => {
      clearTimeout(immediate);
      clearInterval(interval);
    };
  }, [event?.id]);

  if (!event) {
    return (
      <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6 text-center text-slate-100 shadow-sm">
        <h3 className="font-[family-name:var(--font-brand)] text-lg font-semibold">{sectionText("nextEvent", "title", "Próximo evento")}</h3>
        <p className="mt-3 text-sm text-slate-400">Aún no hay eventos programados.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-forest-700 bg-forest-900 p-5 text-slate-100 shadow-sm">
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
          <CalendarIcon className="h-4 w-4" />
        </span>
        <h3 className="truncate font-[family-name:var(--font-brand)] text-lg font-bold uppercase tracking-wide text-slate-100">
          {sectionText("nextEvent", "title", "Próximo evento")}
        </h3>
      </div>

      <div className="mt-3 flex min-w-0 flex-col gap-2">
        <h4 className="truncate font-[family-name:var(--font-brand)] text-2xl font-bold text-slate-100">{event.title}</h4>

        <p className="flex min-w-0 items-center gap-2 truncate text-sm text-slate-300">
          <CalendarIcon className="h-4 w-4 shrink-0 text-brand-400" /> <span className="truncate">{formatEventDate(event.date)}</span>
        </p>
        {event.time ? (
          <p className="flex min-w-0 items-center gap-2 truncate text-sm text-slate-300">
            <ClockIcon className="h-4 w-4 shrink-0 text-brand-400" /> <span className="truncate">{event.time.trim()}</span>
          </p>
        ) : null}
        <p className="flex min-w-0 items-center gap-2 truncate text-sm text-slate-300">
          <EventPinIcon className="h-4 w-4 shrink-0 text-brand-400" /> <span className="truncate">{event.place}</span>
        </p>

        <span className="inline-flex w-fit max-w-full items-center gap-1.5 truncate rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-400">
          <EventPinIcon className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{(event.modality ?? "Presencial").trim()}</span>
        </span>
      </div>

      <div className="mt-3 rounded-2xl border border-forest-700 bg-forest-950/60 p-2.5">
        <p className="text-xs font-medium text-slate-300">{countdown?.started ? "En curso" : "Empieza en:"}</p>
        <div className="mt-1.5 flex gap-1.5 sm:gap-2">
          <CountdownTile value={countdown ? countdown.days : null} label="Días" />
          <CountdownTile value={countdown ? countdown.hours : null} label="Horas" />
          <CountdownTile value={countdown ? countdown.minutes : null} label="Min" />
          <CountdownTile value={countdown ? countdown.seconds : null} label="Seg" />
        </div>
      </div>

      <Link
        href={`/eventos/${event.id}`}
        className="btn-brand-font btn-gradient mt-3 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 font-semibold text-forest-950"
      >
        {sectionText("nextEvent", "buttonText", "Ver detalles")} <ChevronRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
