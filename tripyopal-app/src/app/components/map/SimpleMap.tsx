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
        <a
          href={`https://www.google.com/maps?q=Yopal,Casanare&z=${config.zoom}`}
          target="_blank"
          rel="noreferrer"
          className="btn-brand-font absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-forest-950/90 px-3 py-1.5 text-xs font-semibold text-brand-400 shadow-sm backdrop-blur transition hover:bg-forest-900"
        >
          Abrir en Maps
          <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-2xl bg-forest-800 px-4 py-3 text-sm">
        <span className="text-slate-200">📍 Mirador de Yopal</span>
        <span className="font-semibold text-brand-400">★ 4.8</span>
      </div>
    </div>
  );
}
