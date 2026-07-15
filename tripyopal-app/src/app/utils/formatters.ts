export function formatPrice(value: string) {
  return value || "Precio por definir";
}

export function formatTitle(value: string) {
  return value.trim().replace(/\s+/g, " ");
}
