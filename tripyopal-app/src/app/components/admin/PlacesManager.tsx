"use client";

import { useState } from "react";
import { addPlace, deletePlace, featuredPlaces, updatePlace } from "../../services/content";
import type { Place } from "../../types";
import ImageUploadField from "./ImageUploadField";

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";

const emptyForm = { name: "", category: "", description: "", price: "", rating: "", location: "", imageUrl: "" };

export default function PlacesManager() {
  const [, setRefreshKey] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  const refresh = () => setRefreshKey((key) => key + 1);

  const toFormState = (place: Place) => ({
    name: place.name,
    category: place.category,
    description: place.description,
    price: place.price,
    rating: place.rating ? String(place.rating) : "",
    location: place.location ?? "",
    imageUrl: place.imageUrl ?? "",
  });

  const startEdit = (place: Place) => {
    setEditingId(place.id);
    setEditForm(toFormState(place));
  };

  const saveEdit = async (id: string) => {
    if (!editForm.name || !editForm.category || !editForm.description || !editForm.price) {
      setMessage("Completa nombre, categoría, descripción y precio.");
      return;
    }

    await updatePlace(id, {
      name: editForm.name,
      category: editForm.category,
      description: editForm.description,
      price: editForm.price,
      rating: editForm.rating ? Number(editForm.rating) : undefined,
      location: editForm.location,
      imageUrl: editForm.imageUrl,
    });
    setEditingId(null);
    setMessage("");
    refresh();
  };

  const handleDelete = async (place: Place) => {
    if (!window.confirm(`¿Eliminar "${place.name}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    await deletePlace(place.id);
    refresh();
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!addForm.name || !addForm.category || !addForm.description || !addForm.price) {
      setMessage("Completa nombre, categoría, descripción y precio.");
      return;
    }

    await addPlace({
      name: addForm.name,
      category: addForm.category,
      description: addForm.description,
      price: addForm.price,
      rating: addForm.rating ? Number(addForm.rating) : undefined,
      location: addForm.location || undefined,
      imageUrl: addForm.imageUrl || undefined,
    });

    setMessage(`"${addForm.name}" se agregó a Recomendaciones para ti.`);
    setAddForm(emptyForm);
    setShowAddForm(false);
    refresh();
  };

  return (
    <div className="rounded-2xl border border-forest-700 bg-forest-950 p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold text-slate-100">
          Recomendaciones para ti <span className="text-slate-400">({featuredPlaces.length})</span>
        </h3>
        <button
          type="button"
          onClick={() => setShowAddForm((value) => !value)}
          className="btn-brand-font btn-gradient rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          {showAddForm ? "Cancelar" : "Agregar lugar"}
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {featuredPlaces.map((place) => (
          <li key={place.id} className="rounded-xl border border-forest-700 bg-forest-900 p-3">
            {editingId === place.id ? (
              <div className="grid gap-2 sm:grid-cols-2">
                <input className={inputClass} placeholder="Nombre" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                <input className={inputClass} placeholder="Categoría" value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} />
                <input className={inputClass} placeholder="Precio (Gratis / Bajo / Medio / Alto)" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} />
                <input className={inputClass} placeholder="Rating (opcional)" value={editForm.rating} onChange={(e) => setEditForm({ ...editForm, rating: e.target.value })} />
                <input className={`${inputClass} sm:col-span-2`} placeholder="Ubicación (opcional)" value={editForm.location} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} />
                <ImageUploadField className="sm:col-span-2" compact value={editForm.imageUrl} onChange={(value) => setEditForm({ ...editForm, imageUrl: value })} />
                <textarea className={`${inputClass} sm:col-span-2`} placeholder="Descripción" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                <div className="flex gap-2 sm:col-span-2">
                  <button type="button" onClick={() => saveEdit(place.id)} className="btn-gradient rounded-full px-3 py-1.5 text-xs font-semibold text-forest-950">
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
                  {place.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={place.imageUrl} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                  ) : (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-800 text-xs text-slate-500">Sin foto</span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-100">{place.name}</p>
                    <p className="truncate text-xs text-slate-400">
                      {place.category} · {place.price}
                      {place.rating ? ` · ★ ${place.rating}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button type="button" onClick={() => startEdit(place)} className="btn-brand-font btn-gradient rounded-full px-3 py-1.5 text-xs font-semibold text-forest-950 transition">
                    Editar
                  </button>
                  <button type="button" onClick={() => handleDelete(place)} className="rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10">
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
          <input className={inputClass} placeholder="Categoría" value={addForm.category} onChange={(e) => setAddForm({ ...addForm, category: e.target.value })} />
          <input className={inputClass} placeholder="Precio (Gratis / Bajo / Medio / Alto)" value={addForm.price} onChange={(e) => setAddForm({ ...addForm, price: e.target.value })} />
          <input className={inputClass} placeholder="Rating (opcional)" value={addForm.rating} onChange={(e) => setAddForm({ ...addForm, rating: e.target.value })} />
          <input className={`${inputClass} sm:col-span-2`} placeholder="Ubicación (opcional)" value={addForm.location} onChange={(e) => setAddForm({ ...addForm, location: e.target.value })} />
          <ImageUploadField className="sm:col-span-2" value={addForm.imageUrl} onChange={(value) => setAddForm({ ...addForm, imageUrl: value })} />
          <textarea className={`${inputClass} sm:col-span-2`} placeholder="Descripción" value={addForm.description} onChange={(e) => setAddForm({ ...addForm, description: e.target.value })} />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">
            Agregar lugar
          </button>
        </form>
      ) : null}

      {message ? <p className="mt-4 text-sm text-brand-400">{message}</p> : null}
    </div>
  );
}
