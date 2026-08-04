import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  const contacts = await prisma.emergencyContact.findMany();
  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const contact = await prisma.emergencyContact.create({ data: { id: crypto.randomUUID(), ...body } });
  return NextResponse.json(contact);
}
