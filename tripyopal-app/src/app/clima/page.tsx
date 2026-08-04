"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CategoryIcon } from "../components/home/categoryIcons";
import { DropletIcon, ThermometerIcon, WeatherIcon, WindIcon, getWeatherKind } from "../components/home/infoIcons";
import HourlyChart from "../components/weather/HourlyChart";
import { CompassGauge, RingGauge, Sparkline } from "../components/weather/WeatherGauges";
import { useDataHydration } from "../context/DataHydrationContext";
import { getWeatherForYopal, type WeatherResponse } from "../services/external/weather";
import { climateTips, siteContent } from "../services/siteContent";
import { buildHourlySeries } from "../utils/hourlySeries";

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

function SunHorizonIcon({ className = "h-5 w-5", direction }: { className?: string; direction: "up" | "down" }) {
  const arrow = direction === "up" ? "M12 8V2M9 4.5 12 2l3 2.5" : "M12 2v6M9 5.5 12 8l3-2.5";
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={arrow} />
      <path d="M4.5 15.5a7.5 7.5 0 0 1 15 0" />
      <path d="M2.5 15.5h19M4 18.5h16" />
    </svg>
  );
}

function MoonIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

function EyeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

function GaugeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 16a8 8 0 1 1 16 0" />
      <path d="M12 16 15.5 10" />
      <circle cx="12" cy="16" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SunsetIllustration() {
  return (
    <svg viewBox="0 0 400 180" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sunset-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b1440" />
          <stop offset="45%" stopColor="#7c2d5a" />
          <stop offset="75%" stopColor="#e2823a" />
          <stop offset="100%" stopColor="#fbbf5e" />
        </linearGradient>
        <linearGradient id="sunset-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f2a1d" />
          <stop offset="100%" stopColor="#0b1f16" />
        </linearGradient>
        <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7d6" />
          <stop offset="100%" stopColor="#fbbf5e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="400" height="120" fill="url(#sunset-sky)" />
      <circle cx="200" cy="112" r="55" fill="url(#sun-glow)" />
      <circle cx="200" cy="112" r="30" fill="#fff3c4" />
      <rect x="0" y="112" width="400" height="68" fill="url(#sunset-water)" />
      <path d="M0 116 Q50 110 100 116 T200 116 T300 116 T400 116 V180 H0Z" fill="#0b1f16" opacity="0.6" />
      <path d="M30 180V90c0-2 3-2 3 0v40c14-24 34-6 26 8-6-10-18-10-22 2" fill="none" stroke="#245a3d" strokeWidth="3" strokeLinecap="round" />
      <path d="M55 180v-70c0-2 3-2 3 0v30c12-20 30-4 22 8-5-9-15-9-19 2" fill="none" stroke="#143624" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function ClimaPage() {
  useDataHydration();
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

  const hourlySeries = useMemo(() => {
    if (!weather) return [];
    return buildHourlySeries(
      { temp: weather.temperature, icon: weather.icon, rainChance: weather.rainChance, uvIndex: weather.uvIndex },
      weather.hourly,
      12,
    );
  }, [weather]);

  const tempSparkline = useMemo(() => hourlySeries.slice(0, 6).map((point) => point.temp), [hourlySeries]);
  const feelsLikeSparkline = useMemo(() => {
    if (!weather) return [];
    const offset = weather.feelsLike - weather.temperature;
    return hourlySeries.slice(0, 6).map((point) => point.temp + offset);
  }, [hourlySeries, weather]);

  const updatedLabel = weather
    ? new Date(weather.updatedAt).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })
    : null;

  const featuredClimateTip = climateTips[0];

  return (
    <main className="min-h-screen bg-forest-950 px-6 py-10 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          ← Volver al inicio
        </Link>

        <div className="mt-6 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
            <CategoryIcon icon="clima" />
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-brand)] text-4xl font-bold text-white sm:text-5xl">
            Clima en <span className="text-brand-400">Yopal, Casanare</span>
          </h1>
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

        {!weather ? (
          <p className="mt-10 text-center text-sm text-slate-400">Cargando clima...</p>
        ) : (
          <>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6 lg:col-span-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">Ahora mismo</p>

                <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <WeatherIcon kind={getWeatherKind(weather.icon)} className="h-20 w-20 text-amber-300" />
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
                  <div className="rounded-xl bg-forest-950 p-3 text-center">
                    <span className="mx-auto flex h-6 w-6 items-center justify-center text-brand-400">
                      <SunHorizonIcon direction="up" className="h-5 w-5" />
                    </span>
                    <p className="mt-1 text-xs text-slate-500">Amanecer</p>
                    <p className="font-semibold text-brand-400">{weather.sunrise}</p>
                  </div>
                  <div className="rounded-xl bg-forest-950 p-3 text-center">
                    <span className="mx-auto flex h-6 w-6 items-center justify-center text-brand-400">
                      <SunHorizonIcon direction="down" className="h-5 w-5" />
                    </span>
                    <p className="mt-1 text-xs text-slate-500">Atardecer</p>
                    <p className="font-semibold text-brand-400">{weather.sunset}</p>
                  </div>
                  <div className="rounded-xl bg-forest-950 p-3 text-center">
                    <span className="mx-auto flex h-6 w-6 items-center justify-center text-brand-400">
                      <DropletIcon className="h-5 w-5" />
                    </span>
                    <p className="mt-1 text-xs text-slate-500">Prob. de lluvia</p>
                    <p className="font-semibold text-brand-400">{weather.rainChance}%</p>
                  </div>
                  <div className="rounded-xl bg-forest-950 p-3 text-center">
                    <span className="mx-auto flex h-6 w-6 items-center justify-center text-brand-400">
                      <WindIcon className="h-5 w-5" />
                    </span>
                    <p className="mt-1 text-xs text-slate-500">Viento</p>
                    <p className="font-semibold text-brand-400">{weather.wind} km/h</p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-slate-300">{weather.recommended}</p>
              </div>

              <div className="flex flex-col rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">Mejor época para visitar</p>
                {featuredClimateTip ? (
                  <div className="mt-5 rounded-2xl bg-forest-950 p-4">
                    <p className="text-sm font-semibold text-brand-400">{featuredClimateTip.season}</p>
                    <p className="mt-1 text-sm text-slate-300">{featuredClimateTip.description}</p>
                  </div>
                ) : (
                  <p className="mt-5 text-sm text-slate-500">Aún no hay temporadas cargadas.</p>
                )}
                <div className="mt-4 flex-1 overflow-hidden rounded-2xl border border-forest-700" style={{ minHeight: 140 }}>
                  <SunsetIllustration />
                </div>
              </div>
            </div>

            {hourlySeries.length > 0 ? (
              <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">Por hora</p>
                <div className="mt-5 grid grid-cols-6 gap-2 sm:grid-cols-12">
                  {hourlySeries.map((hour, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center gap-1 rounded-2xl p-2 text-center transition ${
                        hour.isNow ? "bg-brand-500 text-forest-950" : "bg-forest-950 text-slate-300"
                      }`}
                    >
                      <p className={`text-[10px] font-semibold ${hour.isNow ? "text-forest-950" : "text-slate-500"}`}>{hour.label}</p>
                      <WeatherIcon kind={getWeatherKind(hour.icon)} className={`h-6 w-6 ${hour.isNow ? "text-forest-950" : "text-brand-400"}`} />
                      <p className="text-sm font-semibold">{hour.temp}°</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <HourlyChart hours={hourlySeries} />
                </div>
              </div>
            ) : null}

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">Próximas horas</p>
                <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {weather.hourly.slice(0, 6).map((hour, index) => (
                    <div key={index} className="rounded-2xl bg-forest-950 p-3 text-center">
                      <p className="text-xs font-semibold text-slate-300">{hour.time}</p>
                      <WeatherIcon kind={getWeatherKind(hour.icon)} className="mx-auto mt-1 h-8 w-8 text-brand-400" />
                      <p className="text-lg font-semibold text-slate-100">{hour.temp}°</p>
                      <p className="mt-1 flex items-center justify-center gap-1 text-xs text-sky-400">
                        <DropletIcon className="h-3 w-3" /> {hour.rainChance}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">Próximos días</p>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5">
                  {weather.forecast.slice(0, 5).map((day) => (
                    <div key={day.date} className="rounded-2xl bg-forest-950 p-3 text-center">
                      <p className="text-xs font-semibold text-slate-200">{day.date}</p>
                      <WeatherIcon kind={getWeatherKind(day.icon)} className="mx-auto mt-1 h-8 w-8 text-brand-400" />
                      <p className="text-xs capitalize text-slate-400">{day.description}</p>
                      <p className="mt-2 text-sm font-semibold text-brand-400">
                        {day.minTemp}° / {day.maxTemp}°
                      </p>
                      <p className="mt-1 flex items-center justify-center gap-1 text-xs text-sky-400">
                        <DropletIcon className="h-3 w-3" /> {day.rainChance}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-900 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">Detalles del tiempo</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <div className="flex flex-col items-center rounded-2xl border border-forest-700 bg-forest-950 p-4 text-center">
                  <p className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
                    <ThermometerIcon className="h-4 w-4 text-brand-400" /> Temperatura
                  </p>
                  <Sparkline values={tempSparkline} color="var(--color-brand-400)" />
                  <p className="mt-2 text-2xl font-bold text-slate-100">{weather.temperature}°C</p>
                  <p className="text-xs text-slate-500">Actual</p>
                </div>

                <div className="flex flex-col items-center rounded-2xl border border-forest-700 bg-forest-950 p-4 text-center">
                  <p className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
                    <ThermometerIcon className="h-4 w-4 text-violet-400" /> Sensación térmica
                  </p>
                  <Sparkline values={feelsLikeSparkline} color="#a78bfa" />
                  <p className="mt-2 text-2xl font-bold text-slate-100">{weather.feelsLike}°C</p>
                  <p className="text-xs text-slate-500">Se siente como</p>
                </div>

                <div className="flex flex-col items-center rounded-2xl border border-forest-700 bg-forest-950 p-4 text-center">
                  <p className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
                    <DropletIcon className="h-4 w-4 text-sky-400" /> Humedad
                  </p>
                  <div className="mt-3 flex flex-col items-center">
                    <RingGauge value={weather.humidity} max={100} color="#38bdf8" label={`${weather.humidity}%`} />
                    <p className="mt-2 text-xs text-slate-500">{weather.humidity >= 40 && weather.humidity <= 70 ? "Confortable" : weather.humidity > 70 ? "Alta" : "Baja"}</p>
                  </div>
                </div>

                <div className="flex flex-col items-center rounded-2xl border border-forest-700 bg-forest-950 p-4 text-center">
                  <p className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
                    <EyeIcon className="h-4 w-4 text-teal-400" /> Visibilidad
                  </p>
                  <div className="mt-3 flex flex-col items-center">
                    <RingGauge value={weather.visibility} max={10} color="#2dd4bf" label={`${weather.visibility} km`} />
                    <p className="mt-2 text-xs text-slate-500">{weather.visibility >= 8 ? "Excelente" : weather.visibility >= 4 ? "Buena" : "Reducida"}</p>
                  </div>
                </div>

                <div className="flex flex-col items-center rounded-2xl border border-forest-700 bg-forest-950 p-4 text-center">
                  <p className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
                    <span className="text-amber-400">☀</span> Índice UV
                  </p>
                  <div className="mt-3 flex flex-col items-center">
                    <RingGauge value={weather.uvIndex} max={11} color="#fbbf24" label={`${weather.uvIndex}`} />
                    <p className="mt-2 text-xs text-slate-500">{weather.uvIndex >= 8 ? "Muy alto" : weather.uvIndex >= 6 ? "Alto" : weather.uvIndex >= 3 ? "Moderado" : "Bajo"}</p>
                  </div>
                </div>

                <div className="flex flex-col items-center rounded-2xl border border-forest-700 bg-forest-950 p-4 text-center">
                  <p className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
                    <WindIcon className="h-4 w-4 text-sky-400" /> Viento
                  </p>
                  <div className="mt-3 flex flex-col items-center">
                    <CompassGauge deg={weather.windDeg} />
                    <p className="mt-2 text-lg font-bold text-slate-100">{weather.wind} km/h</p>
                    <p className="text-xs text-slate-500">Desde el {["N", "NE", "E", "SE", "S", "SO", "O", "NO"][Math.round(weather.windDeg / 45) % 8]} ({weather.windDeg}°)</p>
                    <p className="text-xs text-slate-500">Ráfagas máx. {weather.windGust} km/h</p>
                  </div>
                </div>

                <div className="flex flex-col items-center rounded-2xl border border-forest-700 bg-forest-950 p-4 text-center">
                  <p className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
                    <GaugeIcon className="h-4 w-4 text-indigo-400" /> Presión
                  </p>
                  <div className="mt-3 flex flex-col items-center">
                    <RingGauge value={1} max={1} color="#2dd4bf" gradientTo="#a78bfa" label="" />
                    <p className="mt-2 text-lg font-bold text-slate-100">{weather.pressure} hPa</p>
                    <p className="text-xs text-slate-500">Estable</p>
                  </div>
                </div>

                <div className="flex flex-col items-center rounded-2xl border border-forest-700 bg-forest-950 p-4 text-center">
                  <p className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
                    <DropletIcon className="h-4 w-4 text-sky-400" /> Punto de rocío
                  </p>
                  <p className="mt-3 text-2xl font-bold text-slate-100">{weather.dewPoint}°C</p>
                  <p className="text-xs text-slate-500">Cercano</p>
                </div>

                <div className="flex flex-col items-center rounded-2xl border border-forest-700 bg-forest-950 p-4 text-center">
                  <p className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
                    <DropletIcon className="h-4 w-4 text-sky-400" /> Precipitación
                  </p>
                  <p className="mt-3 text-2xl font-bold text-slate-100">{weather.precipitation} mm</p>
                  <p className="text-xs text-slate-500">En las últimas 24 h</p>
                </div>

                <div className="flex flex-col items-center rounded-2xl border border-forest-700 bg-forest-950 p-4 text-center">
                  <p className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
                    <MoonIcon className="h-4 w-4 text-slate-300" /> Salida de luna
                  </p>
                  <p className="mt-3 text-2xl font-bold text-slate-100">{weather.moonrise}</p>
                  <p className="mt-2 text-xs text-slate-500">Puesta de luna</p>
                  <p className="text-sm text-slate-300">{weather.moonset}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl border border-forest-700 bg-forest-900 p-5 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-forest-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={siteContent.images.mascot} alt="Capibara de TripYopal" className="h-full w-full object-cover" />
                </span>
                <div>
                  <p className="font-semibold text-brand-400">Consejo TripYopal</p>
                  <p className="text-sm text-slate-400">
                    {weather.recommended}. No olvides hidratarte y usar protector solar.
                  </p>
                </div>
              </div>
              <Link
                href="/categorias/parques"
                className="btn-brand-font btn-gradient inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-forest-950 transition"
              >
                Ver actividades al aire libre →
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
