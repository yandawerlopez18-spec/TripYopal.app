"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BUSINESS_CATEGORIES, CategoryIcon, type IconKey } from "./categoryIcons";
import { listPrestadoresByCategory, type Prestador } from "../../services/prestadores";

const gradients = [
  "linear-gradient(135deg,#f59e0b,#166534)",
  "linear-gradient(135deg,#0ea5e9,#166534)",
  "linear-gradient(135deg,#22c55e,#0f2a1d)",
  "linear-gradient(135deg,#fb7185,#065f46)",
];

function CategoryCard({ category, label, prestadores }: { category: IconKey; label: string; prestadores: Prestador[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prestadores.length < 2) return;

    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % prestadores.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [prestadores.length]);

  if (prestadores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-forest-700 bg-forest-950 p-6 text-center">
        <span className="flex h-50 w-50 items-center justify-center text-forest-600">
          <CategoryIcon icon={category} />
        </span>
        <p className="text-sm font-semibold text-slate-300">{label}</p>
        <p className="text-xs text-slate-500">Aún no hay negocios registrados en esta categoría.</p>
        <Link href="/registro" className="text-xs font-semibold text-brand-400 hover:text-brand-300">
          Registrar negocio →
        </Link>
      </div>
    );
  }

  const active = prestadores[index];

  return (
    <Link href={`/categorias/${category}`} className="block overflow-hidden rounded-2xl border border-forest-700 bg-forest-950 transition hover:border-brand-400">
      {active.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={active.imageUrl} alt={active.name} className="h-65 w-full object-cover transition-all duration-500" />
      ) : (
        <div
          className="flex h-65 items-end p-3 transition-all duration-500"
          style={{ background: gradients[index % gradients.length] }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur">
            <CategoryIcon icon={category} />
          </span>
        </div>
      )}
      <div className="p-3">
        <p className="truncate text-sm font-semibold text-slate-100">{active.name}</p>
        <p className="mt-0.5 text-xs text-slate-400">
          {label} · {prestadores.length} {prestadores.length === 1 ? "negocio registrado" : "negocios registrados"}
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

export default function CategoryShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {BUSINESS_CATEGORIES.map((category) => (
        <CategoryCard
          key={category.key}
          category={category.key}
          label={category.label}
          prestadores={listPrestadoresByCategory(category.key)}
        />
      ))}
      <Link
        href="/registro"
        className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-brand-500/40 bg-forest-950 p-6 text-center transition hover:border-brand-400 hover:bg-forest-900"
      >
        <span className="flex h-50 w-50 items-center justify-center rounded-full border border-brand-500/40 text-2xl font-bold leading-none text-brand-400">
          +
        </span>
        <p className="btn-brand-font text-sm font-semibold text-slate-100">Registra tu negocio</p>
        <p className="text-xs text-slate-500">Súmate a la plataforma</p>
      </Link>
    </div>
  );
}
