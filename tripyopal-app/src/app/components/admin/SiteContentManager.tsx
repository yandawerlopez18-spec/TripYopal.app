"use client";

import { useEffect, useRef, useState } from "react";
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
  updateHero,
  updateOffer,
  updateSafetyPoint,
  updateSiteImages,
  updateSocial,
  updateTip,
} from "../../services/siteContent";
import { BUSINESS_CATEGORIES } from "../home/categoryIcons";
import ImageUploadField from "./ImageUploadField";
import SectionTextEditor from "./SectionTextEditor";
import SiteListManager from "./SiteListManager";

const specialSidebarLinks = [
  { key: "eventos", label: "Eventos" },
  { key: "rutas", label: "Rutas" },
  { key: "clima", label: "Clima" },
];

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
      <button type="submit" className="btn-brand-font btn-gradient rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition">
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
      onUpdate={(id, values) => updateSafetyPoint(id, { type: values.type, name: values.name, address: values.address, phone: values.phone })}
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
      onUpdate={(id, values) => updateEmergencyContact(id, { type: values.type, name: values.name, address: values.address, phone: values.phone })}
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateOffer(form);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCta(form);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateContact(form);
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

function HeroForm() {
  const [form, setForm] = useState(siteContent.hero);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHero(form);
    setMessage("Sección principal (hero) actualizada.");
  };

  return (
    <SectionCard title="Sección principal (hero) de la página de inicio">
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
        <input className={inputClass} placeholder="Texto de la insignia superior" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
        <input className={inputClass} placeholder="Título principal" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea className={inputClass} placeholder="Subtítulo" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
        <div>
          <p className="mb-2 text-sm font-medium text-slate-300">Imagen de fondo</p>
          <ImageUploadField value={form.backgroundImage} onChange={(value) => setForm({ ...form, backgroundImage: value })} />
        </div>
        <input
          className={inputClass}
          placeholder="URL del video promocional (botón &quot;Ver video&quot;, opcional)"
          value={form.videoUrl}
          onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
        />
        <SaveButton message={message} />
      </form>
    </SectionCard>
  );
}

function SiteImagesForm() {
  const [form, setForm] = useState(siteContent.images);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteImages(form);
    setMessage("Imágenes del sitio actualizadas.");
  };

  return (
    <SectionCard title="Imágenes ilustrativas del sitio">
      <p className="mt-1 text-sm text-slate-400">Estas imágenes se repiten en varias secciones (clima, recomendaciones, mascota de TripYopal, chat).</p>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium text-slate-300">Ilustración de clima</p>
          <ImageUploadField value={form.weatherIllustration} onChange={(value) => setForm({ ...form, weatherIllustration: value })} />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-slate-300">Ilustración de recomendaciones</p>
          <ImageUploadField value={form.recommendationsIllustration} onChange={(value) => setForm({ ...form, recommendationsIllustration: value })} />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-slate-300">Mascota de TripYopal (capibara)</p>
          <ImageUploadField value={form.mascot} onChange={(value) => setForm({ ...form, mascot: value })} />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-slate-300">Imagen del botón de chat</p>
          <ImageUploadField value={form.chatWidget} onChange={(value) => setForm({ ...form, chatWidget: value })} />
        </div>
        <SaveButton message={message} />
      </form>
    </SectionCard>
  );
}

function SocialForm() {
  const [form, setForm] = useState(siteContent.social);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSocial(form);
    setMessage("Redes sociales actualizadas.");
  };

  return (
    <SectionCard title="Redes sociales (footer)">
      <p className="mt-1 text-sm text-slate-400">Pega la URL completa de cada red; déjalo vacío para que el ícono no lleve a ningún lado.</p>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
        <input className={inputClass} placeholder="Facebook (URL)" value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value })} />
        <input className={inputClass} placeholder="Instagram (URL)" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} />
        <input className={inputClass} placeholder="Gmail (mailto: o URL)" value={form.gmail} onChange={(e) => setForm({ ...form, gmail: e.target.value })} />
        <input className={inputClass} placeholder="X / Twitter (URL)" value={form.x} onChange={(e) => setForm({ ...form, x: e.target.value })} />
        <input className={inputClass} placeholder="WhatsApp (URL, ej. https://wa.me/57...)" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
        <SaveButton message={message} />
      </form>
    </SectionCard>
  );
}

function SectionGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-400">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function SectionPicker({
  options,
  value,
  onChange,
}: {
  options: { key: string; label: string }[];
  value: string | null;
  onChange: (key: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const filtered = options.filter((opt) => opt.label.toLowerCase().includes(query.trim().toLowerCase()));
  const activeLabel = options.find((opt) => opt.key === value)?.label;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3.5 text-left text-sm font-semibold text-slate-100 transition hover:border-brand-400"
      >
        {activeLabel ?? "Selecciona la sección que quieres editar..."}
        <svg viewBox="0 0 24 24" fill="none" className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-forest-700 bg-forest-950 shadow-xl">
          <div className="border-b border-forest-700 p-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar sección..."
              className="w-full rounded-xl border border-forest-700 bg-forest-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
            />
          </div>
          <div className="max-h-80 overflow-y-auto p-1.5">
            {filtered.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => {
                  onChange(opt.key);
                  setOpen(false);
                  setQuery("");
                }}
                className={`block w-full rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  opt.key === value ? "bg-brand-500/10 font-semibold text-brand-400" : "text-slate-300 hover:bg-forest-800"
                }`}
              >
                {opt.label}
              </button>
            ))}
            {filtered.length === 0 ? <p className="px-3 py-2.5 text-sm text-slate-500">Sin resultados.</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CategorySidebarForm() {
  const allLinks = [...BUSINESS_CATEGORIES.map((c) => ({ key: c.key, label: c.label })), ...specialSidebarLinks];
  return (
    <SectionTextEditor
      sectionKey="categorySidebar"
      title="Menú lateral de categorías"
      description="Título del menú y el nombre visible de cada categoría (el enlace y el ícono no cambian)."
      fields={[{ key: "title", label: "Título del menú (ej. Categorías)" }, ...allLinks.map((l) => ({ key: l.key, label: `Nombre para "${l.label}"` }))]}
      defaults={{ title: "Categorías", ...Object.fromEntries(allLinks.map((l) => [l.key, l.label])) }}
    />
  );
}

export default function SiteContentManager() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const groups: { key: string; label: string; content: React.ReactNode }[] = [
    {
      key: "principal",
      label: "Sección principal (barra de navegación y hero)",
      content: (
        <>
          <CategorySidebarForm />
          <HeroForm />
          <SectionTextEditor
            sectionKey="nextEvent"
            title="Apartado Próximo evento"
            fields={[
              { key: "title", label: "Título (ej. Próximo evento)" },
              { key: "buttonText", label: "Texto del botón (ej. Ver detalles)" },
            ]}
            defaults={{ title: "Próximo evento", buttonText: "Ver detalles" }}
          />
          <SectionTextEditor
            sectionKey="map"
            title="Apartado Mapa interactivo"
            fields={[
              { key: "title", label: "Título" },
              { key: "description", label: "Descripción", multiline: true },
              { key: "buttonText", label: "Texto del botón (ej. Abrir en Maps)" },
            ]}
            defaults={{ title: "Mapa Interactivo", description: "Explora la ciudad con un mapa en vivo vinculado a Google Maps.", buttonText: "Abrir en Maps" }}
          />
        </>
      ),
    },
    {
      key: "rutas",
      label: "Sección Rutas recomendadas",
      content: (
        <>
          <SectionTextEditor
            sectionKey="routes"
            title="Encabezado de la sección"
            fields={[
              { key: "eyebrow", label: "Texto superior (ej. Explora Yopal-Casanare)" },
              { key: "title", label: "Título — primera palabra (ej. Rutas)" },
              { key: "titleAccent", label: "Título — palabra en verde (ej. recomendadas)" },
              { key: "description", label: "Descripción", multiline: true },
            ]}
            defaults={{
              eyebrow: "Explora Yopal-Casanare",
              title: "Rutas",
              titleAccent: "recomendadas",
              description: "Organiza tu viaje con rutas sugeridas según tiempo, presupuesto e intereses.",
            }}
          />
          <SectionTextEditor
            sectionKey="routesGuide"
            title="Subtítulo de la guía de rutas"
            fields={[
              { key: "title", label: "Título (ej. Guía de rutas recomendadas)" },
              { key: "subtitle", label: "Descripción", multiline: true },
            ]}
            defaults={{ title: "Guía de rutas recomendadas", subtitle: "Planifica tu visita según el tiempo, el presupuesto y el tipo de experiencia que buscas." }}
          />
          <SectionTextEditor
            sectionKey="routesBadge1"
            title="Insignia 1 (ej. Rutas verificadas)"
            fields={[{ key: "title", label: "Título" }, { key: "description", label: "Descripción" }]}
            defaults={{ title: "Rutas verificadas", description: "Información confiable y actualizada" }}
          />
          <SectionTextEditor
            sectionKey="routesBadge2"
            title="Insignia 2 (ej. Experiencias auténticas)"
            fields={[{ key: "title", label: "Título" }, { key: "description", label: "Descripción" }]}
            defaults={{ title: "Experiencias auténticas", description: "Recomendadas por locales" }}
          />
          <SectionTextEditor
            sectionKey="routesBadge3"
            title="Insignia 3 (ej. Turismo responsable)"
            fields={[{ key: "title", label: "Título" }, { key: "description", label: "Descripción" }]}
            defaults={{ title: "Turismo responsable", description: "Cuida y respeta nuestro territorio" }}
          />
        </>
      ),
    },
    {
      key: "eventosVivo",
      label: "Sección Eventos en tiempo real",
      content: (
        <SectionTextEditor
          sectionKey="liveEvents"
          title="Encabezado y contenido"
          fields={[
            { key: "calendarButtonText", label: "Botón superior (ej. Ver calendario)" },
            { key: "eyebrow", label: "Texto superior (ej. Eventos en vivo)" },
            { key: "title", label: "Título — primera palabra (ej. Eventos)" },
            { key: "titleAccent", label: "Título — palabra en verde (ej. en tiempo real)" },
            { key: "subtitle", label: "Subtítulo" },
            { key: "footerTitle", label: "Texto del recuadro final (ej. No te pierdas)" },
            { key: "footerTitleAccent", label: "Texto en verde del recuadro (ej. ningún evento)" },
            { key: "footerDescription", label: "Descripción del recuadro final", multiline: true },
            { key: "buttonText", label: "Texto del botón final (ej. Ver todos los eventos)" },
          ]}
          defaults={{
            calendarButtonText: "Ver calendario",
            eyebrow: "Eventos en vivo",
            title: "Eventos",
            titleAccent: "en tiempo real",
            subtitle: "Descubre los eventos que están pasando en Yopal",
            footerTitle: "No te pierdas",
            footerTitleAccent: "ningún evento",
            footerDescription: "Explora todo lo que está pasando en Yopal, actualizado en tiempo real.",
            buttonText: "Ver todos los eventos",
          }}
        />
      ),
    },
    {
      key: "calendario",
      label: "Sección Calendario de eventos",
      content: (
        <SectionTextEditor
          sectionKey="calendar"
          title="Título, subtítulo y botón"
          fields={[
            { key: "title", label: "Título (ej. Calendario de eventos)" },
            { key: "subtitle", label: "Subtítulo" },
            { key: "buttonText", label: "Texto del botón (ej. Ver todos los eventos)" },
          ]}
          defaults={{ title: "Calendario de eventos", subtitle: "No te pierdas lo mejor de Yopal", buttonText: "Ver todos los eventos" }}
        />
      ),
    },
    {
      key: "clima",
      label: "Sección Clima y mejor época para visitar",
      content: (
        <SectionTextEditor
          sectionKey="weather"
          title="Título y subtítulo"
          description="La imagen se edita en 'Imágenes ilustrativas del sitio'. El recuadro que dice 'Ideal para...' se genera automáticamente según la temperatura del clima en vivo."
          fields={[
            { key: "title", label: "Título" },
            { key: "subtitle", label: "Subtítulo" },
          ]}
          defaults={{ title: "Clima y mejor época para visitar", subtitle: "Información actual para que planifiques mejor tu día." }}
        />
      ),
    },
    {
      key: "recomendaciones",
      label: "Sección Recomendaciones",
      content: (
        <SectionTextEditor
          sectionKey="recommendations"
          title="Título, subtítulo y botón"
          fields={[
            { key: "title", label: "Título" },
            { key: "subtitle", label: "Subtítulo" },
            { key: "buttonText", label: "Texto del botón" },
          ]}
          defaults={{ title: "Recomendaciones", subtitle: "Prepárate antes de salir", buttonText: "Ver más recomendaciones" }}
        />
      ),
    },
    {
      key: "seguridad",
      label: "Sección Seguridad",
      content: (
        <SectionTextEditor
          sectionKey="safety"
          title="Título, subtítulo y botón"
          fields={[
            { key: "title", label: "Título" },
            { key: "subtitle", label: "Subtítulo" },
            { key: "buttonText", label: "Texto del botón" },
          ]}
          defaults={{ title: "Seguridad", subtitle: "Tu bienestar es lo primero", buttonText: "Ver más información" }}
        />
      ),
    },
    {
      key: "emergencias",
      label: "Sección Emergencias",
      content: (
        <SectionTextEditor
          sectionKey="emergency"
          title="Título, subtítulo y botón"
          fields={[
            { key: "title", label: "Título" },
            { key: "subtitle", label: "Subtítulo" },
            { key: "buttonText", label: "Texto del botón" },
          ]}
          defaults={{ title: "Emergencias", subtitle: "Números importantes", buttonText: "Ver más información" }}
        />
      ),
    },
    {
      key: "oferta",
      label: "Sección Nuestra oferta (Descubre la diversidad de Casanare)",
      content: (
        <>
          <OfferForm />
          <SectionTextEditor
            sectionKey="offerBadge1"
            title="Insignia 1 (ej. Negocios verificados)"
            fields={[{ key: "title", label: "Título" }, { key: "description", label: "Descripción" }]}
            defaults={{ title: "Negocios verificados", description: "Información confiable" }}
          />
          <SectionTextEditor
            sectionKey="offerBadge2"
            title="Insignia 2 (ej. Reseñas reales)"
            fields={[{ key: "title", label: "Título" }, { key: "description", label: "Descripción" }]}
            defaults={{ title: "Reseñas reales", description: "De nuestra comunidad" }}
          />
          <SectionTextEditor
            sectionKey="offerBadge3"
            title="Insignia 3 (ej. Apoyo local)"
            fields={[{ key: "title", label: "Título" }, { key: "description", label: "Descripción" }]}
            defaults={{ title: "Apoyo local", description: "Crecemos juntos" }}
          />
          <SectionTextEditor
            sectionKey="offerBadge4"
            title="Insignia 4 (ej. Hecho en Yopal)"
            fields={[{ key: "title", label: "Título" }, { key: "description", label: "Descripción" }]}
            defaults={{ title: "Hecho en Yopal", description: "Para Yopal y Casanare" }}
          />
        </>
      ),
    },
    {
      key: "imagenes",
      label: "Imágenes y redes sociales (se repiten en varias secciones)",
      content: (
        <>
          <SiteImagesForm />
          <SocialForm />
        </>
      ),
    },
    {
      key: "otros",
      label: "Otros textos fijos del sitio",
      content: (
        <>
          <TipsManager />
          <SafetyManager />
          <EmergencyManager />
          <ClimateManager />
          <CtaForm />
          <ContactForm />
        </>
      ),
    },
  ];

  const active = groups.find((g) => g.key === activeKey);

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-400">
        Edita todo el contenido fijo de la plataforma — títulos, subtítulos, descripciones, textos de botones e imágenes. Busca abajo la sección que quieres editar.
      </p>

      <SectionPicker options={groups.map((g) => ({ key: g.key, label: g.label }))} value={activeKey} onChange={setActiveKey} />

      {active ? (
        <SectionGroup title={active.label}>{active.content}</SectionGroup>
      ) : (
        <p className="rounded-2xl border border-dashed border-forest-700 bg-forest-950 p-6 text-center text-sm text-slate-500">
          Selecciona una sección arriba para ver y editar su contenido.
        </p>
      )}
    </div>
  );
}
