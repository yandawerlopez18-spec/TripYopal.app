import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  const events = await prisma.event.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const body = await request.json();

  const event = await prisma.event.create({
    data: {
      id: crypto.randomUUID(),
      title: body.title,
      date: body.date,
      place: body.place,
      description: body.description,
      imageUrl: body.imageUrl ?? null,
      time: body.time ?? null,
      modality: body.modality ?? null,
      category: body.category ?? null,
      longDescription: body.longDescription ?? null,
      endTime: body.endTime ?? null,
      address: body.address ?? null,
      organizer: body.organizer ?? null,
      contactPhone: body.contactPhone ?? null,
      contactEmail: body.contactEmail ?? null,
      featured: body.featured ?? null,
      interestedCount: body.interestedCount ?? null,
      features: body.features ?? null,
      agenda: body.agenda ?? null,
      allies: body.allies ?? null,
      whyAttend: body.whyAttend ?? null,
    },
  });

  return NextResponse.json(event);
}
