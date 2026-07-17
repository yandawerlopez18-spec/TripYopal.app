"use client";

import Link from "next/link";
import ChatbotPreviewCard from "./components/assistant/ChatbotPreviewCard";
import CategorySidebar from "./components/home/CategorySidebar";
import CategoryShowcase from "./components/home/CategoryShowcase";
import ContactFooter from "./components/home/ContactFooter";
import DashboardPreview from "./components/home/DashboardPreview";
import SimpleMap from "./components/map/SimpleMap";
import WeatherCard from "./components/weather/WeatherCard";
import { featuredEvents, featuredPlaces } from "./services/content";
import { emergencyContacts, safetyPoints, siteContent, tips } from "./services/siteContent";

type HeroCategoryKey = "llanos" | "cascadas" | "sabana" | "fauna";

const categories: { key: HeroCategoryKey; label: string; gradient: string }[] = [
  { key: "llanos", label: "Llanos", gradient: "linear-gradient(135deg,#f59e0b,#166534)" },
  { key: "cascadas", label: "Cascadas", gradient: "linear-gradient(135deg,#38bdf8,#1d4ed8)" },
  { key: "sabana", label: "Sabana", gradient: "linear-gradient(135deg,#facc15,#b45309)" },
  { key: "fauna", label: "Fauna", gradient: "linear-gradient(135deg,#fb7185,#065f46)" },
];

function HeroCategoryIcon({ icon }: { icon: HeroCategoryKey }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "llanos":
      return (
        <svg {...common}>
          <path d="M30 10c4 0 7 3 7 7 0 2-1 4-2 5l2 3-4 1v6l-3 1-1-5-7-1-3 6h-4l3-7c-3-1-5-3-6-6 3-2 6-3 9-3 1-4 4-7 9-7Z" />
          <circle cx="32" cy="17" r="1" fill="currentColor" />
        </svg>
      );
    case "cascadas":
      return (
        <svg {...common}>
          <path d="M8 16h32" />
          <path d="M14 16v8M22 16v6M30 16v8M38 16v6" />
          <path d="M12 28c2 4 2 8 0 12M20 26c2 5 2 9 0 14M28 28c2 4 2 8 0 12M36 26c2 5 2 9 0 14" />
        </svg>
      );
    case "sabana":
      return (
        <svg {...common}>
          <circle cx="24" cy="14" r="5" />
          <path d="M24 4v3M24 25v3M12 14h3M33 14h3M15.5 5.5l2 2M30.5 5.5l-2 2" />
          <path d="M8 40c3-8 6-8 6 0M18 40c3-10 6-10 6 0M28 40c3-8 6-8 6 0" />
        </svg>
      );
    case "fauna":
      return (
        <svg {...common}>
          <path d="M10 26c0-7 5-13 13-13 3 0 6 1 8 3l7-3-3 6c1 2 1 5 0 7l5 2-7 1c-2 4-6 7-11 7-7 0-12-5-12-10Z" />
          <circle cx="26" cy="19" r="1.2" fill="currentColor" />
          <path d="M16 29l-5 5M21 31l-4 6" />
        </svg>
      );
  }
}

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
        <div className="grid gap-6 lg:grid-cols-[5fr_20fr_6fr]">
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

            <div className="absolute bottom-6 left-6 z-10 rounded-2xl border border-white/80 bg-black/40 px-4 py-2 backdrop-blur-md">
              <p className="text-lg font-bold leading-none tracking-tight text-white">
                Trip<span className="text-brand-400">Yopal</span>
              </p>
              <p className="mt-0.01 text-[100px] font-medium uppercase tracking-[0.001em] text-slate-300"></p>
            </div>

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
                <button className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-black/30 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-black/40">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-forest-950">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3 w-3">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  Ver video
                </button>
              </div>
            </div>

            <div className="relative z-10 mt-10 flex flex-wrap gap-3 lg:absolute lg:right-8 lg:top-8 lg:mt-0 lg:flex-col">
              {categories.map((category) => (
                <div
                  key={category.label}
                  className="flex items-center gap-2 rounded-full border border-white/80 bg-black/30 py-1.5 pl-1.5 pr-4 text-sm font-medium text-white backdrop-blur"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full p-1.5 text-white shadow-inner"
                    style={{ background: category.gradient }}
                  >
                    <HeroCategoryIcon icon={category.key} />
                  </span>
                  {category.label}
                </div>
              ))}
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
            <ChatbotPreviewCard />
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
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6">
            <h3 className="text-center font-[family-name:var(--font-brand)] text-lg font-semibold">Eventos en tiempo real </h3>
            <ul className="mt-5 space-y-3">
              {featuredEvents.map((event) => (
                <li key={event.id} className="flex items-center gap-3 rounded-2xl bg-forest-950 p-3">
                  {event.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={event.imageUrl} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                  ) : null}
                  <span className="shrink-0 rounded-xl bg-brand-500/10 px-2 py-1 text-xs font-semibold text-brand-400">
                    {event.date}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-100">{event.title}</p>
                    <p className="truncate text-xs text-slate-400">{event.place}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a href="/eventos" className="mt-4 inline-block text-sm font-semibold text-brand-400 hover:text-brand-300">
              Ver todos los eventos →
            </a>
          </div>

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
