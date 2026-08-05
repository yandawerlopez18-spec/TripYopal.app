"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { featuredEvents } from "../../services/content";
import { formatEventDate, getNextUpcomingEvent } from "../../utils/eventDate";

const SCROLL_THRESHOLD = 500;

export default function EventScrollNotification() {
  const event = getNextUpcomingEvent(featuredEvents);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!event || dismissed) return null;

  return (
    <div
      className={`fixed inset-x-4 bottom-24 z-40 transition-all duration-500 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-80 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div className="overflow-hidden rounded-2xl border border-forest-700 bg-forest-900 shadow-2xl">
        <div className="relative">
          <span className="absolute left-3 top-3 z-10 rounded-full bg-forest-950/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-400 backdrop-blur">
            Próximo evento
          </span>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Cerrar notificación"
            className="absolute right-2 top-2 z-10 shrink-0 rounded-full bg-forest-950/80 p-1.5 text-slate-300 backdrop-blur transition hover:bg-forest-800 hover:text-slate-100"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
          {event.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={event.imageUrl} alt={event.title} className="h-auto w-full" />
          ) : (
            <div className="h-40 w-full" style={{ background: "linear-gradient(135deg,#f59e0b,#166534)" }} />
          )}
        </div>
        <div className="p-4">
          <p className="text-sm font-semibold text-slate-100">{event.title}</p>
          <p className="text-xs text-slate-400">{formatEventDate(event.date)}</p>
          <Link
            href={`/eventos/${event.id}`}
            className="btn-brand-font btn-gradient mt-3 flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-semibold text-forest-950"
          >
            Ver detalles →
          </Link>
        </div>
      </div>
    </div>
  );
}
