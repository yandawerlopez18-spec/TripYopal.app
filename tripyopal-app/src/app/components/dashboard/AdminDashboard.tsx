"use client";

const alerts = [
  "3 nuevos eventos pendientes por aprobar",
  "2 lugares requieren actualización de información",
  "1 ruta necesita revisión de seguridad",
];

type ModuleKey = "negocios" | "lugares" | "eventos" | "contenido";

const modules: { key: ModuleKey; label: string; description: string }[] = [
  { key: "negocios", label: "Negocios", description: "Ver, agregar, editar o eliminar negocios por categoría" },
  { key: "lugares", label: "Lugares destacados", description: "Gestionar Recomendaciones para ti" },
  { key: "eventos", label: "Eventos", description: "Gestionar Eventos en tiempo real" },
  { key: "contenido", label: "Contenido del sitio", description: "Seguridad, emergencias, clima, oferta y contacto" },
];

const userRoles = [
  { name: "Turista", description: "Explora, reserva, guarda favoritos y usa el chatbot" },
  { name: "Prestador de servicios", description: "Publica y gestiona sus propios servicios y reservas" },
  { name: "Multiusuario (Empresa)", description: "Gestiona sucursales, empleados y varios servicios" },
  { name: "Agente de viajes", description: "Crea paquetes, rutas y gestiona clientes" },
  { name: "Admin (limitado)", description: "Gestiona solo el recurso que el superadmin le asignó" },
  { name: "Superadmin", description: "Control total de la plataforma y puede crear administradores" },
];

export default function AdminDashboard({ onNavigate }: { onNavigate: (module: ModuleKey) => void }) {
  return (
    <div className="rounded-2xl border border-forest-700 bg-forest-950 p-6">
      <h3 className="font-[family-name:var(--font-brand)] text-xl font-semibold text-white">Dashboard administrativo</h3>
      <p className="mt-2 text-sm text-slate-400">Vista de métricas clave para monitorear el crecimiento de la plataforma y sus permisos.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
          <h4 className="font-semibold text-amber-300">Alertas prioritarias</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {alerts.map((alert) => (
              <li key={alert} className="rounded-xl bg-forest-900/70 p-2">• {alert}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-forest-700 bg-forest-900 p-5">
          <h4 className="font-semibold text-slate-100">Accesos rápidos</h4>
          <div className="mt-3 grid gap-2">
            {modules.map((module) => (
              <button
                key={module.key}
                onClick={() => onNavigate(module.key)}
                className="rounded-xl border border-forest-700 bg-forest-950 p-3 text-left transition hover:border-brand-400 hover:bg-forest-800"
              >
                <p className="text-sm font-semibold text-slate-100">{module.label}</p>
                <p className="mt-0.5 text-xs text-slate-400">{module.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-forest-700 bg-forest-900 p-5">
        <h4 className="font-semibold text-slate-100">Modelo de permisos</h4>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {userRoles.map((role) => (
            <div key={role.name} className="rounded-2xl border border-forest-700 bg-forest-950 p-4">
              <p className="font-semibold text-slate-100">{role.name}</p>
              <p className="mt-2 text-sm text-slate-400">{role.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
