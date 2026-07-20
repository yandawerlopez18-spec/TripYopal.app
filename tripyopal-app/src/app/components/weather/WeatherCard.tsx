"use client";

import { useEffect, useState } from "react";
import { getWeatherForYopal, type WeatherResponse } from "../../services/external/weather";
import { climateTips } from "../../services/siteContent";

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

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
    <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6 text-slate-100 shadow-sm">
      <h3 className="text-center font-[family-name:var(--font-brand)] text-lg font-semibold">Clima y mejor época para visitar</h3>
      <p className="mt-1 text-sm text-slate-400">Información actual para que planifiques mejor tu día.</p>

      {weather ? (
        <div className="mt-5 flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            className="h-16 w-16"
          />
          <p className="text-3xl font-semibold">{weather.temperature}°C</p>
          <p className="mt-1 text-sm capitalize text-slate-300">{weather.description}</p>

          <div className="mt-4 grid w-full grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="rounded-xl bg-forest-800 p-2">
              <p className="text-slate-500">Humedad</p>
              <p className="mt-0.5 font-semibold">{weather.humidity}%</p>
            </div>
            <div className="rounded-xl bg-forest-800 p-2">
              <p className="text-slate-500">Viento</p>
              <p className="mt-0.5 font-semibold">{weather.wind} km/h</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-300">{weather.recommended}</p>
        </div>
      ) : (
        <p className="mt-5 text-sm text-slate-400">Cargando clima...</p>
      )}

      <div className="mt-5 space-y-3">
        {climateTips.map((tip) => (
          <div key={tip.id} className="rounded-2xl bg-forest-800 p-4">
            <p className="text-sm font-semibold text-brand-400">{tip.season}</p>
            <p className="mt-1 text-sm text-slate-300">{tip.description}</p>
          </div>
        ))}
        {climateTips.length === 0 ? <p className="text-sm text-slate-500">Aún no hay temporadas cargadas.</p> : null}
      </div>
    </div>
  );
}
