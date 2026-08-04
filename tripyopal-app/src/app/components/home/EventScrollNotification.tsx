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
      <div className="flex items-start gap-3 rounded-2xl border border-forest-700 bg-forest-900 p-4 shadow-2xl">
        {event.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={event.imageUrl} alt={event.title} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
        ) : (
          <div className="h-14 w-14 shrink-0 rounded-xl" style={{ background: "linear-gradient(135deg,#f59e0b,#166534)" }} />
        )}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-400">Próximo evento</p>
          <p className="truncate text-sm font-semibold text-slate-100">{event.title}</p>
          <p className="text-xs text-slate-400">{formatEventDate(event.date)}</p>
          <Link href={`/eventos/${event.id}`} className="mt-2 inline-block text-xs font-semibold text-brand-400 hover:text-brand-300">
            Ver detalles →
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Cerrar notificación"
          className="shrink-0 rounded-full p-1 text-slate-400 transition hover:bg-forest-800 hover:text-slate-200"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
