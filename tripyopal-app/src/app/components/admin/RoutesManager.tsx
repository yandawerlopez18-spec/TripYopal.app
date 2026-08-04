"use client";

import { useState } from "react";
import { addRoute, deleteRoute, featuredRoutes, updateRoute } from "../../services/content";
import type { RouteItem } from "../../types";
import ImageUploadField from "./ImageUploadField";

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";

const emptyForm = { name: "", duration: "", budget: "", description: "", imageUrl: "" };

export default function RoutesManager() {
  const [, setRefreshKey] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  const refresh = () => setRefreshKey((key) => key + 1);

  const startEdit = (route: RouteItem) => {
    setEditingId(route.id);
    setEditForm({
      name: route.name,
      duration: route.duration,
      budget: route.budget,
      description: route.description,
      imageUrl: route.imageUrl ?? "",
    });
  };

  const saveEdit = async (id: string) => {
    if (!editForm.name || !editForm.duration || !editForm.budget || !editForm.description) {
      setMessage("Completa nombre, duración, presupuesto y descripción.");
      return;
    }

    await updateRoute(id, {
      name: editForm.name,
      duration: editForm.duration,
      budget: editForm.budget,
      description: editForm.description,
      imageUrl: editForm.imageUrl,
    });
    setEditingId(null);
    setMessage("");
    refresh();
  };

  const handleDelete = async (route: RouteItem) => {
    if (!window.confirm(`¿Eliminar "${route.name}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    await deleteRoute(route.id);
    refresh();
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!addForm.name || !addForm.duration || !addForm.budget || !addForm.description) {
      setMessage("Completa nombre, duración, presupuesto y descripción.");
      return;
    }

    await addRoute({
      name: addForm.name,
      duration: addForm.duration,
      budget: addForm.budget,
      description: addForm.description,
      imageUrl: addForm.imageUrl || undefined,
    });

    setMessage(`"${addForm.name}" se agregó a Rutas recomendadas.`);
    setAddForm(emptyForm);
    setShowAddForm(false);
    refresh();
  };

  return (
    <div className="rounded-2xl border border-forest-700 bg-forest-950 p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold text-slate-100">
          Rutas recomendadas <span className="text-slate-400">({featuredRoutes.length})</span>
        </h3>
        <button
          type="button"
          onClick={() => setShowAddForm((value) => !value)}
          className="btn-brand-font btn-gradient rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          {showAddForm ? "Cancelar" : "Agregar ruta"}
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {featuredRoutes.map((route) => (
          <li key={route.id} className="rounded-xl border border-forest-700 bg-forest-900 p-3">
            {editingId === route.id ? (
              <div className="grid gap-2 sm:grid-cols-2">
                <input className={inputClass} placeholder="Nombre" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                <input className={inputClass} placeholder="Duración" value={editForm.duration} onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })} />
                <input className={inputClass} placeholder="Presupuesto (Bajo/Medio/Alto)" value={editForm.budget} onChange={(e) => setEditForm({ ...editForm, budget: e.target.value })} />
                <ImageUploadField className="sm:col-span-2" compact value={editForm.imageUrl} onChange={(value) => setEditForm({ ...editForm, imageUrl: value })} />
                <textarea className={`${inputClass} sm:col-span-2`} placeholder="Descripción" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                <div className="flex gap-2 sm:col-span-2">
                  <button type="button" onClick={() => saveEdit(route.id)} className="btn-gradient rounded-full px-3 py-1.5 text-xs font-semibold text-forest-950">
                    Guardar
                  </button>
                  <button type="button" onClick={() => setEditingId(null)} className="rounded-full border border-forest-700 px-3 py-1.5 text-xs text-slate-300">
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  {route.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={route.imageUrl} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                  ) : (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-800 text-xs text-slate-500">Sin foto</span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-100">{route.name}</p>
                    <p className="truncate text-xs text-slate-400">{route.duration} · Presupuesto {route.budget}</p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button type="button" onClick={() => startEdit(route)} className="btn-brand-font btn-gradient rounded-full px-3 py-1.5 text-xs font-semibold text-forest-950 transition">
                    Editar
                  </button>
                  <button type="button" onClick={() => handleDelete(route)} className="rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10">
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {showAddForm ? (
        <form onSubmit={handleAddSubmit} className="mt-5 grid gap-3 border-t border-forest-700 pt-5 sm:grid-cols-2">
          <input className={inputClass} placeholder="Nombre" value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} />
          <input className={inputClass} placeholder="Duración" value={addForm.duration} onChange={(e) => setAddForm({ ...addForm, duration: e.target.value })} />
          <input className={inputClass} placeholder="Presupuesto (Bajo/Medio/Alto)" value={addForm.budget} onChange={(e) => setAddForm({ ...addForm, budget: e.target.value })} />
          <ImageUploadField className="sm:col-span-2" value={addForm.imageUrl} onChange={(value) => setAddForm({ ...addForm, imageUrl: value })} />
          <textarea className={`${inputClass} sm:col-span-2`} placeholder="Descripción" value={addForm.description} onChange={(e) => setAddForm({ ...addForm, description: e.target.value })} />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">
            Agregar ruta
          </button>
        </form>
      ) : null}

      {message ? <p className="mt-4 text-sm text-brand-400">{message}</p> : null}
    </div>
  );
}
