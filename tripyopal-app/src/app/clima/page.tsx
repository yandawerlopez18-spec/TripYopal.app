"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CategoryIcon } from "../components/home/categoryIcons";
import { getWeatherForYopal, type WeatherResponse } from "../services/external/weather";
import { climateTips } from "../services/siteContent";

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

export default function ClimaPage() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      const data = await getWeatherForYopal();
      if (!cancelled) {
        setWeather(data);
      }
    }

    loadWeather();
    const interval = setInterval(loadWeather, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const updatedLabel = weather
    ? new Date(weather.updatedAt).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })
    : null;

  return (
    <main className="min-h-screen bg-forest-950 px-6 py-6 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="btn-brand-font inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-forest-950 transition hover:bg-brand-400"
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
            {weather ? (
              <p className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
                <span className={`h-2 w-2 rounded-full ${weather.isLive ? "bg-emerald-400" : "bg-amber-400"}`} />
                {weather.isLive ? "Datos en vivo" : "Datos de referencia"} · Actualizado a las {updatedLabel}
              </p>
            ) : null}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-forest-700 bg-forest-950 p-6 lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">Ahora mismo</p>
              {weather ? (
                <>
                  <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                        alt={weather.description}
                        className="h-24 w-24"
                      />
                      <div>
                        <p className="text-5xl font-semibold">{weather.temperature}°C</p>
                        <p className="mt-1 text-sm capitalize text-slate-300">{weather.description}</p>
                        <p className="mt-1 text-xs text-slate-500">Sensación térmica: {weather.feelsLike}°C</p>
                      </div>
                    </div>
                    <div className="text-right text-sm text-slate-400">
                      <p>Mín. {weather.tempMin}°C · Máx. {weather.tempMax}°C</p>
                      <p>Humedad: {weather.humidity}%</p>
                      <p>Viento: {weather.wind} km/h</p>
                      <p>Presión: {weather.pressure} hPa</p>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-300 sm:grid-cols-4">
                    <div className="rounded-xl bg-forest-900 p-3 text-center">
                      <p className="text-xs text-slate-500">Amanecer</p>
                      <p className="mt-1 font-semibold text-brand-400">{weather.sunrise}</p>
                    </div>
                    <div className="rounded-xl bg-forest-900 p-3 text-center">
                      <p className="text-xs text-slate-500">Atardecer</p>
                      <p className="mt-1 font-semibold text-brand-400">{weather.sunset}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-300">{weather.recommended}</p>
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

          {weather && weather.forecast.length > 0 ? (
            <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-950 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">Próximos días</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {weather.forecast.map((day) => (
                  <div key={day.date} className="rounded-2xl bg-forest-900 p-4 text-center">
                    <p className="text-sm font-semibold capitalize text-slate-200">{day.date}</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                      alt={day.description}
                      className="mx-auto h-14 w-14"
                    />
                    <p className="text-xs capitalize text-slate-400">{day.description}</p>
                    <p className="mt-2 text-sm font-semibold text-brand-400">
                      {day.minTemp}° / {day.maxTemp}°
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
