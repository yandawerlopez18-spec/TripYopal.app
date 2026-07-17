"use client";

import { useState } from "react";
import {
  addClimateTip,
  addEmergencyContact,
  addSafetyPoint,
  addTip,
  climateTips,
  deleteClimateTip,
  deleteEmergencyContact,
  deleteSafetyPoint,
  deleteTip,
  emergencyContacts,
  safetyPoints,
  siteContent,
  tips,
  updateClimateTip,
  updateCta,
  updateContact,
  updateEmergencyContact,
  updateOffer,
  updateSafetyPoint,
  updateTip,
} from "../../services/siteContent";
import SiteListManager from "./SiteListManager";

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-forest-700 bg-forest-950 p-5">
      <h3 className="font-semibold text-slate-100">{title}</h3>
      {children}
    </div>
  );
}

function SaveButton({ message }: { message: string }) {
  return (
    <div className="mt-4 flex items-center gap-3 sm:col-span-2">
      <button type="submit" className="btn-brand-font rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-forest-950 transition hover:bg-brand-400">
        Guardar
      </button>
      {message ? <p className="text-sm text-brand-400">{message}</p> : null}
    </div>
  );
}

function SafetyManager() {
  return (
    <SiteListManager
      title="Seguridad"
      emptyMessage="Aún no hay puntos de seguridad cargados."
      addButtonLabel="Agregar punto de seguridad"
      items={safetyPoints}
      fields={[
        { key: "type", label: "Tipo (ej. Estación de Policía, CAI, Línea de emergencia)", required: true },
        { key: "name", label: "Nombre", required: true },
        { key: "address", label: "Dirección (opcional)" },
        { key: "phone", label: "Teléfono (opcional)" },
      ]}
      summary={(point) => ({ primary: `${point.type} · ${point.name}`, secondary: point.address ?? point.phone })}
      onAdd={(values) => addSafetyPoint({ type: values.type, name: values.name, address: values.address || undefined, phone: values.phone || undefined })}
      onUpdate={(id, values) => updateSafetyPoint(id, { type: values.type, name: values.name, address: values.address || undefined, phone: values.phone || undefined })}
      onDelete={(id) => deleteSafetyPoint(id)}
    />
  );
}

function EmergencyManager() {
  return (
    <SiteListManager
      title="Emergencias"
      emptyMessage="Aún no hay contactos de emergencia cargados."
      addButtonLabel="Agregar contacto de emergencia"
      items={emergencyContacts}
      fields={[
        { key: "type", label: "Tipo (ej. Hospital, Bomberos)", required: true },
        { key: "name", label: "Nombre", required: true },
        { key: "address", label: "Dirección (opcional)" },
        { key: "phone", label: "Teléfono (opcional)" },
      ]}
      summary={(contact) => ({ primary: `${contact.type} · ${contact.name}`, secondary: contact.address ?? contact.phone })}
      onAdd={(values) => addEmergencyContact({ type: values.type, name: values.name, address: values.address || undefined, phone: values.phone || undefined })}
      onUpdate={(id, values) => updateEmergencyContact(id, { type: values.type, name: values.name, address: values.address || undefined, phone: values.phone || undefined })}
      onDelete={(id) => deleteEmergencyContact(id)}
    />
  );
}

function TipsManager() {
  return (
    <SiteListManager
      title="Recomendaciones"
      emptyMessage="Aún no hay recomendaciones cargadas."
      addButtonLabel="Agregar recomendación"
      items={tips}
      fields={[
        { key: "category", label: "Categoría (ej. Qué llevar, Qué cuidar)", required: true },
        { key: "text", label: "Texto", required: true, multiline: true },
      ]}
      summary={(tip) => ({ primary: tip.category, secondary: tip.text })}
      onAdd={(values) => addTip({ category: values.category, text: values.text })}
      onUpdate={(id, values) => updateTip(id, { category: values.category, text: values.text })}
      onDelete={(id) => deleteTip(id)}
    />
  );
}

function ClimateManager() {
  return (
    <SiteListManager
      title="Clima: mejores temporadas para visitar"
      emptyMessage="Aún no hay temporadas cargadas."
      addButtonLabel="Agregar temporada"
      items={climateTips}
      fields={[
        { key: "season", label: "Temporada (ej. Diciembre a Marzo)", required: true },
        { key: "description", label: "Descripción", required: true, multiline: true },
      ]}
      summary={(tip) => ({ primary: tip.season, secondary: tip.description })}
      onAdd={(values) => addClimateTip({ season: values.season, description: values.description })}
      onUpdate={(id, values) => updateClimateTip(id, { season: values.season, description: values.description })}
      onDelete={(id) => deleteClimateTip(id)}
    />
  );
}

function OfferForm() {
  const [form, setForm] = useState(siteContent.offer);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateOffer(form);
    setMessage('Sección "Nuestra oferta" actualizada.');
  };

  return (
    <SectionCard title='Sección "Nuestra oferta" (Descubre la diversidad de Casanare)'>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
        <input className={inputClass} placeholder="Texto superior (eyebrow)" value={form.eyebrow} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} />
        <input className={inputClass} placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea className={inputClass} placeholder="Descripción" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <SaveButton message={message} />
      </form>
    </SectionCard>
  );
}

function CtaForm() {
  const [form, setForm] = useState(siteContent.cta);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCta(form);
    setMessage('Mensaje de "Listo para explorar" actualizado.');
  };

  return (
    <SectionCard title='Mensaje de la sección "Listo para explorar"'>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
        <input className={inputClass} placeholder="Texto superior (eyebrow)" value={form.eyebrow} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} />
        <textarea className={inputClass} placeholder="Mensaje principal" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <SaveButton message={message} />
      </form>
    </SectionCard>
  );
}

function ContactForm() {
  const [form, setForm] = useState(siteContent.contact);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact(form);
    setMessage("Información de contacto actualizada.");
  };

  return (
    <SectionCard title="Información de contacto (footer)">
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
        <input className={`${inputClass} sm:col-span-2`} placeholder="Dirección" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <input className={inputClass} placeholder="Teléfono" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input className={inputClass} placeholder="Instagram" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} />
        <input
          className={`${inputClass} sm:col-span-2`}
          placeholder="Email"
          type="email"
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <SaveButton message={message} />
      </form>
    </SectionCard>
  );
}

export default function SiteContentManager() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-400">
        Edita los textos e información de las secciones fijas de la página principal: seguridad, emergencias, recomendaciones, clima, el mensaje de &quot;Listo para explorar&quot; y los datos de contacto del pie de página.
      </p>
      <TipsManager />
      <SafetyManager />
      <EmergencyManager />
      <ClimateManager />
      <OfferForm />
      <CtaForm />
      <ContactForm />
    </div>
  );
}
