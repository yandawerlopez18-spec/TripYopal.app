"use client";

import { useState } from "react";
import { siteContent } from "../../services/siteContent";

type IconProps = { className?: string };

function PinIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}

function CallIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.2 1.1L6.6 10.8Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramGlyph({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2c-2.7 0-3.1 0-4.1.1-1.1 0-1.8.2-2.4.5A4.8 4.8 0 0 0 2.6 5.5c-.3.6-.4 1.3-.5 2.4C2 8.9 2 9.3 2 12s0 3.1.1 4.1c0 1.1.2 1.8.5 2.4a4.8 4.8 0 0 0 2.9 2.9c.6.3 1.3.4 2.4.5C8.9 22 9.3 22 12 22s3.1 0 4.1-.1c1.1 0 1.8-.2 2.4-.5a4.8 4.8 0 0 0 2.9-2.9c.3-.6.4-1.3.5-2.4.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c0-1.1-.2-1.8-.5-2.4a4.8 4.8 0 0 0-2.9-2.9c-.6-.3-1.3-.4-2.4-.5C15.1 2 14.7 2 12 2Zm0 2.2c2.6 0 3 0 4 .1.9 0 1.5.2 1.8.3.5.2.8.4 1.1.7.3.3.5.6.7 1.1.1.3.3.9.3 1.8.1 1 .1 1.4.1 4s0 3-.1 4c0 .9-.2 1.5-.3 1.8-.2.5-.4.8-.7 1.1-.3.3-.6.5-1.1.7-.3.1-.9.3-1.8.3-1 .1-1.4.1-4 .1s-3 0-4-.1c-.9 0-1.5-.2-1.8-.3a3 3 0 0 1-1.1-.7 3 3 0 0 1-.7-1.1c-.1-.3-.3-.9-.3-1.8-.1-1-.1-1.4-.1-4s0-3 .1-4c0-.9.2-1.5.3-1.8.2-.5.4-.8.7-1.1.3-.3.6-.5 1.1-.7.3-.1.9-.3 1.8-.3 1-.1 1.4-.1 4-.1Zm0 3.7a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2Zm0 6.8a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.2-7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    </svg>
  );
}

function MailIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 6.5 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PencilIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <path d="M12 20h9" strokeLinecap="round" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinejoin="round" />
    </svg>
  );
}

function ChatDotsIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <path d="M4 12a8 8 0 1 1 3.5 6.6L4 20l1.2-3.6A7.9 7.9 0 0 1 4 12Z" strokeLinejoin="round" />
      <circle cx="8.5" cy="12" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SendIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <path d="M20.5 3.5 3 10.3c-.7.3-.7 1.3 0 1.6l6.8 2.7 2.7 6.8c.3.7 1.3.7 1.6 0L20.5 3.5Z" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M20.5 3.5 9.8 13" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 1 1 8 0v3" strokeLinecap="round" />
    </svg>
  );
}

function SparkleShieldIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3.5 5 6v5.5c0 5 3 8.3 7 9 4-.7 7-4 7-9V6l-7-2.5Z" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" />
      <path d="M4 4.5 4.6 6 6 6.6 4.6 7.2 4 8.7 3.4 7.2 2 6.6l1.4-.6Z" fill="currentColor" stroke="none" />
      <path d="M20 15.5 20.5 17l1.5.6-1.5.6-.5 1.5-.5-1.5-1.5-.6 1.5-.6Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LeafBadgeIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.7">
      <path d="M19.5 4.5c.6 6-1 10.6-4.3 13.9-3.3 3.3-8 4.6-10.7 4-.6-2.7.7-7.4 4-10.7C11.8 8.4 16.5 3.9 19.5 4.5Z" />
      <path d="M5.5 18.5c2-3.6 4.6-6.4 8-8.4" />
    </svg>
  );
}

function FacebookGlyph({ className = "h-4.5 w-4.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13 22v-8h2.7l.4-3H13V9.1c0-.9.2-1.5 1.5-1.5H16V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.3-3.8 3.8V11H7.5v3H10v8h3Z" />
    </svg>
  );
}

function GmailGlyph({ className = "h-4.5 w-4.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M3.5 6.5h17a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H19V9.7l-7 5.3-7-5.3V17.5H3.5A1.5 1.5 0 0 1 2 16V8a1.5 1.5 0 0 1 1.5-1.5Z" />
      <path fill="#EA4335" d="M3.5 6.5 12 13l8.5-6.5H3.5Z" />
      <path fill="#34A853" d="M19 9.7v7.8h2V8a1.5 1.5 0 0 0-.6-1.2L19 9.7Z" />
      <path fill="#FBBC05" d="M2 8v8a1.5 1.5 0 0 0 1.5 1.5H5V9.7L2.6 6.8A1.5 1.5 0 0 0 2 8Z" />
    </svg>
  );
}

function XGlyph({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="m4 3 7.1 9.3L4.3 21H7l5-5.9L16.3 21H20l-7.4-9.7L19.1 3h-2.7l-4.6 5.4L7.7 3Z" />
    </svg>
  );
}

function WhatsAppGlyph({ className = "h-4.5 w-4.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.3-.5-.5-1-1.1-1.4-1.8-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.8c.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Facebook", key: "facebook" as const, icon: FacebookGlyph, color: "#1877f2" },
  { label: "Instagram", key: "instagram" as const, icon: InstagramGlyph, color: "#c2317c" },
  { label: "Gmail", key: "gmail" as const, icon: GmailGlyph, color: "#ffffff" },
  { label: "X", key: "x" as const, icon: XGlyph, color: "#111111" },
  { label: "WhatsApp", key: "whatsapp" as const, icon: WhatsAppGlyph, color: "#25d366" },
];

const contactIcons = {
  Dirección: PinIcon,
  Teléfono: CallIcon,
  Instagram: InstagramGlyph,
  Email: MailIcon,
};

function PaymentBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-10 items-center rounded-xl border border-forest-700 bg-white px-3">{children}</span>
  );
}

function PaymentBadges() {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
      <PaymentBadge>
        <span className="text-sm font-extrabold italic text-fuchsia-700">nequi</span>
      </PaymentBadge>
      <PaymentBadge>
        <span className="text-sm font-black italic tracking-wide text-blue-900">VISA</span>
      </PaymentBadge>
      <PaymentBadge>
        <span className="relative flex items-center">
          <span className="h-4 w-4 rounded-full bg-red-600" />
          <span className="-ml-1.5 h-4 w-4 rounded-full bg-amber-400 opacity-90" />
          <span className="ml-1.5 text-[11px] font-bold lowercase text-slate-700">mastercard</span>
        </span>
      </PaymentBadge>
      <PaymentBadge>
        <span className="rounded bg-blue-700 px-1.5 py-0.5 text-[10px] font-extrabold uppercase text-white">American Express</span>
      </PaymentBadge>
      <PaymentBadge>
        <span className="rounded-full bg-sky-600 px-2 py-0.5 text-xs font-black lowercase italic text-white">pse</span>
      </PaymentBadge>
      <PaymentBadge>
        <span className="text-sm font-black text-red-600">
          DAVI<span className="text-slate-900">plata</span>
        </span>
      </PaymentBadge>
    </div>
  );
}

export default function ContactFooter() {
  const [status, setStatus] = useState("");

  const contactItems = [
    { label: "Dirección", value: siteContent.contact.address, tone: "text-slate-200" },
    { label: "Teléfono", value: siteContent.contact.phone, tone: "text-brand-400 font-semibold" },
    { label: "Instagram", value: `@${siteContent.contact.instagram}`, tone: "text-brand-400 font-semibold" },
    { label: "Email", value: siteContent.contact.email, tone: "text-brand-400 font-semibold" },
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Gracias, hemos recibido tu solicitud.");
  };

  return (
    <footer className="mt-16 border-t border-forest-700 bg-forest-900">
      <div className="mx-auto max-w-8xl px-6 py-14 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-forest-700 bg-forest-950 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-brand-500 text-brand-400">
                <CallIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-brand)] text-lg font-bold text-white">Información de contacto</h3>
                <p className="text-sm text-slate-400">Estamos conectados contigo 💚</p>
              </div>
            </div>

            <div className="mt-5 space-y-4 text-sm">
              {contactItems.map((item) => {
                const Icon = contactIcons[item.label];
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-500/40 text-brand-400">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-white">{item.label}</p>
                      <p className={`truncate ${item.tone}`}>{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 border-t border-forest-700 pt-5">
              <div className="flex items-center justify-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={siteContent.social[social.key] || "#"}
                    target={siteContent.social[social.key] ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:opacity-90"
                    style={{ backgroundColor: social.color }}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-forest-700 bg-forest-950 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-brand-500 text-brand-400">
                <ChatDotsIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-brand)] text-lg font-bold text-white">Contacto por solicitud</h3>
                <p className="text-sm text-slate-400">Escríbenos para más información.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <div className="flex items-center gap-2.5 rounded-2xl border border-forest-700 bg-forest-900 px-4 py-3.5 focus-within:border-brand-400">
                <MailIcon className="h-4 w-4 shrink-0 text-brand-400" />
                <input
                  type="email"
                  required
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="off"
                  placeholder="Ingresa tu correo aquí"
                  className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2.5 rounded-2xl border border-forest-700 bg-forest-900 px-4 py-3.5 focus-within:border-brand-400">
                <PencilIcon className="h-4 w-4 shrink-0 text-brand-400" />
                <input
                  type="text"
                  required
                  placeholder="Escríbenos tu solicitud"
                  className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                />
              </div>
              <div className="flex items-start gap-2.5 rounded-2xl border border-forest-700 bg-forest-900 px-4 py-3.5 focus-within:border-brand-400">
                <ChatDotsIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <textarea
                  required
                  rows={3}
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  className="w-full resize-y bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                />
              </div>

              <button className="btn-brand-font btn-gradient flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-forest-950">
                <SendIcon className="h-4 w-4" /> Enviar solicitud
              </button>

              <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <LockIcon /> Tu información está segura con nosotros.
              </p>

              {status ? <p className="text-center text-sm font-medium text-brand-400">{status}</p> : null}
            </form>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-forest-700 bg-forest-950 p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-brand-500 text-brand-400">
                <SparkleShieldIcon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-semibold text-white">Sitio seguro</p>
                <p className="text-xs text-slate-400">Tu seguridad es nuestra prioridad.</p>
                <span className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-brand-500/40 px-2.5 py-1 text-[11px] font-semibold text-brand-400">
                  <LockIcon /> SSL Certificado
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="flex items-center justify-center gap-1.5 text-sm font-semibold text-slate-200">
                Métodos de pago aceptados <LockIcon className="h-3.5 w-3.5 text-brand-400" />
              </p>
              <PaymentBadges />
            </div>

            <div className="flex items-center gap-3 md:justify-end">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-brand-500 text-brand-400">
                <LeafBadgeIcon className="h-5 w-5" />
              </span>
              <p className="font-semibold text-white">
                Hecho en los <span className="text-brand-400">Llanos Orientales</span> 💚
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
