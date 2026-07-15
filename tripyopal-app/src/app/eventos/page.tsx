"use client";

import { useMemo, useState } from "react";
import { useEvents } from "../hooks/useEvents";

const filters = ["Todos", "Hoy", "Próximos", "Fin de semana"];

export default function EventosPage() {
  const { events, loading, error } = useEvents();
  const [selectedFilter, setSelectedFilter] = useState("Todos");

  const visibleEvents = useMemo(() => {
    if (selectedFilter === "Todos") return events;
    return events.filter((event) => event.date.toLowerCase().includes(selectedFilter.toLowerCase()));
  }, [events, selectedFilter]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Eventos en tiempo real</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Mantén a los visitantes informados con eventos actualizados, fechas, lugares y detalles de participación.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold text-slate-700">Ver eventos por periodo</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`rounded-full px-3 py-2 text-sm ${
                selectedFilter === filter ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="mt-8 text-slate-600">Cargando eventos...</p>}
      {error && <p className="mt-8 text-red-600">{error}</p>}
      <div className="mt-10 space-y-5">
        {visibleEvents.map((event) => (
          <article key={event.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900">{event.title}</h2>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                {event.date}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-500">{event.place}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{event.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
