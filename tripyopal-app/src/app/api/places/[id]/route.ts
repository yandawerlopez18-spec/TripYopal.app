import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  const place = await prisma.place.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(place);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.place.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
