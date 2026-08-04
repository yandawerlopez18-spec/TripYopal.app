import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  const prestadores = await prisma.prestador.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json(prestadores);
}

export async function POST(request: Request) {
  const body = await request.json();

  const prestador = await prisma.prestador.create({
    data: {
      id: crypto.randomUUID(),
      ...body,
    },
  });

  return NextResponse.json(prestador);
}
