"use client";

import { featuredEvents } from "../../services/content";
import { parseEventDate } from "../../utils/eventDate";

const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function EventsCalendar() {
  const parsedEvents = featuredEvents
    .map((event) => ({ event, parsed: parseEventDate(event.date) }))
    .filter((entry): entry is { event: (typeof featuredEvents)[number]; parsed: { day: number; monthIndex: number } } => entry.parsed !== null);

  const now = new Date();
  const activeMonthIndex = now.getMonth();
  const year = now.getFullYear();

  const eventsInMonth = parsedEvents
    .filter((entry) => entry.parsed.monthIndex === activeMonthIndex)
    .sort((a, b) => a.parsed.day - b.parsed.day);

  const eventDays = new Set(eventsInMonth.map((entry) => entry.parsed.day));

  const firstWeekday = new Date(year, activeMonthIndex, 1).getDay();
  const daysInMonth = new Date(year, activeMonthIndex + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const monthLabel = new Date(year, activeMonthIndex, 1).toLocaleDateString("es-CO", { month: "long", year: "numeric" });

  return (
    <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6">
      <h3 className="text-center font-[family-name:var(--font-brand)] text-lg font-semibold">Calendario de eventos</h3>
      <p className="mt-1 text-center text-xs capitalize text-slate-400">{monthLabel}</p>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-500">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, i) => (
          <div
            key={i}
            className={`flex h-7 items-center justify-center rounded-lg text-xs ${
              day === null ? "" : eventDays.has(day) ? "bg-brand-500 font-semibold text-forest-950" : "text-slate-400"
            }`}
          >
            {day ?? ""}
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-1.5 border-t border-forest-700 pt-4 text-xs">
        {eventsInMonth.length === 0 ? (
          <p className="text-slate-500">Sin eventos este mes.</p>
        ) : (
          eventsInMonth.map(({ event }) => (
            <div key={event.id} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
              <span className="truncate text-slate-300">
                {event.date} · {event.title}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
