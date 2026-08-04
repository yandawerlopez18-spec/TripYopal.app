import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  const tips = await prisma.tip.findMany();
  return NextResponse.json(tips);
}

export async function POST(request: Request) {
  const body = await request.json();
  const tip = await prisma.tip.create({ data: { id: crypto.randomUUID(), ...body } });
  return NextResponse.json(tip);
}
