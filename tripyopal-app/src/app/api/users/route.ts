import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (email) {
    const user = await prisma.user.findUnique({ where: { email }, select: safeSelect });
    return NextResponse.json(user);
  }

  const users = await prisma.user.findMany({ select: safeSelect, orderBy: { createdAt: "asc" } });
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();

  const user = await prisma.user.create({
    data: {
      id: body.id ?? crypto.randomUUID(),
      ...body,
    },
    select: safeSelect,
  });

  return NextResponse.json(user);
}
