import { BUSINESS_CATEGORIES } from "../components/home/categoryIcons";
import { listPrestadores } from "./prestadores";
import { featuredEvents, featuredPlaces, featuredRoutes } from "./content";

export type SearchResult = {
  id: string;
  typeLabel: string;
  title: string;
  subtitle?: string;
  description?: string;
  href: string;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function matches(query: string, ...fields: (string | undefined)[]) {
  const q = normalize(query);
  return fields.some((field) => field && normalize(field).includes(q));
}

const staticSections: SearchResult[] = [
  {
    id: "sec-lugares",
    typeLabel: "Sección",
    title: "Lugares turísticos",
    description: "Explora los sitios más atractivos de Yopal con categorías y experiencias recomendadas.",
    href: "/lugares",
  },
  {
    id: "sec-recomendaciones",
    typeLabel: "Sección",
    title: "Recomendaciones para ti",
    description: "Lugares seleccionados para vivir lo mejor de Yopal, con precio y calificación.",
    href: "/recomendaciones",
  },
  {
    id: "sec-eventos",
    typeLabel: "Sección",
    title: "Eventos en tiempo real",
    description: "Actividades, fechas, lugares y detalles de participación.",
    href: "/eventos",
  },
  {
    id: "sec-rutas",
    typeLabel: "Sección",
    title: "Rutas recomendadas",
    description: "Organiza tu viaje con rutas sugeridas según tiempo, presupuesto e intereses.",
    href: "/rutas",
  },
  {
    id: "sec-clima",
    typeLabel: "Sección",
    title: "Clima",
    description: "Clima actual de Yopal y la mejor época para planear tu visita.",
    href: "/clima",
  },
  {
    id: "sec-chat",
    typeLabel: "Sección",
    title: "Chatbot con IA",
    description: "Asistente virtual para resolver dudas sobre lugares, rutas, clima y eventos.",
    href: "/chat",
  },
];

export function search(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];

  for (const category of BUSINESS_CATEGORIES) {
    if (matches(query, category.label)) {
      results.push({
        id: `categoria-${category.key}`,
        typeLabel: "Categoría",
        title: category.label,
        description: "Ver negocios registrados en esta categoría.",
        href: `/categorias/${category.key}`,
      });
    }
  }

  for (const prestador of listPrestadores()) {
    if (matches(query, prestador.name, prestador.tipo, prestador.description, prestador.address)) {
      results.push({
        id: `negocio-${prestador.id}`,
        typeLabel: "Negocio",
        title: prestador.name,
        subtitle: prestador.tipo,
        description: prestador.description,
        href: `/categorias/${prestador.category}`,
      });
    }
  }

  for (const place of featuredPlaces) {
    if (matches(query, place.name, place.category, place.description)) {
      results.push({
        id: `lugar-${place.id}`,
        typeLabel: "Lugar turístico",
        title: place.name,
        subtitle: place.category,
        description: place.description,
        href: `/lugares/${place.id}`,
      });
    }
  }

  for (const event of featuredEvents) {
    if (matches(query, event.title, event.place, event.description)) {
      results.push({
        id: `evento-${event.id}`,
        typeLabel: "Evento",
        title: event.title,
        subtitle: `${event.date} · ${event.place}`,
        description: event.description,
        href: `/eventos/${event.id}`,
      });
    }
  }

  for (const route of featuredRoutes) {
    if (matches(query, route.name, route.description)) {
      results.push({
        id: `ruta-${route.id}`,
        typeLabel: "Ruta",
        title: route.name,
        subtitle: `${route.duration} · Presupuesto ${route.budget}`,
        description: route.description,
        href: "/rutas",
      });
    }
  }

  for (const section of staticSections) {
    if (matches(query, section.title, section.description)) {
      results.push(section);
    }
  }

  return results;
}
