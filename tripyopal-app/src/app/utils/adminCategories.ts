import { BUSINESS_CATEGORIES } from "../components/home/categoryIcons";

export const adminCategoryLabels: Record<string, string> = {
  ...Object.fromEntries(BUSINESS_CATEGORIES.map((category) => [category.key, category.label])),
  lugar: "Lugar turístico",
  evento: "Evento",
  ruta: "Ruta",
};

export const adminCategoryOptions: { value: string; label: string }[] = [
  ...BUSINESS_CATEGORIES.map((category) => ({ value: category.key as string, label: category.label })),
  { value: "lugar", label: "Lugar turístico" },
  { value: "evento", label: "Evento" },
  { value: "ruta", label: "Ruta" },
];
