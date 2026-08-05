export type PrestadorItem = {
  id: string;
  name: string;
  description?: string;
  price?: string;
  imageUrl?: string;
  capacity?: string;
  size?: string;
  beds?: string;
  view?: string;
  totalUnits?: number;
  availableUnits?: number;
  amenities?: string[];
  badge?: string;
};

export type FaqItem = { id: string; question: string; answer: string };
export type Promotion = { id: string; title: string; description: string };
export type NearbyPlace = { id: string; name: string; category: string; distance: string };
export type MediaItem = { id: string; url: string; category: string };
export type WhatToFindItem = { id: string; name: string; description?: string; price?: string; imageUrl?: string };

export type ReviewAspects = {
  cleanliness?: number;
  service?: number;
  comfort?: number;
  price?: number;
  location?: number;
  facilities?: number;
  security?: number;
  internet?: number;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  aspects?: ReviewAspects;
  text: string;
  imageUrl?: string;
  date: string;
  likes: number;
  reply?: string;
};

export type PolicyItem = { id: string; title: string; description: string };
export type Highlight = { id: string; icon: string; title: string; description: string };
export type WeeklyHoursEntry = { day: string; hours: string };
export type VenueEvent = { id: string; title: string; date: string; time?: string; description?: string; imageUrl?: string };
export type FoodCourtItem = { id: string; name: string; subtitle?: string; imageUrl?: string };
export type MenuCategoryItem = { id: string; icon: string; label: string };
export type AllyBusiness = { id: string; name: string; subtitle?: string; imageUrl?: string };
export type FlightRoute = { id: string; airline: string; origin: string; destination: string; frequency: string; direct: boolean; imageUrl?: string };
export type TransportOption = { id: string; icon: string; title: string; subtitle: string; duration: string };
export type NewsItem = { id: string; title: string; description: string; imageUrl?: string };

export type Prestador = {
  id: string;
  name: string;
  tipo: string;
  category: string;
  description?: string;
  address?: string;
  phone?: string;
  instagram?: string;
  schedule?: string;
  priceRange?: string;
  imageUrl?: string;
  logoUrl?: string;
  items?: PrestadorItem[];

  gallery?: string[];
  stars?: number;
  status?: string;
  badges?: string[];

  neighborhood?: string;
  coordinates?: string;
  checkIn?: string;
  checkOut?: string;
  responseTime?: string;
  languages?: string;
  paymentMethods?: string;
  website?: string;
  whatsapp?: string;
  email?: string;
  facebook?: string;
  tiktok?: string;

  amenities?: string[];
  security?: string[];
  policies?: PolicyItem[];
  blockedDates?: string[];

  faq?: FaqItem[];
  promotions?: Promotion[];
  nearbyPlaces?: NearbyPlace[];
  media?: MediaItem[];
  reviews?: Review[];
  highlights?: Highlight[];
  weeklyHours?: WeeklyHoursEntry[];
  venueEvents?: VenueEvent[];
  foodCourt?: FoodCourtItem[];
  menuCategories?: MenuCategoryItem[];
  allies?: AllyBusiness[];

  cuisineType?: string;
  ambiance?: string;
  dietaryOptions?: string;
  musicGenre?: string;
  dressCode?: string;
  siteType?: string;
  bestTimeToVisit?: string;
  averageClimate?: string;
  visitRecommendations?: string;
  difficultyLevel?: string;
  entryFee?: string;
  visitTips?: string[];
  whatToFind?: WhatToFindItem[];
  parkArea?: string;
  foundingYear?: string;
  parkType?: string;
  managedBy?: string;
  safetyNote?: string;
  idealFor?: string;
  storeCount?: string;
  keyServices?: string;
  deliveryTime?: string;
  minOrder?: string;
  deliveryFee?: string;
  orderTracking?: string;
  twitter?: string;
  flights?: FlightRoute[];
  transportOptions?: TransportOption[];
  news?: NewsItem[];

  videoUrl?: string;
  tourUrl?: string;
};

export const seedPrestadores: Prestador[] = [
  {
    id: "hotel-la-sabana",
    name: "Hotel La Sabana",
    tipo: "Hospedaje",
    category: "hoteles",
    description:
      "Hotel familiar con más de 15 años recibiendo viajeros en Yopal. Combina la calidez llanera con comodidades modernas: piscina, desayuno incluido y habitaciones renovadas. Ideal para familias y viajeros de negocios que buscan una estadía tranquila cerca del centro.",
    address: "Calle 12 # 8-45, Yopal",
    phone: "312 555 0101",
    instagram: "@hotellasabana",
    schedule: "Recepción 24 horas",
    priceRange: "Medio",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
    ],
    stars: 4,
    status: "Abierto",
    badges: ["Más reservado", "Excelente ubicación"],
    neighborhood: "Centro",
    coordinates: "5.3378, -72.3959",
    checkIn: "2:00 p. m.",
    checkOut: "12:00 m.",
    responseTime: "Menos de 1 hora",
    languages: "Español, Inglés",
    paymentMethods: "Efectivo, Tarjeta, Transferencia",
    website: "https://hotellasabana.example.com",
    whatsapp: "573125550101",
    email: "contacto@hotellasabana.com",
    amenities: ["wifi", "piscina", "restaurante", "parqueadero", "aire", "tv", "desayuno", "recepcion24", "cajaFuerte", "ascensor"],
    security: ["camaras", "recepcion24", "extintores", "botiquin", "salidas"],
    policies: [
      { id: "policy-cancellation", title: "Cancelación", description: "Cancelación gratuita hasta 48 horas antes de la llegada." },
      { id: "policy-pets", title: "Mascotas", description: "No se aceptan mascotas." },
      { id: "policy-children", title: "Niños", description: "Los niños son bienvenidos; menores de 5 años se hospedan gratis." },
      { id: "policy-smoking", title: "Fumadores", description: "Hotel libre de humo. Zona designada al aire libre." },
      { id: "policy-reservation", title: "Reservas", description: "Se requiere depósito del 30% para confirmar la reserva." },
    ],
    faq: [
      { id: "faq-1", question: "¿Incluye desayuno?", answer: "Sí, el desayuno está incluido en todas las tarifas." },
      { id: "faq-2", question: "¿Hay parqueadero?", answer: "Sí, contamos con parqueadero privado sin costo adicional." },
      { id: "faq-3", question: "¿Aceptan tarjetas?", answer: "Sí, aceptamos efectivo, tarjetas y transferencias." },
    ],
    promotions: [
      { id: "promo-1", title: "Fin de semana en familia", description: "15% de descuento reservando viernes y sábado." },
    ],
    nearbyPlaces: [
      { id: "np-1", name: "Parque La Cañada", category: "Parque", distance: "5 min caminando" },
      { id: "np-2", name: "Centro Histórico de Yopal", category: "Sitio turístico", distance: "8 min caminando" },
    ],
    media: [
      { id: "media-1", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", category: "Exteriores" },
      { id: "media-2", url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80", category: "Habitaciones" },
    ],
    reviews: [
      {
        id: "review-1",
        author: "Camila R.",
        rating: 5,
        aspects: { cleanliness: 5, service: 5, comfort: 4, price: 4, location: 5, facilities: 4, security: 5, internet: 4 },
        text: "Excelente atención y muy cómodo para viajar en familia. Volveríamos sin dudarlo.",
        date: "2026-06-02T00:00:00.000Z",
        likes: 3,
      },
    ],
    items: [
      {
        id: "room-sencilla",
        name: "Habitación sencilla",
        description: "Ideal para viajeros solos, con escritorio y ducha independiente.",
        price: "120.000 COP",
        capacity: "1 persona",
        size: "18 m²",
        beds: "1",
        view: "Ciudad",
        totalUnits: 6,
        availableUnits: 4,
        imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      },
      {
        id: "room-doble",
        name: "Habitación doble",
        description: "Cama doble o dos camas sencillas, perfecta para parejas o amigos.",
        price: "160.000 COP",
        capacity: "2 personas",
        size: "24 m²",
        beds: "1-2",
        view: "Jardín",
        totalUnits: 8,
        availableUnits: 5,
        imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      },
    ],
  },
  {
    id: "hotel-rio-cravo",
    name: "Hotel Río Cravo",
    tipo: "Hospedaje",
    category: "hoteles",
    description: "Alojamiento boutique cerca del río, ideal para descanso y turismo de naturaleza.",
    address: "Vía Río Cravo km 2, Yopal",
    phone: "312 555 0202",
    instagram: "@hotelriocravo",
    schedule: "Recepción 6:00 a. m. - 10:00 p. m.",
    priceRange: "Alto",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    stars: 5,
    status: "Abierto",
  },
  {
    id: "restaurante-fogon-llanero",
    name: "Restaurante El Fogón Llanero",
    tipo: "Gastronomía",
    category: "restaurantes",
    description: "Comida típica llanera, mamona y sancocho de gallina criolla.",
    address: "Carrera 20 # 15-30, Yopal",
    phone: "312 555 0303",
    instagram: "@fogonllanero",
    schedule: "11:00 a. m. - 9:00 p. m.",
    priceRange: "Bajo",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    status: "Abierto",
    amenities: ["wifi", "parqueadero", "terraza", "musica"],
    items: [
      {
        id: "item-mamona",
        name: "Mamona a la llanera",
        description: "Carne de res asada al estilo tradicional llanero.",
        price: "28.000 COP",
      },
      {
        id: "item-sancocho",
        name: "Sancocho de gallina criolla",
        description: "Con yuca, plátano y mazorca.",
        price: "22.000 COP",
      },
    ],
  },
];

/**
 * Starts as seed data (identical on server and client) so the first client render
 * matches the server-rendered HTML and hydration never mismatches.
 * `hydratePrestadoresFromDatabase` replaces its contents with the real rows from
 * PostgreSQL right after mount (see DataHydrationContext).
 */
const prestadores: Prestador[] = [...seedPrestadores];

/**
 * Older rows persisted `policies` as a fixed object ({ cancellation, pets, ... })
 * before it became a free-form PolicyItem[]. Convert that legacy shape on read so
 * existing database rows keep working without a migration.
 */
function normalizePolicies(policies: unknown): PolicyItem[] | undefined {
  if (!policies) return undefined;
  if (Array.isArray(policies)) return policies as PolicyItem[];

  const legacyLabels: Record<string, string> = {
    cancellation: "Cancelación",
    pets: "Mascotas",
    children: "Niños",
    smoking: "Fumadores",
    reservation: "Reservas",
  };
  const obj = policies as Record<string, string>;
  return Object.entries(legacyLabels)
    .filter(([key]) => obj[key])
    .map(([key, title]) => ({ id: `policy-${key}`, title, description: obj[key] }));
}

function normalizePrestador(prestador: Prestador): Prestador {
  return { ...prestador, policies: normalizePolicies(prestador.policies) };
}

export async function hydratePrestadoresFromDatabase() {
  try {
    const response = await fetch("/api/prestadores");
    const data: Prestador[] = await response.json();
    prestadores.length = 0;
    prestadores.push(...data.map(normalizePrestador));
  } catch {
    // Keep the seed data as a fallback if the database is unreachable.
  }
}

async function patchPrestador(id: string, data: Partial<Omit<Prestador, "id">>) {
  const response = await fetch(`/api/prestadores/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const updated: Prestador = await response.json();
  const prestador = prestadores.find((entry) => entry.id === id);
  if (prestador) Object.assign(prestador, normalizePrestador(updated));
  return prestador;
}

export async function registerPrestador(profile: Omit<Prestador, "id">) {
  const response = await fetch("/api/prestadores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  const prestador: Prestador = normalizePrestador(await response.json());
  prestadores.push(prestador);
  return prestador;
}

export function listPrestadores() {
  return prestadores;
}

export function listPrestadoresByCategory(category: string) {
  return prestadores.filter((prestador) => prestador.category === category);
}

export async function updatePrestador(id: string, updates: Partial<Omit<Prestador, "id">>) {
  return patchPrestador(id, updates);
}

export async function deletePrestador(id: string) {
  await fetch(`/api/prestadores/${id}`, { method: "DELETE" });
  const index = prestadores.findIndex((entry) => entry.id === id);
  if (index !== -1) prestadores.splice(index, 1);
}

export async function addPrestadorItem(prestadorId: string, item: Omit<PrestadorItem, "id">) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador) return undefined;

  const newItem: PrestadorItem = { ...item, id: crypto.randomUUID() };
  const items = [...(prestador.items ?? []), newItem];
  await patchPrestador(prestadorId, { items });
  return newItem;
}

export async function updatePrestadorItem(prestadorId: string, itemId: string, updates: Partial<Omit<PrestadorItem, "id">>) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  const item = prestador?.items?.find((entry) => entry.id === itemId);
  if (!prestador || !item) return undefined;

  const updatedItem = { ...item, ...updates };
  const items = prestador.items!.map((entry) => (entry.id === itemId ? updatedItem : entry));
  await patchPrestador(prestadorId, { items });
  return updatedItem;
}

export async function deletePrestadorItem(prestadorId: string, itemId: string) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador?.items) return;

  const items = prestador.items.filter((entry) => entry.id !== itemId);
  await patchPrestador(prestadorId, { items });
}

export async function addFaqItem(prestadorId: string, item: Omit<FaqItem, "id">) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador) return undefined;

  const newItem: FaqItem = { ...item, id: crypto.randomUUID() };
  const faq = [...(prestador.faq ?? []), newItem];
  await patchPrestador(prestadorId, { faq });
  return newItem;
}

export async function deleteFaqItem(prestadorId: string, itemId: string) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador?.faq) return;

  const faq = prestador.faq.filter((entry) => entry.id !== itemId);
  await patchPrestador(prestadorId, { faq });
}

export async function addPromotion(prestadorId: string, item: Omit<Promotion, "id">) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador) return undefined;

  const newItem: Promotion = { ...item, id: crypto.randomUUID() };
  const promotions = [...(prestador.promotions ?? []), newItem];
  await patchPrestador(prestadorId, { promotions });
  return newItem;
}

export async function deletePromotion(prestadorId: string, itemId: string) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador?.promotions) return;

  const promotions = prestador.promotions.filter((entry) => entry.id !== itemId);
  await patchPrestador(prestadorId, { promotions });
}

export async function addNearbyPlace(prestadorId: string, item: Omit<NearbyPlace, "id">) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador) return undefined;

  const newItem: NearbyPlace = { ...item, id: crypto.randomUUID() };
  const nearbyPlaces = [...(prestador.nearbyPlaces ?? []), newItem];
  await patchPrestador(prestadorId, { nearbyPlaces });
  return newItem;
}

export async function deleteNearbyPlace(prestadorId: string, itemId: string) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador?.nearbyPlaces) return;

  const nearbyPlaces = prestador.nearbyPlaces.filter((entry) => entry.id !== itemId);
  await patchPrestador(prestadorId, { nearbyPlaces });
}

export async function addPolicy(prestadorId: string, item: Omit<PolicyItem, "id">) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador) return undefined;

  const newItem: PolicyItem = { ...item, id: crypto.randomUUID() };
  const policies = [...(prestador.policies ?? []), newItem];
  await patchPrestador(prestadorId, { policies });
  return newItem;
}

export async function updatePolicy(prestadorId: string, policyId: string, updates: Partial<Omit<PolicyItem, "id">>) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  const policy = prestador?.policies?.find((entry) => entry.id === policyId);
  if (!prestador || !policy) return undefined;

  const updatedItem = { ...policy, ...updates };
  const policies = prestador.policies!.map((entry) => (entry.id === policyId ? updatedItem : entry));
  await patchPrestador(prestadorId, { policies });
  return updatedItem;
}

export async function deletePolicy(prestadorId: string, policyId: string) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador?.policies) return;

  const policies = prestador.policies.filter((entry) => entry.id !== policyId);
  await patchPrestador(prestadorId, { policies });
}

export async function addVenueEvent(prestadorId: string, item: Omit<VenueEvent, "id">) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador) return undefined;

  const newItem: VenueEvent = { ...item, id: crypto.randomUUID() };
  const venueEvents = [...(prestador.venueEvents ?? []), newItem];
  await patchPrestador(prestadorId, { venueEvents });
  return newItem;
}

export async function deleteVenueEvent(prestadorId: string, eventId: string) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador?.venueEvents) return;

  const venueEvents = prestador.venueEvents.filter((entry) => entry.id !== eventId);
  await patchPrestador(prestadorId, { venueEvents });
}

export async function addFoodCourtItem(prestadorId: string, item: Omit<FoodCourtItem, "id">) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador) return undefined;

  const newItem: FoodCourtItem = { ...item, id: crypto.randomUUID() };
  const foodCourt = [...(prestador.foodCourt ?? []), newItem];
  await patchPrestador(prestadorId, { foodCourt });
  return newItem;
}

export async function deleteFoodCourtItem(prestadorId: string, itemId: string) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador?.foodCourt) return;

  const foodCourt = prestador.foodCourt.filter((entry) => entry.id !== itemId);
  await patchPrestador(prestadorId, { foodCourt });
}

export async function addMenuCategory(prestadorId: string, item: Omit<MenuCategoryItem, "id">) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador) return undefined;

  const newItem: MenuCategoryItem = { ...item, id: crypto.randomUUID() };
  const menuCategories = [...(prestador.menuCategories ?? []), newItem];
  await patchPrestador(prestadorId, { menuCategories });
  return newItem;
}

export async function deleteMenuCategory(prestadorId: string, itemId: string) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador?.menuCategories) return;

  const menuCategories = prestador.menuCategories.filter((entry) => entry.id !== itemId);
  await patchPrestador(prestadorId, { menuCategories });
}

export async function addPrestadorAlly(prestadorId: string, item: Omit<AllyBusiness, "id">) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador) return undefined;

  const newItem: AllyBusiness = { ...item, id: crypto.randomUUID() };
  const allies = [...(prestador.allies ?? []), newItem];
  await patchPrestador(prestadorId, { allies });
  return newItem;
}

export async function deletePrestadorAlly(prestadorId: string, itemId: string) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador?.allies) return;

  const allies = prestador.allies.filter((entry) => entry.id !== itemId);
  await patchPrestador(prestadorId, { allies });
}

export async function addFlight(prestadorId: string, item: Omit<FlightRoute, "id">) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador) return undefined;
  const newItem: FlightRoute = { ...item, id: crypto.randomUUID() };
  const flights = [...(prestador.flights ?? []), newItem];
  await patchPrestador(prestadorId, { flights });
  return newItem;
}

export async function deleteFlight(prestadorId: string, itemId: string) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador?.flights) return;
  const flights = prestador.flights.filter((entry) => entry.id !== itemId);
  await patchPrestador(prestadorId, { flights });
}

export async function addTransportOption(prestadorId: string, item: Omit<TransportOption, "id">) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador) return undefined;
  const newItem: TransportOption = { ...item, id: crypto.randomUUID() };
  const transportOptions = [...(prestador.transportOptions ?? []), newItem];
  await patchPrestador(prestadorId, { transportOptions });
  return newItem;
}

export async function deleteTransportOption(prestadorId: string, itemId: string) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador?.transportOptions) return;
  const transportOptions = prestador.transportOptions.filter((entry) => entry.id !== itemId);
  await patchPrestador(prestadorId, { transportOptions });
}

export async function addNewsItem(prestadorId: string, item: Omit<NewsItem, "id">) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador) return undefined;
  const newItem: NewsItem = { ...item, id: crypto.randomUUID() };
  const news = [...(prestador.news ?? []), newItem];
  await patchPrestador(prestadorId, { news });
  return newItem;
}

export async function deleteNewsItem(prestadorId: string, itemId: string) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador?.news) return;
  const news = prestador.news.filter((entry) => entry.id !== itemId);
  await patchPrestador(prestadorId, { news });
}

export async function addHighlight(prestadorId: string, item: Omit<Highlight, "id">) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador) return undefined;

  const newItem: Highlight = { ...item, id: crypto.randomUUID() };
  const highlights = [...(prestador.highlights ?? []), newItem];
  await patchPrestador(prestadorId, { highlights });
  return newItem;
}

export async function updateHighlight(prestadorId: string, highlightId: string, updates: Partial<Omit<Highlight, "id">>) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  const highlight = prestador?.highlights?.find((entry) => entry.id === highlightId);
  if (!prestador || !highlight) return undefined;

  const updatedItem = { ...highlight, ...updates };
  const highlights = prestador.highlights!.map((entry) => (entry.id === highlightId ? updatedItem : entry));
  await patchPrestador(prestadorId, { highlights });
  return updatedItem;
}

export async function deleteHighlight(prestadorId: string, highlightId: string) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador?.highlights) return;

  const highlights = prestador.highlights.filter((entry) => entry.id !== highlightId);
  await patchPrestador(prestadorId, { highlights });
}

export async function addWhatToFindItem(prestadorId: string, item: Omit<WhatToFindItem, "id">) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador) return undefined;

  const newItem: WhatToFindItem = { ...item, id: crypto.randomUUID() };
  const whatToFind = [...(prestador.whatToFind ?? []), newItem];
  await patchPrestador(prestadorId, { whatToFind });
  return newItem;
}

export async function updateWhatToFindItem(prestadorId: string, itemId: string, updates: Partial<Omit<WhatToFindItem, "id">>) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  const item = prestador?.whatToFind?.find((entry) => entry.id === itemId);
  if (!prestador || !item) return undefined;

  const updatedItem = { ...item, ...updates };
  const whatToFind = prestador.whatToFind!.map((entry) => (entry.id === itemId ? updatedItem : entry));
  await patchPrestador(prestadorId, { whatToFind });
  return updatedItem;
}

export async function deleteWhatToFindItem(prestadorId: string, itemId: string) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador?.whatToFind) return;

  const whatToFind = prestador.whatToFind.filter((entry) => entry.id !== itemId);
  await patchPrestador(prestadorId, { whatToFind });
}

export async function addMediaItem(prestadorId: string, item: Omit<MediaItem, "id">) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador) return undefined;

  const newItem: MediaItem = { ...item, id: crypto.randomUUID() };
  const media = [...(prestador.media ?? []), newItem];
  await patchPrestador(prestadorId, { media });
  return newItem;
}

export async function deleteMediaItem(prestadorId: string, itemId: string) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador?.media) return;

  const media = prestador.media.filter((entry) => entry.id !== itemId);
  await patchPrestador(prestadorId, { media });
}

export async function addReview(prestadorId: string, review: Omit<Review, "id" | "likes" | "date">) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador) return undefined;

  const newReview: Review = { ...review, id: crypto.randomUUID(), likes: 0, date: new Date().toISOString() };
  const reviews = [...(prestador.reviews ?? []), newReview];
  await patchPrestador(prestadorId, { reviews });
  return newReview;
}

export async function likeReview(prestadorId: string, reviewId: string) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  const review = prestador?.reviews?.find((entry) => entry.id === reviewId);
  if (!prestador || !review) return undefined;

  const updatedReview = { ...review, likes: review.likes + 1 };
  const reviews = prestador.reviews!.map((entry) => (entry.id === reviewId ? updatedReview : entry));
  await patchPrestador(prestadorId, { reviews });
  return updatedReview;
}

export async function replyToReview(prestadorId: string, reviewId: string, reply: string) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  const review = prestador?.reviews?.find((entry) => entry.id === reviewId);
  if (!prestador || !review) return undefined;

  const updatedReview = { ...review, reply };
  const reviews = prestador.reviews!.map((entry) => (entry.id === reviewId ? updatedReview : entry));
  await patchPrestador(prestadorId, { reviews });
  return updatedReview;
}

export async function deleteReview(prestadorId: string, reviewId: string) {
  const prestador = prestadores.find((entry) => entry.id === prestadorId);
  if (!prestador?.reviews) return;

  const reviews = prestador.reviews.filter((entry) => entry.id !== reviewId);
  await patchPrestador(prestadorId, { reviews });
}
