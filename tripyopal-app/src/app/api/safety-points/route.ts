import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  const points = await prisma.safetyPoint.findMany();
  return NextResponse.json(points);
}

export async function POST(request: Request) {
  const body = await request.json();
  const point = await prisma.safetyPoint.create({ data: { id: crypto.randomUUID(), ...body } });
  return NextResponse.json(point);
}
