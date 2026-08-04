import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  const route = await prisma.route.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(route);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.route.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
