import { NextResponse } from "next/server";

export type DailyForecast = {
  date: string;
  minTemp: number;
  maxTemp: number;
  description: string;
  icon: string;
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
  pressure: number;
  sunrise: string;
  sunset: string;
  updatedAt: string;
  isLive: boolean;
  forecast: DailyForecast[];
};

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
  pressure: 1011,
  sunrise: "05:50 a. m.",
  sunset: "06:05 p. m.",
  updatedAt: new Date().toISOString(),
  isLive: false,
  forecast: [
    { date: "Mañana", minTemp: 23, maxTemp: 32, description: "Soleado con lluvias en la tarde", icon: "10d" },
    { date: "Pasado mañana", minTemp: 24, maxTemp: 33, description: "Parcialmente nublado", icon: "03d" },
    { date: "En 3 días", minTemp: 22, maxTemp: 31, description: "Lluvias dispersas", icon: "09d" },
    { date: "En 4 días", minTemp: 24, maxTemp: 34, description: "Soleado", icon: "01d" },
  ],
};

function formatHour(timestamp: number, timezoneOffsetSeconds: number) {
  const date = new Date((timestamp + timezoneOffsetSeconds) * 1000);
  return date.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });
}

function formatDay(timestamp: number, timezoneOffsetSeconds: number) {
  const date = new Date((timestamp + timezoneOffsetSeconds) * 1000);
  return date.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "short", timeZone: "UTC" });
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

    let forecast: DailyForecast[] = fallbackWeather.forecast;

    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();
      const byDay = new Map<string, { min: number; max: number; description: string; icon: string }>();

      for (const entry of forecastData.list ?? []) {
        const dayKey = formatDay(entry.dt, timezoneOffset);
        const min = entry.main?.temp_min ?? entry.main?.temp;
        const max = entry.main?.temp_max ?? entry.main?.temp;
        const description = entry.weather?.[0]?.description ?? "";
        const icon = entry.weather?.[0]?.icon ?? "01d";
        const existing = byDay.get(dayKey);

        if (!existing) {
          byDay.set(dayKey, { min, max, description, icon });
        } else {
          byDay.set(dayKey, {
            min: Math.min(existing.min, min),
            max: Math.max(existing.max, max),
            description: existing.description,
            icon: existing.icon,
          });
        }
      }

      forecast = Array.from(byDay.entries())
        .slice(0, 5)
        .map(([date, values]) => ({
          date,
          minTemp: Math.round(values.min),
          maxTemp: Math.round(values.max),
          description: values.description,
          icon: values.icon,
        }));
    }

    return NextResponse.json({
      city: data.name || "Yopal",
      temperature: Math.round(data.main?.temp ?? 28),
      feelsLike: Math.round(data.main?.feels_like ?? data.main?.temp ?? 28),
      tempMin: Math.round(data.main?.temp_min ?? 24),
      tempMax: Math.round(data.main?.temp_max ?? 33),
      description: data.weather?.[0]?.description || "Cielo parcialmente nublado",
      icon: data.weather?.[0]?.icon ?? fallbackWeather.icon,
      recommended: data.main?.temp > 30
        ? "Ideal para tomar pausas y visitar lugares con sombra"
        : "Ideal para recorrer la ciudad y disfrutar sus atractivos",
      humidity: data.main?.humidity ?? 65,
      wind: Math.round(data.wind?.speed ?? 12),
      pressure: data.main?.pressure ?? 1011,
      sunrise: data.sys?.sunrise ? formatHour(data.sys.sunrise, timezoneOffset) : fallbackWeather.sunrise,
      sunset: data.sys?.sunset ? formatHour(data.sys.sunset, timezoneOffset) : fallbackWeather.sunset,
      updatedAt: new Date().toISOString(),
      isLive: true,
      forecast,
    } satisfies WeatherResponse);
  } catch {
    return NextResponse.json(fallbackWeather);
  }
}
