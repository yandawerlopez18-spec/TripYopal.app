"use client";

import { useState } from "react";
import {
  addAgendaItem,
  addAlly,
  addEventFeature,
  deleteAgendaItem,
  deleteAlly,
  deleteEventFeature,
  featuredEvents,
  updateEvent,
} from "../../services/content";
import type { EventItem } from "../../types";
import ImageUploadField from "../admin/ImageUploadField";

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";
const sectionClass = "mt-6 rounded-2xl border border-forest-700 bg-forest-950 p-5";

export default function EventoOwnerEditor({ eventId, onSaved }: { eventId: string; onSaved: () => void }) {
  const event = featuredEvents.find((entry) => entry.id === eventId);

  const [generalForm, setGeneralForm] = useState<{
    title: string;
    category: string;
    date: string;
    time: string;
    endTime: string;
    modality: string;
    place: string;
    address: string;
    organizer: string;
    contactPhone: string;
    contactEmail: string;
    imageUrl: string;
    description: string;
    longDescription: string;
    featured: boolean;
  }>(() => ({
    title: event?.title ?? "",
    category: event?.category ?? "",
    date: event?.date ?? "",
    time: event?.time ?? "",
    endTime: event?.endTime ?? "",
    modality: event?.modality ?? "",
    place: event?.place ?? "",
    address: event?.address ?? "",
    organizer: event?.organizer ?? "",
    contactPhone: event?.contactPhone ?? "",
    contactEmail: event?.contactEmail ?? "",
    imageUrl: event?.imageUrl ?? "",
    description: event?.description ?? "",
    longDescription: event?.longDescription ?? "",
    featured: event?.featured ?? false,
  }));
  const [generalMessage, setGeneralMessage] = useState("");

  const [featureForm, setFeatureForm] = useState({ icon: "", label: "" });
  const [agendaForm, setAgendaForm] = useState({ time: "", title: "", description: "", imageUrl: "" });
  const [allyForm, setAllyForm] = useState({ name: "", subtitle: "", imageUrl: "" });
  const [whyAttendInput, setWhyAttendInput] = useState("");

  if (!event) return null;

  const features = event.features ?? [];
  const agenda = event.agenda ?? [];
  const allies = event.allies ?? [];
  const whyAttend = event.whyAttend ?? [];

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateEvent(eventId, {
      title: generalForm.title || event.title,
      category: generalForm.category,
      date: generalForm.date || event.date,
      time: generalForm.time,
      endTime: generalForm.endTime,
      modality: generalForm.modality,
      place: generalForm.place || event.place,
      address: generalForm.address,
      organizer: generalForm.organizer,
      contactPhone: generalForm.contactPhone,
      contactEmail: generalForm.contactEmail,
      imageUrl: generalForm.imageUrl,
      description: generalForm.description,
      longDescription: generalForm.longDescription,
      featured: generalForm.featured,
    } satisfies Partial<Omit<EventItem, "id">>);
    setGeneralMessage("Información guardada.");
    onSaved();
  };

  const handleFeatureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!featureForm.label) return;
    await addEventFeature(eventId, { icon: featureForm.icon || "✨", label: featureForm.label });
    setFeatureForm({ icon: "", label: "" });
    onSaved();
  };

  const handleDeleteFeature = async (featureId: string) => {
    await deleteEventFeature(eventId, featureId);
    onSaved();
  };

  const handleAgendaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agendaForm.time || !agendaForm.title) return;
    await addAgendaItem(eventId, {
      time: agendaForm.time,
      title: agendaForm.title,
      description: agendaForm.description || undefined,
      imageUrl: agendaForm.imageUrl || undefined,
    });
    setAgendaForm({ time: "", title: "", description: "", imageUrl: "" });
    onSaved();
  };

  const handleDeleteAgenda = async (itemId: string) => {
    await deleteAgendaItem(eventId, itemId);
    onSaved();
  };

  const handleAllySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allyForm.name) return;
    await addAlly(eventId, { name: allyForm.name, subtitle: allyForm.subtitle || undefined, imageUrl: allyForm.imageUrl || undefined });
    setAllyForm({ name: "", subtitle: "", imageUrl: "" });
    onSaved();
  };

  const handleDeleteAlly = async (allyId: string) => {
    await deleteAlly(eventId, allyId);
    onSaved();
  };

  const handleAddWhyAttend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whyAttendInput.trim()) return;
    await updateEvent(eventId, { whyAttend: [...whyAttend, whyAttendInput.trim()] });
    setWhyAttendInput("");
    onSaved();
  };

  const removeWhyAttend = async (reason: string) => {
    await updateEvent(eventId, { whyAttend: whyAttend.filter((entry) => entry !== reason) });
    onSaved();
  };

  return (
    <div className="mt-6 rounded-3xl border border-brand-500/40 bg-forest-900 p-6">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-brand-400" />
        <h2 className="text-lg font-bold text-slate-100">Panel del administrador del evento</h2>
      </div>
      <p className="mt-1 text-sm text-slate-400">
        Este panel solo lo ves tú, como organizador de este evento. Agrega, edita o elimina cualquier sección para que se refleje en la página pública.
      </p>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Información principal</h3>
        <form onSubmit={handleGeneralSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
          <input className={inputClass} placeholder="Título del evento" value={generalForm.title} onChange={(e) => setGeneralForm({ ...generalForm, title: e.target.value })} />
          <input className={inputClass} placeholder="Categoría (ej. Gastronomía)" value={generalForm.category} onChange={(e) => setGeneralForm({ ...generalForm, category: e.target.value })} />
          <input className={inputClass} type="date" value={generalForm.date} onChange={(e) => setGeneralForm({ ...generalForm, date: e.target.value })} />
          <input className={inputClass} placeholder="Modalidad (Presencial/Virtual)" value={generalForm.modality} onChange={(e) => setGeneralForm({ ...generalForm, modality: e.target.value })} />
          <input className={inputClass} placeholder="Hora inicio (ej. 4:00 p.m.)" value={generalForm.time} onChange={(e) => setGeneralForm({ ...generalForm, time: e.target.value })} />
          <input className={inputClass} placeholder="Hora fin (ej. 11:00 p.m.)" value={generalForm.endTime} onChange={(e) => setGeneralForm({ ...generalForm, endTime: e.target.value })} />
          <input className={inputClass} placeholder="Lugar (ej. Plaza principal de Yopal)" value={generalForm.place} onChange={(e) => setGeneralForm({ ...generalForm, place: e.target.value })} />
          <input className={inputClass} placeholder="Dirección (ej. Carrera 20 con Calle 8)" value={generalForm.address} onChange={(e) => setGeneralForm({ ...generalForm, address: e.target.value })} />
          <input className={inputClass} placeholder="Organiza (ej. Alcaldía de Yopal)" value={generalForm.organizer} onChange={(e) => setGeneralForm({ ...generalForm, organizer: e.target.value })} />
          <input className={inputClass} placeholder="Teléfono de contacto" value={generalForm.contactPhone} onChange={(e) => setGeneralForm({ ...generalForm, contactPhone: e.target.value })} />
          <input className={`${inputClass} sm:col-span-2`} placeholder="Correo de contacto" type="email" value={generalForm.contactEmail} onChange={(e) => setGeneralForm({ ...generalForm, contactEmail: e.target.value })} />
          <textarea className={`${inputClass} sm:col-span-2`} placeholder="Descripción breve (subtítulo)" value={generalForm.description} onChange={(e) => setGeneralForm({ ...generalForm, description: e.target.value })} />
          <textarea className={`${inputClass} sm:col-span-2`} placeholder="Descripción completa" value={generalForm.longDescription} onChange={(e) => setGeneralForm({ ...generalForm, longDescription: e.target.value })} />
          <label className="flex items-center gap-2 rounded-2xl border border-forest-700 bg-forest-900 px-4 py-3 text-sm text-slate-300 sm:col-span-2">
            <input type="checkbox" checked={generalForm.featured} onChange={(e) => setGeneralForm({ ...generalForm, featured: e.target.checked })} />
            Marcar como evento destacado
          </label>
          <div className="sm:col-span-2">
            <p className="mb-2 text-xs text-slate-400">Foto principal</p>
            <ImageUploadField value={generalForm.imageUrl} onChange={(value) => setGeneralForm({ ...generalForm, imageUrl: value })} />
          </div>
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">Guardar información principal</button>
          {generalMessage ? <p className="text-sm text-brand-400 sm:col-span-2">{generalMessage}</p> : null}
        </form>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">¿Qué encontrarás?</h3>
        <p className="mt-1 text-sm text-slate-400">Agrega las actividades o atractivos que tendrá tu evento.</p>
        <ul className="mt-4 space-y-2">
          {features.map((feature) => (
            <li key={feature.id} className="flex items-center justify-between gap-3 rounded-xl border border-forest-700 bg-forest-900 p-3">
              <p className="flex items-center gap-2 text-sm text-slate-200">
                <span className="text-lg">{feature.icon}</span> {feature.label}
              </p>
              <button type="button" onClick={() => handleDeleteFeature(feature.id)} className="shrink-0 rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10">
                Eliminar
              </button>
            </li>
          ))}
          {features.length === 0 ? <p className="text-sm text-slate-500">Aún no hay elementos cargados.</p> : null}
        </ul>
        <form onSubmit={handleFeatureSubmit} className="mt-4 grid gap-3 border-t border-forest-700 pt-4 sm:grid-cols-[80px_1fr]">
          <input className={inputClass} placeholder="Ícono (emoji)" value={featureForm.icon} onChange={(e) => setFeatureForm({ ...featureForm, icon: e.target.value })} />
          <input className={inputClass} placeholder="Ej. Platos típicos de la región" value={featureForm.label} onChange={(e) => setFeatureForm({ ...featureForm, label: e.target.value })} />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">Agregar elemento</button>
        </form>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Agenda del evento</h3>
        <p className="mt-1 text-sm text-slate-400">Agrega el cronograma de actividades del evento.</p>
        <ul className="mt-4 space-y-2">
          {agenda.map((item) => (
            <li key={item.id} className="flex items-start justify-between gap-3 rounded-xl border border-forest-700 bg-forest-900 p-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-100">{item.time} · {item.title}</p>
                {item.description ? <p className="mt-1 text-sm text-slate-300">{item.description}</p> : null}
              </div>
              <button type="button" onClick={() => handleDeleteAgenda(item.id)} className="shrink-0 rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10">
                Eliminar
              </button>
            </li>
          ))}
          {agenda.length === 0 ? <p className="text-sm text-slate-500">Aún no hay agenda cargada.</p> : null}
        </ul>
        <form onSubmit={handleAgendaSubmit} className="mt-4 grid gap-3 border-t border-forest-700 pt-4 sm:grid-cols-2">
          <input className={inputClass} placeholder="Hora (ej. 4:00 p.m.)" value={agendaForm.time} onChange={(e) => setAgendaForm({ ...agendaForm, time: e.target.value })} />
          <input className={inputClass} placeholder="Título (ej. Apertura del festival)" value={agendaForm.title} onChange={(e) => setAgendaForm({ ...agendaForm, title: e.target.value })} />
          <ImageUploadField className="sm:col-span-2" value={agendaForm.imageUrl} onChange={(value) => setAgendaForm({ ...agendaForm, imageUrl: value })} />
          <textarea className={`${inputClass} sm:col-span-2`} placeholder="Descripción breve" value={agendaForm.description} onChange={(e) => setAgendaForm({ ...agendaForm, description: e.target.value })} />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">Agregar a la agenda</button>
        </form>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Organizadores y aliados</h3>
        <p className="mt-1 text-sm text-slate-400">Agrega las organizaciones que apoyan o participan en tu evento.</p>
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
          {allies.length === 0 ? <p className="text-sm text-slate-500">Aún no hay organizadores cargados.</p> : null}
        </ul>
        <form onSubmit={handleAllySubmit} className="mt-4 grid gap-3 border-t border-forest-700 pt-4 sm:grid-cols-2">
          <input className={inputClass} placeholder="Nombre (ej. Alcaldía de Yopal)" value={allyForm.name} onChange={(e) => setAllyForm({ ...allyForm, name: e.target.value })} />
          <input className={inputClass} placeholder="Detalle (ej. Secretaría de Cultura y Turismo)" value={allyForm.subtitle} onChange={(e) => setAllyForm({ ...allyForm, subtitle: e.target.value })} />
          <ImageUploadField className="sm:col-span-2" value={allyForm.imageUrl} onChange={(value) => setAllyForm({ ...allyForm, imageUrl: value })} />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">Agregar organizador</button>
        </form>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">¿Por qué asistir?</h3>
        <p className="mt-1 text-sm text-slate-400">Agrega razones para animar a los visitantes a asistir a tu evento.</p>
        <ul className="mt-4 space-y-2">
          {whyAttend.map((reason) => (
            <li key={reason} className="flex items-center justify-between gap-3 rounded-xl border border-forest-700 bg-forest-900 p-3">
              <p className="text-sm text-slate-200">{reason}</p>
              <button type="button" onClick={() => removeWhyAttend(reason)} className="shrink-0 rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10">
                Eliminar
              </button>
            </li>
          ))}
          {whyAttend.length === 0 ? <p className="text-sm text-slate-500">Aún no hay razones cargadas.</p> : null}
        </ul>
        <form onSubmit={handleAddWhyAttend} className="mt-4 flex gap-2 border-t border-forest-700 pt-4">
          <input className={`${inputClass} flex-1`} placeholder="Ej. Disfruta de los mejores sabores locales" value={whyAttendInput} onChange={(e) => setWhyAttendInput(e.target.value)} />
          <button className="btn-gradient shrink-0 rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition">Agregar razón</button>
        </form>
      </div>
    </div>
  );
}
