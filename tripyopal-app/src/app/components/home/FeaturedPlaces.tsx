"use client";

import Link from "next/link";
import { useState } from "react";
import { featuredPlaces } from "../../services/content";
import { getPlaceCategoryStyle } from "../../utils/placeCategoryStyles";
import { EventPinIcon, GridIcon, HeartIcon, StarIcon } from "./infoIcons";

function FavoriteButton() {
  const [active, setActive] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        setActive((current) => !current);
      }}
      aria-label="Guardar en favoritos"
      className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${
        active ? "border-brand-400 bg-brand-500 text-forest-950" : "border-white/40 bg-black/30 text-white backdrop-blur"
      }`}
    >
      <HeartIcon filled={active} />
    </button>
  );
}

export default function FeaturedPlaces() {
  const topRatedPlaces = [...featuredPlaces].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 6);

  return (
    <section className="mx-auto max-w-8xl px-6 py-10 lg:px-8">
      <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6 lg:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
              <StarIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-[family-name:var(--font-brand)] text-2xl font-bold text-slate-100">
                Recomendaciones <span className="text-brand-400">para ti</span>
              </h3>
              <p className="mt-1 text-sm text-slate-400">Lugares increíbles que no te puedes perder en Yopal</p>
            </div>
          </div>
          <Link
            href="/lugares"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-forest-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-forest-800"
          >
            <GridIcon className="h-4 w-4" /> Explorar por categoría
          </Link>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topRatedPlaces.map((place) => {
            const style = getPlaceCategoryStyle(place.category);
            return (
              <div key={place.id} className="overflow-hidden rounded-2xl border border-forest-700 bg-forest-950">
                <div className="relative">
                  <Link href={`/lugares/${place.id}`} target="_blank" rel="noopener noreferrer">
                    {place.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={place.imageUrl} alt={place.name} className="h-44 w-full object-cover" />
                    ) : (
                      <div className="h-44 w-full bg-forest-800" />
                    )}
                  </Link>
                  <span className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${style.badgeClass}`}>
                    <style.icon className="h-3 w-3" /> {place.category}
                  </span>
                  <div className="absolute right-3 top-3">
                    <FavoriteButton />
                  </div>
                </div>
                <div className="p-4">
                  <p className="flex items-center gap-1.5 text-base font-semibold text-slate-100">
                    <EventPinIcon className="h-4 w-4 shrink-0 text-brand-400" /> {place.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{place.description}</p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className={style.textClass}>
                      {place.category} <span className="text-slate-500">· {place.price}</span>
                    </span>
                    {place.rating ? (
                      <span className="flex items-center gap-1 font-semibold text-yellow-400">★ {place.rating}</span>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
          {topRatedPlaces.length === 0 ? (
            <p className="text-sm text-slate-500 sm:col-span-2 lg:col-span-3">Aún no hay lugares destacados cargados.</p>
          ) : null}
        </div>

        <div className="mt-7 text-center">
          <Link
            href="/recomendaciones"
            className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
          >
            Ver todas las recomendaciones →
          </Link>
        </div>
      </div>
    </section>
  );
}
