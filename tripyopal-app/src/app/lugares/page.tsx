"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePlaces } from "../hooks/usePlaces";
import { formatPrice } from "../utils/formatters";

const budgetOptions = ["Todos", "Gratis", "Bajo", "Medio", "Alto"];

export default function LugaresPage() {
  const { places, loading, error } = usePlaces();
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedBudget, setSelectedBudget] = useState("Todos");

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
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Lugares turísticos</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Descubre los sitios más atractivos de Yopal con información breve, categorías y experiencias recomendadas.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-700">Filtrar por categoría</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-3 py-2 text-sm ${
                    selectedCategory === category ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-700">Filtrar por presupuesto</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {budgetOptions.map((budget) => (
                <button
                  key={budget}
                  onClick={() => setSelectedBudget(budget)}
                  className={`rounded-full px-3 py-2 text-sm ${
                    selectedBudget === budget ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {loading && <p className="mt-8 text-slate-600">Cargando lugares...</p>}
      {error && <p className="mt-8 text-red-600">{error}</p>}
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredPlaces.map((place) => (
          <article key={place.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">{place.category}</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">{place.name}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{place.description}</p>
            <p className="mt-4 text-sm font-semibold text-emerald-700">{formatPrice(place.price)}</p>
            <Link href={`/lugares/${place.id}`} className="mt-5 inline-flex text-sm font-semibold text-emerald-700">
              Ver detalle →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
