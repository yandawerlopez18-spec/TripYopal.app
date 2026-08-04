import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  const routes = await prisma.route.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json(routes);
}

export async function POST(request: Request) {
  const body = await request.json();

  const route = await prisma.route.create({
    data: {
      id: crypto.randomUUID(),
      name: body.name,
      duration: body.duration,
      description: body.description,
      budget: body.budget,
      imageUrl: body.imageUrl ?? null,
    },
  });

  return NextResponse.json(route);
}
