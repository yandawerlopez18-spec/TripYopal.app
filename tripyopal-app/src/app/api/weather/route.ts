import { NextResponse } from "next/server";

export type HourlyForecast = {
  time: string;
  temp: number;
  description: string;
  icon: string;
  rainChance: number;
};

export type DailyForecast = {
  date: string;
  minTemp: number;
  maxTemp: number;
  description: string;
  icon: string;
  rainChance: number;
};

export type WeatherResponse = {
  city: string;
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
  recommended: string;
  humidity: number;
  wind: number;
  windDeg: number;
  windGust: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  dewPoint: number;
  precipitation: number;
  rainChance: number;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  updatedAt: string;
  isLive: boolean;
  hourly: HourlyForecast[];
  forecast: DailyForecast[];
};

// Coordenadas de Yopal, Casanare
const YOPAL_LAT = 5.348;
const YOPAL_LON = -72.395;

const RELATIVE_DAY_LABELS = ["Mañana", "Pasado Mañana", "En 3 Días", "En 4 Días", "En 5 Días"];

function computeDewPoint(tempC: number, humidityPct: number): number {
  const a = 17.27;
  const b = 237.7;
  const clampedHumidity = Math.min(100, Math.max(1, humidityPct));
  const alpha = (a * tempC) / (b + tempC) + Math.log(clampedHumidity / 100);
  return Math.round((b * alpha) / (a - alpha));
}

/** Convierte un timestamp local ISO de Open-Meteo (ej. "2026-08-05T05:47") a "05:47 a. m." */
function formatIsoTime(iso: string | undefined, fallback: string): string {
  if (!iso) return fallback;
  const date = new Date(`${iso}:00Z`);
  if (Number.isNaN(date.getTime())) return fallback;
  return date.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });
}

/** Traduce el código WMO de Open-Meteo a una descripción en español y a un ícono compatible con la UI existente. */
function interpretWeatherCode(code: number): { description: string; icon: string } {
  const map: Record<number, { description: string; icon: string }> = {
    0: { description: "Cielo despejado", icon: "01d" },
    1: { description: "Mayormente despejado", icon: "01d" },
    2: { description: "Parcialmente nublado", icon: "02d" },
    3: { description: "Nublado", icon: "04d" },
    45: { description: "Neblina", icon: "50d" },
    48: { description: "Neblina con escarcha", icon: "50d" },
    51: { description: "Llovizna ligera", icon: "09d" },
    53: { description: "Llovizna", icon: "09d" },
    55: { description: "Llovizna intensa", icon: "09d" },
    56: { description: "Llovizna helada", icon: "09d" },
    57: { description: "Llovizna helada intensa", icon: "09d" },
    61: { description: "Lluvia ligera", icon: "10d" },
    63: { description: "Lluvia", icon: "10d" },
    65: { description: "Lluvia intensa", icon: "10d" },
    66: { description: "Lluvia helada", icon: "10d" },
    67: { description: "Lluvia helada intensa", icon: "10d" },
    71: { description: "Nieve ligera", icon: "13d" },
    73: { description: "Nieve", icon: "13d" },
    75: { description: "Nieve intensa", icon: "13d" },
    77: { description: "Granizo fino", icon: "13d" },
    80: { description: "Lluvias dispersas", icon: "10d" },
    81: { description: "Lluvias moderadas", icon: "10d" },
    82: { description: "Lluvias fuertes", icon: "10d" },
    85: { description: "Nevadas dispersas", icon: "13d" },
    86: { description: "Nevadas fuertes", icon: "13d" },
    95: { description: "Tormenta eléctrica", icon: "11d" },
    96: { description: "Tormenta con granizo", icon: "11d" },
    99: { description: "Tormenta con granizo fuerte", icon: "11d" },
  };

  return map[code] ?? { description: "Cielo variable", icon: "03d" };
}

const fallbackWeather: WeatherResponse = {
  city: "Yopal",
  temperature: 28,
  feelsLike: 31,
  tempMin: 24,
  tempMax: 33,
  description: "Cielo parcialmente nublado",
  icon: "02d",
  recommended: "Ideal para recorrer la ciudad y disfrutar sus atractivos",
  humidity: 65,
  wind: 12,
  windDeg: 90,
  windGust: 20,
  pressure: 1011,
  visibility: 10,
  uvIndex: 7,
  dewPoint: 21,
  precipitation: 0,
  rainChance: 20,
  sunrise: "05:50 a. m.",
  sunset: "06:05 p. m.",
  moonrise: "06:07 p. m.",
  moonset: "05:44 a. m.",
  updatedAt: new Date().toISOString(),
  isLive: false,
  hourly: [
    { time: "3:00 p. m.", temp: 29, description: "Nublado", icon: "03d", rainChance: 20 },
    { time: "6:00 p. m.", temp: 26, description: "Lluvias dispersas", icon: "10d", rainChance: 55 },
    { time: "9:00 p. m.", temp: 23, description: "Lluvia ligera", icon: "10n", rainChance: 40 },
    { time: "12:00 a. m.", temp: 21, description: "Nublado", icon: "04n", rainChance: 15 },
    { time: "3:00 a. m.", temp: 21, description: "Nublado", icon: "04n", rainChance: 15 },
    { time: "6:00 a. m.", temp: 22, description: "Parcialmente nublado", icon: "02n", rainChance: 15 },
  ],
  forecast: [
    { date: RELATIVE_DAY_LABELS[0], minTemp: 23, maxTemp: 32, description: "Soleado con nubes en la tarde", icon: "02d", rainChance: 45 },
    { date: RELATIVE_DAY_LABELS[1], minTemp: 24, maxTemp: 33, description: "Parcialmente nublado", icon: "03d", rainChance: 20 },
    { date: RELATIVE_DAY_LABELS[2], minTemp: 22, maxTemp: 31, description: "Lluvias dispersas", icon: "09d", rainChance: 60 },
    { date: RELATIVE_DAY_LABELS[3], minTemp: 24, maxTemp: 34, description: "Soleado", icon: "01d", rainChance: 10 },
    { date: RELATIVE_DAY_LABELS[4], minTemp: 23, maxTemp: 33, description: "Parcialmente nublado", icon: "02d", rainChance: 20 },
  ],
};

export async function GET() {
  try {
    const params = new URLSearchParams({
      latitude: String(YOPAL_LAT),
      longitude: String(YOPAL_LON),
      timezone: "America/Bogota",
      forecast_days: "6",
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "precipitation",
        "rain",
        "weather_code",
        "pressure_msl",
        "wind_speed_10m",
        "wind_direction_10m",
        "wind_gusts_10m",
      ].join(","),
      hourly: ["temperature_2m", "precipitation_probability", "precipitation", "weather_code"].join(","),
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_probability_max",
        "weather_code",
        "sunrise",
        "sunset",
        "uv_index_max",
      ].join(","),
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Open-Meteo respondió con ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;
    const hourlyRaw = data.hourly;
    const dailyRaw = data.daily;

    const temperature = Math.round(current.temperature_2m ?? 28);
    const humidity = Math.round(current.relative_humidity_2m ?? 65);
    const { description, icon } = interpretWeatherCode(current.weather_code ?? 0);

    // Encuentra el índice de la hora actual dentro del arreglo hourly para arrancar el pronóstico desde "ahora"
    const nowIndex = Array.isArray(hourlyRaw?.time)
      ? hourlyRaw.time.findIndex((t: string) => t >= current.time)
      : 0;
    const startIndex = nowIndex >= 0 ? nowIndex : 0;

    const hourly: HourlyForecast[] = (hourlyRaw?.time ?? [])
      .slice(startIndex, startIndex + 6)
      .map((time: string, i: number) => {
        const idx = startIndex + i;
        const { description: hDescription, icon: hIcon } = interpretWeatherCode(hourlyRaw.weather_code?.[idx] ?? 0);
        return {
          time: formatIsoTime(time, "--"),
          temp: Math.round(hourlyRaw.temperature_2m?.[idx] ?? temperature),
          description: hDescription,
          icon: hIcon,
          rainChance: Math.round(hourlyRaw.precipitation_probability?.[idx] ?? 0),
        };
      });

    const forecast: DailyForecast[] = (dailyRaw?.time ?? [])
      .slice(1, 6)
      .map((_: string, i: number) => {
        const idx = i + 1;
        const { description: dDescription, icon: dIcon } = interpretWeatherCode(dailyRaw.weather_code?.[idx] ?? 0);
        return {
          date: RELATIVE_DAY_LABELS[i] ?? `En ${idx} días`,
          minTemp: Math.round(dailyRaw.temperature_2m_min?.[idx] ?? 22),
          maxTemp: Math.round(dailyRaw.temperature_2m_max?.[idx] ?? 32),
          description: dDescription,
          icon: dIcon,
          rainChance: Math.round(dailyRaw.precipitation_probability_max?.[idx] ?? 0),
        };
      });

    const currentRainChance = Math.round(hourlyRaw?.precipitation_probability?.[startIndex] ?? 0);

    return NextResponse.json({
      city: "Yopal",
      temperature,
      feelsLike: Math.round(current.apparent_temperature ?? temperature),
      tempMin: Math.round(dailyRaw?.temperature_2m_min?.[0] ?? temperature - 4),
      tempMax: Math.round(dailyRaw?.temperature_2m_max?.[0] ?? temperature + 4),
      description,
      icon,
      recommended: temperature > 30
        ? "Ideal para tomar pausas y visitar lugares con sombra"
        : "Ideal para recorrer la ciudad y disfrutar sus atractivos",
      humidity,
      wind: Math.round(current.wind_speed_10m ?? 12),
      windDeg: Math.round(current.wind_direction_10m ?? 90),
      windGust: Math.round(current.wind_gusts_10m ?? (current.wind_speed_10m ?? 12) * 1.6),
      pressure: Math.round(current.pressure_msl ?? 1011),
      visibility: fallbackWeather.visibility,
      uvIndex: Math.round(dailyRaw?.uv_index_max?.[0] ?? 7),
      dewPoint: computeDewPoint(temperature, humidity),
      precipitation: Math.round(((current.precipitation ?? current.rain ?? 0) + Number.EPSILON) * 10) / 10,
      rainChance: currentRainChance,
      sunrise: formatIsoTime(dailyRaw?.sunrise?.[0], fallbackWeather.sunrise),
      sunset: formatIsoTime(dailyRaw?.sunset?.[0], fallbackWeather.sunset),
      moonrise: fallbackWeather.moonrise,
      moonset: fallbackWeather.moonset,
      updatedAt: new Date().toISOString(),
      isLive: true,
      hourly: hourly.length > 0 ? hourly : fallbackWeather.hourly,
      forecast: forecast.length > 0 ? forecast : fallbackWeather.forecast,
    } satisfies WeatherResponse);
  } catch {
    return NextResponse.json(fallbackWeather);
  }
}