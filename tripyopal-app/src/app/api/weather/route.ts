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

const RELATIVE_DAY_LABELS = ["Mañana", "Pasado Mañana", "En 3 Días", "En 4 Días", "En 5 Días"];

function computeDewPoint(tempC: number, humidityPct: number): number {
  const a = 17.27;
  const b = 237.7;
  const clampedHumidity = Math.min(100, Math.max(1, humidityPct));
  const alpha = (a * tempC) / (b + tempC) + Math.log(clampedHumidity / 100);
  return Math.round((b * alpha) / (a - alpha));
}

function computeUvIndex(date: Date, peak = 7): number {
  const hour = date.getHours() + date.getMinutes() / 60;
  if (hour < 6 || hour > 18) return 0;
  const angle = ((hour - 12) / 6) * (Math.PI / 2);
  return Math.max(0, Math.round(peak * Math.cos(angle)));
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
  precipitation: 0.2,
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

function formatHour(timestamp: number, timezoneOffsetSeconds: number) {
  const date = new Date((timestamp + timezoneOffsetSeconds) * 1000);
  return date.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });
}

export async function GET() {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(fallbackWeather);
  }

  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=Yopal,CO&appid=${apiKey}&units=metric&lang=es`, {
        next: { revalidate: 300 },
      }),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Yopal,CO&appid=${apiKey}&units=metric&lang=es`, {
        next: { revalidate: 300 },
      }),
    ]);

    if (!currentResponse.ok) {
      throw new Error(`Weather API responded with ${currentResponse.status}`);
    }

    const data = await currentResponse.json();
    const timezoneOffset = data.timezone ?? 0;
    const now = new Date();

    let forecast: DailyForecast[] = fallbackWeather.forecast;
    let hourly: HourlyForecast[] = fallbackWeather.hourly;
    let currentRainChance = 0;

    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();
      const list = forecastData.list ?? [];

      hourly = list.slice(0, 8).map((entry: { dt: number; main?: { temp?: number }; weather?: { description?: string; icon?: string }[]; pop?: number }) => ({
        time: formatHour(entry.dt, timezoneOffset),
        temp: Math.round(entry.main?.temp ?? 0),
        description: entry.weather?.[0]?.description ?? "",
        icon: entry.weather?.[0]?.icon ?? "01d",
        rainChance: Math.round((entry.pop ?? 0) * 100),
      }));

      currentRainChance = hourly[0]?.rainChance ?? 0;

      const byDay = new Map<string, { min: number; max: number; description: string; icon: string; pop: number }>();

      for (const entry of list) {
        const dayKey = formatHour(entry.dt - (entry.dt % 86400), timezoneOffset);
        const min = entry.main?.temp_min ?? entry.main?.temp;
        const max = entry.main?.temp_max ?? entry.main?.temp;
        const description = entry.weather?.[0]?.description ?? "";
        const icon = entry.weather?.[0]?.icon ?? "01d";
        const pop = entry.pop ?? 0;
        const existing = byDay.get(dayKey);

        if (!existing) {
          byDay.set(dayKey, { min, max, description, icon, pop });
        } else {
          byDay.set(dayKey, {
            min: Math.min(existing.min, min),
            max: Math.max(existing.max, max),
            description: existing.description,
            icon: existing.icon,
            pop: Math.max(existing.pop, pop),
          });
        }
      }

      forecast = Array.from(byDay.values())
        .slice(0, 5)
        .map((values, index) => ({
          date: RELATIVE_DAY_LABELS[index] ?? `En ${index + 1} días`,
          minTemp: Math.round(values.min),
          maxTemp: Math.round(values.max),
          description: values.description,
          icon: values.icon,
          rainChance: Math.round(values.pop * 100),
        }));
    }

    const temperature = Math.round(data.main?.temp ?? 28);
    const humidity = data.main?.humidity ?? 65;
    const windSpeed = Math.round(data.wind?.speed ?? 12);

    return NextResponse.json({
      city: data.name || "Yopal",
      temperature,
      feelsLike: Math.round(data.main?.feels_like ?? data.main?.temp ?? 28),
      tempMin: Math.round(data.main?.temp_min ?? 24),
      tempMax: Math.round(data.main?.temp_max ?? 33),
      description: data.weather?.[0]?.description || "Cielo parcialmente nublado",
      icon: data.weather?.[0]?.icon ?? fallbackWeather.icon,
      recommended: data.main?.temp > 30
        ? "Ideal para tomar pausas y visitar lugares con sombra"
        : "Ideal para recorrer la ciudad y disfrutar sus atractivos",
      humidity,
      wind: windSpeed,
      windDeg: Math.round(data.wind?.deg ?? fallbackWeather.windDeg),
      windGust: Math.round(data.wind?.gust ?? windSpeed * 1.6),
      pressure: data.main?.pressure ?? 1011,
      visibility: data.visibility ? Math.round(data.visibility / 100) / 10 : fallbackWeather.visibility,
      uvIndex: computeUvIndex(now),
      dewPoint: computeDewPoint(temperature, humidity),
      precipitation: Math.round(((data.rain?.["1h"] ?? data.rain?.["3h"] ?? 0.2) + Number.EPSILON) * 10) / 10,
      rainChance: currentRainChance,
      sunrise: data.sys?.sunrise ? formatHour(data.sys.sunrise, timezoneOffset) : fallbackWeather.sunrise,
      sunset: data.sys?.sunset ? formatHour(data.sys.sunset, timezoneOffset) : fallbackWeather.sunset,
      moonrise: fallbackWeather.moonrise,
      moonset: fallbackWeather.moonset,
      updatedAt: new Date().toISOString(),
      isLive: true,
      hourly,
      forecast,
    } satisfies WeatherResponse);
  } catch {
    return NextResponse.json(fallbackWeather);
  }
}
