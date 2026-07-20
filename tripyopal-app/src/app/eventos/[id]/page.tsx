"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { useEvents } from "../../hooks/useEvents";

export default function EventoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { events, loading } = useEvents();
  const event = events.find((item) => item.id === id);

  if (!loading && !event) {
    notFound();
  }

  if (loading || !event) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-forest-950 px-6 py-16 text-slate-100 lg:px-8">
        <p className="text-slate-400">Cargando evento...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-forest-950 px-6 py-6 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/eventos"
          className="btn-brand-font inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-forest-950 transition hover:bg-brand-400"
        >
          ← Volver a eventos
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-forest-700 bg-forest-900 shadow-sm">
          {event.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={event.imageUrl} alt={event.title} className="h-64 w-full object-cover" />
          ) : (
            <div className="h-64 w-full" style={{ background: "linear-gradient(135deg,#f59e0b,#166534)" }} />
          )}

          <div className="p-8 text-center">
            <h1 className="font-[family-name:var(--font-brand)] text-4xl font-bold text-white sm:text-5xl">{event.title}</h1>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-300">
              <span className="rounded-full bg-brand-500/10 px-3 py-1 font-medium text-brand-400">{event.date}</span>
              {event.time ? <span className="rounded-full border border-forest-700 px-3 py-1">{event.time}</span> : null}
              <span className="rounded-full border border-forest-700 px-3 py-1">{event.modality ?? "Presencial"}</span>
            </div>
            <p className="mt-4 text-slate-400">{event.place}</p>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">{event.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
