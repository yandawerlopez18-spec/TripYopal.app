import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  const climateTips = await prisma.climateTip.findMany();
  return NextResponse.json(climateTips);
}

export async function POST(request: Request) {
  const body = await request.json();
  const climateTip = await prisma.climateTip.create({ data: { id: crypto.randomUUID(), ...body } });
  return NextResponse.json(climateTip);
}
