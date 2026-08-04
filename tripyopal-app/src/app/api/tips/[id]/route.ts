import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const tip = await prisma.tip.update({ where: { id }, data: body });
  return NextResponse.json(tip);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.tip.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
