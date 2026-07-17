"use client";

import { useState } from "react";

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";

export type ListFieldConfig<T> = {
  key: keyof T & string;
  label: string;
  multiline?: boolean;
  required?: boolean;
};

type SiteListManagerProps<T extends { id: string }> = {
  title: string;
  emptyMessage: string;
  addButtonLabel: string;
  items: T[];
  fields: ListFieldConfig<T>[];
  summary: (item: T) => { primary: string; secondary?: string };
  onAdd: (values: Record<string, string>) => void;
  onUpdate: (id: string, values: Record<string, string>) => void;
  onDelete: (id: string) => void;
};

function emptyValues<T extends { id: string }>(fields: ListFieldConfig<T>[]): Record<string, string> {
  return Object.fromEntries(fields.map((field) => [field.key, ""]));
}

export default function SiteListManager<T extends { id: string }>({
  title,
  emptyMessage,
  addButtonLabel,
  items,
  fields,
  summary,
  onAdd,
  onUpdate,
  onDelete,
}: SiteListManagerProps<T>) {
  const [, setRefreshKey] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Record<string, string>>(emptyValues(fields));
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState<Record<string, string>>(emptyValues(fields));
  const [message, setMessage] = useState("");

  const refresh = () => setRefreshKey((key) => key + 1);

  const startEdit = (item: T) => {
    setEditingId(item.id);
    setEditForm(Object.fromEntries(fields.map((field) => [field.key, String(item[field.key] ?? "")])));
    setMessage("");
  };

  const saveEdit = (id: string) => {
    const missing = fields.find((field) => field.required && !editForm[field.key]);
    if (missing) {
      setMessage(`Completa el campo "${missing.label}".`);
      return;
    }

    onUpdate(id, editForm);
    setEditingId(null);
    setMessage("");
    refresh();
  };

  const handleDelete = (item: T) => {
    const { primary } = summary(item);
    if (!window.confirm(`¿Eliminar "${primary}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    onDelete(item.id);
    refresh();
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const missing = fields.find((field) => field.required && !addForm[field.key]);
    if (missing) {
      setMessage(`Completa el campo "${missing.label}".`);
      return;
    }

    onAdd(addForm);
    setAddForm(emptyValues(fields));
    setShowAddForm(false);
    setMessage("Registro agregado correctamente.");
    refresh();
  };

  return (
    <div className="rounded-2xl border border-forest-700 bg-forest-950 p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold text-slate-100">
          {title} <span className="text-slate-400">({items.length})</span>
        </h3>
        <button
          type="button"
          onClick={() => {
            setShowAddForm((value) => !value);
            setMessage("");
          }}
          className="btn-brand-font rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-forest-950 transition hover:bg-brand-400"
        >
          {showAddForm ? "Cancelar" : addButtonLabel}
        </button>
      </div>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">{emptyMessage}</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="rounded-xl border border-forest-700 bg-forest-900 p-3">
              {editingId === item.id ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  {fields.map((field) =>
                    field.multiline ? (
                      <textarea
                        key={field.key}
                        className={`${inputClass} sm:col-span-2`}
                        placeholder={field.label}
                        value={editForm[field.key]}
                        onChange={(e) => setEditForm({ ...editForm, [field.key]: e.target.value })}
                      />
                    ) : (
                      <input
                        key={field.key}
                        className={inputClass}
                        placeholder={field.label}
                        value={editForm[field.key]}
                        onChange={(e) => setEditForm({ ...editForm, [field.key]: e.target.value })}
                      />
                    ),
                  )}
                  <div className="flex gap-2 sm:col-span-2">
                    <button type="button" onClick={() => saveEdit(item.id)} className="rounded-full bg-brand-500 px-3 py-1.5 text-xs font-semibold text-forest-950">
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
                    <p className="truncate text-sm font-semibold text-slate-100">{summary(item).primary}</p>
                    {summary(item).secondary ? <p className="truncate text-xs text-slate-400">{summary(item).secondary}</p> : null}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button type="button" onClick={() => startEdit(item)} className="rounded-full border border-forest-700 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-forest-800">
                      Editar
                    </button>
                    <button type="button" onClick={() => handleDelete(item)} className="rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10">
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {showAddForm ? (
        <form onSubmit={handleAddSubmit} className="mt-5 grid gap-3 border-t border-forest-700 pt-5 sm:grid-cols-2">
          {fields.map((field) =>
            field.multiline ? (
              <textarea
                key={field.key}
                className={`${inputClass} sm:col-span-2`}
                placeholder={field.label}
                value={addForm[field.key]}
                onChange={(e) => setAddForm({ ...addForm, [field.key]: e.target.value })}
              />
            ) : (
              <input
                key={field.key}
                className={inputClass}
                placeholder={field.label}
                value={addForm[field.key]}
                onChange={(e) => setAddForm({ ...addForm, [field.key]: e.target.value })}
              />
            ),
          )}
          <button className="rounded-full bg-brand-500 px-4 py-3 text-sm font-semibold text-forest-950 transition hover:bg-brand-400 sm:col-span-2">
            {addButtonLabel}
          </button>
        </form>
      ) : null}

      {message ? <p className="mt-4 text-sm text-brand-400">{message}</p> : null}
    </div>
  );
}
