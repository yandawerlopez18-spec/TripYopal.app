"use client";

import Link from "next/link";
import { useDataHydration } from "../context/DataHydrationContext";
import { featuredPlaces } from "../services/content";

const gradients = [
  "linear-gradient(135deg,#f59e0b,#166534)",
  "linear-gradient(135deg,#0ea5e9,#166534)",
  "linear-gradient(135deg,#22c55e,#0f2a1d)",
];

export default function RecomendacionesPage() {
  useDataHydration();

  return (
    <main className="min-h-screen bg-forest-950 px-6 py-6 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          ← Volver al inicio
        </Link>

        <div className="mt-6 rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-xl">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-brand)] text-4xl font-bold text-white sm:text-5xl">Recomendaciones para ti</h1>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              Lugares seleccionados para vivir lo mejor de Yopal, con precio y calificación.
            </p>
          </div>

          {featuredPlaces.length === 0 ? (
            <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-forest-700 bg-forest-950 p-10 text-center">
              <p className="text-slate-300">Aún no hay recomendaciones cargadas.</p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredPlaces.map((place, index) => (
                <article key={place.id} className="overflow-hidden rounded-2xl border border-forest-700 bg-forest-950 shadow-sm">
                  {place.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={place.imageUrl} alt={place.name} className="h-40 w-full object-cover" />
                  ) : (
                    <div className="h-40 w-full" style={{ background: gradients[index % gradients.length] }} />
                  )}
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">{place.category}</p>
                    <h2 className="mt-1 text-lg font-semibold text-slate-100">{place.name}</h2>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">{place.description}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-brand-400">{place.price}</span>
                      {place.rating ? <span>★ {place.rating}</span> : null}
                    </div>
                    {place.location ? <p className="mt-1 truncate text-xs text-slate-500">{place.location}</p> : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
