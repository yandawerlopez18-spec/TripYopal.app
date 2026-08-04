import type { IconKey } from "../components/home/categoryIcons";

export type PrestadorItemLabels = {
  sectionLabel: string;
  itemLabel: string;
  addLabel: string;
  namePlaceholder: string;
  pricePlaceholder: string;
};

const defaults: PrestadorItemLabels = {
  sectionLabel: "Servicios y productos",
  itemLabel: "servicio o producto",
  addLabel: "Agregar servicio o producto",
  namePlaceholder: "Nombre del servicio o producto",
  pricePlaceholder: "Precio (opcional)",
};

const menuLabels: PrestadorItemLabels = {
  sectionLabel: "Menú",
  itemLabel: "plato",
  addLabel: "Agregar plato",
  namePlaceholder: "Nombre del plato",
  pricePlaceholder: "Precio (opcional)",
};

const cartaLabels: PrestadorItemLabels = {
  sectionLabel: "Carta",
  itemLabel: "producto",
  addLabel: "Agregar producto",
  namePlaceholder: "Nombre del producto",
  pricePlaceholder: "Precio (opcional)",
};

const overrides: Partial<Record<IconKey, PrestadorItemLabels>> = {
  hoteles: {
    sectionLabel: "Habitaciones y tarifas",
    itemLabel: "habitación",
    addLabel: "Agregar habitación",
    namePlaceholder: "Tipo de habitación",
    pricePlaceholder: "Tarifa por noche (opcional)",
  },
  restaurantes: menuLabels,
  rapidas: menuLabels,
  parrillas: menuLabels,
  bares: cartaLabels,
  discotecas: cartaLabels,
  sitios: {
    sectionLabel: "Actividades y tarifas",
    itemLabel: "actividad",
    addLabel: "Agregar actividad",
    namePlaceholder: "Nombre de la actividad",
    pricePlaceholder: "Tarifa (opcional)",
  },
  parques: {
    sectionLabel: "Actividades y tarifas",
    itemLabel: "actividad",
    addLabel: "Agregar actividad",
    namePlaceholder: "Nombre de la actividad",
    pricePlaceholder: "Tarifa (opcional)",
  },
  centros: {
    sectionLabel: "Locales y servicios",
    itemLabel: "local o servicio",
    addLabel: "Agregar local o servicio",
    namePlaceholder: "Nombre del local o servicio",
    pricePlaceholder: "Precio (opcional)",
  },
  transporte: {
    sectionLabel: "Servicios y tarifas",
    itemLabel: "servicio",
    addLabel: "Agregar servicio",
    namePlaceholder: "Nombre del servicio (ej. ruta, trayecto)",
    pricePlaceholder: "Tarifa (opcional)",
  },
  domicilios: {
    sectionLabel: "Servicios y tarifas",
    itemLabel: "servicio",
    addLabel: "Agregar servicio",
    namePlaceholder: "Nombre del servicio",
    pricePlaceholder: "Tarifa (opcional)",
  },
};

export function getPrestadorItemLabels(category: string): PrestadorItemLabels {
  return overrides[category as IconKey] ?? defaults;
}
