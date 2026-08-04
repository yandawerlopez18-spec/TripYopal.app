import type { Prestador } from "./prestadores";
import { getPrestadorItemLabels } from "../utils/prestadorItemLabels";

export function getBusinessAssistantReply(prestador: Prestador, question: string): string {
  const q = question.toLowerCase();
  const labels = getPrestadorItemLabels(prestador.category);
  const items = prestador.items ?? [];

  if (q.includes("cuesta") || q.includes("precio") || q.includes("tarifa") || q.includes("vale")) {
    if (items.length === 0) {
      return `Por ahora no hay ${labels.itemLabel}s cargados con precio. Puedes escribir directamente a ${prestador.phone ?? "este establecimiento"} para cotizar.`;
    }
    const list = items.slice(0, 3).map((item) => `${item.name}${item.price ? ` (${item.price})` : ""}`).join(", ");
    return `Estos son algunos precios disponibles: ${list}.`;
  }

  if (q.includes("disponib") || q.includes("libre") || q.includes("cupo")) {
    const withAvailability = items.filter((item) => item.availableUnits !== undefined);
    if (withAvailability.length === 0) {
      return `Para confirmar disponibilidad de ${labels.itemLabel}s te recomiendo contactar directamente a ${prestador.name}.`;
    }
    const list = withAvailability.map((item) => `${item.name}: ${item.availableUnits} disponibles`).join(", ");
    return list;
  }

  if (q.includes("mascota")) {
    return (
      prestador.policies?.find((p) => p.title.toLowerCase().includes("mascota"))?.description ??
      "No tenemos información sobre mascotas registrada para este establecimiento."
    );
  }

  if (q.includes("reserv")) {
    return (
      prestador.policies?.find((p) => p.title.toLowerCase().includes("reserv"))?.description ??
      `Puedes reservar escribiendo por WhatsApp${prestador.phone ? ` al ${prestador.phone}` : ""} o desde el botón de reservar en esta página.`
    );
  }

  if (q.includes("cerca") || q.includes("alrededor")) {
    const nearby = prestador.nearbyPlaces ?? [];
    if (nearby.length === 0) return "Aún no hemos cargado lugares cercanos para este establecimiento.";
    return nearby.map((place) => `${place.name} (${place.distance})`).join(", ");
  }

  if (q.includes("llegar") || q.includes("ubicad") || q.includes("direccion") || q.includes("dirección")) {
    return prestador.address ? `Estamos ubicados en ${prestador.address}. Usa el botón "Cómo llegar" para ver la ruta en el mapa.` : "Consulta la sección de mapa en esta página para ver cómo llegar.";
  }

  if (q.includes("promo") || q.includes("descuento") || q.includes("oferta")) {
    const promos = prestador.promotions ?? [];
    if (promos.length === 0) return "Por ahora no tenemos promociones activas, pero síguenos en Instagram para enterarte de nuevas ofertas.";
    return promos.map((promo) => `${promo.title}: ${promo.description}`).join(" · ");
  }

  if (q.includes("desayuno")) {
    return prestador.amenities?.includes("desayuno") ? "Sí, el desayuno está incluido." : "Consulta con el establecimiento si el desayuno está incluido en tu tarifa.";
  }

  if (q.includes("actividad") || q.includes("hacer")) {
    return "Revisa la sección de recomendaciones y lugares cercanos en esta página para planear tu visita.";
  }

  if (q.includes("restaurante") || q.includes("comer")) {
    return "Puedes ver restaurantes recomendados en la sección de lugares cercanos de esta página.";
  }

  return `Puedo ayudarte con precios, disponibilidad, promociones, cómo llegar y más sobre ${prestador.name}. Pregúntame algo más concreto.`;
}
