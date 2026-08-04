"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import ReviewList from "../../components/reviews/ReviewList";
import TravelAdvice from "../../components/travel/TravelAdvice";
import { usePlaces } from "../../hooks/usePlaces";

export default function LugarDetallePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { places, loading } = usePlaces();
  const lugar = places.find((item) => item.id === slug);

  if (!loading && !lugar) {
    notFound();
  }

  if (loading || !lugar) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-forest-950 px-6 py-16 text-slate-100 lg:px-8">
        <p className="text-slate-400">Cargando lugar...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-forest-950 px-6 py-6 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/lugares"
          className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          ← Volver a lugares
        </Link>
        <div className="mt-6 rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-sm">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-400">{lugar.category}</p>
            <h1 className="mt-2 font-[family-name:var(--font-brand)] text-4xl font-bold text-white sm:text-5xl">{lugar.name}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">{lugar.description}</p>
          </div>
          <div className="mt-8 rounded-2xl bg-forest-950 p-6 text-center">
            <p className="text-sm font-semibold text-slate-400">Precio estimado</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">{lugar.price}</p>
          </div>
          <ReviewList />
          <TravelAdvice />
        </div>
      </div>
    </main>
  );
}
