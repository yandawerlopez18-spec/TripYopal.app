"use client";

import Link from "next/link";
import { useState } from "react";
import { featuredEvents } from "../../services/content";
import { sectionText } from "../../services/siteContent";
import { getUpcomingEvents, parseEventDate, type ParsedEventDate } from "../../utils/eventDate";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "./infoIcons";

const MAX_UPCOMING_EVENTS = 6;

const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const SHORT_MONTHS = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

export default function EventsCalendar() {
  const [monthOffset, setMonthOffset] = useState(0);

  const parsedEvents = featuredEvents
    .map((event) => ({ event, parsed: parseEventDate(event.date) }))
    .filter((entry): entry is { event: (typeof featuredEvents)[number]; parsed: ParsedEventDate } => entry.parsed !== null);

  const today = new Date();
  const displayedMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const activeMonthIndex = displayedMonth.getMonth();
  const year = displayedMonth.getFullYear();

  const eventsInMonth = parsedEvents
    .filter((entry) => entry.parsed.monthIndex === activeMonthIndex && (entry.parsed.year === null || entry.parsed.year === year))
    .sort((a, b) => a.parsed.day - b.parsed.day);

  const eventDays = new Set(eventsInMonth.map((entry) => entry.parsed.day));
  const isCurrentMonth = activeMonthIndex === today.getMonth() && year === today.getFullYear();
  const pastEventDays = new Set(
    isCurrentMonth ? eventsInMonth.filter((entry) => entry.parsed.day < today.getDate()).map((entry) => entry.parsed.day) : []
  );

  const upcomingEvents = getUpcomingEvents(featuredEvents, MAX_UPCOMING_EVENTS)
    .map((event) => ({ event, parsed: parseEventDate(event.date) }))
    .filter((entry): entry is { event: (typeof featuredEvents)[number]; parsed: ParsedEventDate } => entry.parsed !== null);

  const firstWeekday = new Date(year, activeMonthIndex, 1).getDay();
  const daysInMonth = new Date(year, activeMonthIndex + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const monthLabel = displayedMonth.toLocaleDateString("es-CO", { month: "long", year: "numeric" });

  return (
    <div className="flex h-full flex-col rounded-3xl border border-forest-700 bg-forest-900 p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
          <CalendarIcon />
        </span>
        <h3 className="font-[family-name:var(--font-brand)] text-lg font-semibold">{sectionText("calendar", "title", "Calendario de eventos")}</h3>
      </div>
      <p className="mt-1 text-center text-sm text-slate-400">{sectionText("calendar", "subtitle", "No te pierdas lo mejor de Yopal")}</p>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonthOffset((value) => value - 1)}
          className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-forest-800 hover:text-brand-400"
          aria-label="Mes anterior"
        >
          <ChevronLeftIcon />
        </button>
        <p className="text-xs font-semibold capitalize text-slate-300">{monthLabel}</p>
        <button
          type="button"
          onClick={() => setMonthOffset((value) => value + 1)}
          className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-forest-800 hover:text-brand-400"
          aria-label="Mes siguiente"
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-500">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          const className =
            day === null
              ? ""
              : pastEventDays.has(day)
                ? "border border-brand-500/50 font-semibold text-brand-400"
                : eventDays.has(day)
                  ? "bg-brand-500 font-semibold text-forest-950"
                  : "text-slate-400";
          return (
            <div key={i} className={`flex aspect-square items-center justify-center rounded-full text-xs ${className}`}>
              {day ?? ""}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex-1 space-y-3 overflow-y-auto border-t border-forest-700 pt-4">
        {upcomingEvents.length === 0 ? (
          <p className="text-xs text-slate-500">No hay eventos próximos.</p>
        ) : (
          upcomingEvents.map(({ event, parsed }) => (
            <div key={event.id} className="flex items-center gap-3 rounded-2xl border border-forest-700 bg-forest-950/60 p-3">
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-500 text-forest-950">
                <span className="text-base font-bold leading-none">{parsed.day}</span>
                <span className="text-[9px] font-semibold uppercase leading-none">{SHORT_MONTHS[parsed.monthIndex]}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-100">{event.title}</p>
                <p className="truncate text-xs text-slate-400">
                  {event.place}
                  {event.time ? ` • ${event.time}` : ""}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <Link
        href="/eventos"
        className="btn-brand-font btn-gradient mt-5 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-forest-950 transition"
      >
        {sectionText("calendar", "buttonText", "Ver todos los eventos")} →
      </Link>
    </div>
  );
}
