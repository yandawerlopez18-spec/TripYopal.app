"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { BUSINESS_CATEGORIES, CategoryIcon } from "../../components/home/categoryIcons";
import { listPrestadoresByCategory } from "../../services/prestadores";

const gradients = [
  "linear-gradient(135deg,#f59e0b,#166534)",
  "linear-gradient(135deg,#0ea5e9,#166534)",
  "linear-gradient(135deg,#22c55e,#0f2a1d)",
  "linear-gradient(135deg,#fb7185,#065f46)",
];

export default function CategoriaPage({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = use(params);
  const category = BUSINESS_CATEGORIES.find((c) => c.key === categoria);

  if (!category) {
    notFound();
  }

  const prestadores = listPrestadoresByCategory(category.key);

  return (
    <main className="min-h-screen bg-forest-950 px-6 py-6 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="btn-brand-font inline-flex items-center gap-2 rounded-full border border-forest-700 bg-forest-900 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-brand-400 hover:bg-forest-800 hover:text-brand-400"
        >
          ← Volver al inicio
        </Link>

        <div className="mt-6 rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-xl">
          <div className="text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
              <CategoryIcon icon={category.key} />
            </span>
            <h1 className="mt-4 font-[family-name:var(--font-brand)] text-4xl font-bold text-white sm:text-5xl">{category.label}</h1>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              Negocios registrados en la categoría {category.label.toLowerCase()}, con su información de contacto.
            </p>
          </div>

          {prestadores.length === 0 ? (
            <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-forest-700 bg-forest-950 p-10 text-center">
              <p className="text-slate-300">Aún no hay negocios registrados en esta categoría.</p>
              <Link
                href="/registro"
                className="btn-brand-font rounded-full bg-brand-500 px-6 py-3 font-semibold text-forest-950 transition hover:bg-brand-400"
              >
                Registrar negocio
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {prestadores.map((prestador, index) => (
                <article
                  key={prestador.id}
                  className="flex h-[480px] flex-col overflow-hidden rounded-2xl border border-forest-700 bg-forest-950 shadow-sm"
                >
                  <div className="h-1/2 w-full shrink-0">
                    {prestador.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={prestador.imageUrl} alt={prestador.name} className="h-full w-full object-cover" />
                    ) : (
                      <div
                        className="flex h-full items-center justify-center"
                        style={{ background: gradients[index % gradients.length] }}
                      >
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur">
                          <CategoryIcon icon={category.key} />
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex h-1/2 flex-col overflow-hidden p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">{prestador.tipo}</p>
                    <h2 className="mt-1 truncate text-lg font-semibold text-slate-100">{prestador.name}</h2>
                    {prestador.description ? (
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">{prestador.description}</p>
                    ) : null}
                    <div className="mt-2 space-y-0.5 text-xs text-slate-400">
                      {prestador.priceRange ? <p className="font-semibold text-brand-400">{prestador.priceRange}</p> : null}
                      {prestador.address ? <p className="truncate">{prestador.address}</p> : null}
                      {prestador.phone ? <p className="truncate">{prestador.phone}</p> : null}
                      {prestador.email ? <p className="truncate">{prestador.email}</p> : null}
                      {prestador.schedule ? <p className="truncate">{prestador.schedule}</p> : null}
                    </div>
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
