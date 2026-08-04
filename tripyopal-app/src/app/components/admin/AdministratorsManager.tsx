"use client";

import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { RESOURCE_CAPABILITY_PRESETS, deleteUser, getAdminCategoryKey, getUserPassword, listAdmins, updateUser } from "../../services/permissions";
import type { AppUser } from "../../types/roles";
import { adminCategoryLabels, adminCategoryOptions } from "../../utils/adminCategories";

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";

const categoryFilters = [{ value: "todas", label: "Todas las categorías" }, ...adminCategoryOptions];

export default function AdministratorsManager() {
  const { email: currentEmail } = useAuth();
  const [, setRefreshKey] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", password: "" });
  const [capabilities, setCapabilities] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("todas");
  const editingIdRef = useRef<string | null>(null);

  const admins = listAdmins();
  const filteredAdmins = categoryFilter === "todas" ? admins : admins.filter((admin) => getAdminCategoryKey(admin) === categoryFilter);
  const refresh = () => setRefreshKey((key) => key + 1);

  const startEdit = async (admin: AppUser) => {
    editingIdRef.current = admin.id;
    setEditingId(admin.id);
    setEditForm({ name: admin.name, email: admin.email, password: "" });
    setCapabilities(admin.scope?.capabilities ?? []);
    setShowPassword(false);
    setMessage("");

    const password = await getUserPassword(admin.id);
    if (editingIdRef.current === admin.id) {
      setEditForm((form) => ({ ...form, password }));
    }
  };

  const toggleCapability = (capability: string) => {
    setCapabilities((current) =>
      current.includes(capability) ? current.filter((item) => item !== capability) : [...current, capability],
    );
  };

  const saveEdit = async (admin: AppUser) => {
    if (!editForm.name || !editForm.email || !editForm.password || !admin.scope) {
      setMessage("Completa nombre, correo y contraseña.");
      return;
    }

    await updateUser(admin.id, {
      name: editForm.name,
      email: editForm.email,
      password: editForm.password,
      scope: { ...admin.scope, capabilities },
    });

    setEditingId(null);
    setMessage("Administrador actualizado.");
    refresh();
  };

  const handleDelete = async (admin: AppUser) => {
    if (admin.email === currentEmail) {
      setMessage("No puedes eliminar tu propia cuenta mientras tienes la sesión iniciada.");
      return;
    }

    if (!window.confirm(`¿Eliminar a "${admin.name}"? Perderá el acceso a "${admin.scope?.resourceName}".`)) {
      return;
    }

    await deleteUser(admin.id);
    refresh();
  };

  return (
    <div className="rounded-2xl border border-forest-700 bg-forest-950 p-5">
      <h3 className="font-semibold text-slate-100">
        Administradores <span className="text-slate-400">({filteredAdmins.length} de {admins.length})</span>
      </h3>
      <p className="mt-1 text-sm text-slate-400">
        Cuentas de administrador limitadas a un negocio, lugar, evento o ruta específico.
      </p>

      <label className="mt-4 block text-sm font-medium text-slate-300">
        Filtrar por categoría
        <select
          className={`${inputClass} mt-2 w-full max-w-sm`}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categoryFilters.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {filteredAdmins.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">
          {admins.length === 0 ? "Aún no se han creado administradores." : "Ningún administrador coincide con esta categoría."}
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {filteredAdmins.map((admin) => {
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
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <input
                        className={`${inputClass} flex-1`}
                        placeholder="Contraseña"
                        type={showPassword ? "text" : "password"}
                        spellCheck={false}
                        autoCorrect="off"
                        autoCapitalize="off"
                        value={editForm.password}
                        onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        className="shrink-0 rounded-full border border-forest-700 px-3 py-2 text-xs text-slate-300 transition hover:bg-forest-800"
                      >
                        {showPassword ? "Ocultar" : "Ver"}
                      </button>
                    </div>
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
                      <button type="button" onClick={() => saveEdit(admin)} className="btn-gradient rounded-full px-3 py-1.5 text-xs font-semibold text-forest-950">
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
                          {adminCategoryLabels[getAdminCategoryKey(admin) ?? ""] ?? admin.scope?.resourceType}
                        </span>
                        <button
                          type="button"
                          onClick={() => startEdit(admin)}
                          className="btn-brand-font btn-gradient rounded-full px-3 py-1.5 text-xs font-semibold text-forest-950 transition"
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
