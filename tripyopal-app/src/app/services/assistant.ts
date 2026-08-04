export function getAssistantReply(question: string): string {
  const normalized = question.toLowerCase();

  if (normalized.includes("lugar") || normalized.includes("lugares")) {
    return "Te recomiendo visitar el mirador de Yopal, la Plaza de Bolívar y los parques cercanos para una experiencia cultural y relajada.";
  }

  if (normalized.includes("evento") || normalized.includes("seman")) {
    return "En esta semana suele haber actividades culturales, gastronomía local y recorridos en la zona urbana. Te recomiendo revisar la sección de eventos para ver novedades.";
  }

  if (normalized.includes("comer") || normalized.includes("comida") || normalized.includes("restaurante") || normalized.includes("gastronom")) {
    return "Encuentras restaurantes, comidas rápidas y parrillas en la sección de Negocios, con dirección, horario y contacto de cada uno.";
  }

  if (normalized.includes("discoteca") || normalized.includes("rumba") || normalized.includes("fiesta") || normalized.includes("bailar")) {
    return "Para rumbear puedes ver las discotecas registradas en la categoría Discotecas de Negocios, con dirección, horario y contacto de cada una.";
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

  return "Puedo ayudarte con lugares, eventos, rutas, comida, clima, presupuesto, salud y seguridad en Yopal. Prueba con una pregunta más concreta.";
}
