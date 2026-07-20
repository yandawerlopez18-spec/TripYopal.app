"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { deleteUser, listUsers, updateUser } from "../../services/permissions";
import type { AppUser, Role } from "../../types/roles";

const roleLabels: Record<string, string> = {
  turista: "Turista",
  prestador: "Prestador de servicios",
  multiusuario: "Multiusuario (empresa)",
  "agente-viajes": "Agente de viajes",
  admin: "Admin (limitado)",
  superadmin: "Superadmin",
};

const assignableRoles: Role[] = ["turista", "prestador", "multiusuario", "agente-viajes", "superadmin"];

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";

const emptyForm = {
  name: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  city: "",
  department: "",
  role: "turista" as Role,
};

export default function UsersManager() {
  const { email: currentEmail } = useAuth();
  const [, setRefreshKey] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  const users = listUsers();
  const refresh = () => setRefreshKey((key) => key + 1);

  const startEdit = (user: AppUser) => {
    setEditingId(user.id);
    setEditForm({
      name: user.name,
      lastName: user.lastName ?? "",
      username: user.username ?? "",
      email: user.email,
      phone: user.phone ?? "",
      city: user.city ?? "",
      department: user.department ?? "",
      role: (user.role === "admin" ? "turista" : user.role) as Role,
    });
    setMessage("");
  };

  const saveEdit = (user: AppUser) => {
    if (!editForm.name || !editForm.email) {
      setMessage("Completa al menos el nombre y el correo.");
      return;
    }

    const isAdmin = user.role === "admin";

    updateUser(user.id, {
      name: editForm.name,
      lastName: editForm.lastName || undefined,
      username: editForm.username || undefined,
      email: editForm.email,
      phone: editForm.phone || undefined,
      city: editForm.city || undefined,
      department: editForm.department || undefined,
      role: isAdmin ? "admin" : editForm.role,
      scope: isAdmin ? user.scope : undefined,
    });

    setEditingId(null);
    setMessage("Usuario actualizado.");
    refresh();
  };

  const handleDelete = (user: AppUser) => {
    if (user.email === currentEmail) {
      setMessage("No puedes eliminar tu propia cuenta mientras tienes la sesión iniciada.");
      return;
    }

    if (!window.confirm(`¿Eliminar a "${user.name}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    deleteUser(user.id);
    refresh();
  };

  return (
    <div className="rounded-2xl border border-forest-700 bg-forest-950 p-5">
      <h3 className="font-semibold text-slate-100">
        Usuarios registrados <span className="text-slate-400">({users.length})</span>
      </h3>
      <p className="mt-1 text-sm text-slate-400">
        Todas las cuentas activas en la plataforma. Puedes editar sus datos, asignarles un rol o eliminarlas.
      </p>

      {users.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">Aún no hay usuarios registrados.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {users.map((user) => {
            const isSelf = user.email === currentEmail;
            const isAdmin = user.role === "admin";

            return (
              <li key={user.id} className="rounded-xl border border-forest-700 bg-forest-900 p-3">
                {editingId === user.id ? (
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input className={inputClass} placeholder="Nombre" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                    <input className={inputClass} placeholder="Apellido" value={editForm.lastName} onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })} />
                    <input className={inputClass} placeholder="Nombre de usuario" value={editForm.username} onChange={(e) => setEditForm({ ...editForm, username: e.target.value })} />
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
                    <input className={inputClass} placeholder="Teléfono" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
                    <input className={inputClass} placeholder="Ciudad" value={editForm.city} onChange={(e) => setEditForm({ ...editForm, city: e.target.value })} />
                    <input className={`${inputClass} sm:col-span-2`} placeholder="Departamento" value={editForm.department} onChange={(e) => setEditForm({ ...editForm, department: e.target.value })} />
                    {isAdmin ? (
                      <p className="rounded-2xl bg-forest-950 px-4 py-3 text-sm text-slate-400 sm:col-span-2">
                        Este usuario es administrador de &quot;{user.scope?.resourceName}&quot;. Para quitarle ese acceso, elimínalo desde aquí o gestiona el negocio/recurso en su propia pestaña.
                      </p>
                    ) : (
                      <select
                        className={`${inputClass} sm:col-span-2`}
                        value={editForm.role}
                        disabled={isSelf}
                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value as Role })}
                      >
                        {assignableRoles.map((role) => (
                          <option key={role} value={role}>
                            {roleLabels[role]}
                          </option>
                        ))}
                      </select>
                    )}
                    <div className="flex gap-2 sm:col-span-2">
                      <button type="button" onClick={() => saveEdit(user)} className="rounded-full bg-brand-500 px-3 py-1.5 text-xs font-semibold text-forest-950">
                        Guardar
                      </button>
                      <button type="button" onClick={() => setEditingId(null)} className="rounded-full border border-forest-700 px-3 py-1.5 text-xs text-slate-300">
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-100">
                        {user.name}
                        {user.lastName ? ` ${user.lastName}` : ""}
                        {isSelf ? <span className="ml-2 text-xs font-normal text-brand-400">(tú)</span> : null}
                      </p>
                      <p className="truncate text-xs text-slate-400">{user.email}</p>
                      {user.username || user.city ? (
                        <p className="truncate text-xs text-slate-500">
                          {[user.username ? `@${user.username}` : null, user.city, user.department, user.phone].filter(Boolean).join(" · ")}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-400">{roleLabels[user.role] ?? user.role}</span>
                      <button
                        type="button"
                        onClick={() => startEdit(user)}
                        className="btn-brand-font rounded-full bg-brand-500 px-3 py-1.5 text-xs font-semibold text-forest-950 transition hover:bg-brand-400"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(user)}
                        disabled={isSelf}
                        className="rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
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
