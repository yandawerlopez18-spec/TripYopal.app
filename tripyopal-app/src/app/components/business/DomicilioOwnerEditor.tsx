"use client";

import { useState } from "react";
import {
  addMenuCategory,
  addPrestadorAlly,
  deleteMenuCategory,
  deletePrestadorAlly,
  listPrestadores,
  updatePrestador,
} from "../../services/prestadores";
import ImageUploadField from "../admin/ImageUploadField";
import PrestadorItemsSection from "../admin/PrestadorItemsSection";
import PrestadorProfileEditor from "../admin/PrestadorProfileEditor";

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";
const sectionClass = "mt-6 rounded-2xl border border-forest-700 bg-forest-950 p-5";

export default function DomicilioOwnerEditor({ prestadorId, categoryKey, onSaved }: { prestadorId: string; categoryKey: string; onSaved: () => void }) {
  const prestador = listPrestadores().find((entry) => entry.id === prestadorId);

  const [generalForm, setGeneralForm] = useState<{
    name: string;
    description: string;
    address: string;
    phone: string;
    instagram: string;
    schedule: string;
    priceRange: string;
    imageUrl: string;
    logoUrl: string;
    badge: string;
  }>(() => ({
    name: prestador?.name ?? "",
    description: prestador?.description ?? "",
    address: prestador?.address ?? "",
    phone: prestador?.phone ?? "",
    instagram: prestador?.instagram ?? "",
    schedule: prestador?.schedule ?? "",
    priceRange: prestador?.priceRange ?? "",
    imageUrl: prestador?.imageUrl ?? "",
    logoUrl: prestador?.logoUrl ?? "",
    badge: prestador?.badges?.[0] ?? "",
  }));
  const [generalMessage, setGeneralMessage] = useState("");
  const [categoryForm, setCategoryForm] = useState({ icon: "", label: "" });
  const [allyForm, setAllyForm] = useState({ name: "", subtitle: "", imageUrl: "" });

  if (!prestador) return null;

  const menuCategories = prestador.menuCategories ?? [];
  const allies = prestador.allies ?? [];

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePrestador(prestadorId, {
      name: generalForm.name || prestador.name,
      description: generalForm.description,
      address: generalForm.address,
      phone: generalForm.phone,
      instagram: generalForm.instagram,
      schedule: generalForm.schedule,
      priceRange: generalForm.priceRange,
      imageUrl: generalForm.imageUrl,
      logoUrl: generalForm.logoUrl,
      badges: generalForm.badge ? [generalForm.badge] : [],
    });
    setGeneralMessage("Información guardada.");
    onSaved();
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.label) return;
    await addMenuCategory(prestadorId, { icon: categoryForm.icon || "🍽️", label: categoryForm.label });
    setCategoryForm({ icon: "", label: "" });
    onSaved();
  };

  const handleDeleteCategory = async (id: string) => {
    await deleteMenuCategory(prestadorId, id);
    onSaved();
  };

  const handleAllySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allyForm.name) return;
    await addPrestadorAlly(prestadorId, { name: allyForm.name, subtitle: allyForm.subtitle || undefined, imageUrl: allyForm.imageUrl || undefined });
    setAllyForm({ name: "", subtitle: "", imageUrl: "" });
    onSaved();
  };

  const handleDeleteAlly = async (id: string) => {
    await deletePrestadorAlly(prestadorId, id);
    onSaved();
  };

  return (
    <div className="mt-6 rounded-3xl border border-brand-500/40 bg-forest-900 p-6">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-brand-400" />
        <h2 className="text-lg font-bold text-slate-100">Panel del administrador del servicio</h2>
      </div>
      <p className="mt-1 text-sm text-slate-400">
        Este panel solo lo ves tú, como administrador de este servicio de domicilios. Agrega, edita o elimina cualquier sección para que se refleje en la página pública.
      </p>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Información principal</h3>
        <form onSubmit={handleGeneralSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
          <input className={inputClass} placeholder="Nombre del servicio" value={generalForm.name} onChange={(e) => setGeneralForm({ ...generalForm, name: e.target.value })} />
          <input className={inputClass} placeholder="Dirección" value={generalForm.address} onChange={(e) => setGeneralForm({ ...generalForm, address: e.target.value })} />
          <input className={inputClass} placeholder="Teléfono" value={generalForm.phone} onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })} />
          <input className={inputClass} placeholder="Instagram (@usuario)" value={generalForm.instagram} onChange={(e) => setGeneralForm({ ...generalForm, instagram: e.target.value })} />
          <input className={inputClass} placeholder="Horario de atención (ej. Abierto 24/7)" value={generalForm.schedule} onChange={(e) => setGeneralForm({ ...generalForm, schedule: e.target.value })} />
          <select className={inputClass} value={generalForm.priceRange} onChange={(e) => setGeneralForm({ ...generalForm, priceRange: e.target.value })}>
            <option value="">Rango de precio</option>
            <option value="Bajo">$ Económico</option>
            <option value="Medio">$$ Moderado</option>
            <option value="Alto">$$$ Alto</option>
          </select>
          <input className={inputClass} placeholder="Insignia (ej. Abierto ahora)" value={generalForm.badge} onChange={(e) => setGeneralForm({ ...generalForm, badge: e.target.value })} />
          <textarea
            className={`${inputClass} sm:col-span-2`}
            placeholder="Descripción del servicio"
            value={generalForm.description}
            onChange={(e) => setGeneralForm({ ...generalForm, description: e.target.value })}
          />
          <div>
            <p className="mb-2 text-xs text-slate-400">Foto principal (portada)</p>
            <ImageUploadField value={generalForm.imageUrl} onChange={(value) => setGeneralForm({ ...generalForm, imageUrl: value })} />
          </div>
          <div>
            <p className="mb-2 text-xs text-slate-400">Logo (círculo de marca)</p>
            <ImageUploadField value={generalForm.logoUrl} onChange={(value) => setGeneralForm({ ...generalForm, logoUrl: value })} />
          </div>
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">Guardar información principal</button>
          {generalMessage ? <p className="text-sm text-brand-400 sm:col-span-2">{generalMessage}</p> : null}
        </form>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">¿Qué quieres pedir hoy? (categorías)</h3>
        <p className="mt-1 text-sm text-slate-400">Agrega las categorías de productos que ofreces (comida rápida, asados, pizzas, farmacia, etc.).</p>
        <ul className="mt-4 space-y-2">
          {menuCategories.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 rounded-xl border border-forest-700 bg-forest-900 p-3">
              <p className="flex items-center gap-2 text-sm text-slate-200">
                <span className="text-lg">{item.icon}</span> {item.label}
              </p>
              <button type="button" onClick={() => handleDeleteCategory(item.id)} className="shrink-0 rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10">
                Eliminar
              </button>
            </li>
          ))}
          {menuCategories.length === 0 ? <p className="text-sm text-slate-500">Aún no hay categorías cargadas.</p> : null}
        </ul>
        <form onSubmit={handleCategorySubmit} className="mt-4 grid gap-3 border-t border-forest-700 pt-4 sm:grid-cols-[80px_1fr]">
          <input className={inputClass} placeholder="Ícono (emoji)" value={categoryForm.icon} onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })} />
          <input className={inputClass} placeholder="Ej. Comida rápida" value={categoryForm.label} onChange={(e) => setCategoryForm({ ...categoryForm, label: e.target.value })} />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">Agregar categoría</button>
        </form>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Restaurantes aliados</h3>
        <p className="mt-1 text-sm text-slate-400">Agrega los restaurantes y comercios que puedes entregar a domicilio.</p>
        <ul className="mt-4 space-y-2">
          {allies.map((ally) => (
            <li key={ally.id} className="flex items-center justify-between gap-3 rounded-xl border border-forest-700 bg-forest-900 p-3">
              <div className="flex min-w-0 items-center gap-3">
                {ally.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={ally.imageUrl} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                ) : (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-800 text-xs text-slate-500">Sin foto</span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-100">{ally.name}</p>
                  {ally.subtitle ? <p className="truncate text-xs text-slate-400">{ally.subtitle}</p> : null}
                </div>
              </div>
              <button type="button" onClick={() => handleDeleteAlly(ally.id)} className="shrink-0 rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10">
                Eliminar
              </button>
            </li>
          ))}
          {allies.length === 0 ? <p className="text-sm text-slate-500">Aún no hay aliados cargados.</p> : null}
        </ul>
        <form onSubmit={handleAllySubmit} className="mt-4 grid gap-3 border-t border-forest-700 pt-4 sm:grid-cols-2">
          <input className={inputClass} placeholder="Nombre (ej. Creta Pub)" value={allyForm.name} onChange={(e) => setAllyForm({ ...allyForm, name: e.target.value })} />
          <input className={inputClass} placeholder="Detalle (ej. Comidas rápidas)" value={allyForm.subtitle} onChange={(e) => setAllyForm({ ...allyForm, subtitle: e.target.value })} />
          <ImageUploadField className="sm:col-span-2" value={allyForm.imageUrl} onChange={(value) => setAllyForm({ ...allyForm, imageUrl: value })} />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">Agregar aliado</button>
        </form>
      </div>

      <PrestadorItemsSection prestadorId={prestadorId} category={categoryKey} />

      <PrestadorProfileEditor prestadorId={prestadorId} category={categoryKey} />
    </div>
  );
}
