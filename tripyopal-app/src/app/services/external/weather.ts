import type { WeatherResponse } from "../../api/weather/route";

export type { WeatherResponse, DailyForecast } from "../../api/weather/route";

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
  pressure: 1011,
  sunrise: "05:50 a. m.",
  sunset: "06:05 p. m.",
  updatedAt: new Date().toISOString(),
  isLive: false,
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
