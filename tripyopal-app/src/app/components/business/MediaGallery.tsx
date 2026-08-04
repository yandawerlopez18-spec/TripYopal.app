"use client";

import { useState } from "react";
import type { MediaItem } from "../../services/prestadores";

export default function MediaGallery({ media, categories }: { media: MediaItem[]; categories: string[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("Todas");
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const visible = activeCategory === "Todas" ? media : media.filter((item) => item.category === activeCategory);

  if (media.length === 0) return null;

  return (
    <div className="mt-10 rounded-3xl border border-forest-700 bg-forest-900 p-8">
      <h2 className="font-[family-name:var(--font-brand)] text-2xl font-semibold text-white">Galería multimedia</h2>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory("Todas")}
          className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
            activeCategory === "Todas" ? "bg-brand-500 text-forest-950" : "border border-forest-700 text-slate-300 hover:bg-forest-800"
          }`}
        >
          Todas
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
              activeCategory === cat ? "bg-brand-500 text-forest-950" : "border border-forest-700 text-slate-300 hover:bg-forest-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setLightboxUrl(item.url)}
            className="overflow-hidden rounded-2xl border border-forest-700 transition hover:opacity-90"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.url} alt={item.category} className="h-32 w-full object-cover" />
          </button>
        ))}
      </div>

      {lightboxUrl ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6"
          onClick={() => setLightboxUrl(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightboxUrl} alt="" className="max-h-full max-w-full rounded-2xl object-contain" />
          <button
            type="button"
            onClick={() => setLightboxUrl(null)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
