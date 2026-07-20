"use client";

import { useState } from "react";
import { siteContent } from "../../services/siteContent";

const socialLinks = [
  {
    label: "Facebook",
    color: "#3b5998",
    path: "M13 22v-8h2.7l.4-3H13V9.1c0-.9.2-1.5 1.5-1.5H16V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.3-3.8 3.8V11H7.5v3H10v8h3Z",
  },
  {
    label: "Twitter",
    color: "#1da1f2",
    path: "M22 6.1c-.6.3-1.3.5-2 .6.7-.4 1.3-1.2 1.5-2-.7.4-1.5.7-2.3.9a3.6 3.6 0 0 0-6.2 3.3 10.3 10.3 0 0 1-7.5-3.8 3.6 3.6 0 0 0 1.1 4.9c-.6 0-1.1-.2-1.6-.4v.1c0 1.8 1.3 3.2 2.9 3.6-.5.1-1 .2-1.6.1.4 1.4 1.8 2.5 3.3 2.5A7.3 7.3 0 0 1 2 18.4a10.3 10.3 0 0 0 5.6 1.6c6.7 0 10.4-5.6 10.4-10.4v-.5c.7-.5 1.3-1.1 1.9-1.9Z",
  },
  {
    label: "Google",
    color: "#dd4b39",
    path: "M21.6 12.2c0-.7 0-1.3-.2-1.9h-9.2v3.7h5.3a4.5 4.5 0 0 1-2 3v2.4h3.2c1.9-1.7 3-4.3 3-7.2Z M12.2 22c2.6 0 4.8-.9 6.4-2.4l-3.2-2.4c-.9.6-2 1-3.2 1-2.4 0-4.5-1.6-5.2-3.9H3.6v2.5A10 10 0 0 0 12.2 22Z M7 14.3a6 6 0 0 1 0-3.8V8H3.6a10 10 0 0 0 0 9l3.4-2.7Z M12.2 6.6c1.4 0 2.6.5 3.6 1.4l2.7-2.7A9.8 9.8 0 0 0 12.2 3 10 10 0 0 0 3.6 8l3.4 2.6c.7-2.2 2.8-4 5.2-4Z",
  },
  {
    label: "Pinterest",
    color: "#cb2027",
    path: "M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.7.2-2.6l1.4-6s-.3-.7-.3-1.7c0-1.6.9-2.8 2.1-2.8 1 0 1.5.7 1.5 1.6 0 1-.6 2.5-1 3.9-.2 1.1.6 2 1.7 2 2 0 3.5-2.1 3.5-5.2 0-2.7-2-4.6-4.7-4.6-3.2 0-5.1 2.4-5.1 4.9 0 1 .3 1.6.8 2.2l-.5 1.4s-.2.1-.4 0c-1-.4-1.6-1.8-1.6-3 0-2.4 2-5.3 6-5.3 3.2 0 5.7 2.3 5.7 5.3 0 3.2-2 5.7-4.8 5.7-1 0-1.8-.5-2.1-1.1l-.6 2.2c-.2.8-.7 1.9-1.1 2.5A10 10 0 1 0 12 2Z",
  },
  {
    label: "Instagram",
    color: "#c2317c",
    path: "M12 2c-2.7 0-3.1 0-4.1.1-1.1 0-1.8.2-2.4.5A4.8 4.8 0 0 0 2.6 5.5c-.3.6-.4 1.3-.5 2.4C2 8.9 2 9.3 2 12s0 3.1.1 4.1c0 1.1.2 1.8.5 2.4a4.8 4.8 0 0 0 2.9 2.9c.6.3 1.3.4 2.4.5C8.9 22 9.3 22 12 22s3.1 0 4.1-.1c1.1 0 1.8-.2 2.4-.5a4.8 4.8 0 0 0 2.9-2.9c.3-.6.4-1.3.5-2.4.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c0-1.1-.2-1.8-.5-2.4a4.8 4.8 0 0 0-2.9-2.9c-.6-.3-1.3-.4-2.4-.5C15.1 2 14.7 2 12 2Zm0 2.2c2.6 0 3 0 4 .1.9 0 1.5.2 1.8.3.5.2.8.4 1.1.7.3.3.5.6.7 1.1.1.3.3.9.3 1.8.1 1 .1 1.4.1 4s0 3-.1 4c0 .9-.2 1.5-.3 1.8-.2.5-.4.8-.7 1.1-.3.3-.6.5-1.1.7-.3.1-.9.3-1.8.3-1 .1-1.4.1-4 .1s-3 0-4-.1c-.9 0-1.5-.2-1.8-.3a3 3 0 0 1-1.1-.7 3 3 0 0 1-.7-1.1c-.1-.3-.3-.9-.3-1.8-.1-1-.1-1.4-.1-4s0-3 .1-4c0-.9.2-1.5.3-1.8.2-.5.4-.8.7-1.1.3-.3.6-.5 1.1-.7.3-.1.9-.3 1.8-.3 1-.1 1.4-.1 4-.1Zm0 3.7a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2Zm0 6.8a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.2-7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",
  },
];

const paymentBadges = ["Nequi", "VISA", "PayPal", "Bancolombia", "Otros Bancos"];

const contactIcons = {
  Dirección: (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  ),
  Teléfono: (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.2 1.1L6.6 10.8Z"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 2c-2.7 0-3.1 0-4.1.1-1.1 0-1.8.2-2.4.5A4.8 4.8 0 0 0 2.6 5.5c-.3.6-.4 1.3-.5 2.4C2 8.9 2 9.3 2 12s0 3.1.1 4.1c0 1.1.2 1.8.5 2.4a4.8 4.8 0 0 0 2.9 2.9c.6.3 1.3.4 2.4.5C8.9 22 9.3 22 12 22s3.1 0 4.1-.1c1.1 0 1.8-.2 2.4-.5a4.8 4.8 0 0 0 2.9-2.9c.3-.6.4-1.3.5-2.4.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c0-1.1-.2-1.8-.5-2.4a4.8 4.8 0 0 0-2.9-2.9c-.6-.3-1.3-.4-2.4-.5C15.1 2 14.7 2 12 2Zm0 2.2c2.6 0 3 0 4 .1.9 0 1.5.2 1.8.3.5.2.8.4 1.1.7.3.3.5.6.7 1.1.1.3.3.9.3 1.8.1 1 .1 1.4.1 4s0 3-.1 4c0 .9-.2 1.5-.3 1.8-.2.5-.4.8-.7 1.1-.3.3-.6.5-1.1.7-.3.1-.9.3-1.8.3-1 .1-1.4.1-4 .1s-3 0-4-.1c-.9 0-1.5-.2-1.8-.3a3 3 0 0 1-1.1-.7 3 3 0 0 1-.7-1.1c-.1-.3-.3-.9-.3-1.8-.1-1-.1-1.4-.1-4s0-3 .1-4c0-.9.2-1.5.3-1.8.2-.5.4-.8.7-1.1.3-.3.6-.5 1.1-.7.3-.1.9-.3 1.8-.3 1-.1 1.4-.1 4-.1Zm0 3.7a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2Zm0 6.8a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.2-7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 6.5 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function ContactFooter() {
  const [status, setStatus] = useState("");

  const contactItems = [
    { label: "Dirección", value: siteContent.contact.address },
    { label: "Teléfono", value: siteContent.contact.phone },
    { label: "Instagram", value: siteContent.contact.instagram },
    { label: "Email", value: siteContent.contact.email },
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
            <h3 className="text-center font-[family-name:var(--font-brand)] text-lg font-semibold text-slate-100">Información de contacto</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
                    {contactIcons[item.label]}
                  </span>
                  <p>
                    {item.label}: {item.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:opacity-90"
                  style={{ backgroundColor: social.color }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-forest-700 bg-forest-950 p-6 shadow-sm">
            <h3 className="text-center font-[family-name:var(--font-brand)] text-lg font-semibold text-slate-100">Contacto por solicitud</h3>
            <p className="mt-4 text-center text-sm text-slate-300">Escríbanos para más información.</p>
            <form onSubmit={handleSubmit} className="mx-auto mt-4 max-w-md space-y-4">
              <div className="flex items-center gap-2 border-b border-forest-700 pb-2 focus-within:border-brand-400">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-brand-400" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m4 6.5 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  type="email"
                  required
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="off"
                  placeholder="Ingresa tu correo aqui"
                  className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2 border-b border-forest-700 pb-2 focus-within:border-brand-400">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-brand-400" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 20h9" strokeLinecap="round" />
                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinejoin="round" />
                </svg>
                <input
                  type="text"
                  required
                  placeholder="Escribenos tu solicitud"
                  className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                
                />
              </div>
              <button className="mx-auto flex w-fit rounded-full bg-brand-500 px-10 py-3 text-sm font-semibold text-forest-950 transition hover:bg-brand-400">
                Enviar solicitud
              </button>
              {status ? <p className="text-center text-sm font-medium text-brand-400 ">{status}</p> : null}
            </form>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-forest-700 pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-500">Desarrollado por Cristian López &amp; Duvan Segovia © 2026</p>
          <div className="flex flex-wrap items-center gap-2">
            {paymentBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-forest-700 bg-forest-950 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-300"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
