// Datos críticos cargados manualmente (no generados por IA), según regla del proyecto.
// Editable desde el panel de superadministrador (pestaña "Contenido del sitio").

import { loadFromStorage, saveToStorage } from "./persistence";

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

const SAFETY_KEY = "tripyopal_safety_points";
const EMERGENCY_KEY = "tripyopal_emergency_contacts";
const TIPS_KEY = "tripyopal_tips";
const CLIMATE_KEY = "tripyopal_climate_tips";
const SITE_CONTENT_KEY = "tripyopal_site_content";

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
};

export const safetyPoints: SafetyPoint[] = loadFromStorage(SAFETY_KEY, seedSafetyPoints);
export const emergencyContacts: EmergencyContact[] = loadFromStorage(EMERGENCY_KEY, seedEmergencyContacts);
export const tips: Tip[] = loadFromStorage(TIPS_KEY, seedTips);
export const climateTips: ClimateTip[] = loadFromStorage(CLIMATE_KEY, seedClimateTips);
export const siteContent = loadFromStorage(SITE_CONTENT_KEY, seedSiteContent);

function addRecord<T extends { id: string }>(list: T[], record: Omit<T, "id">, key: string) {
  const newRecord = { ...record, id: crypto.randomUUID() } as T;
  list.push(newRecord);
  saveToStorage(key, list);
  return newRecord;
}

function updateRecord<T extends { id: string }>(list: T[], id: string, updates: Partial<Omit<T, "id">>, key: string) {
  const record = list.find((entry) => entry.id === id);

  if (record) {
    Object.assign(record, updates);
    saveToStorage(key, list);
  }

  return record;
}

function deleteRecord<T extends { id: string }>(list: T[], id: string, key: string) {
  const index = list.findIndex((entry) => entry.id === id);

  if (index !== -1) {
    list.splice(index, 1);
    saveToStorage(key, list);
  }
}

export const addSafetyPoint = (record: Omit<SafetyPoint, "id">) => addRecord(safetyPoints, record, SAFETY_KEY);
export const updateSafetyPoint = (id: string, updates: Partial<Omit<SafetyPoint, "id">>) => updateRecord(safetyPoints, id, updates, SAFETY_KEY);
export const deleteSafetyPoint = (id: string) => deleteRecord(safetyPoints, id, SAFETY_KEY);

export const addEmergencyContact = (record: Omit<EmergencyContact, "id">) => addRecord(emergencyContacts, record, EMERGENCY_KEY);
export const updateEmergencyContact = (id: string, updates: Partial<Omit<EmergencyContact, "id">>) => updateRecord(emergencyContacts, id, updates, EMERGENCY_KEY);
export const deleteEmergencyContact = (id: string) => deleteRecord(emergencyContacts, id, EMERGENCY_KEY);

export const addTip = (record: Omit<Tip, "id">) => addRecord(tips, record, TIPS_KEY);
export const updateTip = (id: string, updates: Partial<Omit<Tip, "id">>) => updateRecord(tips, id, updates, TIPS_KEY);
export const deleteTip = (id: string) => deleteRecord(tips, id, TIPS_KEY);

export const addClimateTip = (record: Omit<ClimateTip, "id">) => addRecord(climateTips, record, CLIMATE_KEY);
export const updateClimateTip = (id: string, updates: Partial<Omit<ClimateTip, "id">>) => updateRecord(climateTips, id, updates, CLIMATE_KEY);
export const deleteClimateTip = (id: string) => deleteRecord(climateTips, id, CLIMATE_KEY);

export function updateOffer(updates: Partial<typeof siteContent.offer>) {
  Object.assign(siteContent.offer, updates);
  saveToStorage(SITE_CONTENT_KEY, siteContent);
}

export function updateCta(updates: Partial<typeof siteContent.cta>) {
  Object.assign(siteContent.cta, updates);
  saveToStorage(SITE_CONTENT_KEY, siteContent);
}

export function updateContact(updates: Partial<typeof siteContent.contact>) {
  Object.assign(siteContent.contact, updates);
  saveToStorage(SITE_CONTENT_KEY, siteContent);
}
