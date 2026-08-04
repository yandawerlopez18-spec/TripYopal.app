export function formatPrice(value: string) {
  return value || "Precio por definir";
}

/**
 * Normalizes a currency amount to Colombian format: dot as thousands
 * separator plus a "COP" suffix (e.g. "200.000 COP", "1.500.000 COP").
 * Non-numeric values (tier labels like "Gratis"/"Bajo", ranges, etc.)
 * are returned unchanged since they aren't a plain amount to format.
 */
export function formatCOP(value?: string | number): string {
  if (value === undefined || value === null || value === "") return "";

  if (typeof value === "number") {
    return `${new Intl.NumberFormat("es-CO").format(Math.round(value))} COP`;
  }

  const withoutCurrencyWords = value.replace(/\$|cop/gi, "").trim();
  const isPlainAmount = /^\d[\d.,\s]*$/.test(withoutCurrencyWords);
  if (!isPlainAmount) return value;

  const numeric = Number(withoutCurrencyWords.replace(/[.,\s]/g, ""));
  if (!Number.isFinite(numeric) || numeric <= 0) return value;

  return `${new Intl.NumberFormat("es-CO").format(numeric)} COP`;
}

export function formatTitle(value: string) {
  return value.trim().replace(/\s+/g, " ");
}
