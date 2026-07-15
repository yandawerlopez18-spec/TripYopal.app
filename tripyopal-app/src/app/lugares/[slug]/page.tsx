"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import ReviewList from "../../components/reviews/ReviewList";
import TravelAdvice from "../../components/travel/TravelAdvice";
import { usePlaces } from "../../hooks/usePlaces";

export default function LugarDetallePage({ params }: { params: { slug: string } }) {
  const { places } = usePlaces();
  const lugar = places.find((item) => item.id === params.slug);

  if (!lugar) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <Link href="/lugares" className="text-sm font-semibold text-emerald-700">
        ← Volver a lugares
      </Link>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">{lugar.category}</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{lugar.name}</h1>
        <p className="mt-4 text-lg text-slate-600">{lugar.description}</p>
        <div className="mt-8 rounded-2xl bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-500">Precio estimado</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{lugar.price}</p>
        </div>
        <ReviewList />
        <TravelAdvice />
      </div>
    </main>
  );
}
