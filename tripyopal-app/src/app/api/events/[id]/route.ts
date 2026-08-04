import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  const event = await prisma.event.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(event);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.event.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
