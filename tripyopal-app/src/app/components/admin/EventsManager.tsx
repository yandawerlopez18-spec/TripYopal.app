"use client";

import { useState } from "react";
import { addEvent, deleteEvent, featuredEvents, updateEvent } from "../../services/content";
import type { EventItem } from "../../types";

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";

const emptyForm = { title: "", date: "", place: "", description: "", imageUrl: "" };

export default function EventsManager() {
  const [, setRefreshKey] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  const refresh = () => setRefreshKey((key) => key + 1);

  const startEdit = (event: EventItem) => {
    setEditingId(event.id);
    setEditForm({ title: event.title, date: event.date, place: event.place, description: event.description, imageUrl: event.imageUrl ?? "" });
  };

  const saveEdit = (id: string) => {
    if (!editForm.title || !editForm.date || !editForm.place) {
      setMessage("Completa título, fecha y lugar.");
      return;
    }

    updateEvent(id, editForm);
    setEditingId(null);
    setMessage("");
    refresh();
  };

  const handleDelete = (event: EventItem) => {
    if (!window.confirm(`¿Eliminar "${event.title}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    deleteEvent(event.id);
    refresh();
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!addForm.title || !addForm.date || !addForm.place) {
      setMessage("Completa título, fecha y lugar.");
      return;
    }

    addEvent(addForm);
    setMessage(`"${addForm.title}" se agregó a Eventos en tiempo real.`);
    setAddForm(emptyForm);
    setShowAddForm(false);
    refresh();
  };

  return (
    <div className="rounded-2xl border border-forest-700 bg-forest-950 p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold text-slate-100">
          Eventos en tiempo real <span className="text-slate-400">({featuredEvents.length})</span>
        </h3>
        <button
          type="button"
          onClick={() => setShowAddForm((value) => !value)}
          className="btn-brand-font rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-forest-950 transition hover:bg-brand-400"
        >
          {showAddForm ? "Cancelar" : "Agregar evento"}
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {featuredEvents.map((event) => (
          <li key={event.id} className="rounded-xl border border-forest-700 bg-forest-900 p-3">
            {editingId === event.id ? (
              <div className="grid gap-2 sm:grid-cols-2">
                <input className={inputClass} placeholder="Título" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                <input className={inputClass} placeholder="Fecha" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} />
                <input className={`${inputClass} sm:col-span-2`} placeholder="Lugar" value={editForm.place} onChange={(e) => setEditForm({ ...editForm, place: e.target.value })} />
                <input className={`${inputClass} sm:col-span-2`} placeholder="URL de la imagen (opcional)" value={editForm.imageUrl} onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })} />
                <textarea className={`${inputClass} sm:col-span-2`} placeholder="Descripción" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                <div className="flex gap-2 sm:col-span-2">
                  <button type="button" onClick={() => saveEdit(event.id)} className="rounded-full bg-brand-500 px-3 py-1.5 text-xs font-semibold text-forest-950">
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
                  {event.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={event.imageUrl} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                  ) : (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-800 text-xs text-slate-500">Sin foto</span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-100">{event.title}</p>
                    <p className="truncate text-xs text-slate-400">{event.date} · {event.place}</p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button type="button" onClick={() => startEdit(event)} className="rounded-full border border-forest-700 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-forest-800">
                    Editar
                  </button>
                  <button type="button" onClick={() => handleDelete(event)} className="rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10">
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
          <input className={inputClass} placeholder="Título" value={addForm.title} onChange={(e) => setAddForm({ ...addForm, title: e.target.value })} />
          <input className={inputClass} placeholder="Fecha" value={addForm.date} onChange={(e) => setAddForm({ ...addForm, date: e.target.value })} />
          <input className={`${inputClass} sm:col-span-2`} placeholder="Lugar" value={addForm.place} onChange={(e) => setAddForm({ ...addForm, place: e.target.value })} />
          <input className={`${inputClass} sm:col-span-2`} placeholder="URL de la imagen (opcional)" value={addForm.imageUrl} onChange={(e) => setAddForm({ ...addForm, imageUrl: e.target.value })} />
          <textarea className={`${inputClass} sm:col-span-2`} placeholder="Descripción" value={addForm.description} onChange={(e) => setAddForm({ ...addForm, description: e.target.value })} />
          <button className="rounded-full bg-brand-500 px-4 py-3 text-sm font-semibold text-forest-950 transition hover:bg-brand-400 sm:col-span-2">
            Agregar evento
          </button>
        </form>
      ) : null}

      {message ? <p className="mt-4 text-sm text-brand-400">{message}</p> : null}
    </div>
  );
}
