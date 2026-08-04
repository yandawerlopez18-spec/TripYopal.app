"use client";

import Link from "next/link";
import { useState } from "react";
import { useDataHydration } from "../../context/DataHydrationContext";
import { featuredRoutes } from "../../services/content";
import { sectionText } from "../../services/siteContent";
import { getRouteStyle } from "../../utils/routeCategoryStyles";
import { BookmarkIcon, ClockIcon, EventPinIcon, HeartIcon, MapIcon, ShieldIcon } from "../home/infoIcons";

const gradients = [
  "linear-gradient(135deg,#f59e0b,#166534)",
  "linear-gradient(135deg,#0ea5e9,#166534)",
  "linear-gradient(135deg,#22c55e,#0f2a1d)",
  "linear-gradient(135deg,#fb7185,#065f46)",
];

const VISIBLE_ROUTES = 3;

export default function RouteGuide() {
  useDataHydration();
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(featuredRoutes.length / VISIBLE_ROUTES));
  const currentPage = Math.min(page, totalPages - 1);
  const visibleRoutes = featuredRoutes.slice(currentPage * VISIBLE_ROUTES, currentPage * VISIBLE_ROUTES + VISIBLE_ROUTES);

  const trustBadges = [
    { icon: ShieldIcon, title: sectionText("routesBadge1", "title", "Rutas verificadas"), subtitle: sectionText("routesBadge1", "description", "Información confiable y actualizada") },
    { icon: HeartIcon, title: sectionText("routesBadge2", "title", "Experiencias auténticas"), subtitle: sectionText("routesBadge2", "description", "Recomendadas por locales") },
    { icon: EventPinIcon, title: sectionText("routesBadge3", "title", "Turismo responsable"), subtitle: sectionText("routesBadge3", "description", "Cuida y respeta nuestro territorio") },
  ];

  return (
    <div>
      <div className="flex items-center justify-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
          <MapIcon className="h-5 w-5" />
        </span>
        <h3 className="font-[family-name:var(--font-brand)] text-xl font-bold text-slate-100">{sectionText("routesGuide", "title", "Guía de rutas recomendadas")}</h3>
      </div>
      <p className="mt-2 text-center text-sm text-slate-400">
        {sectionText("routesGuide", "subtitle", "Planifica tu visita según el tiempo, el presupuesto y el tipo de experiencia que buscas.")}
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {visibleRoutes.map((route, index) => {
          const style = getRouteStyle(route.id);
          return (
            <div key={route.id} className="flex h-full flex-col overflow-hidden rounded-2xl border border-forest-700 bg-forest-950">
              <div className="relative">
                {route.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={route.imageUrl} alt={route.name} className="h-40 w-full object-cover" />
                ) : (
                  <div className="h-40 w-full" style={{ background: gradients[index % gradients.length] }} />
                )}
                <span className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${style.badgeClass}`}>
                  <style.icon className="h-3 w-3 text-brand-400" /> {style.category}
                </span>
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur">
                  <BookmarkIcon />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2.5">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.iconBgClass}`}>
                    <style.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-slate-100">{route.name}</h4>
                    <p className="truncate text-xs text-slate-500">{style.tagline}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-medium">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 ${style.pillClass}`}>
                    <ClockIcon className="h-3.5 w-3.5" /> Duración: {route.duration}
                  </span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 ${style.pillClass}`}>
                    Presupuesto: {route.budget}
                  </span>
                </div>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{route.description}</p>

                <Link
                  href="/rutas"
                  className={`mt-auto pt-4 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${style.buttonClass}`}
                >
                  Ver detalles →
                </Link>
              </div>
            </div>
          );
        })}
        {visibleRoutes.length === 0 ? (
          <p className="text-center text-sm text-slate-500 md:col-span-3">Aún no hay rutas cargadas.</p>
        ) : null}
      </div>

      {totalPages > 1 ? (
        <div className="mt-5 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i).map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`Ver rutas ${i + 1}`}
              aria-current={currentPage === i}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition ${
                currentPage === i
                  ? "bg-brand-500 text-forest-950"
                  : "border border-forest-700 text-slate-300 hover:bg-forest-800"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 rounded-2xl border border-forest-700 bg-forest-900 p-6 sm:grid-cols-3">
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
