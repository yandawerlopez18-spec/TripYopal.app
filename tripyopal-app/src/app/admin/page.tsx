"use client";

import Link from "next/link";
import { useState } from "react";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import BusinessManager from "../components/admin/BusinessManager";
import PlacesManager from "../components/admin/PlacesManager";
import EventsManager from "../components/admin/EventsManager";
import SiteContentManager from "../components/admin/SiteContentManager";
import { useAuth } from "../context/AuthContext";
import { RESOURCE_CAPABILITY_PRESETS, createScopedAdmin } from "../services/permissions";
import type { ResourceType } from "../types/roles";

const otherResourceLabels: Record<Exclude<ResourceType, "prestador">, string> = {
  lugar: "Lugar turístico",
  evento: "Evento",
  ruta: "Ruta",
};

function AssignOtherResourceAdmin() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    resourceType: "lugar" as Exclude<ResourceType, "prestador">,
    resourceName: "",
  });
  const [capabilities, setCapabilities] = useState<string[]>(RESOURCE_CAPABILITY_PRESETS.lugar);
  const [message, setMessage] = useState("");

  const handleResourceTypeChange = (resourceType: Exclude<ResourceType, "prestador">) => {
    setForm({ ...form, resourceType });
    setCapabilities(RESOURCE_CAPABILITY_PRESETS[resourceType]);
  };

  const toggleCapability = (capability: string) => {
    setCapabilities((current) =>
      current.includes(capability) ? current.filter((item) => item !== capability) : [...current, capability],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.resourceName) {
      setMessage("Completa nombre, correo, contraseña y el recurso a asignar.");
      return;
    }

    createScopedAdmin({
      name: form.name,
      email: form.email,
      password: form.password,
      resourceType: form.resourceType,
      resourceId: form.resourceName,
      resourceName: form.resourceName,
      capabilities,
    });

    setMessage(`Administrador creado: ${form.name}, limitado a "${form.resourceName}".`);
    setForm({ ...form, name: "", email: "", password: "", resourceName: "" });
  };

  return (
    <div className="rounded-2xl border border-forest-700 bg-forest-950 p-5">
      <h3 className="font-semibold text-slate-100">Asignar administrador a otro recurso</h3>
      <p className="mt-1 text-sm text-slate-400">Para lugares, eventos o rutas puntuales (los negocios se manejan en la pestaña &quot;Negocios&quot;).</p>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
        <input
          className="rounded-2xl border border-forest-700 bg-forest-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500"
          placeholder="Nombre del administrador"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="rounded-2xl border border-forest-700 bg-forest-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500"
          placeholder="Correo"
          type="email"
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="rounded-2xl border border-forest-700 bg-forest-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500"
          placeholder="Contraseña"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select
          className="rounded-2xl border border-forest-700 bg-forest-900 px-4 py-3 text-sm text-slate-100"
          value={form.resourceType}
          onChange={(e) => handleResourceTypeChange(e.target.value as Exclude<ResourceType, "prestador">)}
        >
          {Object.entries(otherResourceLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <input
          className="rounded-2xl border border-forest-700 bg-forest-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 sm:col-span-2"
          placeholder={`Nombre de ${otherResourceLabels[form.resourceType].toLowerCase()}`}
          value={form.resourceName}
          onChange={(e) => setForm({ ...form, resourceName: e.target.value })}
        />
        <div className="sm:col-span-2">
          <p className="mb-2 text-sm font-medium text-slate-300">Capacidades permitidas</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {RESOURCE_CAPABILITY_PRESETS[form.resourceType].map((capability) => (
              <label key={capability} className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" checked={capabilities.includes(capability)} onChange={() => toggleCapability(capability)} />
                {capability}
              </label>
            ))}
          </div>
        </div>
        <button className="rounded-full bg-brand-500 px-4 py-3 text-sm font-semibold text-forest-950 transition hover:bg-brand-400 sm:col-span-2">
          Crear administrador
        </button>
      </form>
      {message ? <p className="mt-4 text-sm text-brand-400">{message}</p> : null}
    </div>
  );
}

const tabs = [
  { key: "resumen", label: "Resumen" },
  { key: "negocios", label: "Negocios" },
  { key: "lugares", label: "Lugares destacados" },
  { key: "eventos", label: "Eventos" },
  { key: "contenido", label: "Contenido del sitio" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

function SuperadminPanel() {
  const [tab, setTab] = useState<TabKey>("resumen");

  return (
    <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6 shadow-xl lg:p-8">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-brand)] text-3xl font-bold text-white">Panel administrativo</h1>
        <p className="mt-2 text-slate-400">Como superadministrador tienes control total: ver, modificar, agregar y eliminar el contenido de la plataforma.</p>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2 border-b border-forest-700 pb-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`btn-brand-font rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === t.key ? "bg-brand-500 text-forest-950" : "border border-forest-700 text-slate-300 hover:bg-forest-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "resumen" ? <AdminDashboard onNavigate={setTab} /> : null}
        {tab === "negocios" ? (
          <div className="space-y-6">
            <BusinessManager />
            <AssignOtherResourceAdmin />
          </div>
        ) : null}
        {tab === "lugares" ? <PlacesManager /> : null}
        {tab === "eventos" ? <EventsManager /> : null}
        {tab === "contenido" ? <SiteContentManager /> : null}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { permissions } = useAuth();

  if (!permissions || permissions.role === "turista" || permissions.role === "prestador" || permissions.role === "multiusuario" || permissions.role === "agente-viajes") {
    return (
      <main className="min-h-screen bg-forest-950 px-6 py-24 text-center text-slate-100 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-forest-700 bg-forest-900 p-10 shadow-xl">
          <h1 className="font-[family-name:var(--font-brand)] text-2xl font-bold text-white">Acceso restringido</h1>
          <p className="mt-3 text-slate-400">Esta sección es solo para administradores de la plataforma o de un negocio.</p>
          <Link href="/login" className="btn-brand-font mt-6 inline-block rounded-full bg-brand-500 px-6 py-3 font-semibold text-forest-950 transition hover:bg-brand-400">
            Iniciar sesión
          </Link>
        </div>
      </main>
    );
  }

  if (permissions.role === "admin" && permissions.scope) {
    return (
      <main className="min-h-screen bg-forest-950 px-6 py-16 text-slate-100 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-xl">
          <h1 className="font-[family-name:var(--font-brand)] text-3xl font-bold text-white">Panel de {permissions.scope.resourceName}</h1>
          <p className="mt-2 text-slate-400">
            Tu acceso está limitado a este recurso. No puedes ver ni modificar el resto de la plataforma.
          </p>
          <div className="mt-8 rounded-2xl border border-forest-700 bg-forest-950 p-6">
            <h2 className="text-lg font-semibold text-slate-100">Capacidades concedidas</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {permissions.capabilities.map((capability) => (
                <li key={capability} className="rounded-xl bg-forest-900 p-3 text-sm text-slate-300">
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-forest-950 px-6 py-16 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SuperadminPanel />
      </div>
    </main>
  );
}
