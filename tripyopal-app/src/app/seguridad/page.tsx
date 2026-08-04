"use client";

import Link from "next/link";
import { useDataHydration } from "../context/DataHydrationContext";
import { emergencyContacts, safetyPoints } from "../services/siteContent";
import { telHref } from "../utils/phone";
import { AlertIcon, PhoneIcon, ShieldIcon } from "../components/home/infoIcons";

export default function SeguridadPage() {
  useDataHydration();

  return (
    <main className="min-h-screen bg-forest-950 px-6 py-6 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          ← Volver al inicio
        </Link>

        <div className="mt-6 rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-xl">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-brand)] text-4xl font-bold text-white sm:text-5xl">Seguridad y emergencias</h1>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              Contactos y puntos de apoyo para que tu visita a Yopal sea segura y tranquila.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <section id="seguridad" className="rounded-2xl border border-forest-700 bg-forest-950 p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
                  <ShieldIcon />
                </span>
                <h2 className="font-[family-name:var(--font-brand)] text-lg font-semibold">Seguridad</h2>
              </div>
              <div className="mt-4 divide-y divide-forest-800 text-sm">
                {safetyPoints.map((point) => (
                  <div key={point.id} className="py-3 first:pt-0 last:pb-0">
                    <p className="font-semibold text-slate-200">{point.type}</p>
                    <p className="mt-0.5 text-slate-400">{point.name}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      {point.phone ? (
                        <a
                          href={telHref(point.phone)}
                          className="inline-flex items-center gap-1 rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-semibold text-brand-400 transition hover:bg-brand-500/20"
                        >
                          <PhoneIcon /> {point.phone}
                        </a>
                      ) : null}
                      {point.address ? <span className="text-xs text-slate-500">{point.address}</span> : null}
                    </div>
                  </div>
                ))}
                {safetyPoints.length === 0 ? <p className="py-3 text-slate-500">Aún no hay puntos de seguridad cargados.</p> : null}
              </div>
            </section>

            <section id="emergencias" className="rounded-2xl border border-forest-700 bg-forest-950 p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                  <AlertIcon />
                </span>
                <h2 className="font-[family-name:var(--font-brand)] text-lg font-semibold">Emergencias</h2>
              </div>
              <div className="mt-4 divide-y divide-forest-800 text-sm">
                {emergencyContacts.map((contact) => (
                  <div key={contact.id} className="py-3 first:pt-0 last:pb-0">
                    <p className="font-semibold text-slate-200">{contact.type}</p>
                    <p className="mt-0.5 text-slate-400">{contact.name}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      {contact.phone ? (
                        <a
                          href={telHref(contact.phone)}
                          className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400 transition hover:bg-red-500/20"
                        >
                          <PhoneIcon /> {contact.phone}
                        </a>
                      ) : null}
                      {contact.address ? <span className="text-xs text-slate-500">{contact.address}</span> : null}
                    </div>
                  </div>
                ))}
                {emergencyContacts.length === 0 ? <p className="py-3 text-slate-500">Aún no hay contactos de emergencia cargados.</p> : null}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
