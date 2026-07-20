"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { RESOURCE_CAPABILITY_PRESETS, deleteUser, listAdmins, updateUser } from "../../services/permissions";
import type { AppUser } from "../../types/roles";

const resourceTypeLabels: Record<string, string> = {
  prestador: "Negocio",
  lugar: "Lugar turístico",
  evento: "Evento",
  ruta: "Ruta",
};

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";

export default function AdministratorsManager() {
  const { email: currentEmail } = useAuth();
  const [, setRefreshKey] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const [capabilities, setCapabilities] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const admins = listAdmins();
  const refresh = () => setRefreshKey((key) => key + 1);

  const startEdit = (admin: AppUser) => {
    setEditingId(admin.id);
    setEditForm({ name: admin.name, email: admin.email });
    setCapabilities(admin.scope?.capabilities ?? []);
    setMessage("");
  };

  const toggleCapability = (capability: string) => {
    setCapabilities((current) =>
      current.includes(capability) ? current.filter((item) => item !== capability) : [...current, capability],
    );
  };

  const saveEdit = (admin: AppUser) => {
    if (!editForm.name || !editForm.email || !admin.scope) {
      setMessage("Completa nombre y correo.");
      return;
    }

    updateUser(admin.id, {
      name: editForm.name,
      email: editForm.email,
      scope: { ...admin.scope, capabilities },
    });

    setEditingId(null);
    setMessage("Administrador actualizado.");
    refresh();
  };

  const handleDelete = (admin: AppUser) => {
    if (admin.email === currentEmail) {
      setMessage("No puedes eliminar tu propia cuenta mientras tienes la sesión iniciada.");
      return;
    }

    if (!window.confirm(`¿Eliminar a "${admin.name}"? Perderá el acceso a "${admin.scope?.resourceName}".`)) {
      return;
    }

    deleteUser(admin.id);
    refresh();
  };

  return (
    <div className="rounded-2xl border border-forest-700 bg-forest-950 p-5">
      <h3 className="font-semibold text-slate-100">
        Administradores <span className="text-slate-400">({admins.length})</span>
      </h3>
      <p className="mt-1 text-sm text-slate-400">
        Cuentas de administrador limitadas a un negocio, lugar, evento o ruta específico.
      </p>

      {admins.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">Aún no se han creado administradores.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {admins.map((admin) => {
            const isSelf = admin.email === currentEmail;
            const resourceCapabilities = admin.scope ? RESOURCE_CAPABILITY_PRESETS[admin.scope.resourceType] : [];

            return (
              <li key={admin.id} className="rounded-xl border border-forest-700 bg-forest-900 p-3">
                {editingId === admin.id ? (
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input className={inputClass} placeholder="Nombre" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                    <input
                      className={inputClass}
                      placeholder="Correo"
                      type="email"
                      spellCheck={false}
                      autoCorrect="off"
                      autoCapitalize="off"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    />
                    <div className="sm:col-span-2">
                      <p className="mb-2 text-xs font-medium text-slate-300">
                        Capacidades sobre &quot;{admin.scope?.resourceName}&quot;
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {resourceCapabilities.map((capability) => (
                          <label key={capability} className="flex items-center gap-2 text-sm text-slate-300">
                            <input type="checkbox" checked={capabilities.includes(capability)} onChange={() => toggleCapability(capability)} />
                            {capability}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 sm:col-span-2">
                      <button type="button" onClick={() => saveEdit(admin)} className="rounded-full bg-brand-500 px-3 py-1.5 text-xs font-semibold text-forest-950">
                        Guardar
                      </button>
                      <button type="button" onClick={() => setEditingId(null)} className="rounded-full border border-forest-700 px-3 py-1.5 text-xs text-slate-300">
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-100">
                          {admin.name}
                          {isSelf ? <span className="ml-2 text-xs font-normal text-brand-400">(tú)</span> : null}
                        </p>
                        <p className="truncate text-xs text-slate-400">{admin.email}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-400">
                          {resourceTypeLabels[admin.scope?.resourceType ?? ""] ?? admin.scope?.resourceType}
                        </span>
                        <button
                          type="button"
                          onClick={() => startEdit(admin)}
                          className="btn-brand-font rounded-full bg-brand-500 px-3 py-1.5 text-xs font-semibold text-forest-950 transition hover:bg-brand-400"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(admin)}
                          disabled={isSelf}
                          className="rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">Recurso asignado: {admin.scope?.resourceName}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {admin.scope?.capabilities.map((capability) => (
                        <span key={capability} className="rounded-full bg-forest-950 px-2 py-1 text-[10px] text-slate-400">
                          {capability}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {message ? <p className="mt-4 text-sm text-brand-400">{message}</p> : null}
    </div>
  );
}
