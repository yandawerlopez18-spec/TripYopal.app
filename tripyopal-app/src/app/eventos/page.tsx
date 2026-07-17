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
    <main className="min-h-screen bg-forest-950 px-6 py-16 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-xl">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-brand)] text-4xl font-bold text-white sm:text-5xl">Eventos en tiempo real</h1>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              Mantén a los visitantes informados con eventos actualizados, fechas, lugares y detalles de participación.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-forest-700 bg-forest-950 p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-300">Ver eventos por periodo</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`btn-brand-font rounded-full px-3 py-2 text-sm font-semibold transition ${
                    selectedFilter === filter ? "bg-brand-500 text-forest-950" : "border border-forest-700 text-slate-300 hover:bg-forest-800"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {loading && <p className="mt-8 text-slate-400">Cargando eventos...</p>}
          {error && <p className="mt-8 text-red-400">{error}</p>}
          <div className="mt-10 space-y-5">
            {visibleEvents.map((event) => (
              <article key={event.id} className="rounded-2xl border border-forest-700 bg-forest-950 p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-slate-100">{event.title}</h2>
                  <span className="rounded-full bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-400">
                    {event.date}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-slate-400">{event.place}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{event.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
