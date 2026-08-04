"use client";

import { useState } from "react";
import { addWhatToFindItem, deleteWhatToFindItem, listPrestadores, updatePrestador, updateWhatToFindItem } from "../../services/prestadores";
import { formatCOP } from "../../utils/formatters";
import ImageUploadField from "../admin/ImageUploadField";
import PrestadorItemsSection from "../admin/PrestadorItemsSection";
import PrestadorProfileEditor from "../admin/PrestadorProfileEditor";

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";
const sectionClass = "mt-6 rounded-2xl border border-forest-700 bg-forest-950 p-5";

export default function SitioOwnerEditor({ prestadorId, categoryKey, onSaved }: { prestadorId: string; categoryKey: string; onSaved: () => void }) {
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
    badge: prestador?.badges?.[0] ?? "",
  }));
  const [generalMessage, setGeneralMessage] = useState("");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [whatToFindForm, setWhatToFindForm] = useState({ name: "", description: "", price: "", imageUrl: "" });
  const [editingWhatToFindId, setEditingWhatToFindId] = useState<string | null>(null);
  const [editWhatToFindForm, setEditWhatToFindForm] = useState({ name: "", description: "", price: "", imageUrl: "" });

  if (!prestador) return null;

  const gallery = prestador.gallery ?? [];
  const whatToFind = prestador.whatToFind ?? [];

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
      badges: generalForm.badge ? [generalForm.badge] : [],
    });
    setGeneralMessage("Información guardada.");
    onSaved();
  };

  const addPhoto = async () => {
    if (!newPhotoUrl) return;
    await updatePrestador(prestadorId, { gallery: [...gallery, newPhotoUrl] });
    setNewPhotoUrl("");
    onSaved();
  };

  const removePhoto = async (url: string) => {
    await updatePrestador(prestadorId, { gallery: gallery.filter((entry) => entry !== url) });
    onSaved();
  };

  const handleWhatToFindSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatToFindForm.name) return;
    await addWhatToFindItem(prestadorId, {
      name: whatToFindForm.name,
      description: whatToFindForm.description || undefined,
      price: whatToFindForm.price || undefined,
      imageUrl: whatToFindForm.imageUrl || undefined,
    });
    setWhatToFindForm({ name: "", description: "", price: "", imageUrl: "" });
    onSaved();
  };

  const startWhatToFindEdit = (item: { id: string; name: string; description?: string; price?: string; imageUrl?: string }) => {
    setEditingWhatToFindId(item.id);
    setEditWhatToFindForm({ name: item.name, description: item.description ?? "", price: item.price ?? "", imageUrl: item.imageUrl ?? "" });
  };

  const saveWhatToFindEdit = async (itemId: string) => {
    if (!editWhatToFindForm.name) return;
    await updateWhatToFindItem(prestadorId, itemId, {
      name: editWhatToFindForm.name,
      description: editWhatToFindForm.description || undefined,
      price: editWhatToFindForm.price || undefined,
      imageUrl: editWhatToFindForm.imageUrl || undefined,
    });
    setEditingWhatToFindId(null);
    onSaved();
  };

  const handleDeleteWhatToFind = async (itemId: string) => {
    await deleteWhatToFindItem(prestadorId, itemId);
    onSaved();
  };

  return (
    <div className="mt-6 rounded-3xl border border-brand-500/40 bg-forest-900 p-6">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-brand-400" />
        <h2 className="text-lg font-bold text-slate-100">Panel del administrador del sitio turístico</h2>
      </div>
      <p className="mt-1 text-sm text-slate-400">
        Este panel solo lo ves tú, como administrador de este establecimiento. Agrega, edita o elimina cualquier sección para que se refleje en la página pública.
      </p>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Información principal</h3>
        <form onSubmit={handleGeneralSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
          <input className={inputClass} placeholder="Nombre del sitio" value={generalForm.name} onChange={(e) => setGeneralForm({ ...generalForm, name: e.target.value })} />
          <input className={inputClass} placeholder="Dirección" value={generalForm.address} onChange={(e) => setGeneralForm({ ...generalForm, address: e.target.value })} />
          <input className={inputClass} placeholder="Teléfono" value={generalForm.phone} onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })} />
          <input className={inputClass} placeholder="Instagram (@usuario)" value={generalForm.instagram} onChange={(e) => setGeneralForm({ ...generalForm, instagram: e.target.value })} />
          <input className={inputClass} placeholder="Horario de visita (ej. 6:00 a.m. - 7:00 p.m.)" value={generalForm.schedule} onChange={(e) => setGeneralForm({ ...generalForm, schedule: e.target.value })} />
          <select className={inputClass} value={generalForm.priceRange} onChange={(e) => setGeneralForm({ ...generalForm, priceRange: e.target.value })}>
            <option value="">Rango de precio</option>
            <option value="Bajo">$ Económico</option>
            <option value="Medio">$$ Moderado</option>
            <option value="Alto">$$$ Alto</option>
          </select>
          <input className={inputClass} placeholder="Insignia (ej. Destacado)" value={generalForm.badge} onChange={(e) => setGeneralForm({ ...generalForm, badge: e.target.value })} />
          <textarea
            className={`${inputClass} sm:col-span-2`}
            placeholder="Descripción del sitio"
            value={generalForm.description}
            onChange={(e) => setGeneralForm({ ...generalForm, description: e.target.value })}
          />
          <div className="sm:col-span-2">
            <p className="mb-2 text-xs text-slate-400">Foto principal</p>
            <ImageUploadField value={generalForm.imageUrl} onChange={(value) => setGeneralForm({ ...generalForm, imageUrl: value })} />
          </div>
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">Guardar información principal</button>
          {generalMessage ? <p className="text-sm text-brand-400 sm:col-span-2">{generalMessage}</p> : null}
        </form>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Fotos adicionales (galería)</h3>
        <p className="mt-1 text-sm text-slate-400">Estas fotos aparecen junto a la principal en la parte superior de la página.</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {gallery.map((url) => (
            <div key={url} className="overflow-hidden rounded-xl border border-forest-700 bg-forest-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-24 w-full object-cover" />
              <button type="button" onClick={() => removePhoto(url)} className="w-full py-1.5 text-[11px] text-red-400 hover:underline">
                Eliminar
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-3 border-t border-forest-700 pt-4 sm:flex-row sm:items-end">
          <ImageUploadField className="flex-1" value={newPhotoUrl} onChange={setNewPhotoUrl} />
          <button type="button" onClick={addPhoto} className="btn-gradient shrink-0 rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition">
            Agregar foto
          </button>
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Qué podemos encontrar</h3>
        <p className="mt-1 text-sm text-slate-400">Agrega lo que los visitantes encontrarán en este sitio (ej. un puesto de obleas, un mirador, una zona de picnic). Se mostrará en la sección &ldquo;Qué podemos encontrar&rdquo; de la página pública.</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {whatToFind.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-xl border border-forest-700 bg-forest-900">
              {editingWhatToFindId === item.id ? (
                <div className="grid gap-2 p-3">
                  <input
                    className={`${inputClass} !py-2 text-xs`}
                    placeholder="Nombre (ej. Puesto de obleas)"
                    value={editWhatToFindForm.name}
                    onChange={(e) => setEditWhatToFindForm({ ...editWhatToFindForm, name: e.target.value })}
                  />
                  <input
                    className={`${inputClass} !py-2 text-xs`}
                    placeholder="Precio (ej. 5.000 COP)"
                    value={editWhatToFindForm.price}
                    onChange={(e) => setEditWhatToFindForm({ ...editWhatToFindForm, price: e.target.value })}
                  />
                  <textarea
                    className={`${inputClass} !py-2 text-xs`}
                    placeholder="Descripción breve"
                    value={editWhatToFindForm.description}
                    onChange={(e) => setEditWhatToFindForm({ ...editWhatToFindForm, description: e.target.value })}
                  />
                  <ImageUploadField value={editWhatToFindForm.imageUrl} onChange={(value) => setEditWhatToFindForm({ ...editWhatToFindForm, imageUrl: value })} />
                  <div className="flex gap-2">
                    <button type="button" onClick={() => saveWhatToFindEdit(item.id)} className="btn-gradient flex-1 rounded-full px-3 py-1.5 text-xs font-semibold text-forest-950">
                      Guardar
                    </button>
                    <button type="button" onClick={() => setEditingWhatToFindId(null)} className="flex-1 rounded-full border border-forest-700 px-3 py-1.5 text-xs text-slate-300">
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.imageUrl} alt="" className="h-24 w-full object-cover" />
                  ) : (
                    <div className="h-24 w-full bg-gradient-to-br from-forest-800 to-forest-950" />
                  )}
                  <div className="p-2">
                    <p className="truncate text-xs font-medium text-slate-200">{item.name}</p>
                    {item.description ? <p className="mt-0.5 line-clamp-2 text-[11px] leading-tight text-slate-400">{item.description}</p> : null}
                    {item.price ? <p className="mt-0.5 text-[11px] font-semibold text-brand-400">{formatCOP(item.price)}</p> : null}
                  </div>
                  <div className="flex items-center justify-between px-2 pb-2">
                    <button type="button" onClick={() => startWhatToFindEdit(item)} className="text-[11px] text-brand-400 hover:underline">
                      Editar
                    </button>
                    <button type="button" onClick={() => handleDeleteWhatToFind(item.id)} className="text-[11px] text-red-400 hover:underline">
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        {whatToFind.length === 0 ? <p className="mt-4 text-sm text-slate-500">Aún no hay elementos cargados.</p> : null}
        <form onSubmit={handleWhatToFindSubmit} className="mt-4 grid gap-3 border-t border-forest-700 pt-4 sm:grid-cols-2">
          <input
            className={inputClass}
            placeholder="Nombre (ej. Puesto de obleas)"
            value={whatToFindForm.name}
            onChange={(e) => setWhatToFindForm({ ...whatToFindForm, name: e.target.value })}
          />
          <input
            className={inputClass}
            placeholder="Precio (ej. 5.000 COP)"
            value={whatToFindForm.price}
            onChange={(e) => setWhatToFindForm({ ...whatToFindForm, price: e.target.value })}
          />
          <textarea
            className={`${inputClass} sm:col-span-2`}
            placeholder="Descripción breve"
            value={whatToFindForm.description}
            onChange={(e) => setWhatToFindForm({ ...whatToFindForm, description: e.target.value })}
          />
          <ImageUploadField className="sm:col-span-2" value={whatToFindForm.imageUrl} onChange={(value) => setWhatToFindForm({ ...whatToFindForm, imageUrl: value })} />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">Agregar</button>
        </form>
      </div>

      <PrestadorItemsSection prestadorId={prestadorId} category={categoryKey} />

      <PrestadorProfileEditor prestadorId={prestadorId} category={categoryKey} />
    </div>
  );
}
