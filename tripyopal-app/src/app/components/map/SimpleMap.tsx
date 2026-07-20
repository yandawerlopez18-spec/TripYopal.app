"use client";

import { getMapConfig } from "../../services/external/maps";

export default function SimpleMap() {
  const config = getMapConfig();

  return (
    <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6 text-slate-100 shadow-sm">
      <h3 className="text-center font-[family-name:var(--font-brand)] text-lg font-semibold"><strong>Mapa Interactivo</strong></h3>
      <p className="mt-3 text-sm text-slate-400">
        Explora la ciudad con un mapa en vivo vinculado a Google Maps.
      </p>
      <div className="relative mt-4 overflow-hidden rounded-2xl border border-forest-700">
        <iframe
          src={config.embedUrl}
          className="h-56 w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de Yopal"
        />
      </div>
      <div className="mt-4 flex justify-center">
        <a
          href={`https://www.google.com/maps?q=Yopal,Casanare&z=${config.zoom}`}
          target="_blank"
          rel="noreferrer"
          className="btn-brand-font inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-forest-950 transition hover:bg-brand-400"
        >
          Abrir en Maps
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}
