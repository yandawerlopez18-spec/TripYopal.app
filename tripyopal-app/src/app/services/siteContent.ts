// Datos críticos cargados manualmente (no generados por IA), según regla del proyecto.
// Editable desde el panel de superadministrador (pestaña "Contenido del sitio").

export type SafetyPoint = {
  id: string;
  type: string;
  name: string;
  address?: string;
  phone?: string;
};

export type EmergencyContact = {
  id: string;
  type: string;
  name: string;
  address?: string;
  phone?: string;
};

export type Tip = {
  id: string;
  category: string;
  text: string;
};

export type ClimateTip = {
  id: string;
  season: string;
  description: string;
};

const seedSafetyPoints: SafetyPoint[] = [
  {
    id: "policia-yopal",
    type: "Estación de Policía",
    name: "Estación de Policía Yopal (verificar nombre y dirección exacta)",
    address: "Yopal, Casanare",
  },
  {
    id: "cai-yopal",
    type: "CAI",
    name: "CAI más cercano (verificar nombre y dirección exacta)",
    address: "Yopal, Casanare",
  },
  {
    id: "emergencia-policia",
    type: "Línea de emergencia",
    name: "Policía Nacional",
    phone: "123",
  },
];

const seedEmergencyContacts: EmergencyContact[] = [
  {
    id: "hospital-orinoquia",
    type: "Hospital",
    name: "Hospital Regional de la Orinoquía",
    address: "Yopal, Casanare (verificar dirección exacta)",
  },
  {
    id: "bomberos-yopal",
    type: "Bomberos",
    name: "Bomberos",
    phone: "119",
  },
];

const seedTips: Tip[] = [
  {
    id: "que-llevar",
    category: "Qué llevar",
    text: "Ropa cómoda, protector solar, repelente y botella de agua según el lugar que visites.",
  },
  {
    id: "que-cuidar",
    category: "Qué cuidar",
    text: "No dejes basura, respeta la fauna y flora, cuida los recursos naturales del lugar al que te diriges.",
  },
];

const seedClimateTips: ClimateTip[] = [
  {
    id: "temporada-seca",
    season: "Diciembre a Marzo",
    description: "Clima seco, ideal para actividades al aire libre.",
  },
];

const seedSiteContent = {
  offer: {
    eyebrow: "Nuestra oferta",
    title: "Descubre la diversidad de Casanare",
    description: "Negocios reales registrados en la plataforma, por categoría.",
  },
  cta: {
    eyebrow: "Listo para explorar",
    title: "Convierte la visita a Yopal en una experiencia guiada, segura y memorable",
  },
  contact: {
    address: "Cra. 32 #31 - 10, Yopal, Casanare",
    phone: "311 403 9813",
    instagram: "TripYopal.co",
    email: "TripYopal.co@gmail.com",
  },
  hero: {
    badge: "Naturaleza, cultura y aventura en los Llanos Orientales",
    title: "Vive lo mejor de Yopal-Casanare",
    subtitle: "Naturaleza, cultura y aventura en el corazón de los Llanos Orientales. Explora, vive y conecta.",
    backgroundImage: "/fondo-casanare.jpg",
    videoUrl: "",
  },
  images: {
    weatherIllustration: "/clima.png",
    recommendationsIllustration: "/recomendaciones.png",
    mascot: "/circulo.png",
    chatWidget: "/chat.png",
  },
  social: {
    facebook: "",
    instagram: "",
    gmail: "",
    x: "",
    whatsapp: "",
    tiktok: "",
    youtube: "",
  },
  sections: {} as Record<string, Record<string, string>>,
};

/**
 * Start as seed data (identical on server and client) so the first client render
 * matches the server-rendered HTML and hydration never mismatches.
 * `hydrateSiteContentFromDatabase` replaces their contents with the real rows from
 * PostgreSQL right after mount (see DataHydrationContext).
 */
export const safetyPoints: SafetyPoint[] = [...seedSafetyPoints];
export const emergencyContacts: EmergencyContact[] = [...seedEmergencyContacts];
export const tips: Tip[] = [...seedTips];
export const climateTips: ClimateTip[] = [...seedClimateTips];
export const siteContent = {
  offer: { ...seedSiteContent.offer },
  cta: { ...seedSiteContent.cta },
  contact: { ...seedSiteContent.contact },
  hero: { ...seedSiteContent.hero },
  images: { ...seedSiteContent.images },
  social: { ...seedSiteContent.social },
  sections: { ...seedSiteContent.sections } as Record<string, Record<string, string>>,
};

/**
 * Reads one field from a freeform, admin-editable section (see the "sections"
 * JSON column). Sections are identified by an arbitrary string key, so adding a
 * new editable section anywhere on the site never requires a schema migration —
 * just call this with a new key/field and add a matching editor in the admin panel.
 */
export function sectionText(sectionKey: string, field: string, fallback: string): string {
  const value = siteContent.sections[sectionKey]?.[field];
  return value ? value : fallback;
}

export async function hydrateSiteContentFromDatabase() {
  try {
    const [safety, emergency, tipsData, climate, content] = await Promise.all([
      fetch("/api/safety-points").then((res) => res.json()),
      fetch("/api/emergency-contacts").then((res) => res.json()),
      fetch("/api/tips").then((res) => res.json()),
      fetch("/api/climate-tips").then((res) => res.json()),
      fetch("/api/site-content").then((res) => res.json()),
    ]);

    safetyPoints.length = 0;
    safetyPoints.push(...safety);

    emergencyContacts.length = 0;
    emergencyContacts.push(...emergency);

    tips.length = 0;
    tips.push(...tipsData);

    climateTips.length = 0;
    climateTips.push(...climate);

    Object.assign(siteContent, {
      offer: content.offer,
      cta: content.cta,
      contact: content.contact,
      hero: content.hero ?? seedSiteContent.hero,
      images: content.images ?? seedSiteContent.images,
      social: content.social ?? seedSiteContent.social,
      sections: content.sections ?? seedSiteContent.sections,
    });
  } catch {
    // Keep the seed data as a fallback if the database is unreachable.
  }
}

async function addRecord<T extends { id: string }>(list: T[], record: Omit<T, "id">, endpoint: string) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });
  const newRecord: T = await response.json();
  list.push(newRecord);
  return newRecord;
}

async function updateRecord<T extends { id: string }>(list: T[], id: string, updates: Partial<Omit<T, "id">>, endpoint: string) {
  const response = await fetch(`${endpoint}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  const updated: T = await response.json();
  const record = list.find((entry) => entry.id === id);
  if (record) Object.assign(record, updated);
  return record;
}

async function deleteRecord<T extends { id: string }>(list: T[], id: string, endpoint: string) {
  await fetch(`${endpoint}/${id}`, { method: "DELETE" });
  const index = list.findIndex((entry) => entry.id === id);
  if (index !== -1) list.splice(index, 1);
}

export const addSafetyPoint = (record: Omit<SafetyPoint, "id">) => addRecord(safetyPoints, record, "/api/safety-points");
export const updateSafetyPoint = (id: string, updates: Partial<Omit<SafetyPoint, "id">>) => updateRecord(safetyPoints, id, updates, "/api/safety-points");
export const deleteSafetyPoint = (id: string) => deleteRecord(safetyPoints, id, "/api/safety-points");

export const addEmergencyContact = (record: Omit<EmergencyContact, "id">) => addRecord(emergencyContacts, record, "/api/emergency-contacts");
export const updateEmergencyContact = (id: string, updates: Partial<Omit<EmergencyContact, "id">>) => updateRecord(emergencyContacts, id, updates, "/api/emergency-contacts");
export const deleteEmergencyContact = (id: string) => deleteRecord(emergencyContacts, id, "/api/emergency-contacts");

export const addTip = (record: Omit<Tip, "id">) => addRecord(tips, record, "/api/tips");
export const updateTip = (id: string, updates: Partial<Omit<Tip, "id">>) => updateRecord(tips, id, updates, "/api/tips");
export const deleteTip = (id: string) => deleteRecord(tips, id, "/api/tips");

export const addClimateTip = (record: Omit<ClimateTip, "id">) => addRecord(climateTips, record, "/api/climate-tips");
export const updateClimateTip = (id: string, updates: Partial<Omit<ClimateTip, "id">>) => updateRecord(climateTips, id, updates, "/api/climate-tips");
export const deleteClimateTip = (id: string) => deleteRecord(climateTips, id, "/api/climate-tips");

async function patchSiteContent(updates: Partial<typeof siteContent>) {
  const response = await fetch("/api/site-content", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  const updated = await response.json();
  Object.assign(siteContent, {
    offer: updated.offer,
    cta: updated.cta,
    contact: updated.contact,
    hero: updated.hero,
    images: updated.images,
    social: updated.social,
    sections: updated.sections,
  });
}

export function updateOffer(updates: Partial<typeof siteContent.offer>) {
  return patchSiteContent({ offer: { ...siteContent.offer, ...updates } });
}

export function updateCta(updates: Partial<typeof siteContent.cta>) {
  return patchSiteContent({ cta: { ...siteContent.cta, ...updates } });
}

export function updateContact(updates: Partial<typeof siteContent.contact>) {
  return patchSiteContent({ contact: { ...siteContent.contact, ...updates } });
}

export function updateHero(updates: Partial<typeof siteContent.hero>) {
  return patchSiteContent({ hero: { ...siteContent.hero, ...updates } });
}

export function updateSiteImages(updates: Partial<typeof siteContent.images>) {
  return patchSiteContent({ images: { ...siteContent.images, ...updates } });
}

export function updateSocial(updates: Partial<typeof siteContent.social>) {
  return patchSiteContent({ social: { ...siteContent.social, ...updates } });
}

export function updateSection(sectionKey: string, updates: Record<string, string>) {
  return patchSiteContent({
    sections: { ...siteContent.sections, [sectionKey]: { ...(siteContent.sections[sectionKey] ?? {}), ...updates } },
  });
}
