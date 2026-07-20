import type { EventItem, Place, RouteItem } from "../types";
import { loadFromStorage, saveToStorage } from "./persistence";

const PLACES_KEY = "tripyopal_featured_places";
const EVENTS_KEY = "tripyopal_featured_events";
const ROUTES_KEY = "tripyopal_featured_routes";

const seedPlaces: Place[] = [
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

const seedEvents: EventItem[] = [
  {
    id: "festival-gastronomia",
    title: "Festival de gastronomía local",
    date: "15 julio",
    place: "Plaza principal",
    description: "Degustaciones, música y cultura de la región.",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    time: "4:00 p. m.",
    modality: "Presencial",
  },
  {
    id: "caminata-ecologica",
    title: "Caminata ecológica",
    date: "20 julio",
    place: "Parque La Llanura",
    description: "Recorrido guiado con enfoque ambiental y seguridad.",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    time: "7:00 a. m.",
    modality: "Presencial",
  },
  {
    id: "feria-artesanal",
    title: "Feria artesanal",
    date: "25 julio",
    place: "Centro cultural",
    description: "Productos locales, música y experiencias para toda la familia.",
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
    time: "10:00 a. m.",
    modality: "Presencial",
  },
];

export const featuredPlaces: Place[] = loadFromStorage(PLACES_KEY, seedPlaces);
export const featuredEvents: EventItem[] = loadFromStorage(EVENTS_KEY, seedEvents);

function persistPlaces() {
  saveToStorage(PLACES_KEY, featuredPlaces);
}

function persistEvents() {
  saveToStorage(EVENTS_KEY, featuredEvents);
}

export function addPlace(place: Omit<Place, "id">) {
  const newPlace: Place = { ...place, id: crypto.randomUUID() };
  featuredPlaces.push(newPlace);
  persistPlaces();
  return newPlace;
}

export function updatePlace(id: string, updates: Partial<Omit<Place, "id">>) {
  const place = featuredPlaces.find((entry) => entry.id === id);

  if (place) {
    Object.assign(place, updates);
    persistPlaces();
  }

  return place;
}

export function deletePlace(id: string) {
  const index = featuredPlaces.findIndex((entry) => entry.id === id);

  if (index !== -1) {
    featuredPlaces.splice(index, 1);
    persistPlaces();
  }
}

export function addEvent(event: Omit<EventItem, "id">) {
  const newEvent: EventItem = { ...event, id: crypto.randomUUID() };
  featuredEvents.push(newEvent);
  persistEvents();
  return newEvent;
}

export function updateEvent(id: string, updates: Partial<Omit<EventItem, "id">>) {
  const event = featuredEvents.find((entry) => entry.id === id);

  if (event) {
    Object.assign(event, updates);
    persistEvents();
  }

  return event;
}

export function deleteEvent(id: string) {
  const index = featuredEvents.findIndex((entry) => entry.id === id);

  if (index !== -1) {
    featuredEvents.splice(index, 1);
    persistEvents();
  }
}

const seedRoutes: RouteItem[] = [
  {
    id: "ruta-centro",
    name: "Ruta de un día",
    duration: "3-4 horas",
    description: "Parques, gastronomía local y miradores para disfrutar sin complicaciones.",
    budget: "Bajo",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
  },
  {
    id: "ruta-cultural",
    name: "Ruta cultural",
    duration: "4-6 horas",
    description: "Historia, plazas y experiencias auténticas del territorio.",
    budget: "Medio",
    imageUrl: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800&q=80",
  },
  {
    id: "ruta-aventura",
    name: "Ruta de aventura",
    duration: "6+ horas",
    description: "Naturaleza, recorridos largos y actividades al aire libre.",
    budget: "Alto",
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
  },
];

export const featuredRoutes: RouteItem[] = loadFromStorage(ROUTES_KEY, seedRoutes);

function persistRoutes() {
  saveToStorage(ROUTES_KEY, featuredRoutes);
}

export function addRoute(route: Omit<RouteItem, "id">) {
  const newRoute: RouteItem = { ...route, id: crypto.randomUUID() };
  featuredRoutes.push(newRoute);
  persistRoutes();
  return newRoute;
}

export function updateRoute(id: string, updates: Partial<Omit<RouteItem, "id">>) {
  const route = featuredRoutes.find((entry) => entry.id === id);

  if (route) {
    Object.assign(route, updates);
    persistRoutes();
  }

  return route;
}

export function deleteRoute(id: string) {
  const index = featuredRoutes.findIndex((entry) => entry.id === id);

  if (index !== -1) {
    featuredRoutes.splice(index, 1);
    persistRoutes();
  }
}
