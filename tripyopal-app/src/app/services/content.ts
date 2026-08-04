import type { AgendaItem, Ally, EventFeature, EventItem, Place, RouteItem } from "../types";

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

/**
 * These arrays start out as seed data — identical on server and client — so the
 * first client render matches the server-rendered HTML and hydration never
 * mismatches. `hydrateContentFromDatabase` replaces their contents with the real
 * rows from PostgreSQL right after mount (see DataHydrationContext).
 */
export const featuredPlaces: Place[] = [...seedPlaces];
export const featuredEvents: EventItem[] = [...seedEvents];
export const featuredRoutes: RouteItem[] = [...seedRoutes];

export async function hydrateContentFromDatabase() {
  try {
    const [places, events, routes] = await Promise.all([
      fetch("/api/places").then((res) => res.json()),
      fetch("/api/events").then((res) => res.json()),
      fetch("/api/routes").then((res) => res.json()),
    ]);

    featuredPlaces.length = 0;
    featuredPlaces.push(...places);

    featuredEvents.length = 0;
    featuredEvents.push(...events);

    featuredRoutes.length = 0;
    featuredRoutes.push(...routes);
  } catch {
    // Keep the seed data as a fallback if the database is unreachable.
  }
}

export async function addPlace(place: Omit<Place, "id">) {
  const response = await fetch("/api/places", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(place),
  });
  const newPlace: Place = await response.json();
  featuredPlaces.push(newPlace);
  return newPlace;
}

export async function updatePlace(id: string, updates: Partial<Omit<Place, "id">>) {
  const response = await fetch(`/api/places/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  const updated: Place = await response.json();
  const index = featuredPlaces.findIndex((entry) => entry.id === id);
  if (index !== -1) featuredPlaces[index] = updated;
  return updated;
}

export async function deletePlace(id: string) {
  await fetch(`/api/places/${id}`, { method: "DELETE" });
  const index = featuredPlaces.findIndex((entry) => entry.id === id);
  if (index !== -1) featuredPlaces.splice(index, 1);
}

export async function addEvent(event: Omit<EventItem, "id">) {
  const response = await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  const newEvent: EventItem = await response.json();
  featuredEvents.push(newEvent);
  return newEvent;
}

export async function updateEvent(id: string, updates: Partial<Omit<EventItem, "id">>) {
  const response = await fetch(`/api/events/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  const updated: EventItem = await response.json();
  const index = featuredEvents.findIndex((entry) => entry.id === id);
  if (index !== -1) featuredEvents[index] = updated;
  return updated;
}

export async function deleteEvent(id: string) {
  await fetch(`/api/events/${id}`, { method: "DELETE" });
  const index = featuredEvents.findIndex((entry) => entry.id === id);
  if (index !== -1) featuredEvents.splice(index, 1);
}

export async function addEventFeature(eventId: string, feature: Omit<EventFeature, "id">) {
  const event = featuredEvents.find((entry) => entry.id === eventId);
  if (!event) return undefined;

  const newFeature: EventFeature = { ...feature, id: crypto.randomUUID() };
  const features = [...(event.features ?? []), newFeature];
  await updateEvent(eventId, { features });
  return newFeature;
}

export async function deleteEventFeature(eventId: string, featureId: string) {
  const event = featuredEvents.find((entry) => entry.id === eventId);
  if (!event?.features) return;

  const features = event.features.filter((entry) => entry.id !== featureId);
  await updateEvent(eventId, { features });
}

export async function addAgendaItem(eventId: string, item: Omit<AgendaItem, "id">) {
  const event = featuredEvents.find((entry) => entry.id === eventId);
  if (!event) return undefined;

  const newItem: AgendaItem = { ...item, id: crypto.randomUUID() };
  const agenda = [...(event.agenda ?? []), newItem];
  await updateEvent(eventId, { agenda });
  return newItem;
}

export async function deleteAgendaItem(eventId: string, itemId: string) {
  const event = featuredEvents.find((entry) => entry.id === eventId);
  if (!event?.agenda) return;

  const agenda = event.agenda.filter((entry) => entry.id !== itemId);
  await updateEvent(eventId, { agenda });
}

export async function addAlly(eventId: string, ally: Omit<Ally, "id">) {
  const event = featuredEvents.find((entry) => entry.id === eventId);
  if (!event) return undefined;

  const newAlly: Ally = { ...ally, id: crypto.randomUUID() };
  const allies = [...(event.allies ?? []), newAlly];
  await updateEvent(eventId, { allies });
  return newAlly;
}

export async function deleteAlly(eventId: string, allyId: string) {
  const event = featuredEvents.find((entry) => entry.id === eventId);
  if (!event?.allies) return;

  const allies = event.allies.filter((entry) => entry.id !== allyId);
  await updateEvent(eventId, { allies });
}

export async function adjustEventInterest(eventId: string, delta: number) {
  const event = featuredEvents.find((entry) => entry.id === eventId);
  if (!event) return undefined;

  const interestedCount = Math.max(0, (event.interestedCount ?? 0) + delta);
  return updateEvent(eventId, { interestedCount });
}

export async function addRoute(route: Omit<RouteItem, "id">) {
  const response = await fetch("/api/routes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(route),
  });
  const newRoute: RouteItem = await response.json();
  featuredRoutes.push(newRoute);
  return newRoute;
}

export async function updateRoute(id: string, updates: Partial<Omit<RouteItem, "id">>) {
  const response = await fetch(`/api/routes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  const updated: RouteItem = await response.json();
  const index = featuredRoutes.findIndex((entry) => entry.id === id);
  if (index !== -1) featuredRoutes[index] = updated;
  return updated;
}

export async function deleteRoute(id: string) {
  await fetch(`/api/routes/${id}`, { method: "DELETE" });
  const index = featuredRoutes.findIndex((entry) => entry.id === id);
  if (index !== -1) featuredRoutes.splice(index, 1);
}
