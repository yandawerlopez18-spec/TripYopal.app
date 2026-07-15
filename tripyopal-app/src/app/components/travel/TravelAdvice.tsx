"use client";

import { useMemo, useState } from "react";

const profiles = [
  {
    id: "economico",
    label: "Presupuesto bajo",
    title: "Ideal para un viaje económico",
    description: "Prioriza parques, miradores, plazas y recorridos culturales que ofrezcan valor sin gastar demasiado.",
  },
  {
    id: "equilibrado",
    label: "Presupuesto medio",
    title: "Ideal para una experiencia equilibrada",
    description: "Combina gastronomía local, actividades guiadas y visitas a lugares emblemáticos con mayor comodidad.",
  },
  {
    id: "premium",
    label: "Presupuesto alto",
    title: "Ideal para una experiencia premium",
    description: "Aprovecha alojamientos cómodos, recorridos completos y experiencias más exclusivas.",
  },
];

export default function TravelAdvice() {
  const [selected, setSelected] = useState("equilibrado");

  const activeProfile = useMemo(() => profiles.find((profile) => profile.id === selected) ?? profiles[1], [selected]);

  return (
    <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Consejos de viaje y seguridad</h3>
          <p className="mt-2 text-sm text-slate-600">Selecciona tu estilo de viaje para recibir una recomendación más útil.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setSelected(profile.id)}
              className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                selected === profile.id
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {profile.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Recomendación actual</p>
        <h4 className="mt-2 text-lg font-semibold text-slate-900">{activeProfile.title}</h4>
        <p className="mt-2 text-sm leading-6 text-slate-600">{activeProfile.description}</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h4 className="font-semibold text-slate-900">Seguridad</h4>
          <p className="mt-2 text-sm leading-6 text-slate-600">Mantén tus pertenencias cerca, evita zonas poco iluminadas por la noche y consulta información actualizada.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h4 className="font-semibold text-slate-900">Salud</h4>
          <p className="mt-2 text-sm leading-6 text-slate-600">Lleva agua, protector solar y revisa el clima antes de salir para planear mejor tu recorrido.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h4 className="font-semibold text-slate-900">Medio ambiente</h4>
          <p className="mt-2 text-sm leading-6 text-slate-600">Respeta las áreas naturales, evita dejar residuos y usa rutas responsables.</p>
        </div>
      </div>
    </div>
  );
}
