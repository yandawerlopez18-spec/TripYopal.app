"use client";

import Link from "next/link";
import CategorySidebar from "./components/home/CategorySidebar";
import CategoryShowcase from "./components/home/CategoryShowcase";
import ContactFooter from "./components/home/ContactFooter";
import DashboardPreview from "./components/home/DashboardPreview";
import EventsCalendar from "./components/home/EventsCalendar";
import NextEventCard from "./components/home/NextEventCard";
import SimpleMap from "./components/map/SimpleMap";
import WeatherCard from "./components/weather/WeatherCard";
import { featuredEvents, featuredPlaces } from "./services/content";
import { emergencyContacts, safetyPoints, siteContent, tips } from "./services/siteContent";

const searchFilters: { key: "who" | "where" | "when" | "budget"; label: string; value: string }[] = [
  { key: "who", label: "¿Qué quieres hacer?", value: "Aventura" },
  { key: "where", label: "Ubicación", value: "Cualquier lugar" },
  { key: "when", label: "Fecha", value: "Cualquier fecha" },
  { key: "budget", label: "Presupuesto", value: "Cualquiera" },
];

function FilterIcon({ filterKey }: { filterKey: (typeof searchFilters)[number]["key"] }) {
  if (filterKey === "who") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        <path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" strokeLinecap="round" />
      </svg>
    );
  }

  if (filterKey === "where") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" strokeLinejoin="round" />
        <circle cx="12" cy="9.5" r="2.3" />
      </svg>
    );
  }

  if (filterKey === "when") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="5.5" width="16" height="15" rx="2.5" />
        <path d="M4 10h16M8 3.5v3M16 3.5v3" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 15c.5 1 1.5 1.5 2.5 1.5 1.7 0 2.7-.9 2.7-2.1 0-3-5.4-1.4-5.4-4.4 0-1.2 1-2.1 2.7-2.1 1 0 2 .5 2.5 1.5M12 6.5v11" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-forest-950 text-slate-100">
      <section className="mx-auto max-w-8xl px-6 pt-10 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[5fr_20fr_6fr]">
          <CategorySidebar />

          <div
            className="relative overflow-hidden rounded-3xl border border-forest-700 bg-cover bg-center p-8 lg:p-14"
            style={{
              backgroundImage:
                "url('/fondo-casanare.jpg'), linear-gradient(115deg,#0b1f16 10%,#3a2a12 55%,#c2703a 78%,#f2b73f 100%)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-950/20 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />

            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-400">
                Naturaleza, cultura y aventura en los Llanos Orientales
              </span>
              <h1 className="mt-4 text-4xl font-bold italic tracking-tight sm:text-5xl lg:text-6xl">
                Vive lo mejor
                <br />
                de Yopal-Casanare
              </h1>
              <svg viewBox="0 0 220 20" className="mt-1 h-4 w-44 text-brand-400" fill="none">
                <path d="M2 14c40-16 140-16 216 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <p className="mt-4 max-w-lg text-lg text-slate-200">
                Naturaleza, cultura y aventura en el corazón de los Llanos Orientales. Explora, vive y conecta.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/lugares"
                  className="btn-brand-font inline-flex items-center gap-2 rounded-full bg-brand-500 px-8 py-3 font-semibold text-forest-950 transition hover:bg-brand-400"
                >
                  Explorar lugares
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" strokeLinejoin="round" />
                    <circle cx="12" cy="9.5" r="2.3" />
                  </svg>
                </Link>
                <button className="btn-brand-font inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 font-semibold text-forest-950 transition hover:bg-brand-400">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-950 text-brand-400">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3 w-3">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  Ver video
                </button>
              </div>
            </div>

            <div className="relative z-10 mt-45 flex flex-col gap-0.3 rounded-4xl border border-white/150 bg-forest-950/85 p-4 backdrop-blur sm:flex-row sm:items-center sm:divide-x sm:divide-white/10">
              {searchFilters.map((filter) => (
                <div key={filter.key} className="flex flex-1 items-center gap-3 px-1 first:pl-0 sm:px-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-800 text-brand-400">
                    <FilterIcon filterKey={filter.key} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">{filter.label}</p>
                    <p className="flex items-center gap-1 truncate text-sm font-semibold text-slate-100">
                      {filter.value}
                      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-slate-400" stroke="currentColor" strokeWidth="2">
                        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </p>
                  </div>
                </div>
              ))}
              <button className="flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full bg-brand-500 text-forest-950 transition hover:bg-brand-400 sm:ml-2">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <NextEventCard />
            <SimpleMap />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-8xl px-6 py-10 lg:px-8">
        <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6 lg:p-10">
          <h3 className="text-center font-[family-name:var(--font-brand)] text-lg font-semibold">Recomendaciones para ti </h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {featuredPlaces.map((place, index) => (
              <div key={place.id} className="overflow-hidden rounded-4xl border border-forest-700 bg-forest-950">
                {place.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={place.imageUrl} alt={place.name} className="h-40 w-full object-cover" />
                ) : (
                  <div
                    className="h-40 w-full"
                    style={{
                      background: [
                        "linear-gradient(135deg,#f59e0b,#166534)",
                        "linear-gradient(135deg,#0ea5e9,#166534)",
                        "linear-gradient(135deg,#22c55e,#0f2a1d)",
                      ][index % 3],
                    }}
                  />
                )}
                <div className="p-3">
                  <p className="text-sm font-semibold text-slate-100">{place.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{place.category} · {place.price}</p>
                  {place.rating ? (
                    <p className="mt-1 text-xs font-semibold text-brand-400">★ {place.rating}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-7 text-center">
            <Link
              href="/recomendaciones"
              className="btn-brand-font inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-forest-950 transition hover:bg-brand-400"
            >
              Ver todas las recomendaciones →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-8xl px-6 pb-10 lg:px-8">
        <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6 lg:p-10">
          <h3 className="text-center font-[family-name:var(--font-brand)] text-lg font-semibold">Eventos en tiempo real</h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {featuredEvents.map((event, index) => (
              <div key={event.id} className="overflow-hidden rounded-4xl border border-forest-700 bg-forest-950">
                {event.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={event.imageUrl} alt={event.title} className="h-40 w-full object-cover" />
                ) : (
                  <div
                    className="h-40 w-full"
                    style={{
                      background: [
                        "linear-gradient(135deg,#f59e0b,#166534)",
                        "linear-gradient(135deg,#0ea5e9,#166534)",
                        "linear-gradient(135deg,#22c55e,#0f2a1d)",
                      ][index % 3],
                    }}
                  />
                )}
                <div className="p-3">
                  <p className="text-sm font-semibold text-slate-100">{event.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{event.date} · {event.place}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-7 text-center">
            <Link
              href="/eventos"
              className="btn-brand-font inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-forest-950 transition hover:bg-brand-400"
            >
              Ver todos los eventos →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-8xl px-6 pb-14 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <EventsCalendar />

          <WeatherCard />

          <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6">
            <h3 className="text-center font-[family-name:var(--font-brand)] text-lg font-semibold">Recomendaciones</h3>
            <div className="mt-4 space-y-4 text-sm">
              {tips.map((tip) => (
                <div key={tip.id}>
                  <p className="font-semibold text-slate-200">{tip.category}</p>
                  <p className="mt-1 text-slate-400">{tip.text}</p>
                </div>
              ))}
              {tips.length === 0 ? <p className="text-slate-500">Aún no hay recomendaciones cargadas.</p> : null}
            </div>
          </div>

          <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6">
            <h3 className="text-center font-[family-name:var(--font-brand)] text-lg font-semibold">Seguridad</h3>
            <div className="mt-4 space-y-4 text-sm">
              {safetyPoints.map((point) => (
                <div key={point.id}>
                  <p className="font-semibold text-slate-200">{point.type}</p>
                  <p className="mt-1 text-slate-400">
                    {point.phone ? <span className="font-semibold text-brand-400">{point.phone} </span> : null}
                    {point.name}
                  </p>
                  {point.address ? <p className="text-xs text-slate-500">{point.address}</p> : null}
                </div>
              ))}
              {safetyPoints.length === 0 ? <p className="text-slate-500">Aún no hay puntos de seguridad cargados.</p> : null}
            </div>
          </div>

          <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6">
            <h3 className="text-center font-[family-name:var(--font-brand)] text-lg font-semibold">Emergencias</h3>
            <div className="mt-4 space-y-4 text-sm">
              {emergencyContacts.map((contact) => (
                <div key={contact.id}>
                  <p className="font-semibold text-slate-200">{contact.type}</p>
                  <p className="mt-1 text-slate-400">
                    {contact.phone ? <span className="font-semibold text-brand-400">{contact.phone} </span> : null}
                    {contact.name}
                  </p>
                  {contact.address ? <p className="text-xs text-slate-500">{contact.address}</p> : null}
                </div>
              ))}
              {emergencyContacts.length === 0 ? <p className="text-slate-500">Aún no hay contactos de emergencia cargados.</p> : null}
            </div>
          </div>
        </div>
      </section>

      <section id="ruta" className="mx-auto max-w-8xl px-6 pb-14 lg:px-8">
        <div className="rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-400">{siteContent.offer.eyebrow}</p>
            <h2 className="mt-2 font-[family-name:var(--font-brand)] text-3xl font-bold">{siteContent.offer.title}</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
              {siteContent.offer.description}
            </p>
          </div>
          <div className="mt-10">
            <CategoryShowcase />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-8xl px-6 pb-14 lg:px-8">
        <div className="rounded-3xl border border-brand-500/30 bg-gradient-to-br from-forest-900 to-forest-800 p-8 shadow-sm">
          <div className="flex flex-col items-center gap-4 text-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.40em] text-brand-400">{siteContent.cta.eyebrow}</p>
              <h2 className="mt-2 font-[family-name:var(--font-brand)] text-3xl font-bold text-slate-100">{siteContent.cta.title}</h2>
            </div>
            <Link href="/lugares" className="btn-brand-font rounded-full bg-brand-500 px-6 py-3 font-semibold text-forest-950 transition hover:bg-brand-400">
              Explorar ahora
            </Link>
          </div>
        </div>
      </section>

      <DashboardPreview />

      <ContactFooter />
    </main>
  );
}
