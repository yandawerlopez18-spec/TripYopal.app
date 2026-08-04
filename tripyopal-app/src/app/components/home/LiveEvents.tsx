"use client";

import Link from "next/link";
import { useState } from "react";
import { featuredEvents } from "../../services/content";
import { sectionText, siteContent } from "../../services/siteContent";
import { getUpcomingEvents, parseEventDate } from "../../utils/eventDate";
import { guessLiveEventCategory } from "../../utils/liveEventCategory";
import { BookmarkIcon, CalendarIcon, ClockIcon, EventPinIcon, HeartIcon, UsersIcon } from "./infoIcons";

const MONTH_ABBR = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
const WEEKDAY_ABBR = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
const PIN_COLORS = ["#4ade80", "#f87171", "#f59e0b", "#818cf8", "#38bdf8", "#f472b6"];
const VISIBLE_EVENTS = 4;

const LEGEND = [
  { label: "Orientación", color: "#4ade80" },
  { label: "Rutas alternas", color: "#f87171" },
  { label: "Guías de servicio", color: "#f59e0b" },
  { label: "Emergencias", color: "#818cf8" },
];

function DateTile({ dateStr }: { dateStr: string }) {
  const parsed = parseEventDate(dateStr);
  if (!parsed) {
    return (
      <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-forest-800 py-2 text-slate-300">
        <EventPinIcon className="h-5 w-5" />
      </div>
    );
  }

  const year = parsed.year ?? new Date().getFullYear();
  const weekday = new Date(year, parsed.monthIndex, parsed.day).getDay();

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-forest-700 bg-forest-800 py-5 text-center">
      <p className="text-sm font-semibold text-brand-400">{MONTH_ABBR[parsed.monthIndex]}</p>
      <p className="text-4xl font-bold text-slate-100">{parsed.day}</p>
      <p className="text-xs font-semibold text-slate-400">{WEEKDAY_ABBR[weekday]}</p>
    </div>
  );
}

function MapPin({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 9C-4.5 9 -8 5.5 -8 1a8 8 0 1 1 16 0C8 5.5 4.5 9 0 9Z" fill={color} />
      <circle cy="1" r="3" fill="#0b1f16" />
    </g>
  );
}

function MiniMapIllustration() {
  const pins: [number, number][] = [
    [34, 62],
    [58, 34],
    [78, 74],
    [96, 48],
    [112, 66],
    [66, 90],
  ];

  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 150 110" className="h-full w-full">
        <path
          d="M14 30 30 12h50l20 14 22-4 12 18-10 20 8 22-18 14-14-6-24 14-30-8-16 10-10-22 6-20Z"
          fill="#0f2a1d"
          stroke="#245a3d"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {pins.map(([x, y], i) => (
          <MapPin key={i} x={x} y={y} color={PIN_COLORS[i % PIN_COLORS.length]} />
        ))}
      </svg>
      <div className="absolute bottom-2 right-2 rounded-lg border border-forest-700 bg-forest-950/90 px-2 py-1.5 backdrop-blur">
        {LEGEND.map((item) => (
          <p key={item.label} className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wide text-slate-300">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} /> {item.label}
          </p>
        ))}
      </div>
    </div>
  );
}

function FavoriteButton() {
  const [active, setActive] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        setActive((current) => !current);
      }}
      aria-label="Guardar en favoritos"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
        active ? "border-brand-400 bg-brand-500 text-forest-950" : "border-forest-700 text-slate-400 hover:bg-forest-800"
      }`}
    >
      <HeartIcon filled={active} />
    </button>
  );
}

function BookmarkButton() {
  const [active, setActive] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        setActive((current) => !current);
      }}
      aria-label="Guardar evento"
      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
    >
      <BookmarkIcon className="h-3.5 w-3.5" filled={active} />
    </button>
  );
}

function InfoLine({ icon: Icon, lines }: { icon: (props: { className?: string }) => React.ReactElement; lines: string[] }) {
  return (
    <p className="flex items-start gap-1.5">
      <Icon className="mt-0.5 h-3 w-3 shrink-0 text-brand-400" />
      <span className="min-w-0 flex-1">
        {lines.map((line, i) => (
          <span key={i} className="block break-words">
            {line}
          </span>
        ))}
      </span>
    </p>
  );
}

function EventCard({ event, isToday }: { event: (typeof featuredEvents)[number]; isToday: boolean }) {
  const category = guessLiveEventCategory(event.title, event.description);
  const placeLines = event.place.toLowerCase().includes("casanare") ? [event.place] : [event.place, "Yopal, Casanare"];

  return (
    <div className="flex gap-4 rounded-2xl border border-forest-700 bg-forest-950 p-5">
      <div className="flex w-32 shrink-0 flex-col gap-3 rounded-2xl border border-forest-700 bg-forest-900 p-3">
        <DateTile dateStr={event.date} />
        <div className="flex flex-col gap-3 text-xs text-slate-400">
          <InfoLine icon={EventPinIcon} lines={placeLines} />
          {event.time ? <InfoLine icon={ClockIcon} lines={[event.time.trim()]} /> : null}
          {event.modality ? <InfoLine icon={UsersIcon} lines={[event.modality.trim()]} /> : null}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="relative h-40 shrink-0 overflow-hidden rounded-xl border border-forest-700">
          {isToday ? (
            <MiniMapIllustration />
          ) : event.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-forest-800" />
          )}
          <span className={`absolute left-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${category.badgeClass}`}>
            <category.icon className="h-3 w-3 text-brand-400" /> {category.label}
          </span>
          <BookmarkButton />
        </div>

        <div className="min-w-0">
          <h4 className="truncate text-lg font-bold text-slate-100">{event.title}</h4>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-400">{event.description}</p>
          <div className="mt-3 flex items-center justify-between gap-2">
            <Link
              href={`/eventos/${event.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition hover:bg-forest-800 ${category.accentClass} border-forest-700`}
            >
              Ver detalles →
            </Link>
            <FavoriteButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LiveEvents() {
  const today = new Date();

  const currentMonthEvents = getUpcomingEvents(featuredEvents, featuredEvents.length).filter((event) => {
    const parsed = parseEventDate(event.date);
    if (!parsed) return false;
    return parsed.monthIndex === today.getMonth() && (parsed.year === null || parsed.year === today.getFullYear());
  });

  const homeUpcomingEvents = currentMonthEvents.slice(0, VISIBLE_EVENTS);

  const isEventToday = (dateStr: string) => {
    const parsed = parseEventDate(dateStr);
    if (!parsed) return false;
    const year = parsed.year ?? today.getFullYear();
    return year === today.getFullYear() && parsed.monthIndex === today.getMonth() && parsed.day === today.getDate();
  };

  return (
    <section className="mx-auto max-w-8xl px-6 pb-10 lg:px-8">
      <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6 lg:p-10">
        <div className="flex justify-end">
          <Link
            href="/eventos"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-forest-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-forest-800"
          >
            <CalendarIcon className="h-4 w-4" /> {sectionText("liveEvents", "calendarButtonText", "Ver calendario")}
          </Link>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-forest-700" />
            <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-brand-400">
              <CalendarIcon className="h-4 w-4" /> {sectionText("liveEvents", "eyebrow", "Eventos en vivo")}
            </span>
            <span className="h-px w-10 bg-forest-700" />
          </div>
          <h2 className="mt-3 font-[family-name:var(--font-brand)] text-4xl font-bold sm:text-5xl">
            <span className="text-white">{sectionText("liveEvents", "title", "Eventos")}</span>{" "}
            <span className="text-brand-400">{sectionText("liveEvents", "titleAccent", "en tiempo real")}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">{sectionText("liveEvents", "subtitle", "Descubre los eventos que están pasando en Yopal")}</p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {homeUpcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} isToday={isEventToday(event.date)} />
          ))}
          {homeUpcomingEvents.length === 0 ? (
            <p className="text-center text-sm text-slate-500 lg:col-span-2">Aún no hay eventos programados.</p>
          ) : null}
        </div>

        <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl border border-forest-700 bg-forest-950/60 p-5 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-forest-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={siteContent.images.mascot} alt="Capibara de TripYopal" className="h-full w-full object-cover" />
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-forest-950">
                <CalendarIcon className="h-3.5 w-3.5" />
              </span>
            </span>
            <div>
              <p className="font-semibold text-slate-100">
                {sectionText("liveEvents", "footerTitle", "No te pierdas")} <span className="text-brand-400">{sectionText("liveEvents", "footerTitleAccent", "ningún evento")}</span>
              </p>
              <p className="text-sm text-slate-400">
                {sectionText("liveEvents", "footerDescription", "Explora todo lo que está pasando en Yopal, actualizado en tiempo real.")}
              </p>
            </div>
          </div>
          <Link
            href="/eventos"
            className="btn-brand-font btn-gradient inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-forest-950 transition"
          >
            {sectionText("liveEvents", "buttonText", "Ver todos los eventos")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
