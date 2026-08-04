"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CategorySidebar from "./components/home/CategorySidebar";
import CategoryShowcase from "./components/home/CategoryShowcase";
import ContactFooter from "./components/home/ContactFooter";
import DashboardPreview from "./components/home/DashboardPreview";
import EmergencyPanel from "./components/home/EmergencyPanel";
import EventScrollNotification from "./components/home/EventScrollNotification";
import EventsCalendar from "./components/home/EventsCalendar";
import ExploreCta from "./components/home/ExploreCta";
import { LeafIcon } from "./components/home/infoIcons";
import LiveEvents from "./components/home/LiveEvents";
import NextEventCard from "./components/home/NextEventCard";
import RecommendationsPanel from "./components/home/RecommendationsPanel";
import SafetyPanel from "./components/home/SafetyPanel";
import SimpleMap from "./components/map/SimpleMap";
import RouteGuide from "./components/travel/RouteGuide";
import WeatherCard from "./components/weather/WeatherCard";
import { useDataHydration } from "./context/DataHydrationContext";
import { sectionText, siteContent } from "./services/siteContent";

const interestOptions = ["Aventura", "Naturaleza", "Cultura", "Recreación", "Cualquiera"];
const filterableInterests = new Set(["Naturaleza", "Cultura", "Recreación"]);
const locationOptions = ["Cualquier lugar", "Centro", "Norte", "Sur"];
const dateOptions = ["Cualquier fecha", "Hoy", "Este fin de semana", "Este mes"];
const budgetOptions = ["Cualquiera", "Gratis", "Bajo", "Medio", "Alto"];

type FilterKey = "who" | "where" | "when" | "budget";

function FilterIcon({ filterKey }: { filterKey: FilterKey }) {
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
  useDataHydration();
  const router = useRouter();
  const [interest, setInterest] = useState(interestOptions[0]);
  const [location, setLocation] = useState(locationOptions[0]);
  const [date, setDate] = useState(dateOptions[0]);
  const [budget, setBudget] = useState(budgetOptions[0]);

  const offerTitleWords = siteContent.offer.title.split(" ");
  const offerTitleEnd = offerTitleWords.pop() ?? "";
  const offerTitleStart = offerTitleWords.join(" ");

  const filterConfigs: { key: FilterKey; label: string; value: string; setValue: (value: string) => void; options: string[] }[] = [
    { key: "who", label: "¿Qué quieres hacer?", value: interest, setValue: setInterest, options: interestOptions },
    { key: "where", label: "Ubicación", value: location, setValue: setLocation, options: locationOptions },
    { key: "when", label: "Fecha", value: date, setValue: setDate, options: dateOptions },
    { key: "budget", label: "Presupuesto", value: budget, setValue: setBudget, options: budgetOptions },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filterableInterests.has(interest)) params.set("categoria", interest);
    if (budget !== "Cualquiera") params.set("presupuesto", budget);
    const query = params.toString();
    router.push(query ? `/lugares?${query}` : "/lugares");
  };

  return (
    <main className="min-h-screen bg-forest-950 text-slate-100">
      <section className="mx-auto max-w-8xl px-6 pb-10 pt-10 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[5fr_20fr_6fr]">
          <CategorySidebar />

          <div
            className="relative flex min-h-[380px] flex-col justify-between gap-8 overflow-hidden rounded-3xl border border-forest-700 bg-cover bg-center p-6 lg:min-h-[420px] lg:p-10"
            style={{
              backgroundImage: `url('${siteContent.hero.backgroundImage}'), linear-gradient(115deg,#0b1f16 10%,#3a2a12 55%,#c2703a 78%,#f2b73f 100%)`,
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-950/20 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />

            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-400">
                {siteContent.hero.badge}
              </span>
              <h1 className="mt-4 text-4xl font-bold italic tracking-tight sm:text-5xl lg:text-6xl">{siteContent.hero.title}</h1>
              <svg viewBox="0 0 220 20" className="mt-1 h-4 w-44 text-brand-400" fill="none">
                <path d="M2 14c40-16 140-16 216 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <p className="mt-4 max-w-lg text-lg text-slate-200">{siteContent.hero.subtitle}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/lugares"
                  className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold text-forest-950 transition"
                >
                  {sectionText("hero", "exploreButtonText", "Explorar lugares")}
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" strokeLinejoin="round" />
                    <circle cx="12" cy="9.5" r="2.3" />
                  </svg>
                </Link>
                {siteContent.hero.videoUrl ? (
                  <a
                    href={siteContent.hero.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-forest-950 transition"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-950 text-brand-400">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3 w-3">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    {sectionText("hero", "videoButtonText", "Ver video")}
                  </a>
                ) : null}
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-0.3 rounded-4xl border border-white/150 bg-forest-950/85 p-4 backdrop-blur sm:flex-row sm:items-center sm:divide-x sm:divide-white/10">
              {filterConfigs.map((filter) => (
                <div key={filter.key} className="relative flex flex-1 items-center gap-3 px-1 first:pl-0 sm:px-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-800 text-brand-400">
                    <FilterIcon filterKey={filter.key} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-400">{filter.label}</p>
                    <div className="relative">
                      <select
                        value={filter.value}
                        onChange={(e) => filter.setValue(e.target.value)}
                        className="w-full appearance-none truncate bg-transparent pr-5 text-sm font-semibold text-slate-100 focus:outline-none"
                      >
                        {filter.options.map((option) => (
                          <option key={option} value={option} className="text-slate-900">
                            {option}
                          </option>
                        ))}
                      </select>
                      <svg viewBox="0 0 24 24" fill="none" className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" stroke="currentColor" strokeWidth="2">
                        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleSearch}
                className="btn-gradient flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full text-forest-950 transition sm:ml-2"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <NextEventCard />
            <SimpleMap />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-8xl px-6 pb-10 lg:px-8">
        <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6 shadow-xl lg:p-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-forest-700" />
              <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-brand-400">
                <LeafIcon className="h-4 w-4" /> {sectionText("routes", "eyebrow", "Explora Yopal-Casanare")}
              </span>
              <span className="h-px w-10 bg-forest-700" />
            </div>
            <h2 className="mt-3 font-[family-name:var(--font-brand)] text-4xl font-bold sm:text-5xl">
              <span className="text-white">{sectionText("routes", "title", "Rutas")}</span>{" "}
              <span className="text-brand-400">{sectionText("routes", "titleAccent", "recomendadas")}</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              {sectionText("routes", "description", "Organiza tu viaje con rutas sugeridas según tiempo, presupuesto e intereses.")}
            </p>
          </div>
          <div className="mt-10">
            <RouteGuide />
          </div>
        </div>
      </section>

      <LiveEvents />

      <section className="mx-auto max-w-8xl px-6 pb-14 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <EventsCalendar />
          <WeatherCard />
          <RecommendationsPanel />
          <SafetyPanel />
          <EmergencyPanel />
        </div>
      </section>

      <section id="ruta" className="mx-auto max-w-8xl px-6 pb-14 lg:px-8">
        <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6 shadow-xl lg:p-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-forest-700" />
              <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-brand-400">
                <LeafIcon className="h-4 w-4" /> {siteContent.offer.eyebrow}
              </span>
              <span className="h-px w-10 bg-forest-700" />
            </div>
            <h2 className="mt-3 font-[family-name:var(--font-brand)] text-4xl font-bold sm:text-5xl">
              {offerTitleStart}
              {offerTitleEnd ? <span className="text-brand-400"> {offerTitleEnd}</span> : null}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              {siteContent.offer.description}
            </p>
          </div>
          <div className="mt-10">
            <CategoryShowcase />
          </div>
        </div>
      </section>

      <ExploreCta />

      <DashboardPreview />

      <ContactFooter />

      <EventScrollNotification />
    </main>
  );
}
