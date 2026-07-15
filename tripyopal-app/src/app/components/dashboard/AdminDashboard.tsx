"use client";

const summary = [
  { label: "Usuarios activos", value: "1.240" },
  { label: "Eventos publicados", value: "18" },
  { label: "Lugares destacados", value: "76" },
  { label: "Rutas creadas", value: "92" },
];

const alerts = [
  "3 nuevos eventos pendientes por aprobar",
  "2 lugares requieren actualización de información",
  "1 ruta necesita revisión de seguridad",
];

const actions = ["Publicar eventos", "Actualizar contenido", "Revisar rutas"];

export default function AdminDashboard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">Dashboard administrativo</h3>
      <p className="mt-2 text-sm text-slate-600">Vista de métricas clave para monitorear el crecimiento de la plataforma.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h4 className="font-semibold text-slate-900">Alertas prioritarias</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {alerts.map((alert) => (
              <li key={alert} className="rounded-xl bg-white/70 p-2">• {alert}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h4 className="font-semibold text-slate-900">Acciones rápidas</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {actions.map((action) => (
              <button key={action} className="rounded-full bg-slate-900 px-3 py-2 text-sm font-medium text-white">
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
