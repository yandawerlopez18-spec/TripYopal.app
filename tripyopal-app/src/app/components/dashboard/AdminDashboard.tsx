"use client";

import { featuredEvents, featuredPlaces, featuredRoutes } from "../../services/content";
import { listAdmins, listUsers } from "../../services/permissions";
import { listPrestadores } from "../../services/prestadores";
import {
  BackpackIcon,
  BellIcon,
  BoltIcon,
  BuildingIcon,
  CalendarIcon,
  ChevronRightIcon,
  CompassIcon,
  CrownIcon,
  EventPinIcon,
  GearIcon,
  LockIcon,
  PackageIcon,
  PoliceBadgeIcon,
  RefreshIcon,
  ShieldIcon,
  StarIcon,
  UsersIcon,
} from "../home/infoIcons";

type ModuleKey = "negocios" | "lugares" | "eventos" | "rutas" | "contenido" | "administradores" | "usuarios";
type ColorKey = "emerald" | "amber" | "sky" | "violet" | "rose" | "teal";

const COLOR_STYLES: Record<ColorKey, string> = {
  emerald: "bg-emerald-500/10 text-emerald-400",
  amber: "bg-amber-500/10 text-amber-400",
  sky: "bg-sky-500/10 text-sky-400",
  violet: "bg-violet-500/10 text-violet-400",
  rose: "bg-rose-500/10 text-rose-400",
  teal: "bg-teal-500/10 text-teal-400",
};

const alerts = [
  { icon: CalendarIcon, color: "amber" as ColorKey, title: "3 nuevos eventos pendientes por aprobar", subtitle: "Requieren tu revisión" },
  { icon: EventPinIcon, color: "sky" as ColorKey, title: "2 lugares requieren actualización de información", subtitle: "Información desactualizada" },
  { icon: ShieldIcon, color: "rose" as ColorKey, title: "1 ruta necesita revisión de seguridad", subtitle: "Revisión requerida" },
];

const modules: { key: ModuleKey; label: string; description: string; icon: typeof BuildingIcon; color: ColorKey }[] = [
  { key: "negocios", label: "Negocios", description: "Ver, agregar, editar o eliminar negocios por categoría", icon: BuildingIcon, color: "emerald" },
  { key: "lugares", label: "Lugares destacados", description: "Gestionar recomendaciones para turistas", icon: StarIcon, color: "amber" },
  { key: "eventos", label: "Eventos", description: "Gestionar eventos en tiempo real", icon: CalendarIcon, color: "sky" },
  { key: "rutas", label: "Rutas", description: "Gestionar rutas recomendadas", icon: RefreshIcon, color: "violet" },
  { key: "contenido", label: "Contenido del sitio", description: "Seguridad, emergencias, clima, oferta y contacto", icon: ShieldIcon, color: "teal" },
  { key: "administradores", label: "Administradores", description: "Ver todos los administradores y sus permisos", icon: PoliceBadgeIcon, color: "rose" },
  { key: "usuarios", label: "Usuarios", description: "Ver todos los usuarios activos o registrados", icon: UsersIcon, color: "emerald" },
];

const userRoles: { name: string; description: string; icon: typeof BuildingIcon; color: ColorKey; level: string }[] = [
  { name: "Turista", description: "Explora, reserva, guarda favoritos y usa el chatbot.", icon: BackpackIcon, color: "emerald", level: "Permisos básicos" },
  { name: "Prestador de servicios", description: "Publica y gestiona sus propios servicios y reservas.", icon: PackageIcon, color: "sky", level: "Permisos intermedios" },
  { name: "Multiusuario (Empresa)", description: "Gestiona sucursales, empleados y varios servicios.", icon: BuildingIcon, color: "violet", level: "Permisos avanzados" },
  { name: "Agente de viajes", description: "Crea paquetes, rutas y gestiona clientes.", icon: CompassIcon, color: "amber", level: "Permisos intermedios" },
  { name: "Admin (limitado)", description: "Gestiona solo el recurso que el superadmin le asignó.", icon: LockIcon, color: "rose", level: "Permisos limitados" },
  { name: "Superadmin", description: "Control total de la plataforma y puede crear administradores.", icon: CrownIcon, color: "emerald", level: "Acceso total" },
];

export default function AdminDashboard({ onNavigate }: { onNavigate: (module: ModuleKey) => void }) {
  const stats: { label: string; value: number; icon: typeof BuildingIcon; color: ColorKey }[] = [
    { label: "Negocios registrados", value: listPrestadores().length, icon: BuildingIcon, color: "sky" },
    { label: "Lugares destacados", value: featuredPlaces.length, icon: StarIcon, color: "amber" },
    { label: "Eventos activos", value: featuredEvents.length, icon: CalendarIcon, color: "sky" },
    { label: "Rutas publicadas", value: featuredRoutes.length, icon: RefreshIcon, color: "violet" },
    { label: "Administradores", value: listAdmins().length, icon: PoliceBadgeIcon, color: "rose" },
    { label: "Usuarios registrados", value: listUsers().length, icon: UsersIcon, color: "emerald" },
  ];

  return (
    <div className="rounded-2xl border border-forest-700 bg-forest-950 p-6">
      <h3 className="font-[family-name:var(--font-brand)] text-xl font-semibold text-white">Dashboard administrativo</h3>
      <p className="mt-2 text-sm text-slate-400">Vista de métricas clave para monitorear el crecimiento de la plataforma y sus permisos.</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-forest-700 bg-forest-900 p-4">
            <span className={`flex h-9 w-9 items-center justify-center rounded-full ${COLOR_STYLES[stat.color]}`}>
              <stat.icon className="h-4 w-4" />
            </span>
            <p className="mt-3 text-2xl font-bold text-slate-100">{stat.value.toLocaleString("es-CO")}</p>
            <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
          <h4 className="flex items-center gap-2 font-semibold text-amber-300">
            <BellIcon className="h-4 w-4" /> Alertas prioritarias
          </h4>
          <ul className="mt-3 space-y-2">
            {alerts.map((alert) => (
              <li key={alert.title} className="flex items-center gap-3 rounded-xl bg-forest-900/70 p-3">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${COLOR_STYLES[alert.color]}`}>
                  <alert.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-200">{alert.title}</p>
                  <p className="text-xs text-slate-500">{alert.subtitle}</p>
                </div>
                <ChevronRightIcon className="h-4 w-4 shrink-0 text-slate-500" />
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-forest-700 py-2 text-sm font-semibold text-slate-300 transition hover:bg-forest-800"
          >
            Ver todas las alertas <ChevronRightIcon className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="rounded-2xl border border-forest-700 bg-forest-900 p-5">
          <h4 className="flex items-center gap-2 font-semibold text-slate-100">
            <BoltIcon className="h-4 w-4 text-violet-400" /> Accesos rápidos
          </h4>
          <div className="mt-3 grid gap-2">
            {modules.map((module) => (
              <button
                key={module.key}
                onClick={() => onNavigate(module.key)}
                className="flex items-center gap-3 rounded-xl border border-forest-700 bg-forest-950 p-3 text-left transition hover:border-brand-400 hover:bg-forest-800"
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${COLOR_STYLES[module.color]}`}>
                  <module.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-100">{module.label}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{module.description}</p>
                </div>
                <ChevronRightIcon className="h-4 w-4 shrink-0 text-slate-500" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-900 p-5">
        <h4 className="flex items-center gap-2 font-semibold text-slate-100">
          <ShieldIcon className="h-4 w-4 text-brand-400" /> Modelo de permisos
        </h4>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {userRoles.map((role) => (
            <div key={role.name} className="rounded-2xl border border-forest-700 bg-forest-950 p-4">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${COLOR_STYLES[role.color]}`}>
                <role.icon className="h-4 w-4" />
              </span>
              <p className="mt-3 font-semibold text-slate-100">{role.name}</p>
              <p className="mt-1 text-sm text-slate-400">{role.description}</p>
              <span className={`mt-3 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${COLOR_STYLES[role.color]}`}>{role.level}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-forest-700 bg-forest-900 p-5 sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <LockIcon className="h-4 w-4" />
          </span>
          <div>
            <p className="font-semibold text-slate-100">
              Tú tienes <span className="text-brand-400">el control total</span>
            </p>
            <p className="text-sm text-slate-400">Administra cada sección de la plataforma y asegura una experiencia única para los usuarios.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigate("negocios")}
          className="btn-gradient inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-forest-950 transition"
        >
          Gestionar plataforma <GearIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
