"use client";

import type { PrestadorItem } from "../../services/prestadores";

const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function AvailabilityCalendar({ items, blockedDates }: { items: PrestadorItem[]; blockedDates: string[] }) {
  const now = new Date();
  const year = now.getFullYear();
  const monthIndex = now.getMonth();

  const totalUnits = items.reduce((sum, item) => sum + (item.totalUnits ?? 0), 0);
  const availableUnits = items.reduce((sum, item) => sum + (item.availableUnits ?? 0), 0);

  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const monthLabel = new Date(year, monthIndex, 1).toLocaleDateString("es-CO", { month: "long", year: "numeric" });

  const blockedSet = new Set(blockedDates);

  return (
    <div className="mt-10 rounded-3xl border border-forest-700 bg-forest-900 p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-[family-name:var(--font-brand)] text-2xl font-semibold text-white">Disponibilidad</h2>
          <p className="mt-1 text-sm capitalize text-slate-400">{monthLabel}</p>
        </div>
        {totalUnits > 0 ? (
          <div className="rounded-2xl bg-brand-500/10 px-4 py-3 text-center">
            <p className="text-2xl font-bold text-brand-400">
              {availableUnits}/{totalUnits}
            </p>
            <p className="text-xs text-slate-400">Habitaciones libres</p>
          </div>
        ) : null}
      </div>

      <div className="mt-6 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-500">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={i} className="h-10" />;
          const dateKey = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isBlocked = blockedSet.has(dateKey);
          const isToday = day === now.getDate();

          return (
            <div
              key={i}
              className={`flex h-10 items-center justify-center rounded-lg text-sm ${
                isBlocked
                  ? "bg-red-500/20 text-red-300"
                  : isToday
                    ? "bg-brand-500 font-semibold text-forest-950"
                    : "bg-forest-950 text-slate-300"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-forest-950" /> Disponible
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-red-500/20" /> Fecha bloqueada
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-brand-500" /> Hoy
        </span>
      </div>
    </div>
  );
}
