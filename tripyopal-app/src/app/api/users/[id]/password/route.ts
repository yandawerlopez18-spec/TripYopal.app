import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

async function requireSuperadmin(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return null;

  const session = await prisma.session.findUnique({ where: { token }, include: { user: true } });
  if (!session || session.user.role !== "superadmin") return null;

  return session.user;
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const requester = await requireSuperadmin(request);
  if (!requester) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id }, select: { password: true } });

  return NextResponse.json({ password: user?.password ?? "" });
}
