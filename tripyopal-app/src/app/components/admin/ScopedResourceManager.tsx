"use client";

import { useState } from "react";
import { listPrestadores, updatePrestador } from "../../services/prestadores";
import { featuredEvents, featuredPlaces, featuredRoutes, updateEvent, updatePlace, updateRoute } from "../../services/content";
import type { AdminScope } from "../../types/roles";
import ImageUploadField from "./ImageUploadField";
import PrestadorItemsSection from "./PrestadorItemsSection";
import PrestadorProfileEditor from "./PrestadorProfileEditor";

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";

function NotLinked({ resourceName, typeLabel }: { resourceName: string; typeLabel: string }) {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-forest-700 bg-forest-950 p-6 text-center">
      <p className="text-slate-300">
        Tu cuenta está asignada a {typeLabel} &quot;{resourceName}&quot;, pero no encontramos ese registro en la plataforma.
      </p>
      <p className="mt-2 text-sm text-slate-500">
        Pide al superadministrador que verifique la asignación desde el panel de Administradores.
      </p>
    </div>
  );
}

function PrestadorPanel({ scope }: { scope: AdminScope }) {
  const [, setRefreshKey] = useState(0);
  const prestador = listPrestadores().find((p) => p.id === scope.resourceId);
  const [form, setForm] = useState(() => ({
    name: prestador?.name ?? "",
    description: prestador?.description ?? "",
    address: prestador?.address ?? "",
    phone: prestador?.phone ?? "",
    instagram: prestador?.instagram ?? "",
    schedule: prestador?.schedule ?? "",
    priceRange: prestador?.priceRange ?? "",
    imageUrl: prestador?.imageUrl ?? "",
  }));
  const [message, setMessage] = useState("");

  if (!prestador) {
    return <NotLinked resourceName={scope.resourceName} typeLabel="el negocio" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updatePrestador(prestador.id, {
      name: form.name,
      description: form.description,
      address: form.address,
      phone: form.phone,
      instagram: form.instagram,
      schedule: form.schedule,
      priceRange: form.priceRange,
      imageUrl: form.imageUrl,
    });

    setMessage("Cambios guardados. Ya se reflejan en la página web.");
    setRefreshKey((key) => key + 1);
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="mt-6 grid gap-3 sm:grid-cols-2">
      <input
        className={`${inputClass} sm:col-span-2`}
        placeholder="Nombre del negocio"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <ImageUploadField className="sm:col-span-2" value={form.imageUrl} onChange={(value) => setForm({ ...form, imageUrl: value })} />
      <textarea
        className={`${inputClass} sm:col-span-2`}
        placeholder="Descripción (hoja de vida del negocio)"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        className={inputClass}
        placeholder="Dirección"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <input
        className={inputClass}
        placeholder="Teléfono"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <input
        className={inputClass}
        placeholder="Instagram (usuario o enlace)"
        value={form.instagram}
        onChange={(e) => setForm({ ...form, instagram: e.target.value })}
      />
      <input
        className={inputClass}
        placeholder="Horario de atención"
        value={form.schedule}
        onChange={(e) => setForm({ ...form, schedule: e.target.value })}
      />
      <select
        className={`${inputClass} sm:col-span-2`}
        value={form.priceRange}
        onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
      >
        <option value="">Rango de precios</option>
        <option value="Bajo">Bajo</option>
        <option value="Medio">Medio</option>
        <option value="Alto">Alto</option>
      </select>
      <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">
        Guardar cambios
      </button>
      {message ? <p className="text-sm text-brand-400 sm:col-span-2">{message}</p> : null}
    </form>
    <PrestadorItemsSection prestadorId={prestador.id} category={prestador.category} />
    <PrestadorProfileEditor prestadorId={prestador.id} category={prestador.category} />
    </>
  );
}

function PlacePanel({ scope }: { scope: AdminScope }) {
  const [, setRefreshKey] = useState(0);
  const place = featuredPlaces.find((p) => p.id === scope.resourceId);
  const [form, setForm] = useState(() => ({
    name: place?.name ?? "",
    description: place?.description ?? "",
    price: place?.price ?? "",
    location: place?.location ?? "",
    imageUrl: place?.imageUrl ?? "",
  }));
  const [message, setMessage] = useState("");

  if (!place) {
    return <NotLinked resourceName={scope.resourceName} typeLabel="el lugar turístico" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updatePlace(place.id, {
      name: form.name,
      description: form.description,
      price: form.price,
      location: form.location,
      imageUrl: form.imageUrl,
    });

    setMessage("Cambios guardados. Ya se reflejan en la página web.");
    setRefreshKey((key) => key + 1);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-3 sm:grid-cols-2">
      <input
        className={`${inputClass} sm:col-span-2`}
        placeholder="Nombre"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <ImageUploadField className="sm:col-span-2" value={form.imageUrl} onChange={(value) => setForm({ ...form, imageUrl: value })} />
      <input
        className={inputClass}
        placeholder="Precio (Gratis / Bajo / Medio / Alto)"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        className={inputClass}
        placeholder="Ubicación (opcional)"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />
      <textarea
        className={`${inputClass} sm:col-span-2`}
        placeholder="Descripción"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">
        Guardar cambios
      </button>
      {message ? <p className="text-sm text-brand-400 sm:col-span-2">{message}</p> : null}
    </form>
  );
}

function EventPanel({ scope }: { scope: AdminScope }) {
  const [, setRefreshKey] = useState(0);
  const event = featuredEvents.find((e) => e.id === scope.resourceId);
  const [form, setForm] = useState(() => ({
    title: event?.title ?? "",
    date: event?.date ?? "",
    place: event?.place ?? "",
    description: event?.description ?? "",
    time: event?.time ?? "",
    modality: event?.modality ?? "",
    imageUrl: event?.imageUrl ?? "",
  }));
  const [message, setMessage] = useState("");

  if (!event) {
    return <NotLinked resourceName={scope.resourceName} typeLabel="el evento" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateEvent(event.id, {
      title: form.title,
      date: form.date,
      place: form.place,
      description: form.description,
      time: form.time,
      modality: form.modality,
      imageUrl: form.imageUrl,
    });

    setMessage("Cambios guardados. Ya se reflejan en la página web.");
    setRefreshKey((key) => key + 1);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-3 sm:grid-cols-2">
      <input
        className={inputClass}
        placeholder="Título"
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        className={inputClass}
        type="date"
        required
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <input
        className={inputClass}
        placeholder="Hora (opcional)"
        value={form.time}
        onChange={(e) => setForm({ ...form, time: e.target.value })}
      />
      <input
        className={inputClass}
        placeholder="Modalidad (Presencial/Virtual)"
        value={form.modality}
        onChange={(e) => setForm({ ...form, modality: e.target.value })}
      />
      <input
        className={`${inputClass} sm:col-span-2`}
        placeholder="Lugar"
        required
        value={form.place}
        onChange={(e) => setForm({ ...form, place: e.target.value })}
      />
      <ImageUploadField className="sm:col-span-2" value={form.imageUrl} onChange={(value) => setForm({ ...form, imageUrl: value })} />
      <textarea
        className={`${inputClass} sm:col-span-2`}
        placeholder="Descripción"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">
        Guardar cambios
      </button>
      {message ? <p className="text-sm text-brand-400 sm:col-span-2">{message}</p> : null}
    </form>
  );
}

function RoutePanel({ scope }: { scope: AdminScope }) {
  const [, setRefreshKey] = useState(0);
  const route = featuredRoutes.find((r) => r.id === scope.resourceId);
  const [form, setForm] = useState(() => ({
    name: route?.name ?? "",
    duration: route?.duration ?? "",
    budget: route?.budget ?? "",
    description: route?.description ?? "",
    imageUrl: route?.imageUrl ?? "",
  }));
  const [message, setMessage] = useState("");

  if (!route) {
    return <NotLinked resourceName={scope.resourceName} typeLabel="la ruta" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateRoute(route.id, {
      name: form.name,
      duration: form.duration,
      budget: form.budget,
      description: form.description,
      imageUrl: form.imageUrl,
    });

    setMessage("Cambios guardados. Ya se reflejan en la página web.");
    setRefreshKey((key) => key + 1);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-3 sm:grid-cols-2">
      <input
        className={inputClass}
        placeholder="Nombre"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className={inputClass}
        placeholder="Duración"
        value={form.duration}
        onChange={(e) => setForm({ ...form, duration: e.target.value })}
      />
      <input
        className={inputClass}
        placeholder="Presupuesto (Bajo/Medio/Alto)"
        value={form.budget}
        onChange={(e) => setForm({ ...form, budget: e.target.value })}
      />
      <ImageUploadField className="sm:col-span-2" value={form.imageUrl} onChange={(value) => setForm({ ...form, imageUrl: value })} />
      <textarea
        className={`${inputClass} sm:col-span-2`}
        placeholder="Descripción"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">
        Guardar cambios
      </button>
      {message ? <p className="text-sm text-brand-400 sm:col-span-2">{message}</p> : null}
    </form>
  );
}

export default function ScopedResourceManager({ scope }: { scope: AdminScope }) {
  if (scope.resourceType === "prestador") return <PrestadorPanel scope={scope} />;
  if (scope.resourceType === "lugar") return <PlacePanel scope={scope} />;
  if (scope.resourceType === "evento") return <EventPanel scope={scope} />;
  return <RoutePanel scope={scope} />;
}
