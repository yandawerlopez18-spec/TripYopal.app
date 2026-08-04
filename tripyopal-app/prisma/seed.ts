import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import { seedPrestadores } from "../src/app/services/prestadores";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const places = [
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

const events = [
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

const routes = [
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

const users = [
  {
    id: "super-1",
    name: "Administrador principal",
    email: "admin@tripyopal.com",
    password: "admin123",
    role: "superadmin",
  },
  {
    id: "admin-hotel-la-sabana",
    name: "Dueño de Hotel La Sabana",
    email: "dueno@sitex.com",
    password: "site123",
    role: "admin",
    scope: {
      resourceType: "prestador",
      resourceId: "hotel-la-sabana",
      resourceName: "Hotel La Sabana",
      capabilities: [
        "Gestionar servicios y productos del negocio",
        "Gestionar precios y disponibilidad",
        "Gestionar reservas",
        "Gestionar inventario",
        "Ver estadísticas del negocio",
        "Responder reseñas",
      ],
    },
  },
  {
    id: "turista-1",
    name: "Visitante",
    email: "visitante@example.com",
    password: "visit123",
    role: "turista",
  },
];

const safetyPoints = [
  {
    id: "policia-yopal",
    type: "Estación de Policía",
    name: "Estación de Policía Yopal (verificar nombre y dirección exacta)",
    address: "Yopal, Casanare",
  },
  {
    id: "cai-yopal",
    type: "CAI",
    name: "CAI más cercano (verificar nombre y dirección exacta)",
    address: "Yopal, Casanare",
  },
  {
    id: "emergencia-policia",
    type: "Línea de emergencia",
    name: "Policía Nacional",
    phone: "123",
  },
];

const emergencyContacts = [
  {
    id: "hospital-orinoquia",
    type: "Hospital",
    name: "Hospital Regional de la Orinoquía",
    address: "Yopal, Casanare (verificar dirección exacta)",
  },
  {
    id: "bomberos-yopal",
    type: "Bomberos",
    name: "Bomberos",
    phone: "119",
  },
];

const tips = [
  {
    id: "que-llevar",
    category: "Qué llevar",
    text: "Ropa cómoda, protector solar, repelente y botella de agua según el lugar que visites.",
  },
  {
    id: "que-cuidar",
    category: "Qué cuidar",
    text: "No dejes basura, respeta la fauna y flora, cuida los recursos naturales del lugar al que te diriges.",
  },
];

const climateTips = [
  {
    id: "temporada-seca",
    season: "Diciembre a Marzo",
    description: "Clima seco, ideal para actividades al aire libre.",
  },
];

const siteContent = {
  id: "singleton",
  offer: {
    eyebrow: "Nuestra oferta",
    title: "Descubre la diversidad de Casanare",
    description: "Negocios reales registrados en la plataforma, por categoría.",
  },
  cta: {
    eyebrow: "Listo para explorar",
    title: "Convierte la visita a Yopal en una experiencia guiada, segura y memorable",
  },
  contact: {
    address: "Cra. 32 #31 - 10, Yopal, Casanare",
    phone: "311 403 9813",
    instagram: "TripYopal.co",
    email: "TripYopal.co@gmail.com",
  },
};

async function main() {
  for (const place of places) {
    await prisma.place.upsert({ where: { id: place.id }, create: place, update: place });
  }

  for (const event of events) {
    await prisma.event.upsert({ where: { id: event.id }, create: event, update: event });
  }

  for (const route of routes) {
    await prisma.route.upsert({ where: { id: route.id }, create: route, update: route });
  }

  for (const prestador of seedPrestadores) {
    const data = prestador as unknown as Prisma.PrestadorCreateInput;
    await prisma.prestador.upsert({ where: { id: prestador.id }, create: data, update: data });
  }

  for (const user of users) {
    const data = user as unknown as Prisma.UserCreateInput;
    await prisma.user.upsert({ where: { id: user.id }, create: data, update: data });
  }

  for (const point of safetyPoints) {
    await prisma.safetyPoint.upsert({ where: { id: point.id }, create: point, update: point });
  }

  for (const contact of emergencyContacts) {
    await prisma.emergencyContact.upsert({ where: { id: contact.id }, create: contact, update: contact });
  }

  for (const tip of tips) {
    await prisma.tip.upsert({ where: { id: tip.id }, create: tip, update: tip });
  }

  for (const climateTip of climateTips) {
    await prisma.climateTip.upsert({ where: { id: climateTip.id }, create: climateTip, update: climateTip });
  }

  await prisma.siteContent.upsert({ where: { id: siteContent.id }, create: siteContent, update: siteContent });

  console.log("Seed completo: places, events, routes, prestadores, users, site content.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
