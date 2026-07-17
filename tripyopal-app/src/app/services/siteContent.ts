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

export const safetyPoints: SafetyPoint[] = [
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

export const emergencyContacts: EmergencyContact[] = [
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

export const tips: Tip[] = [
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

export const climateTips: ClimateTip[] = [
  {
    id: "temporada-seca",
    season: "Diciembre a Marzo",
    description: "Clima seco, ideal para actividades al aire libre.",
  },
];

export const siteContent = {
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

function addRecord<T extends { id: string }>(list: T[], record: Omit<T, "id">) {
  const newRecord = { ...record, id: crypto.randomUUID() } as T;
  list.push(newRecord);
  return newRecord;
}

function updateRecord<T extends { id: string }>(list: T[], id: string, updates: Partial<Omit<T, "id">>) {
  const record = list.find((entry) => entry.id === id);
  if (record) Object.assign(record, updates);
  return record;
}

function deleteRecord<T extends { id: string }>(list: T[], id: string) {
  const index = list.findIndex((entry) => entry.id === id);
  if (index !== -1) list.splice(index, 1);
}

export const addSafetyPoint = (record: Omit<SafetyPoint, "id">) => addRecord(safetyPoints, record);
export const updateSafetyPoint = (id: string, updates: Partial<Omit<SafetyPoint, "id">>) => updateRecord(safetyPoints, id, updates);
export const deleteSafetyPoint = (id: string) => deleteRecord(safetyPoints, id);

export const addEmergencyContact = (record: Omit<EmergencyContact, "id">) => addRecord(emergencyContacts, record);
export const updateEmergencyContact = (id: string, updates: Partial<Omit<EmergencyContact, "id">>) => updateRecord(emergencyContacts, id, updates);
export const deleteEmergencyContact = (id: string) => deleteRecord(emergencyContacts, id);

export const addTip = (record: Omit<Tip, "id">) => addRecord(tips, record);
export const updateTip = (id: string, updates: Partial<Omit<Tip, "id">>) => updateRecord(tips, id, updates);
export const deleteTip = (id: string) => deleteRecord(tips, id);

export const addClimateTip = (record: Omit<ClimateTip, "id">) => addRecord(climateTips, record);
export const updateClimateTip = (id: string, updates: Partial<Omit<ClimateTip, "id">>) => updateRecord(climateTips, id, updates);
export const deleteClimateTip = (id: string) => deleteRecord(climateTips, id);

export function updateOffer(updates: Partial<typeof siteContent.offer>) {
  Object.assign(siteContent.offer, updates);
}

export function updateCta(updates: Partial<typeof siteContent.cta>) {
  Object.assign(siteContent.cta, updates);
}

export function updateContact(updates: Partial<typeof siteContent.contact>) {
  Object.assign(siteContent.contact, updates);
}
