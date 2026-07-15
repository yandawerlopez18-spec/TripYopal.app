import type { EventItem, Place, RouteItem } from "../types";

export const featuredPlaces: Place[] = [
  {
    id: "mirador-yopal",
    name: "Mirador de Yopal",
    category: "Naturaleza",
    description: "Vista panorámica ideal para atardeceres y fotos de la ciudad.",
    price: "Gratis",
    rating: 4.8,
    location: "Zona norte",
  },
  {
    id: "plaza-bolivar",
    name: "Plaza de Bolívar",
    category: "Cultura",
    description: "Punto de encuentro con arquitectura tradicional y ambiente local.",
    price: "Gratis",
    rating: 4.7,
    location: "Centro",
  },
  {
    id: "parque-la-llanura",
    name: "Parque La Llanura",
    category: "Recreación",
    description: "Espacio familiar para caminatas, descanso y actividades al aire libre.",
    price: "Bajo",
    rating: 4.6,
    location: "Sur",
  },
];

export const featuredEvents: EventItem[] = [
  {
    id: "festival-gastronomia",
    title: "Festival de gastronomía local",
    date: "15 julio",
    place: "Plaza principal",
    description: "Degustaciones, música y cultura de la región.",
  },
  {
    id: "caminata-ecologica",
    title: "Caminata ecológica",
    date: "20 julio",
    place: "Parque La Llanura",
    description: "Recorrido guiado con enfoque ambiental y seguridad.",
  },
  {
    id: "feria-artesanal",
    title: "Feria artesanal",
    date: "25 julio",
    place: "Centro cultural",
    description: "Productos locales, música y experiencias para toda la familia.",
  },
];

export const featuredRoutes: RouteItem[] = [
  {
    id: "ruta-centro",
    name: "Ruta histórica del centro",
    duration: "3 horas",
    description: "Recorrido por puntos emblemáticos, plaza, iglesias y gastronomía local.",
    budget: "Bajo",
  },
  {
    id: "ruta-naturaleza",
    name: "Ruta de naturaleza y miradores",
    duration: "5 horas",
    description: "Ideal para quienes quieren ver paisajes y disfrutar el entorno.",
    budget: "Medio",
  },
  {
    id: "ruta-premium",
    name: "Ruta comfort y experiencias",
    duration: "6 horas",
    description: "Incluye transporte, gastronomía y visitas guiadas de alto valor.",
    budget: "Alto",
  },
];
