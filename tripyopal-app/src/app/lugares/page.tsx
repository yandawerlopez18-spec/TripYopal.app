"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { usePlaces } from "../hooks/usePlaces";
import { formatPrice } from "../utils/formatters";

const budgetOptions = ["Todos", "Gratis", "Bajo", "Medio", "Alto"];

const gradients = [
  "linear-gradient(135deg,#f59e0b,#166534)",
  "linear-gradient(135deg,#0ea5e9,#166534)",
  "linear-gradient(135deg,#22c55e,#0f2a1d)",
  "linear-gradient(135deg,#fb7185,#065f46)",
];

function LugaresContent() {
  const { places, loading, error } = usePlaces();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get("categoria") ?? "Todas");
  const [selectedBudget, setSelectedBudget] = useState(() => searchParams.get("presupuesto") ?? "Todos");

  const categories = useMemo(() => {
    const values = new Set(places.map((place) => place.category));
    return ["Todas", ...Array.from(values)];
  }, [places]);

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesCategory = selectedCategory === "Todas" || place.category === selectedCategory;
      const matchesBudget = selectedBudget === "Todos" || place.price === selectedBudget;
      return matchesCategory && matchesBudget;
    });
  }, [places, selectedBudget, selectedCategory]);

  return (
    <div className="mt-6 rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-xl">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-brand)] text-4xl font-bold text-white sm:text-5xl">Lugares turísticos</h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-400">
          Descubre los sitios más atractivos de Yopal con información breve, categorías y experiencias recomendadas.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-forest-700 bg-forest-950 p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-300">Filtrar por categoría</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`btn-brand-font rounded-full px-3 py-2 text-sm font-semibold transition ${
                    selectedCategory === category ? "bg-brand-500 text-forest-950" : "border border-forest-700 text-slate-300 hover:bg-forest-800"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-300">Filtrar por presupuesto</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {budgetOptions.map((budget) => (
                <button
                  key={budget}
                  onClick={() => setSelectedBudget(budget)}
                  className={`btn-brand-font rounded-full px-3 py-2 text-sm font-semibold transition ${
                    selectedBudget === budget ? "bg-brand-500 text-forest-950" : "border border-forest-700 text-slate-300 hover:bg-forest-800"
                  }`}
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {loading && <p className="mt-8 text-slate-400">Cargando lugares...</p>}
      {error && <p className="mt-8 text-red-400">{error}</p>}
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredPlaces.map((place, index) => (
          <article key={place.id} className="overflow-hidden rounded-2xl border border-forest-700 bg-forest-950 shadow-sm">
            {place.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={place.imageUrl} alt={place.name} className="h-44 w-full object-cover" />
            ) : (
              <div className="h-44 w-full" style={{ background: gradients[index % gradients.length] }} />
            )}
            <div className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">{place.category}</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-100">{place.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{place.description}</p>
              <p className="mt-4 text-sm font-semibold text-brand-400">{formatPrice(place.price)}</p>
              <Link
                href={`/lugares/${place.id}`}
                className="btn-brand-font btn-gradient mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold text-forest-950 transition"
              >
                Ver detalle →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function LugaresPage() {
  return (
    <main className="min-h-screen bg-forest-950 px-6 py-6 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          ← Volver al inicio
        </Link>

        <Suspense
          fallback={
            <div className="mt-6 rounded-3xl border border-forest-700 bg-forest-900 p-8 text-center text-slate-400 shadow-xl">
              Cargando lugares...
            </div>
          }
        >
          <LugaresContent />
        </Suspense>
      </div>
    </main>
  );
}
