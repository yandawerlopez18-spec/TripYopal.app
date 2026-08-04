import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

const safeSelect = {
  id: true,
  name: true,
  lastName: true,
  username: true,
  email: true,
  role: true,
  businessType: true,
  scope: true,
  birthDate: true,
  gender: true,
  country: true,
  department: true,
  city: true,
  phone: true,
};

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  const user = await prisma.user.update({
    where: { id },
    data: body,
    select: safeSelect,
  });

  return NextResponse.json(user);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
