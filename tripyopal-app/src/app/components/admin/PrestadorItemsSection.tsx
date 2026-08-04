"use client";

import { useState } from "react";
import { addPrestadorItem, deletePrestadorItem, listPrestadores, updatePrestadorItem, type PrestadorItem } from "../../services/prestadores";
import { getPrestadorItemLabels } from "../../utils/prestadorItemLabels";
import { AMENITY_CATALOG, getProfileGroup } from "../../utils/businessProfileConfig";
import { formatCOP } from "../../utils/formatters";
import ImageUploadField from "./ImageUploadField";

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";

const ROOM_AMENITY_KEYS = ["wifi", "tv", "aire", "minibar", "cajaFuerte", "netflix", "jacuzzi", "desayuno"];
const ROOM_AMENITY_OPTIONS = AMENITY_CATALOG.filter((a) => ROOM_AMENITY_KEYS.includes(a.key));

const emptyItemForm = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  capacity: "",
  size: "",
  beds: "",
  view: "",
  totalUnits: "",
  availableUnits: "",
  amenities: [] as string[],
  badge: "",
};

function AmenityPicker({ value, onChange }: { value: string[]; onChange: (next: string[]) => void }) {
  const toggle = (key: string) => {
    onChange(value.includes(key) ? value.filter((entry) => entry !== key) : [...value, key]);
  };

  return (
    <div className="sm:col-span-2">
      <p className="mb-1.5 text-xs text-slate-400">Servicios de esta habitación</p>
      <div className="flex flex-wrap gap-1.5">
        {ROOM_AMENITY_OPTIONS.map((amenity) => (
          <button
            key={amenity.key}
            type="button"
            onClick={() => toggle(amenity.key)}
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition ${
              value.includes(amenity.key) ? "border-brand-400 bg-brand-500/10 text-brand-400" : "border-forest-700 text-slate-400 hover:bg-forest-800"
            }`}
          >
            <span>{amenity.icon}</span> {amenity.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PrestadorItemsSection({ prestadorId, category }: { prestadorId: string; category: string }) {
  const [, setRefreshKey] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyItemForm);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState(emptyItemForm);

  const refresh = () => setRefreshKey((key) => key + 1);

  const prestador = listPrestadores().find((entry) => entry.id === prestadorId);
  const labels = getPrestadorItemLabels(category);
  const items = prestador?.items ?? [];
  const isHospedaje = getProfileGroup(category) === "hospedaje";
  const isGastronomia = getProfileGroup(category) === "gastronomia";
  const isComercial = getProfileGroup(category) === "comercial";

  if (!prestador) return null;

  const startEdit = (item: PrestadorItem) => {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      description: item.description ?? "",
      price: item.price ?? "",
      imageUrl: item.imageUrl ?? "",
      capacity: item.capacity ?? "",
      size: item.size ?? "",
      beds: item.beds ?? "",
      view: item.view ?? "",
      totalUnits: item.totalUnits !== undefined ? String(item.totalUnits) : "",
      availableUnits: item.availableUnits !== undefined ? String(item.availableUnits) : "",
      amenities: item.amenities ?? [],
      badge: item.badge ?? "",
    });
  };

  const saveEdit = async (itemId: string) => {
    if (!editForm.name) return;

    await updatePrestadorItem(prestadorId, itemId, {
      name: editForm.name,
      description: editForm.description,
      price: editForm.price,
      imageUrl: editForm.imageUrl,
      capacity: editForm.capacity,
      size: editForm.size,
      beds: editForm.beds,
      view: editForm.view,
      totalUnits: editForm.totalUnits ? Number(editForm.totalUnits) : undefined,
      availableUnits: editForm.availableUnits ? Number(editForm.availableUnits) : undefined,
      amenities: editForm.amenities,
      badge: editForm.badge,
    });
    setEditingId(null);
    refresh();
  };

  const handleDelete = async (item: PrestadorItem) => {
    if (!window.confirm(`¿Eliminar "${item.name}"?`)) return;
    await deletePrestadorItem(prestadorId, item.id);
    refresh();
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.name) return;

    await addPrestadorItem(prestadorId, {
      name: addForm.name,
      description: addForm.description || undefined,
      price: addForm.price || undefined,
      imageUrl: addForm.imageUrl || undefined,
      capacity: addForm.capacity || undefined,
      size: addForm.size || undefined,
      beds: addForm.beds || undefined,
      view: addForm.view || undefined,
      totalUnits: addForm.totalUnits ? Number(addForm.totalUnits) : undefined,
      availableUnits: addForm.availableUnits ? Number(addForm.availableUnits) : undefined,
      amenities: addForm.amenities,
      badge: addForm.badge || undefined,
    });
    setAddForm(emptyItemForm);
    setShowAddForm(false);
    refresh();
  };

  return (
    <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-950 p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold text-slate-100">
          {labels.sectionLabel} <span className="text-slate-400">({items.length})</span>
        </h3>
        <button
          type="button"
          onClick={() => setShowAddForm((value) => !value)}
          className="btn-brand-font btn-gradient rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          {showAddForm ? "Cancelar" : labels.addLabel}
        </button>
      </div>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">Aún no has agregado nada en {labels.sectionLabel.toLowerCase()}.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="rounded-xl border border-forest-700 bg-forest-900 p-3">
              {editingId === item.id ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  <input
                    className={`${inputClass} !py-2`}
                    placeholder={labels.namePlaceholder}
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                  <input
                    className={`${inputClass} !py-2`}
                    placeholder={labels.pricePlaceholder}
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  />
                  <ImageUploadField className="sm:col-span-2" compact value={editForm.imageUrl} onChange={(value) => setEditForm({ ...editForm, imageUrl: value })} />
                  {isHospedaje ? (
                    <>
                      <input className={`${inputClass} !py-2`} placeholder="Capacidad (ej. 2 personas)" value={editForm.capacity} onChange={(e) => setEditForm({ ...editForm, capacity: e.target.value })} />
                      <input className={`${inputClass} !py-2`} placeholder="Tamaño (ej. 24 m²)" value={editForm.size} onChange={(e) => setEditForm({ ...editForm, size: e.target.value })} />
                      <input className={`${inputClass} !py-2`} placeholder="Camas" value={editForm.beds} onChange={(e) => setEditForm({ ...editForm, beds: e.target.value })} />
                      <input className={`${inputClass} !py-2`} placeholder="Vista (ej. Jardín)" value={editForm.view} onChange={(e) => setEditForm({ ...editForm, view: e.target.value })} />
                      <input className={`${inputClass} !py-2`} placeholder="Unidades totales" type="number" value={editForm.totalUnits} onChange={(e) => setEditForm({ ...editForm, totalUnits: e.target.value })} />
                      <input className={`${inputClass} !py-2`} placeholder="Unidades disponibles" type="number" value={editForm.availableUnits} onChange={(e) => setEditForm({ ...editForm, availableUnits: e.target.value })} />
                      <AmenityPicker value={editForm.amenities} onChange={(next) => setEditForm({ ...editForm, amenities: next })} />
                    </>
                  ) : null}
                  {isGastronomia || isComercial ? (
                    <input
                      className={`${inputClass} !py-2 sm:col-span-2`}
                      placeholder="Etiqueta (ej. Especial, Supermercado, Ropa y accesorios, Postre)"
                      value={editForm.badge}
                      onChange={(e) => setEditForm({ ...editForm, badge: e.target.value })}
                    />
                  ) : null}
                  <textarea
                    className={`${inputClass} sm:col-span-2`}
                    placeholder="Descripción (opcional)"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
                  <div className="flex gap-2 sm:col-span-2">
                    <button type="button" onClick={() => saveEdit(item.id)} className="btn-gradient rounded-full px-3 py-1.5 text-xs font-semibold text-forest-950">
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
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.imageUrl} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                    ) : (
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-800 text-xs text-slate-500">Sin foto</span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-100">{item.name}</p>
                      <p className="truncate text-xs text-slate-400">
                        {[item.price ? formatCOP(item.price) : null, item.capacity, item.availableUnits !== undefined ? `${item.availableUnits} disponibles` : null, item.description]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button type="button" onClick={() => startEdit(item)} className="btn-brand-font btn-gradient rounded-full px-3 py-1.5 text-xs font-semibold text-forest-950 transition">
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
          <input
            className={inputClass}
            placeholder={labels.namePlaceholder}
            required
            value={addForm.name}
            onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
          />
          <input
            className={inputClass}
            placeholder={labels.pricePlaceholder}
            value={addForm.price}
            onChange={(e) => setAddForm({ ...addForm, price: e.target.value })}
          />
          <ImageUploadField className="sm:col-span-2" value={addForm.imageUrl} onChange={(value) => setAddForm({ ...addForm, imageUrl: value })} />
          {isHospedaje ? (
            <>
              <input className={inputClass} placeholder="Capacidad (ej. 2 personas)" value={addForm.capacity} onChange={(e) => setAddForm({ ...addForm, capacity: e.target.value })} />
              <input className={inputClass} placeholder="Tamaño (ej. 24 m²)" value={addForm.size} onChange={(e) => setAddForm({ ...addForm, size: e.target.value })} />
              <input className={inputClass} placeholder="Camas" value={addForm.beds} onChange={(e) => setAddForm({ ...addForm, beds: e.target.value })} />
              <input className={inputClass} placeholder="Vista (ej. Jardín)" value={addForm.view} onChange={(e) => setAddForm({ ...addForm, view: e.target.value })} />
              <input className={inputClass} placeholder="Unidades totales" type="number" value={addForm.totalUnits} onChange={(e) => setAddForm({ ...addForm, totalUnits: e.target.value })} />
              <input className={inputClass} placeholder="Unidades disponibles" type="number" value={addForm.availableUnits} onChange={(e) => setAddForm({ ...addForm, availableUnits: e.target.value })} />
              <AmenityPicker value={addForm.amenities} onChange={(next) => setAddForm({ ...addForm, amenities: next })} />
            </>
          ) : null}
          {isGastronomia || isComercial ? (
            <input
              className={`${inputClass} sm:col-span-2`}
              placeholder="Etiqueta (ej. Especial, Supermercado, Ropa y accesorios, Postre)"
              value={addForm.badge}
              onChange={(e) => setAddForm({ ...addForm, badge: e.target.value })}
            />
          ) : null}
          <textarea
            className={`${inputClass} sm:col-span-2`}
            placeholder="Descripción (opcional)"
            value={addForm.description}
            onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
          />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">
            {labels.addLabel}
          </button>
        </form>
      ) : null}
    </div>
  );
}
