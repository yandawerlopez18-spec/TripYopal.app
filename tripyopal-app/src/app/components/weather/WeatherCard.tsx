"use client";

import { useEffect, useState } from "react";
import { getWeatherForYopal, type WeatherResponse } from "../../services/external/weather";
import { sectionText, siteContent } from "../../services/siteContent";
import { DropletIcon, LeafIcon, ThermometerIcon, WeatherIcon, WindIcon, getWeatherKind } from "../home/infoIcons";

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

/** Compresses API strings like "3:00 p. m." into a compact "3 PM" label for the hourly strip. */
function toShortHour(time: string): string {
  const match = time.match(/(\d{1,2}).*?([ap])\.?\s*m/i);
  if (!match) return time;
  return `${match[1]} ${match[2].toUpperCase()}M`;
}

export default function WeatherCard() {
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

  return (
    <div id="clima" className="flex h-full flex-col rounded-3xl border border-forest-700 bg-forest-900 p-6 text-slate-100 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
          <WeatherIcon kind={weather ? getWeatherKind(weather.icon) : "partly-cloudy"} className="h-5 w-5" />
        </span>
        <h3 className="font-[family-name:var(--font-brand)] text-lg font-semibold">{sectionText("weather", "title", "Clima y mejor época para visitar")}</h3>
      </div>
      <p className="mt-1 text-center text-sm text-slate-400">{sectionText("weather", "subtitle", "Información actual para que planifiques mejor tu día.")}</p>

      {weather ? (
        <>
          <div className="mt-5 flex flex-col items-center text-center">
            <WeatherIcon kind={getWeatherKind(weather.icon)} className="h-16 w-16 text-brand-400" />
            <p className="text-3xl font-semibold">{weather.temperature}°C</p>
            <p className="mt-1 text-sm capitalize text-slate-300">{weather.description}</p>
            <p className="text-xs text-slate-500">{weather.city}, Casanare</p>
          </div>

          {weather.hourly.length > 0 ? (
            <div className="mt-4 grid grid-cols-5 gap-1 rounded-2xl border border-forest-700 bg-forest-950/60 p-3 text-center text-xs text-slate-300">
              <div>
                <p className="text-slate-500">Ahora</p>
                <WeatherIcon kind={getWeatherKind(weather.icon)} className="mx-auto mt-1 h-5 w-5 text-brand-400" />
                <p className="mt-1 font-semibold text-slate-100">{weather.temperature}°</p>
              </div>
              {weather.hourly.slice(0, 4).map((hour) => (
                <div key={hour.time}>
                  <p className="text-slate-500">{toShortHour(hour.time)}</p>
                  <WeatherIcon kind={getWeatherKind(hour.icon)} className="mx-auto mt-1 h-5 w-5 text-brand-400" />
                  <p className="mt-1 font-semibold text-slate-100">{hour.temp}°</p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-4 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 rounded-xl border border-forest-700 bg-forest-800 p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-900 text-brand-400">
                <DropletIcon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-slate-500">Humedad</p>
                <p className="font-semibold text-slate-100">{weather.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-forest-700 bg-forest-800 p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-900 text-brand-400">
                <WindIcon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-slate-500">Viento</p>
                <p className="font-semibold text-slate-100">{weather.wind} km/h</p>
              </div>
            </div>
          </div>

          <div className="mt-2 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 rounded-xl border border-forest-700 bg-forest-800 p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-900 text-brand-400">
                <ThermometerIcon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-slate-500">Temp. promedio</p>
                <p className="font-semibold text-slate-100">27°C - 33°C</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-forest-700 bg-forest-800 p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-900 text-brand-400">
                <DropletIcon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-slate-500">Lluvias promedio</p>
                <p className="font-semibold text-slate-100">80 - 120 mm/mes</p>
              </div>
            </div>
          </div>

          <p className="mt-4 flex items-start gap-2 rounded-2xl border border-forest-700 bg-forest-950/60 p-3 text-sm text-slate-300">
            <LeafIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
            {weather.recommended}
          </p>
        </>
      ) : (
        <p className="mt-5 text-sm text-slate-400">Cargando clima...</p>
      )}

      <div className="mt-5 overflow-hidden rounded-2xl border border-forest-700">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={siteContent.images.weatherIllustration} alt="Mejor época para visitar: Diciembre a Marzo" className="w-full object-cover" />
      </div>
    </div>
  );
}
