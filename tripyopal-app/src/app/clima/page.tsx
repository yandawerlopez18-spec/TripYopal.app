"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CategoryIcon } from "../components/home/categoryIcons";
import { getWeatherForYopal } from "../services/external/weather";
import { climateTips } from "../services/siteContent";

export default function ClimaPage() {
  const [weather, setWeather] = useState<{
    city: string;
    temperature: number;
    description: string;
    recommended: string;
    humidity: number;
    wind: number;
  } | null>(null);

  useEffect(() => {
    async function loadWeather() {
      const data = await getWeatherForYopal();
      setWeather(data);
    }

    loadWeather();
  }, []);

  return (
    <main className="min-h-screen bg-forest-950 px-6 py-16 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="btn-brand-font inline-flex items-center gap-2 rounded-full border border-forest-700 bg-forest-900 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-brand-400 hover:bg-forest-800 hover:text-brand-400"
        >
          ← Volver al inicio
        </Link>

        <div className="mt-6 rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-xl">
          <div className="text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
              <CategoryIcon icon="clima" />
            </span>
            <h1 className="mt-4 font-[family-name:var(--font-brand)] text-4xl font-bold text-white sm:text-5xl">Clima</h1>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              Consulta el clima actual de Yopal y la mejor época para planear tu visita.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-forest-700 bg-forest-950 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">Ahora mismo</p>
              {weather ? (
                <>
                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <p className="text-4xl font-semibold">{weather.temperature}°C</p>
                      <p className="mt-1 text-sm text-slate-300">{weather.description}</p>
                    </div>
                    <div className="text-right text-sm text-slate-400">
                      <p>Humedad: {weather.humidity}%</p>
                      <p>Viento: {weather.wind} km/h</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">{weather.recommended}</p>
                </>
              ) : (
                <p className="mt-5 text-sm text-slate-400">Cargando clima...</p>
              )}
            </div>

            <div className="rounded-2xl border border-forest-700 bg-forest-950 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">Mejor época para visitar</p>
              <div className="mt-5 space-y-3">
                {climateTips.map((tip) => (
                  <div key={tip.id} className="rounded-2xl bg-forest-900 p-4">
                    <p className="text-sm font-semibold text-brand-400">{tip.season}</p>
                    <p className="mt-1 text-sm text-slate-300">{tip.description}</p>
                  </div>
                ))}
                {climateTips.length === 0 ? <p className="text-sm text-slate-500">Aún no hay temporadas cargadas.</p> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
