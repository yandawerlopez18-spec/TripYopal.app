"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BUSINESS_CATEGORIES, CATEGORY_BADGE_STYLES, CategoryIcon, getCategoryLabel, type IconKey } from "./categoryIcons";
import { listPrestadoresByCategory, type Prestador } from "../../services/prestadores";
import { sectionText } from "../../services/siteContent";
import { getDisplayRating } from "../../utils/businessProfileConfig";
import { EventPinIcon, HeadsetIcon, ShieldIcon, StarIcon } from "./infoIcons";

const ROTATE_INTERVAL_MS = 3500;

function CategoryCard({ category, label, prestadores }: { category: IconKey; label: string; prestadores: Prestador[] }) {
  const [index, setIndex] = useState(0);
  const badgeClass = CATEGORY_BADGE_STYLES[category];

  useEffect(() => {
    if (prestadores.length < 2) return;

    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % prestadores.length);
    }, ROTATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [prestadores.length]);

  if (prestadores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-forest-700 bg-forest-950 p-6 text-center">
        <span className="flex h-12 w-12 items-center justify-center text-forest-600">
          <CategoryIcon icon={category} />
        </span>
        <p className="text-sm font-semibold text-slate-300">{label}</p>
        <p className="text-xs text-slate-500">Aún no hay negocios registrados en esta categoría.</p>
        <Link href="/registro" className="btn-brand-font btn-gradient rounded-full px-3 py-1.5 text-xs font-semibold text-forest-950 transition">
          Registrar negocio →
        </Link>
      </div>
    );
  }

  const active = prestadores[index];
  const rating = getDisplayRating(active);

  return (
    <Link href={`/categorias/${category}`} className="block overflow-hidden rounded-2xl border border-forest-700 bg-forest-950 transition hover:border-brand-400">
      <div className="relative">
        {active.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={active.imageUrl} alt={active.name} className="h-40 w-full object-cover transition-all duration-500" />
        ) : (
          <div className="flex h-40 items-center justify-center bg-forest-800 text-forest-600">
            <CategoryIcon icon={category} />
          </div>
        )}
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${badgeClass}`}>
          {label}
        </span>
        {rating ? (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-xs font-semibold text-yellow-400 backdrop-blur">
            ★ {rating}
          </span>
        ) : null}
      </div>
      <div className="p-4">
        <p className="truncate text-sm font-semibold text-slate-100">{active.name}</p>
        <p className="mt-1 flex items-center gap-1 truncate text-xs text-slate-400">
          <EventPinIcon className="h-3.5 w-3.5 shrink-0 text-brand-400" /> {active.address || "Yopal, Casanare"}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          {prestadores.length} {prestadores.length === 1 ? "negocio registrado" : "negocios registrados"}
        </p>
        {prestadores.length > 1 ? (
          <div className="mt-2 flex gap-1">
            {prestadores.map((prestador, i) => (
              <span
                key={prestador.id}
                className={`h-1.5 flex-1 rounded-full transition-colors ${i === index ? "bg-brand-400" : "bg-forest-800"}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}

const showcaseCategories = BUSINESS_CATEGORIES.filter((category) => category.key !== "educacion" && category.key !== "comercios");

export default function CategoryShowcase() {
  const trustBadges = [
    { icon: ShieldIcon, title: sectionText("offerBadge1", "title", "Negocios verificados"), subtitle: sectionText("offerBadge1", "description", "Información confiable") },
    { icon: StarIcon, title: sectionText("offerBadge2", "title", "Reseñas reales"), subtitle: sectionText("offerBadge2", "description", "De nuestra comunidad") },
    { icon: EventPinIcon, title: sectionText("offerBadge3", "title", "Apoyo local"), subtitle: sectionText("offerBadge3", "description", "Crecemos juntos") },
    { icon: HeadsetIcon, title: sectionText("offerBadge4", "title", "Hecho en Yopal"), subtitle: sectionText("offerBadge4", "description", "Para Yopal y Casanare") },
  ];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {showcaseCategories.map((category) => (
          <CategoryCard key={category.key} category={category.key} label={getCategoryLabel(category.key, category.label)} prestadores={listPrestadoresByCategory(category.key)} />
        ))}
        <Link
          href="/registro"
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-brand-500/40 bg-forest-950 p-6 text-center transition hover:border-brand-400 hover:bg-forest-900"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-500/40 text-2xl font-bold leading-none text-brand-400">
            +
          </span>
          <p className="btn-brand-font text-sm font-semibold text-slate-100">Registra tu negocio</p>
          <p className="text-xs text-slate-500">Súmate a la plataforma y haz crecer tu negocio en Yopal.</p>
          <span className="btn-brand-font btn-gradient mt-1 rounded-full px-3 py-1.5 text-xs font-semibold text-forest-950">Registrar ahora</span>
        </Link>
      </div>

      <div className="mt-8 grid gap-4 rounded-2xl border border-forest-700 bg-forest-950 p-6 sm:grid-cols-2 lg:grid-cols-4">
        {trustBadges.map((badge) => (
          <div key={badge.title} className="flex flex-col items-center gap-2 text-center">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
              <badge.icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-100">{badge.title}</p>
              <p className="text-xs text-slate-500">{badge.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
