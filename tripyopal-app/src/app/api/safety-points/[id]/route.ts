import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const point = await prisma.safetyPoint.update({ where: { id }, data: body });
  return NextResponse.json(point);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.safetyPoint.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
