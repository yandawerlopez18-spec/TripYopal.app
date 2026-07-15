"use client";

import { useEffect, useState } from "react";
import { getWeatherForYopal } from "../../services/external/weather";

export default function WeatherCard() {
  const [weather, setWeather] = useState<{
    city: string;
    temperature: number;
    description: string;
    recommended: string;
  } | null>(null);

  useEffect(() => {
    async function loadWeather() {
      const data = await getWeatherForYopal();
      setWeather(data);
    }

    loadWeather();
  }, []);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">Clima en Yopal</h3>
      <p className="mt-2 text-sm text-slate-600">Información actual para que los visitantes planifiquen mejor su día.</p>
      <div className="mt-6 rounded-2xl bg-slate-900 p-6 text-white">
        <p className="text-sm text-emerald-300">Hoy</p>
        {weather ? (
          <>
            <p className="mt-2 text-4xl font-semibold">{weather.temperature}°C</p>
            <p className="mt-2 text-sm text-slate-300">{weather.description}</p>
            <p className="mt-2 text-sm text-slate-300">{weather.recommended}</p>
          </>
        ) : (
          <p className="mt-2 text-sm text-slate-300">Cargando clima...</p>
        )}
      </div>
    </div>
  );
}
