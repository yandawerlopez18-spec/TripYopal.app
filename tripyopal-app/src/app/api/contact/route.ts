import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const DESTINATION_EMAIL = "TripYopal.co@gmail.com";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const subject = typeof body?.subject === "string" ? body.subject.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!email || !subject || !message) {
    return NextResponse.json({ ok: false, error: "Completa correo, asunto y mensaje." }, { status: 400 });
  }

  const user = process.env.GMAIL_USER?.trim();
  const rawPass = process.env.GMAIL_APP_PASSWORD?.trim();
  const pass = rawPass?.replace(/\s+/g, "");

  if (!user || !pass) {
    console.error("Falta configurar GMAIL_USER / GMAIL_APP_PASSWORD en el entorno.");
    return NextResponse.json({ ok: false, error: "El envío de correo no está configurado todavía." }, { status: 500 });
  }

  if (pass.length !== 16) {
    console.error(
      `GMAIL_APP_PASSWORD tiene ${pass.length} caracteres; una contraseña de aplicación de Google válida tiene 16. ` +
        "Genera una nueva en https://myaccount.google.com/apppasswords.",
    );
    return NextResponse.json(
      { ok: false, error: "La configuración de correo no es válida todavía. Escríbenos directo mientras se corrige." },
      { status: 500 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"TripYopal - Contacto web" <${user}>`,
      to: DESTINATION_EMAIL,
      replyTo: email,
      subject: `Nueva solicitud de contacto: ${subject}`,
      text: `Correo del visitante: ${email}\nAsunto: ${subject}\n\nMensaje:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #0f2a1d;">
          <p><strong>Correo del visitante:</strong> ${escapeHtml(email)}</p>
          <p><strong>Asunto:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error enviando correo de contacto:", error);
    const isAuthError = (error as { responseCode?: number })?.responseCode === 535;
    const message = isAuthError
      ? "La cuenta de correo rechazó las credenciales. Verifica la contraseña de aplicación de Google."
      : "No pudimos enviar tu solicitud. Intenta de nuevo.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
