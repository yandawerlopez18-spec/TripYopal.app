"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useEvents } from "../../hooks/useEvents";
import { adjustEventInterest } from "../../services/content";
import { getWeatherForYopal, type WeatherResponse } from "../../services/external/weather";
import { siteContent } from "../../services/siteContent";
import { formatEventDate, parseEventDate } from "../../utils/eventDate";
import EventoOwnerEditor from "../../components/eventos/EventoOwnerEditor";
import {
  ArrowUpRightIcon,
  BookmarkIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  DropletIcon,
  EventPinIcon,
  FacebookIcon,
  HeartIcon,
  InstagramIcon,
  LinkIcon,
  MailIcon,
  PhoneIcon,
  ShareIcon,
  StarIcon,
  TwitterIcon,
  UsersIcon,
  WeatherIcon,
  WhatsAppIcon,
  WindIcon,
  getWeatherKind,
} from "../../components/home/infoIcons";

const EVENT_FAVORITES_KEY = "tripyopal_event_favorites";
const EVENT_INTEREST_KEY = "tripyopal_event_interests";

function getStoredIds(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? "[]");
  } catch {
    return [];
  }
}

function parseTimeToHM(timeStr?: string): { hour: number; minute: number } | null {
  if (!timeStr) return null;
  const match = timeStr.match(/(\d{1,2})(?::(\d{2}))?\s*([ap])\.?\s*m/i);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = match[2] ? Number(match[2]) : 0;
  const isPM = match[3].toLowerCase() === "p";
  if (isPM && hour !== 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;
  return { hour, minute };
}

function formatLocalForCalendar(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
}

export default function EventoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { permissions } = useAuth();
  const { events, loading } = useEvents();
  const [dataVersion, setDataVersion] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [favoriteCheckedId, setFavoriteCheckedId] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const event = useMemo(() => events.find((item) => item.id === id), [events, id, dataVersion]);

  if (event && favoriteCheckedId !== event.id) {
    setFavoriteCheckedId(event.id);
    setIsFavorite(getStoredIds(EVENT_FAVORITES_KEY).includes(event.id));
    setIsInterested(getStoredIds(EVENT_INTEREST_KEY).includes(event.id));
  }

  useEffect(() => {
    let cancelled = false;
    getWeatherForYopal().then((data) => {
      if (!cancelled) setWeather(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!editMode) return;
    const interval = setInterval(() => setDataVersion((v) => v + 1), 1500);
    return () => clearInterval(interval);
  }, [editMode]);

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

  const canEdit =
    permissions?.role === "superadmin" ||
    (permissions?.role === "admin" && permissions.scope?.resourceType === "evento" && permissions.scope.resourceId === event.id);

  const refresh = () => setDataVersion((v) => v + 1);

  const toggleFavorite = () => {
    const current = getStoredIds(EVENT_FAVORITES_KEY);
    const next = current.includes(event.id) ? current.filter((entry) => entry !== event.id) : [...current, event.id];
    window.localStorage.setItem(EVENT_FAVORITES_KEY, JSON.stringify(next));
    setIsFavorite(next.includes(event.id));
  };

  const toggleInterest = async () => {
    const current = getStoredIds(EVENT_INTEREST_KEY);
    const alreadyIn = current.includes(event.id);
    const next = alreadyIn ? current.filter((entry) => entry !== event.id) : [...current, event.id];
    window.localStorage.setItem(EVENT_INTEREST_KEY, JSON.stringify(next));
    setIsInterested(!alreadyIn);
    await adjustEventInterest(event.id, alreadyIn ? -1 : 1);
    refresh();
  };

  const handleShare = async () => {
    const shareData = { title: event.title, text: event.description, url: window.location.href };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled share, no action needed
      }
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    setShareMessage("Enlace copiado al portapapeles.");
    setTimeout(() => setShareMessage(""), 2500);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShareMessage("Enlace copiado al portapapeles.");
    setTimeout(() => setShareMessage(""), 2500);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(event.title);
  const whatsappShareHref = `https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`;
  const facebookShareHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShareHref = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`;

  const mapQuery = encodeURIComponent(event.address || event.place || "Yopal, Casanare");
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  const parsedDate = parseEventDate(event.date);
  const calendarHref = (() => {
    if (!parsedDate) return null;
    const year = parsedDate.year ?? new Date().getFullYear();
    const startHM = parseTimeToHM(event.time) ?? { hour: 9, minute: 0 };
    const start = new Date(year, parsedDate.monthIndex, parsedDate.day, startHM.hour, startHM.minute);
    const endHM = parseTimeToHM(event.endTime);
    const end = endHM
      ? new Date(year, parsedDate.monthIndex, parsedDate.day, endHM.hour, endHM.minute)
      : new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.title,
      dates: `${formatLocalForCalendar(start)}/${formatLocalForCalendar(end)}`,
      details: event.description,
      location: event.address || event.place,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  })();

  const features = event.features ?? [];
  const agenda = event.agenda ?? [];
  const allies = event.allies ?? [];
  const whyAttend = event.whyAttend ?? [];
  const visibleAllies = allies.slice(0, 4);
  const extraAllies = Math.max(0, allies.length - 4);
  const longDescription = event.longDescription || event.description;
  const interestedCount = event.interestedCount ?? 0;

  return (
    <main className="min-h-screen bg-forest-950 px-4 py-4 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href="/eventos"
            className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
          >
            ← Volver a eventos
          </Link>
          {canEdit ? (
            <button
              type="button"
              onClick={() => setEditMode((v) => !v)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                editMode ? "border-brand-400 bg-brand-500/10 text-brand-400" : "border-forest-700 text-slate-300 hover:bg-forest-800"
              }`}
            >
              {editMode ? "Salir del modo edición" : "Editar información del evento"}
            </button>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
          <Link href="/" className="hover:text-brand-400">Inicio</Link>
          <span>›</span>
          <Link href="/eventos" className="hover:text-brand-400">Eventos</Link>
          <span>›</span>
          <span className="text-slate-300">{event.title}</span>
        </div>

        {canEdit && editMode ? <EventoOwnerEditor eventId={event.id} onSaved={refresh} /> : null}

        {/* Hero */}
        <div className="relative mt-4 h-72 overflow-hidden rounded-2xl border border-forest-700 sm:h-[420px]">
          {event.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-forest-800 to-forest-950" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/10 to-transparent" />

          {event.featured ? (
            <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-forest-950">
              <StarIcon className="h-3.5 w-3.5" /> Evento destacado
            </span>
          ) : null}

          <div className="absolute right-3 top-3 flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex flex-col items-center gap-1 rounded-full bg-black/40 px-3 py-2 text-white backdrop-blur transition hover:bg-black/60"
            >
              <ShareIcon className="h-4 w-4" />
              <span className="text-[10px] font-semibold">Compartir</span>
            </button>
            <button
              type="button"
              onClick={toggleFavorite}
              className={`flex flex-col items-center gap-1 rounded-full px-3 py-2 backdrop-blur transition ${
                isFavorite ? "bg-brand-500 text-forest-950" : "bg-black/40 text-white hover:bg-black/60"
              }`}
            >
              <BookmarkIcon filled={isFavorite} className="h-4 w-4" />
              <span className="text-[10px] font-semibold">Guardar</span>
            </button>
            <button
              type="button"
              onClick={toggleInterest}
              className={`flex flex-col items-center gap-1 rounded-full px-3 py-2 backdrop-blur transition ${
                isInterested ? "bg-brand-500 text-forest-950" : "bg-black/40 text-white hover:bg-black/60"
              }`}
            >
              <HeartIcon filled={isInterested} className="h-4 w-4" />
              <span className="text-[10px] font-semibold">Me interesa</span>
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6">
            {event.category ? (
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">{event.category}</p>
            ) : null}
            <h1 className="mt-2 font-[family-name:var(--font-brand)] text-3xl font-bold text-white sm:text-4xl">{event.title}</h1>
            {event.description ? <p className="mt-2 max-w-2xl text-sm text-slate-200">{event.description}</p> : null}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-forest-950/70 px-3 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur">
                <CalendarIcon className="h-3.5 w-3.5 text-brand-400" /> {formatEventDate(event.date)}
              </span>
              {event.time ? (
                <span className="flex items-center gap-1.5 rounded-full bg-forest-950/70 px-3 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur">
                  <ClockIcon className="h-3.5 w-3.5 text-brand-400" /> {event.time}{event.endTime ? ` - ${event.endTime}` : ""}
                </span>
              ) : null}
              {event.modality ? (
                <span className="flex items-center gap-1.5 rounded-full bg-forest-950/70 px-3 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur">
                  <EventPinIcon className="h-3.5 w-3.5 text-brand-400" /> {event.modality}
                </span>
              ) : null}
            </div>

            {interestedCount > 0 ? (
              <div className="mt-4 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["A", "B", "C"].map((letter, i) => (
                    <span
                      key={letter}
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-forest-950 bg-brand-500/80 text-[11px] font-bold text-forest-950"
                      style={{ zIndex: 3 - i }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
                <p className="text-xs font-medium text-slate-300">+{interestedCount} personas interesadas</p>
              </div>
            ) : null}
          </div>
        </div>
        {shareMessage ? <p className="mt-2 text-sm text-brand-400">{shareMessage}</p> : null}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {/* Información del evento */}
            <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-100">
                <CalendarIcon className="h-5 w-5 text-brand-400" /> Información del evento
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <CalendarIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  <div>
                    <p className="text-xs text-slate-500">Fecha</p>
                    <p className="text-sm text-slate-200">{formatEventDate(event.date)}</p>
                  </div>
                </div>
                {event.time ? (
                  <div className="flex items-start gap-2">
                    <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                    <div>
                      <p className="text-xs text-slate-500">Hora</p>
                      <p className="text-sm text-slate-200">{event.time}{event.endTime ? ` - ${event.endTime}` : ""}</p>
                    </div>
                  </div>
                ) : null}
                <div className="flex items-start gap-2">
                  <EventPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  <div>
                    <p className="text-xs text-slate-500">Lugar</p>
                    <p className="text-sm text-slate-200">{event.place}</p>
                  </div>
                </div>
                {event.organizer ? (
                  <div className="flex items-start gap-2">
                    <UsersIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                    <div>
                      <p className="text-xs text-slate-500">Organiza</p>
                      <p className="text-sm text-slate-200">{event.organizer}</p>
                    </div>
                  </div>
                ) : null}
                {event.contactPhone || event.contactEmail ? (
                  <div className="flex items-start gap-2 sm:col-span-2">
                    <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                    <div>
                      <p className="text-xs text-slate-500">Contacto</p>
                      {event.contactPhone ? <p className="text-sm text-slate-200">{event.contactPhone}</p> : null}
                      {event.contactEmail ? <p className="text-sm text-slate-200">{event.contactEmail}</p> : null}
                    </div>
                  </div>
                ) : null}
              </div>
              {calendarHref ? (
                <a
                  href={calendarHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-brand-font btn-gradient mt-5 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-forest-950 transition"
                >
                  <CalendarIcon className="h-4 w-4" /> Agregar al calendario
                </a>
              ) : null}
            </div>

            {/* Descripción */}
            <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
              <h2 className="text-lg font-bold text-slate-100">Descripción</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{longDescription}</p>
            </div>

            {/* ¿Qué encontrarás? */}
            {features.length > 0 ? (
              <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-lg font-bold text-slate-100">¿Qué encontrarás?</h2>
                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {features.map((feature) => (
                    <div key={feature.id} className="flex flex-col items-center gap-1.5 rounded-xl border border-forest-700 bg-forest-950 p-3 text-center">
                      <span className="text-xl">{feature.icon}</span>
                      <p className="text-[11px] font-medium leading-tight text-slate-200">{feature.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Agenda del evento */}
            {agenda.length > 0 ? (
              <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-lg font-bold text-slate-100">Agenda del evento</h2>
                <div className="mt-4 space-y-5">
                  {agenda.map((item, index) => (
                    <div key={item.id} className="relative flex gap-4 pl-2">
                      <div className="flex flex-col items-center">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-400" />
                        {index < agenda.length - 1 ? <span className="mt-1 w-px flex-1 bg-forest-700" /> : null}
                      </div>
                      <div className="flex flex-1 items-center justify-between gap-3 pb-1">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-brand-400">{item.time}</p>
                          <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                          {item.description ? <p className="mt-0.5 text-xs text-slate-400">{item.description}</p> : null}
                        </div>
                        {item.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.imageUrl} alt="" className="h-14 w-20 shrink-0 rounded-lg object-cover" />
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Organizadores y aliados */}
            {allies.length > 0 ? (
              <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-lg font-bold text-slate-100">Organizadores y aliados</h2>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
                  {visibleAllies.map((ally) => (
                    <div key={ally.id} className="flex flex-col items-center gap-2 text-center">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-forest-700 bg-forest-950">
                        {ally.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={ally.imageUrl} alt={ally.name} className="h-full w-full object-cover" />
                        ) : (
                          <UsersIcon className="h-6 w-6 text-brand-400" />
                        )}
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-slate-100">{ally.name}</p>
                        {ally.subtitle ? <p className="text-[11px] leading-tight text-slate-500">{ally.subtitle}</p> : null}
                      </div>
                    </div>
                  ))}
                  {extraAllies > 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-forest-700 text-sm font-bold text-brand-400">
                        +{extraAllies}
                      </span>
                      <p className="text-xs font-semibold text-slate-100">Aliados</p>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-100">Ubicación</h2>
                <a
                  href={`https://www.google.com/maps?q=${mapQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-brand-400 hover:underline"
                >
                  Ver en Google Maps <ArrowUpRightIcon className="h-3 w-3" />
                </a>
              </div>
              <div className="mt-3 overflow-hidden rounded-xl border border-forest-700">
                <iframe
                  src={`https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`}
                  className="h-44 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mini mapa de ${event.title}`}
                />
              </div>
              {event.address ? <p className="mt-3 text-sm text-slate-300">{event.address}</p> : null}
              <a
                href={directionsHref}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center justify-center gap-2 rounded-full border border-forest-700 py-2 text-center text-sm font-semibold text-slate-200 transition hover:bg-forest-800"
              >
                <ArrowUpRightIcon className="h-4 w-4" /> Cómo llegar
              </a>
            </div>

            <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
              <h2 className="text-base font-bold text-slate-100">Clima esperado</h2>
              {weather ? (
                <>
                  <div className="mt-4 flex items-center gap-3">
                    <WeatherIcon kind={getWeatherKind(weather.icon)} className="h-12 w-12 text-brand-400" />
                    <div>
                      <p className="text-2xl font-bold text-slate-100">{weather.temperature}°C</p>
                      <p className="text-xs capitalize text-slate-400">{weather.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 rounded-xl border border-forest-700 bg-forest-950 p-3">
                      <DropletIcon className="h-4 w-4 text-brand-400" />
                      <div>
                        <p className="text-slate-500">Humedad</p>
                        <p className="font-semibold text-slate-100">{weather.humidity}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-forest-700 bg-forest-950 p-3">
                      <WindIcon className="h-4 w-4 text-brand-400" />
                      <div>
                        <p className="text-slate-500">Viento</p>
                        <p className="font-semibold text-slate-100">{weather.wind} km/h</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="mt-4 text-sm text-slate-400">Cargando clima...</p>
              )}
            </div>

            {whyAttend.length > 0 ? (
              <div className="relative overflow-hidden rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-base font-bold text-slate-100">¿Por qué asistir?</h2>
                <ul className="relative mt-3 space-y-2.5 pr-14 text-sm text-slate-300">
                  {whyAttend.map((reason) => (
                    <li key={reason} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" /> {reason}
                    </li>
                  ))}
                </ul>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={siteContent.images.mascot}
                  alt=""
                  className="pointer-events-none absolute bottom-2 right-2 h-16 w-16 rounded-full border-2 border-forest-700 object-cover opacity-90"
                />
              </div>
            ) : null}

            <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
              <h2 className="text-base font-bold text-slate-100">Comparte este evento</h2>
              <div className="mt-4 grid grid-cols-5 gap-2 text-center">
                <a
                  href={whatsappShareHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1.5 text-slate-300 transition hover:text-brand-400"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white">
                    <WhatsAppIcon className="h-5 w-5" />
                  </span>
                  <span className="text-[10px]">WhatsApp</span>
                </a>
                <a
                  href={facebookShareHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1.5 text-slate-300 transition hover:text-brand-400"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white">
                    <FacebookIcon className="h-5 w-5" />
                  </span>
                  <span className="text-[10px]">Facebook</span>
                </a>
                <button type="button" onClick={copyLink} className="flex flex-col items-center gap-1.5 text-slate-300 transition hover:text-brand-400">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white">
                    <InstagramIcon className="h-5 w-5" />
                  </span>
                  <span className="text-[10px]">Instagram</span>
                </button>
                <a
                  href={twitterShareHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1.5 text-slate-300 transition hover:text-brand-400"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                    <TwitterIcon className="h-5 w-5" />
                  </span>
                  <span className="text-[10px]">Twitter</span>
                </a>
                <button type="button" onClick={copyLink} className="flex flex-col items-center gap-1.5 text-slate-300 transition hover:text-brand-400">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-800 text-slate-200">
                    <LinkIcon className="h-5 w-5" />
                  </span>
                  <span className="text-[10px]">Copiar enlace</span>
                </button>
              </div>
            </div>

            {event.contactEmail ? (
              <a
                href={`mailto:${event.contactEmail}`}
                className="flex items-center justify-center gap-2 rounded-full border border-forest-700 py-2.5 text-center text-sm font-semibold text-slate-200 transition hover:bg-forest-800"
              >
                <MailIcon className="h-4 w-4" /> Escribir al organizador
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
