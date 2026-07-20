export function getAssistantReply(question: string): string {
  const normalized = question.toLowerCase();

  if (normalized.includes("lugar") || normalized.includes("lugares")) {
    return "Te recomiendo visitar el mirador de Yopal, la Plaza de Bolívar y los parques cercanos para una experiencia cultural y relajada.";
  }

  if (normalized.includes("evento") || normalized.includes("seman")) {
    return "En esta semana suele haber actividades culturales, gastronomía local y recorridos en la zona urbana. Te recomiendo revisar la sección de eventos para ver novedades.";
  }

  if (normalized.includes("ruta") || normalized.includes("día")) {
    return "Una ruta completa para un día sería: desayuno en el centro, visita a lugares emblemáticos, almuerzo típico y cierre con un mirador o plaza al atardecer.";
  }

  if (normalized.includes("clima") || normalized.includes("tiempo")) {
    return "Puedes consultar el clima actual de Yopal, con temperatura, humedad, viento y pronóstico de los próximos días, en la sección de Clima.";
  }

  if (normalized.includes("presupuesto")) {
    return "Para un presupuesto bajo, prioriza plazas, parques y recorridos sencillos. Para uno medio, mezcla gastronomía y transporte. Para uno alto, considera actividades guiadas y alojamiento premium.";
  }

  if (normalized.includes("seguro") || normalized.includes("salud")) {
    return "Mantente hidratado, usa protección solar y verifica las condiciones del clima antes de salir. Si necesitas ayuda, consulta los puntos de salud y emergencia cercanos.";
  }

  return "Puedo ayudarte con lugares, eventos, rutas, clima, presupuesto, salud y seguridad en Yopal. Prueba con una pregunta más concreta.";
}
