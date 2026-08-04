import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { resolvePermission } from "../../../services/permissions";

export async function GET(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const session = await prisma.session.findUnique({ where: { token }, include: { user: true } });

  if (!session) {
    return NextResponse.json({ error: "Sesión inválida" }, { status: 401 });
  }

  return NextResponse.json({ email: session.user.email, permission: resolvePermission(session.user) });
}
