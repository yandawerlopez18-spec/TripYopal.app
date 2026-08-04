import type { WeatherResponse } from "../../api/weather/route";

export type { WeatherResponse, DailyForecast, HourlyForecast } from "../../api/weather/route";

const fallbackWeather: WeatherResponse = {
  city: "Yopal",
  temperature: 28,
  feelsLike: 31,
  tempMin: 24,
  tempMax: 33,
  description: "Cielo parcialmente nublado",
  icon: "02d",
  recommended: "Ideal para recorrer la ciudad",
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
  hourly: [],
  forecast: [],
};

export async function getWeatherForYopal(): Promise<WeatherResponse> {
  try {
    const response = await fetch("/api/weather", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("No se pudo cargar el clima");
    }

    return response.json();
  } catch {
    return fallbackWeather;
  }
}
