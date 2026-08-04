import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

const defaultContent = {
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
  hero: {
    badge: "Naturaleza, cultura y aventura en los Llanos Orientales",
    title: "Vive lo mejor de Yopal-Casanare",
    subtitle: "Naturaleza, cultura y aventura en el corazón de los Llanos Orientales. Explora, vive y conecta.",
    backgroundImage: "/fondo-casanare.jpg",
    videoUrl: "",
  },
  images: {
    weatherIllustration: "/clima.png",
    recommendationsIllustration: "/recomendaciones.png",
    mascot: "/circulo.png",
    chatWidget: "/chat.png",
  },
  social: {
    facebook: "",
    instagram: "",
    gmail: "",
    x: "",
    whatsapp: "",
  },
  sections: {},
};

export async function GET() {
  const content = await prisma.siteContent.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...defaultContent },
    update: {},
  });
  return NextResponse.json(content);
}

export async function PATCH(request: Request) {
  const body = await request.json();

  const content = await prisma.siteContent.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...defaultContent, ...body },
    update: body,
  });

  return NextResponse.json(content);
}
