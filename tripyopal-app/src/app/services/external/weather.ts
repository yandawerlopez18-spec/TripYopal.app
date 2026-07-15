export async function getWeatherForYopal() {
  try {
    const response = await fetch("/api/weather", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("No se pudo cargar el clima");
    }

    return response.json();
  } catch {
    return {
      city: "Yopal",
      temperature: 28,
      description: "Cielo parcialmente nublado",
      recommended: "Ideal para recorrer la ciudad",
    };
  }
}
