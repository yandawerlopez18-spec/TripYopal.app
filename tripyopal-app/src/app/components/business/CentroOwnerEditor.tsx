"use client";

import { useState } from "react";
import {
  addFoodCourtItem,
  addVenueEvent,
  deleteFoodCourtItem,
  deleteVenueEvent,
  listPrestadores,
  updatePrestador,
} from "../../services/prestadores";
import ImageUploadField from "../admin/ImageUploadField";
import PrestadorItemsSection from "../admin/PrestadorItemsSection";
import PrestadorProfileEditor from "../admin/PrestadorProfileEditor";

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";
const sectionClass = "mt-6 rounded-2xl border border-forest-700 bg-forest-950 p-5";

export default function CentroOwnerEditor({ prestadorId, categoryKey, onSaved }: { prestadorId: string; categoryKey: string; onSaved: () => void }) {
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
  const [eventForm, setEventForm] = useState({ title: "", date: "", time: "", description: "", imageUrl: "" });
  const [foodForm, setFoodForm] = useState({ name: "", subtitle: "", imageUrl: "" });

  if (!prestador) return null;

  const gallery = prestador.gallery ?? [];
  const venueEvents = prestador.venueEvents ?? [];
  const foodCourt = prestador.foodCourt ?? [];

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

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.date) return;
    await addVenueEvent(prestadorId, {
      title: eventForm.title,
      date: eventForm.date,
      time: eventForm.time || undefined,
      description: eventForm.description || undefined,
      imageUrl: eventForm.imageUrl || undefined,
    });
    setEventForm({ title: "", date: "", time: "", description: "", imageUrl: "" });
    onSaved();
  };

  const handleDeleteEvent = async (eventId: string) => {
    await deleteVenueEvent(prestadorId, eventId);
    onSaved();
  };

  const handleFoodSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodForm.name) return;
    await addFoodCourtItem(prestadorId, {
      name: foodForm.name,
      subtitle: foodForm.subtitle || undefined,
      imageUrl: foodForm.imageUrl || undefined,
    });
    setFoodForm({ name: "", subtitle: "", imageUrl: "" });
    onSaved();
  };

  const handleDeleteFood = async (itemId: string) => {
    await deleteFoodCourtItem(prestadorId, itemId);
    onSaved();
  };

  return (
    <div className="mt-6 rounded-3xl border border-brand-500/40 bg-forest-900 p-6">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-brand-400" />
        <h2 className="text-lg font-bold text-slate-100">Panel del administrador del centro comercial</h2>
      </div>
      <p className="mt-1 text-sm text-slate-400">
        Este panel solo lo ves tú, como administrador de este establecimiento. Agrega, edita o elimina cualquier sección para que se refleje en la página pública.
      </p>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Información principal</h3>
        <form onSubmit={handleGeneralSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
          <input className={inputClass} placeholder="Nombre del centro comercial" value={generalForm.name} onChange={(e) => setGeneralForm({ ...generalForm, name: e.target.value })} />
          <input className={inputClass} placeholder="Dirección" value={generalForm.address} onChange={(e) => setGeneralForm({ ...generalForm, address: e.target.value })} />
          <input className={inputClass} placeholder="Teléfono" value={generalForm.phone} onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })} />
          <input className={inputClass} placeholder="Instagram (@usuario)" value={generalForm.instagram} onChange={(e) => setGeneralForm({ ...generalForm, instagram: e.target.value })} />
          <input className={inputClass} placeholder="Horario de atención (ej. Lunes a Domingo 10:00 a.m. - 9:00 p.m.)" value={generalForm.schedule} onChange={(e) => setGeneralForm({ ...generalForm, schedule: e.target.value })} />
          <select className={inputClass} value={generalForm.priceRange} onChange={(e) => setGeneralForm({ ...generalForm, priceRange: e.target.value })}>
            <option value="">Rango de precio</option>
            <option value="Bajo">$ Económico</option>
            <option value="Medio">$$ Moderado</option>
            <option value="Alto">$$$ Alto</option>
          </select>
          <input className={inputClass} placeholder="Insignia (ej. Destacado)" value={generalForm.badge} onChange={(e) => setGeneralForm({ ...generalForm, badge: e.target.value })} />
          <textarea
            className={`${inputClass} sm:col-span-2`}
            placeholder="Descripción del centro comercial"
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
        <h3 className="font-semibold text-slate-100">Gastronomía</h3>
        <p className="mt-1 text-sm text-slate-400">Agrega los restaurantes y locales de comida disponibles en tu centro comercial.</p>
        <ul className="mt-4 space-y-2">
          {foodCourt.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 rounded-xl border border-forest-700 bg-forest-900 p-3">
              <div className="flex min-w-0 items-center gap-3">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.imageUrl} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                ) : (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-800 text-xs text-slate-500">Sin foto</span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-100">{item.name}</p>
                  {item.subtitle ? <p className="truncate text-xs text-slate-400">{item.subtitle}</p> : null}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteFood(item.id)}
                className="shrink-0 rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10"
              >
                Eliminar
              </button>
            </li>
          ))}
          {foodCourt.length === 0 ? <p className="text-sm text-slate-500">Aún no hay restaurantes cargados.</p> : null}
        </ul>
        <form onSubmit={handleFoodSubmit} className="mt-4 grid gap-3 border-t border-forest-700 pt-4 sm:grid-cols-2">
          <input className={inputClass} placeholder="Nombre (ej. Frisby)" value={foodForm.name} onChange={(e) => setFoodForm({ ...foodForm, name: e.target.value })} />
          <input className={inputClass} placeholder="Descripción breve (ej. Pollo y comidas rápidas)" value={foodForm.subtitle} onChange={(e) => setFoodForm({ ...foodForm, subtitle: e.target.value })} />
          <ImageUploadField className="sm:col-span-2" value={foodForm.imageUrl} onChange={(value) => setFoodForm({ ...foodForm, imageUrl: value })} />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">Agregar restaurante</button>
        </form>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Próximos eventos y actividades</h3>
        <p className="mt-1 text-sm text-slate-400">Agrega las actividades y eventos que tendrás próximamente en tu centro comercial.</p>
        <ul className="mt-4 space-y-2">
          {venueEvents.map((event) => (
            <li key={event.id} className="flex items-start justify-between gap-3 rounded-xl border border-forest-700 bg-forest-900 p-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-100">{event.title}</p>
                <p className="text-xs text-slate-400">
                  {event.date}
                  {event.time ? ` · ${event.time}` : ""}
                </p>
                {event.description ? <p className="mt-1 text-sm text-slate-300">{event.description}</p> : null}
              </div>
              <button
                type="button"
                onClick={() => handleDeleteEvent(event.id)}
                className="shrink-0 rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10"
              >
                Eliminar
              </button>
            </li>
          ))}
          {venueEvents.length === 0 ? <p className="text-sm text-slate-500">Aún no hay eventos cargados.</p> : null}
        </ul>
        <form onSubmit={handleEventSubmit} className="mt-4 grid gap-3 border-t border-forest-700 pt-4 sm:grid-cols-2">
          <input className={inputClass} placeholder="Título del evento" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} />
          <input className={inputClass} type="date" placeholder="Fecha" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} />
          <input className={inputClass} placeholder="Hora (ej. 4:00 p.m.)" value={eventForm.time} onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })} />
          <ImageUploadField value={eventForm.imageUrl} onChange={(value) => setEventForm({ ...eventForm, imageUrl: value })} />
          <textarea
            className={`${inputClass} sm:col-span-2`}
            placeholder="Descripción breve (ej. Actividades y promociones especiales)"
            value={eventForm.description}
            onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
          />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">Agregar evento</button>
        </form>
      </div>

      <PrestadorItemsSection prestadorId={prestadorId} category={categoryKey} />

      <PrestadorProfileEditor prestadorId={prestadorId} category={categoryKey} />
    </div>
  );
}
