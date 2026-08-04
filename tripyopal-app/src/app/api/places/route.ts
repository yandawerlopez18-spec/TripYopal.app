import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  const places = await prisma.place.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json(places);
}

export async function POST(request: Request) {
  const body = await request.json();

  const place = await prisma.place.create({
    data: {
      id: crypto.randomUUID(),
      name: body.name,
      category: body.category,
      description: body.description,
      price: body.price,
      rating: body.rating ?? null,
      location: body.location ?? null,
      imageUrl: body.imageUrl ?? null,
    },
  });

  return NextResponse.json(place);
}
