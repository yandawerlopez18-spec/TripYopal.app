"use client";

const routes = [
  {
    name: "Ruta de un día",
    duration: "3-4 horas",
    budget: "Bajo",
    description: "Parques, gastronomía local y miradores para disfrutar sin complicaciones.",
  },
  {
    name: "Ruta cultural",
    duration: "4-6 horas",
    budget: "Medio",
    description: "Historia, plazas y experiencias auténticas del territorio.",
  },
  {
    name: "Ruta de aventura",
    duration: "6+ horas",
    budget: "Alto",
    description: "Naturaleza, recorridos largos y actividades al aire libre.",
  },
];

export default function RouteGuide() {
  return (
    <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">Guía de rutas recomendadas</h3>
      <p className="mt-2 text-sm text-slate-600">Planifica tu visita según el tiempo, el presupuesto y el tipo de experiencia que buscas.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {routes.map((route) => (
          <div key={route.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="font-semibold text-slate-900">{route.name}</h4>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
              <span className="rounded-full bg-white px-2.5 py-1">Duración: {route.duration}</span>
              <span className="rounded-full bg-white px-2.5 py-1">Presupuesto: {route.budget}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{route.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
