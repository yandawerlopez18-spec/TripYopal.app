import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "API de TripYopal lista para conectar con Firebase y el chatbot.",
    status: "ok",
  });
}
