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
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
  },
  {
    id: "plaza-bolivar",
    name: "Plaza de Bolívar",
    category: "Cultura",
    description: "Punto de encuentro con arquitectura tradicional y ambiente local.",
    price: "Gratis",
    rating: 4.7,
    location: "Centro",
    imageUrl: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800&q=80",
  },
  {
    id: "parque-la-llanura",
    name: "Parque La Llanura",
    category: "Recreación",
    description: "Espacio familiar para caminatas, descanso y actividades al aire libre.",
    price: "Bajo",
    rating: 4.6,
    location: "Sur",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
  },
];

export const featuredEvents: EventItem[] = [
  {
    id: "festival-gastronomia",
    title: "Festival de gastronomía local",
    date: "15 julio",
    place: "Plaza principal",
    description: "Degustaciones, música y cultura de la región.",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
  },
  {
    id: "caminata-ecologica",
    title: "Caminata ecológica",
    date: "20 julio",
    place: "Parque La Llanura",
    description: "Recorrido guiado con enfoque ambiental y seguridad.",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  },
  {
    id: "feria-artesanal",
    title: "Feria artesanal",
    date: "25 julio",
    place: "Centro cultural",
    description: "Productos locales, música y experiencias para toda la familia.",
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
  },
];

export function addPlace(place: Omit<Place, "id">) {
  const newPlace: Place = { ...place, id: crypto.randomUUID() };
  featuredPlaces.push(newPlace);
  return newPlace;
}

export function updatePlace(id: string, updates: Partial<Omit<Place, "id">>) {
  const place = featuredPlaces.find((entry) => entry.id === id);

  if (place) {
    Object.assign(place, updates);
  }

  return place;
}

export function deletePlace(id: string) {
  const index = featuredPlaces.findIndex((entry) => entry.id === id);

  if (index !== -1) {
    featuredPlaces.splice(index, 1);
  }
}

export function addEvent(event: Omit<EventItem, "id">) {
  const newEvent: EventItem = { ...event, id: crypto.randomUUID() };
  featuredEvents.push(newEvent);
  return newEvent;
}

export function updateEvent(id: string, updates: Partial<Omit<EventItem, "id">>) {
  const event = featuredEvents.find((entry) => entry.id === id);

  if (event) {
    Object.assign(event, updates);
  }

  return event;
}

export function deleteEvent(id: string) {
  const index = featuredEvents.findIndex((entry) => entry.id === id);

  if (index !== -1) {
    featuredEvents.splice(index, 1);
  }
}

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
