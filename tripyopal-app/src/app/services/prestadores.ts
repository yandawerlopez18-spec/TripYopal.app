export type Prestador = {
  id: string;
  name: string;
  tipo: string;
  category: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  schedule?: string;
  priceRange?: string;
  imageUrl?: string;
};

const prestadores: Prestador[] = [
  {
    id: "hotel-la-sabana",
    name: "Hotel La Sabana",
    tipo: "Hospedaje",
    category: "hoteles",
    description: "Hotel familiar con habitaciones cómodas, piscina y desayuno incluido.",
    address: "Calle 12 # 8-45, Yopal",
    phone: "312 555 0101",
    email: "contacto@hotellasabana.com",
    schedule: "Recepción 24 horas",
    priceRange: "Medio",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
  {
    id: "hotel-rio-cravo",
    name: "Hotel Río Cravo",
    tipo: "Hospedaje",
    category: "hoteles",
    description: "Alojamiento boutique cerca del río, ideal para descanso y turismo de naturaleza.",
    address: "Vía Río Cravo km 2, Yopal",
    phone: "312 555 0202",
    email: "reservas@hotelriocravo.com",
    schedule: "Recepción 6:00 a. m. - 10:00 p. m.",
    priceRange: "Alto",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
  },
  {
    id: "restaurante-fogon-llanero",
    name: "Restaurante El Fogón Llanero",
    tipo: "Gastronomía",
    category: "restaurantes",
    description: "Comida típica llanera, mamona y sancocho de gallina criolla.",
    address: "Carrera 20 # 15-30, Yopal",
    phone: "312 555 0303",
    email: "contacto@fogonllanero.com",
    schedule: "11:00 a. m. - 9:00 p. m.",
    priceRange: "Bajo",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  },
];

export function registerPrestador(profile: Omit<Prestador, "id">) {
  const prestador: Prestador = {
    id: crypto.randomUUID(),
    ...profile,
  };

  prestadores.push(prestador);
  return prestador;
}

export function listPrestadores() {
  return prestadores;
}

export function listPrestadoresByCategory(category: string) {
  return prestadores.filter((prestador) => prestador.category === category);
}

export function updatePrestador(id: string, updates: Partial<Omit<Prestador, "id">>) {
  const prestador = prestadores.find((entry) => entry.id === id);

  if (prestador) {
    Object.assign(prestador, updates);
  }

  return prestador;
}

export function deletePrestador(id: string) {
  const index = prestadores.findIndex((entry) => entry.id === id);

  if (index !== -1) {
    prestadores.splice(index, 1);
  }
}
