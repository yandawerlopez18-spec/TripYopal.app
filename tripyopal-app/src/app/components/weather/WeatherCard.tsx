"use client";

import { useEffect, useState } from "react";
import { getWeatherForYopal } from "../../services/external/weather";
import { climateTips } from "../../services/siteContent";

export default function WeatherCard() {
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
    <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6 text-slate-100 shadow-sm">
      <h3 className="text-center font-[family-name:var(--font-brand)] text-lg font-semibold">Clima y mejor época para visitar</h3>
      <p className="mt-1 text-sm text-slate-400">Información actual para que planifiques mejor tu día.</p>

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
