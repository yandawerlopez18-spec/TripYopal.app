import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { resolvePermission } from "../../../services/permissions";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findFirst({ where: { email, password } });

  if (!user) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  const token = crypto.randomUUID();
  await prisma.session.create({ data: { token, userId: user.id } });

  return NextResponse.json({ token, email: user.email, permission: resolvePermission(user) });
}
