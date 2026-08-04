import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const climateTip = await prisma.climateTip.update({ where: { id }, data: body });
  return NextResponse.json(climateTip);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.climateTip.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
