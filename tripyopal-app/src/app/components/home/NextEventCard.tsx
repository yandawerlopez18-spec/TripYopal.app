"use client";

import Link from "next/link";
import { featuredEvents } from "../../services/content";
import { getNextUpcomingEvent } from "../../utils/eventDate";

export default function NextEventCard() {
  const event = getNextUpcomingEvent(featuredEvents);

  if (!event) {
    return (
      <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6 text-center text-slate-100 shadow-sm">
        <h3 className="font-[family-name:var(--font-brand)] text-lg font-semibold">Próximo evento</h3>
        <p className="mt-3 text-sm text-slate-400">Aún no hay eventos programados.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6 text-slate-100 shadow-sm">
      <h3 className="text-center font-[family-name:var(--font-brand)] text-lg font-semibold">Próximo evento</h3>

      <div className="relative mt-4 overflow-hidden rounded-2xl border border-forest-700">
        {event.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={event.imageUrl} alt={event.title} className="h-40 w-full object-cover" />
        ) : (
          <div className="h-40 w-full" style={{ background: "linear-gradient(135deg,#f59e0b,#166534)" }} />
        )}
      </div>

      <h4 className="mt-4 text-lg font-semibold text-slate-100">{event.title}</h4>
      <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-slate-300">
        <span className="rounded-full bg-forest-800 px-2.5 py-1">{event.date}</span>
        {event.time ? <span className="rounded-full bg-forest-800 px-2.5 py-1">{event.time}</span> : null}
        <span className="rounded-full bg-forest-800 px-2.5 py-1">{event.modality ?? "Presencial"}</span>
      </div>
      <p className="mt-2 text-sm text-slate-400">{event.place}</p>
      <div className="mt-4 flex justify-center">
        <Link
          href={`/eventos/${event.id}`}
          className="btn-brand-font inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-forest-950 transition hover:bg-brand-400"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}
