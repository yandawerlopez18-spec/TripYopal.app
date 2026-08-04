"use client";

import { useState } from "react";
import {
  addFlight,
  addNewsItem,
  addTransportOption,
  deleteFlight,
  deleteNewsItem,
  deleteTransportOption,
  listPrestadores,
  updatePrestador,
} from "../../services/prestadores";
import ImageUploadField from "../admin/ImageUploadField";
import PrestadorProfileEditor from "../admin/PrestadorProfileEditor";

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";
const sectionClass = "mt-6 rounded-2xl border border-forest-700 bg-forest-950 p-5";

export default function TransporteOwnerEditor({ prestadorId, categoryKey, onSaved }: { prestadorId: string; categoryKey: string; onSaved: () => void }) {
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
  const [flightForm, setFlightForm] = useState({ airline: "", origin: "", destination: "", frequency: "", direct: true });
  const [transportOptionForm, setTransportOptionForm] = useState({ icon: "", title: "", subtitle: "", duration: "" });
  const [newsForm, setNewsForm] = useState({ title: "", description: "", imageUrl: "" });

  if (!prestador) return null;

  const gallery = prestador.gallery ?? [];
  const flights = prestador.flights ?? [];
  const transportOptions = prestador.transportOptions ?? [];
  const news = prestador.news ?? [];

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

  const handleFlightSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flightForm.airline || !flightForm.origin || !flightForm.destination) return;
    await addFlight(prestadorId, flightForm);
    setFlightForm({ airline: "", origin: "", destination: "", frequency: "", direct: true });
    onSaved();
  };

  const handleDeleteFlight = async (id: string) => {
    await deleteFlight(prestadorId, id);
    onSaved();
  };

  const handleTransportOptionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transportOptionForm.title) return;
    await addTransportOption(prestadorId, { ...transportOptionForm, icon: transportOptionForm.icon || "🚗" });
    setTransportOptionForm({ icon: "", title: "", subtitle: "", duration: "" });
    onSaved();
  };

  const handleDeleteTransportOption = async (id: string) => {
    await deleteTransportOption(prestadorId, id);
    onSaved();
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title) return;
    await addNewsItem(prestadorId, { title: newsForm.title, description: newsForm.description, imageUrl: newsForm.imageUrl || undefined });
    setNewsForm({ title: "", description: "", imageUrl: "" });
    onSaved();
  };

  const handleDeleteNews = async (id: string) => {
    await deleteNewsItem(prestadorId, id);
    onSaved();
  };

  return (
    <div className="mt-6 rounded-3xl border border-brand-500/40 bg-forest-900 p-6">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-brand-400" />
        <h2 className="text-lg font-bold text-slate-100">Panel del administrador del establecimiento</h2>
      </div>
      <p className="mt-1 text-sm text-slate-400">
        Este panel solo lo ves tú, como administrador de este establecimiento de transporte. Agrega, edita o elimina cualquier sección para que se refleje en la página pública.
      </p>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Información principal</h3>
        <form onSubmit={handleGeneralSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
          <input className={inputClass} placeholder="Nombre" value={generalForm.name} onChange={(e) => setGeneralForm({ ...generalForm, name: e.target.value })} />
          <input className={inputClass} placeholder="Dirección" value={generalForm.address} onChange={(e) => setGeneralForm({ ...generalForm, address: e.target.value })} />
          <input className={inputClass} placeholder="Teléfono" value={generalForm.phone} onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })} />
          <input className={inputClass} placeholder="Instagram (@usuario)" value={generalForm.instagram} onChange={(e) => setGeneralForm({ ...generalForm, instagram: e.target.value })} />
          <input className={inputClass} placeholder="Horario de atención (ej. 24 horas / 7 días)" value={generalForm.schedule} onChange={(e) => setGeneralForm({ ...generalForm, schedule: e.target.value })} />
          <select className={inputClass} value={generalForm.priceRange} onChange={(e) => setGeneralForm({ ...generalForm, priceRange: e.target.value })}>
            <option value="">Rango de precio</option>
            <option value="Bajo">$ Económico</option>
            <option value="Medio">$$ Moderado</option>
            <option value="Alto">$$$ Alto</option>
          </select>
          <input className={inputClass} placeholder="Insignia (ej. Destacado)" value={generalForm.badge} onChange={(e) => setGeneralForm({ ...generalForm, badge: e.target.value })} />
          <textarea
            className={`${inputClass} sm:col-span-2`}
            placeholder="Descripción"
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
        <h3 className="font-semibold text-slate-100">Vuelos principales</h3>
        <p className="mt-1 text-sm text-slate-400">Agrega las rutas y aerolíneas que operan desde este aeropuerto.</p>
        <ul className="mt-4 space-y-2">
          {flights.map((flight) => (
            <li key={flight.id} className="flex items-center justify-between gap-3 rounded-xl border border-forest-700 bg-forest-900 p-3">
              <p className="min-w-0 truncate text-sm text-slate-200">
                <span className="font-semibold">{flight.airline}</span> · {flight.origin} ⇄ {flight.destination} · {flight.frequency} ·{" "}
                {flight.direct ? "Directo" : "Con conexión"}
              </p>
              <button type="button" onClick={() => handleDeleteFlight(flight.id)} className="shrink-0 rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10">
                Eliminar
              </button>
            </li>
          ))}
          {flights.length === 0 ? <p className="text-sm text-slate-500">Aún no hay vuelos cargados.</p> : null}
        </ul>
        <form onSubmit={handleFlightSubmit} className="mt-4 grid gap-3 border-t border-forest-700 pt-4 sm:grid-cols-2">
          <input className={inputClass} placeholder="Aerolínea (ej. Avianca)" value={flightForm.airline} onChange={(e) => setFlightForm({ ...flightForm, airline: e.target.value })} />
          <input className={inputClass} placeholder="Frecuencia (ej. Diario)" value={flightForm.frequency} onChange={(e) => setFlightForm({ ...flightForm, frequency: e.target.value })} />
          <input className={inputClass} placeholder="Origen (ej. Bogotá (BOG))" value={flightForm.origin} onChange={(e) => setFlightForm({ ...flightForm, origin: e.target.value })} />
          <input className={inputClass} placeholder="Destino (ej. Yopal (EYP))" value={flightForm.destination} onChange={(e) => setFlightForm({ ...flightForm, destination: e.target.value })} />
          <label className="flex items-center gap-2 rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-300 sm:col-span-2">
            <input type="checkbox" checked={flightForm.direct} onChange={(e) => setFlightForm({ ...flightForm, direct: e.target.checked })} />
            Vuelo directo (sin escalas)
          </label>
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">Agregar vuelo</button>
        </form>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Transporte desde/hacia el establecimiento</h3>
        <p className="mt-1 text-sm text-slate-400">Agrega las opciones de transporte disponibles (taxi, transporte público, servicio privado, alquiler de vehículos).</p>
        <ul className="mt-4 space-y-2">
          {transportOptions.map((option) => (
            <li key={option.id} className="flex items-center justify-between gap-3 rounded-xl border border-forest-700 bg-forest-900 p-3">
              <p className="min-w-0 truncate text-sm text-slate-200">
                <span className="text-lg">{option.icon}</span> <span className="font-semibold">{option.title}</span> · {option.subtitle} · {option.duration}
              </p>
              <button
                type="button"
                onClick={() => handleDeleteTransportOption(option.id)}
                className="shrink-0 rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10"
              >
                Eliminar
              </button>
            </li>
          ))}
          {transportOptions.length === 0 ? <p className="text-sm text-slate-500">Aún no hay opciones de transporte cargadas.</p> : null}
        </ul>
        <form onSubmit={handleTransportOptionSubmit} className="mt-4 grid gap-3 border-t border-forest-700 pt-4 sm:grid-cols-[70px_1fr_1fr]">
          <input className={inputClass} placeholder="Ícono" value={transportOptionForm.icon} onChange={(e) => setTransportOptionForm({ ...transportOptionForm, icon: e.target.value })} />
          <input className={inputClass} placeholder="Título (ej. Taxi)" value={transportOptionForm.title} onChange={(e) => setTransportOptionForm({ ...transportOptionForm, title: e.target.value })} />
          <input className={inputClass} placeholder="Detalle (ej. Disponible 24/7)" value={transportOptionForm.subtitle} onChange={(e) => setTransportOptionForm({ ...transportOptionForm, subtitle: e.target.value })} />
          <input className={`${inputClass} sm:col-span-3`} placeholder="Duración (ej. 10 min al centro)" value={transportOptionForm.duration} onChange={(e) => setTransportOptionForm({ ...transportOptionForm, duration: e.target.value })} />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-3">Agregar opción de transporte</button>
        </form>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Noticias y actualizaciones</h3>
        <ul className="mt-4 space-y-2">
          {news.map((item) => (
            <li key={item.id} className="flex items-start justify-between gap-3 rounded-xl border border-forest-700 bg-forest-900 p-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                <p className="mt-1 text-sm text-slate-400">{item.description}</p>
              </div>
              <button type="button" onClick={() => handleDeleteNews(item.id)} className="shrink-0 rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10">
                Eliminar
              </button>
            </li>
          ))}
          {news.length === 0 ? <p className="text-sm text-slate-500">Aún no hay noticias cargadas.</p> : null}
        </ul>
        <form onSubmit={handleNewsSubmit} className="mt-4 grid gap-3 border-t border-forest-700 pt-4">
          <input className={inputClass} placeholder="Título (ej. Nuevas rutas)" value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} />
          <textarea className={inputClass} placeholder="Descripción breve" value={newsForm.description} onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })} />
          <ImageUploadField value={newsForm.imageUrl} onChange={(value) => setNewsForm({ ...newsForm, imageUrl: value })} />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition">Agregar noticia</button>
        </form>
      </div>

      <PrestadorProfileEditor prestadorId={prestadorId} category={categoryKey} />
    </div>
  );
}
