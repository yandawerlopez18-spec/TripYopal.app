"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { search } from "../services/search";

export default function BuscarPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const results = search(query);

  return (
    <main className="min-h-screen bg-forest-950 px-6 py-6 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="btn-brand-font inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-forest-950 transition hover:bg-brand-400"
        >
          ← Volver al inicio
        </Link>

        <div className="mt-6 rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-xl">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-brand)] text-4xl font-bold text-white sm:text-5xl">Resultados de búsqueda</h1>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              {query ? (
                <>
                  Mostrando resultados para <span className="font-semibold text-brand-400">&quot;{query}&quot;</span>
                </>
              ) : (
                "Escribe algo en el buscador para encontrar lugares, negocios, eventos y rutas."
              )}
            </p>
          </div>

          {query && results.length === 0 ? (
            <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-forest-700 bg-forest-950 p-10 text-center">
              <p className="text-slate-300">No encontramos nada relacionado con &quot;{query}&quot;.</p>
              <p className="text-sm text-slate-500">Prueba con el nombre de un lugar, un negocio, una categoría o un evento.</p>
            </div>
          ) : (
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.href}
                  className="rounded-2xl border border-forest-700 bg-forest-950 p-5 transition hover:border-brand-400"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">{result.typeLabel}</p>
                  <h2 className="mt-2 text-lg font-semibold text-slate-100">{result.title}</h2>
                  {result.subtitle ? <p className="mt-1 text-xs text-slate-500">{result.subtitle}</p> : null}
                  {result.description ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{result.description}</p> : null}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
