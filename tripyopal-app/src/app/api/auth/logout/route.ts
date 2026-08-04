import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  const { token } = await request.json();

  if (token) {
    await prisma.session.deleteMany({ where: { token } });
  }

  return NextResponse.json({ ok: true });
}
