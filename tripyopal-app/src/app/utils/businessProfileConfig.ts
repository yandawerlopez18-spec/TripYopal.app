export type ProfileGroup = "hospedaje" | "gastronomia" | "turismo" | "comercial" | "servicios";

export function getProfileGroup(category: string): ProfileGroup {
  if (category === "hoteles") return "hospedaje";
  if (["restaurantes", "bares", "rapidas", "parrillas", "discotecas"].includes(category)) return "gastronomia";
  if (["sitios", "parques"].includes(category)) return "turismo";
  if (category === "centros") return "comercial";
  return "servicios";
}

const PRICE_RANGE_RATING: Record<string, number> = {
  Alto: 5,
  Medio: 4,
  Bajo: 3,
};

/**
 * The rating badge shown on business cards: uses the business's own star rating
 * when set, otherwise falls back to a rating derived from its price range
 * (Alto/Medio/Bajo) so every card in every category shows a rating.
 */
export function getDisplayRating(prestador: { stars?: number; priceRange?: string }): number | null {
  if (prestador.stars) return prestador.stars;
  if (prestador.priceRange && PRICE_RANGE_RATING[prestador.priceRange]) {
    return PRICE_RANGE_RATING[prestador.priceRange];
  }
  return null;
}

export const AMENITY_CATALOG: { key: string; label: string; icon: string; sublabel?: string }[] = [
  { key: "wifi", label: "Wifi", icon: "📶", sublabel: "Gratuito" },
  { key: "piscina", label: "Piscina", icon: "🏊" },
  { key: "restaurante", label: "Restaurante", icon: "🍽️" },
  { key: "parqueadero", label: "Parqueadero", icon: "🅿️" },
  { key: "gimnasio", label: "Gimnasio", icon: "🏋️" },
  { key: "spa", label: "Spa", icon: "🧖" },
  { key: "jacuzzi", label: "Jacuzzi", icon: "🛁" },
  { key: "aire", label: "Aire acondicionado", icon: "❄️" },
  { key: "tv", label: "Televisión", icon: "📺" },
  { key: "netflix", label: "Netflix", icon: "🎬" },
  { key: "minibar", label: "Minibar", icon: "🧊" },
  { key: "desayuno", label: "Desayuno incluido", icon: "🍳" },
  { key: "lavanderia", label: "Lavandería", icon: "🧺" },
  { key: "recepcion24", label: "Recepción 24 horas", icon: "🕐" },
  { key: "roomService", label: "Servicio a la habitación", icon: "🛎️" },
  { key: "cajaFuerte", label: "Caja fuerte", icon: "🔒" },
  { key: "transporte", label: "Transporte", icon: "🚐" },
  { key: "ascensor", label: "Ascensor", icon: "🛗" },
  { key: "accesibilidad", label: "Accesibilidad para personas con discapacidad", icon: "♿" },
  { key: "salonEventos", label: "Salón de eventos", icon: "🎉" },
  { key: "coworking", label: "Coworking", icon: "💻" },
  { key: "zonaInfantil", label: "Zona infantil", icon: "🧸" },
  { key: "zonaBbq", label: "Zona BBQ", icon: "🔥" },
  { key: "jardines", label: "Jardines", icon: "🌳" },
  { key: "terraza", label: "Terraza", icon: "🏞️" },
  { key: "bar", label: "Bar", icon: "🍹" },
  { key: "musica", label: "Música en vivo", icon: "🎵" },
  { key: "domicilio", label: "Domicilio", icon: "🛵" },
  { key: "reservas", label: "Reservas", icon: "📅" },
  { key: "tarjeta", label: "Tarjeta", icon: "💳" },
  { key: "petFriendly", label: "Pet Friendly", icon: "🐾", sublabel: "Mascotas permitidas" },
  { key: "comidaRapida", label: "Comida rápida", icon: "🍔" },
  { key: "dj", label: "DJ", icon: "🎧" },
  { key: "zonaJuegos", label: "Zona de juegos", icon: "🎮" },
  { key: "pantallasDeportivas", label: "Pantallas", icon: "📡" },
  { key: "cocteles", label: "Cócteles y tragos", icon: "🍸" },
  { key: "areasVerdes", label: "Áreas verdes", icon: "🌳", sublabel: "Naturaleza" },
  { key: "zonasDescanso", label: "Zonas de descanso", icon: "🪑", sublabel: "Bancas y sombras" },
  { key: "juegosInfantiles", label: "Juegos infantiles", icon: "🎡", sublabel: "Diversión para niños" },
  { key: "eventosCulturales", label: "Eventos culturales", icon: "🎭", sublabel: "Actividades y ferias" },
  { key: "caminatas", label: "Caminatas", icon: "🥾", sublabel: "Senderos peatonales" },
  { key: "fotografia", label: "Fotografía", icon: "📸", sublabel: "Lugares icónicos" },
  { key: "accesoFacil", label: "Acceso fácil", icon: "🚏", sublabel: "Céntrico" },
  { key: "wifiGratuito", label: "WiFi gratuito", icon: "📶" },
  { key: "banosPublicos", label: "Baños públicos", icon: "🚻" },
  { key: "seguridadVigilancia", label: "Seguridad y vigilancia", icon: "👮" },
  { key: "iluminacion", label: "Iluminación nocturna", icon: "💡" },
  { key: "reciclaje", label: "Zonas de reciclaje", icon: "♻️" },
  { key: "parqueaderosCercanos", label: "Parqueaderos cercanos", icon: "🅿️" },
  { key: "zonaComidas", label: "Zona de comidas", icon: "🍽️", sublabel: "Variada oferta" },
  { key: "parqueaderoAmplio", label: "Parqueadero", icon: "🅿️", sublabel: "Amplio y seguro" },
  { key: "cineSalas", label: "Cine", icon: "🎬", sublabel: "Salas modernas" },
  { key: "eventosTodoElAno", label: "Eventos", icon: "🎉", sublabel: "Todo el año" },
  { key: "banosTodoElCentro", label: "Baños", icon: "🚻", sublabel: "En todo el centro" },
  { key: "accesibleParaTodos", label: "Accesible", icon: "♿", sublabel: "Para todos" },
  { key: "parqueaderoGratuito", label: "Parqueadero gratuito", icon: "🅿️" },
  { key: "banosCentro", label: "Baños en todo el centro", icon: "🚻" },
  { key: "cajerosAutomaticos", label: "Cajeros automáticos", icon: "🏧" },
  { key: "seguridad247", label: "Seguridad 24/7", icon: "🛡️" },
  { key: "ascensoresEscaleras", label: "Ascensores y escaleras eléctricas", icon: "🛗" },
  { key: "accesoMovilidadReducida", label: "Acceso para personas con movilidad reducida", icon: "♿" },
  { key: "modaAccesorios", label: "Moda y accesorios", icon: "👕" },
  { key: "hogarTecnologia", label: "Hogar y tecnología", icon: "🏠" },
  { key: "bellezaSalud", label: "Belleza y salud", icon: "💄" },
  { key: "supermercadoTienda", label: "Supermercado", icon: "🛒" },
  { key: "entretenimientoTienda", label: "Entretenimiento", icon: "🎮" },
  { key: "bancosServicios", label: "Bancos y servicios", icon: "🏦" },
  { key: "comidaRapidaFeature", label: "Comida rápida", icon: "🍔", sublabel: "Variedad" },
  { key: "bebidasFeature", label: "Bebidas", icon: "🥤", sublabel: "Cócteles y más" },
  { key: "ambienteFeature", label: "Ambiente", icon: "🎶", sublabel: "Música y diversión" },
  { key: "terrazaAireLibreFeature", label: "Terraza", icon: "🏞️", sublabel: "Al aire libre" },
  { key: "preciosAccesibles", label: "Precios", icon: "💲", sublabel: "Accesibles" },
  { key: "pantallasGigantes", label: "Pantallas gigantes", icon: "📺" },
  { key: "terrazaAireLibreSidebar", label: "Terraza al aire libre", icon: "🏞️" },
  { key: "zonaFumadores", label: "Zona de fumadores", icon: "🚬" },
  { key: "parqueaderoCercano", label: "Parqueadero cercano", icon: "🅿️" },
  { key: "reservaEventos", label: "Reserva para eventos", icon: "📅" },
  { key: "carnesAlCarbon", label: "Carnes al carbón", icon: "🔥", sublabel: "100% parrilla" },
  { key: "costillaCerdo", label: "Costilla de cerdo", icon: "🥩", sublabel: "Jugosa y tierna" },
  { key: "chorizosFeature", label: "Chorizos", icon: "🌭", sublabel: "Artesanales" },
  { key: "polloFeature", label: "Pollo", icon: "🍗", sublabel: "Dorado y jugoso" },
  { key: "acompanamientos", label: "Acompañamientos", icon: "🍚", sublabel: "Variedad de opciones" },
  { key: "bebidasParrilla", label: "Bebidas", icon: "🥤", sublabel: "Frías y calientes" },
  { key: "ambienteLlanero", label: "Ambiente llanero", icon: "🤠", sublabel: "Familiar y acogedor" },
  { key: "banosLimpios", label: "Baños limpios", icon: "🚻" },
  { key: "mesasAireLibre", label: "Mesas al aire libre", icon: "🪑" },
  { key: "eventosCelebraciones", label: "Eventos y celebraciones", icon: "🎉" },
  { key: "pagoTarjetaEfectivo", label: "Pago con tarjeta y efectivo", icon: "💳" },
  { key: "dosPistas", label: "2 Pistas", icon: "🎵", sublabel: "Baile" },
  { key: "djEnVivo", label: "DJ en vivo", icon: "🎧", sublabel: "Mejor música" },
  { key: "showsFeature", label: "Shows", icon: "🎭", sublabel: "Espectáculos" },
  { key: "barPremiumFeature", label: "Bar premium", icon: "🍸", sublabel: "Bebidas y cócteles" },
  { key: "zonaVipFeature", label: "Zona VIP", icon: "👑", sublabel: "Reservas exclusivas" },
  { key: "parqueaderoSeguroFeature", label: "Parqueadero", icon: "🅿️", sublabel: "Seguro" },
  { key: "seguridad247Feature", label: "Seguridad 24/7", icon: "🛡️", sublabel: "Tu seguridad" },
  { key: "mesasZonasDescanso", label: "Mesas y zonas de descanso", icon: "🪑" },
  { key: "vuelosNacionales", label: "Vuelos nacionales", icon: "✈️", sublabel: "Conexiones diarias" },
  { key: "vuelosInternacionales", label: "Vuelos internacionales", icon: "🛫", sublabel: "Conexiones selectas" },
  { key: "salasVipTransporte", label: "Salas VIP", icon: "💺", sublabel: "Confort y descanso" },
  { key: "wifiGratuitoTransporte", label: "WiFi gratuito", icon: "📶", sublabel: "En todo el aeropuerto" },
  { key: "tiendasCafes", label: "Tiendas y cafés", icon: "☕", sublabel: "Compras y gastronomía" },
  { key: "parqueaderoTransporte", label: "Parqueadero", icon: "🅿️", sublabel: "Amplio y seguro" },
  { key: "accesibleTransporte", label: "Accesible", icon: "♿", sublabel: "Para todos" },
  { key: "restaurantesCafes", label: "Restaurantes y cafés", icon: "🍽️" },
  { key: "tiendasDutyFree", label: "Tiendas duty free", icon: "🛍️" },
  { key: "alquilerVehiculos", label: "Alquiler de vehículos", icon: "🚗" },
  { key: "informacionTuristica", label: "Información turística", icon: "ℹ️" },
  { key: "atencionMedica", label: "Atención médica", icon: "🏥" },
  { key: "objetosPerdidos", label: "Objetos perdidos", icon: "🎒" },
];

export const SECURITY_CATALOG: { key: string; label: string; icon: string }[] = [
  { key: "camaras", label: "Cámaras de seguridad", icon: "📹" },
  { key: "vigilancia", label: "Vigilancia", icon: "👮" },
  { key: "recepcion24", label: "Recepción 24 horas", icon: "🕐" },
  { key: "extintores", label: "Extintores", icon: "🧯" },
  { key: "botiquin", label: "Botiquín", icon: "🩹" },
  { key: "salidas", label: "Salidas de emergencia", icon: "🚪" },
  { key: "seguridadPrivada", label: "Seguridad privada", icon: "🛡️" },
];

export const REVIEW_ASPECT_LABELS: { key: keyof import("../services/prestadores").ReviewAspects; label: string }[] = [
  { key: "cleanliness", label: "Limpieza" },
  { key: "service", label: "Atención" },
  { key: "comfort", label: "Comodidad" },
  { key: "price", label: "Precio" },
  { key: "location", label: "Ubicación" },
  { key: "facilities", label: "Instalaciones" },
  { key: "security", label: "Seguridad" },
  { key: "internet", label: "Calidad del internet" },
];

export const MEDIA_CATEGORIES_BY_GROUP: Record<ProfileGroup, string[]> = {
  hospedaje: ["Habitaciones", "Recepción", "Restaurante", "Piscina", "Exteriores", "Eventos", "Parqueadero", "Zonas comunes"],
  gastronomia: ["Platos", "Interior", "Terraza", "Eventos", "Parqueadero"],
  turismo: ["Actividades", "Senderos", "Miradores", "Zonas comunes"],
  comercial: ["Locales", "Zonas comunes", "Parqueadero", "Eventos"],
  servicios: ["Vehículos", "Instalaciones", "Zonas comunes"],
};
