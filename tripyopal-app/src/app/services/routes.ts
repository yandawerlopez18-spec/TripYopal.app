import type { RouteItem } from "../types";

export async function getRoutes(): Promise<RouteItem[]> {
  return [
    {
      id: "ruta-naturaleza",
      name: "Ruta de naturaleza",
      duration: "1 día",
      description: "Ideal para parques, miradores y espacios tranquilos para desconectar.",
      budget: "Bajo",
    },
    {
      id: "ruta-cultural",
      name: "Ruta cultural",
      duration: "2 días",
      description: "Incluye sitios históricos, gastronomía típica y experiencias auténticas.",
      budget: "Medio",
    },
    {
      id: "ruta-aventura",
      name: "Ruta de aventura",
      duration: "3 días",
      description: "Perfecta para explorar paisajes, recorridos especiales y actividades al aire libre.",
      budget: "Alto",
    },
  ];
}
