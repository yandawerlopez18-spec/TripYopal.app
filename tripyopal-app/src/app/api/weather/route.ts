import { NextResponse } from "next/server";

const fallbackWeather = {
  city: "Yopal",
  temperature: 28,
  description: "Cielo parcialmente nublado",
  recommended: "Ideal para recorrer la ciudad",
};

export async function GET() {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(fallbackWeather);
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Yopal,CO&appid=${apiKey}&units=metric&lang=es`,
      {
        next: { revalidate: 600 },
      },
    );

    if (!response.ok) {
      throw new Error(`Weather API responded with ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      city: data.name || "Yopal",
      temperature: Math.round(data.main?.temp ?? 28),
      description: data.weather?.[0]?.description || "Cielo parcialmente nublado",
      recommended: data.main?.temp > 30
        ? "Ideal para tomar pausas y visitar lugares con sombra"
        : "Ideal para recorrer la ciudad y disfrutar sus atractivos",
    });
  } catch {
    return NextResponse.json(fallbackWeather);
  }
}
