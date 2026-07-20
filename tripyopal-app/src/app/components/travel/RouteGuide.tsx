"use client";

import { featuredRoutes } from "../../services/content";

const gradients = [
  "linear-gradient(135deg,#f59e0b,#166534)",
  "linear-gradient(135deg,#0ea5e9,#166534)",
  "linear-gradient(135deg,#22c55e,#0f2a1d)",
  "linear-gradient(135deg,#fb7185,#065f46)",
];

export default function RouteGuide() {
  return (
    <div>
      <h3 className="text-center font-[family-name:var(--font-brand)] text-xl font-semibold text-slate-100">Guía de rutas recomendadas</h3>
      <p className="mt-2 text-center text-sm text-slate-400">Planifica tu visita según el tiempo, el presupuesto y el tipo de experiencia que buscas.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {featuredRoutes.map((route, index) => (
          <div key={route.id} className="overflow-hidden rounded-2xl border border-forest-700 bg-forest-950">
            {route.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={route.imageUrl} alt={route.name} className="h-40 w-full object-cover" />
            ) : (
              <div className="h-40 w-full" style={{ background: gradients[index % gradients.length] }} />
            )}
            <div className="p-4">
              <h4 className="font-semibold text-slate-100">{route.name}</h4>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-slate-300">
                <span className="rounded-full bg-forest-900 px-2.5 py-1">Duración: {route.duration}</span>
                <span className="rounded-full bg-forest-900 px-2.5 py-1">Presupuesto: {route.budget}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">{route.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
