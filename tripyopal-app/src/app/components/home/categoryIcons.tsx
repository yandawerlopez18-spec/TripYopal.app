export type IconKey =
  | "hoteles"
  | "restaurantes"
  | "bares"
  | "sitios"
  | "parques"
  | "centros"
  | "eventos"
  | "rapidas"
  | "parrillas"
  | "tipica"
  | "rutas"
  | "clima"
  | "transporte"
  | "domicilios";

export const BUSINESS_CATEGORIES: { key: IconKey; label: string }[] = [
  { key: "hoteles", label: "Hoteles" },
  { key: "restaurantes", label: "Restaurantes" },
  { key: "bares", label: "Bares" },
  { key: "sitios", label: "Sitios turísticos" },
  { key: "parques", label: "Parques" },
  { key: "centros", label: "Centros comerciales" },
  { key: "rapidas", label: "Comidas rápidas" },
  { key: "parrillas", label: "Parrillas y asaderos" },
  { key: "tipica", label: "Comida típica llanera" },
  { key: "transporte", label: "Transporte" },
  { key: "domicilios", label: "Domicilios" },
];

export function CategoryIcon({ icon }: { icon: IconKey }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "hoteles":
      return (
        <svg {...common}>
          <rect x="12" y="10" width="18" height="28" rx="1.5" />
          <path d="M17 17h2M24 17h2M17 23h2M24 23h2M17 29h2M24 29h2" />
          <path d="M20 38v-5h4v5" />
          <circle cx="37" cy="32" r="4" />
          <path d="M37 28v-3" />
        </svg>
      );
    case "restaurantes":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="10" />
          <circle cx="24" cy="24" r="4" />
          <path d="M11 12v9M8.5 12v6a2.5 2.5 0 0 0 2.5 2.5M13.5 12v6a2.5 2.5 0 0 1-2.5 2.5M11 21v17" />
          <path d="M37 12v11a3 3 0 0 1-3 3v12M37 12v0" />
        </svg>
      );
    case "bares":
      return (
        <svg {...common}>
          <path d="M11 10h26l-13 15v13" />
          <path d="M17 38h14" />
          <circle cx="30" cy="14" r="1.6" />
        </svg>
      );
    case "sitios":
      return (
        <svg {...common}>
          <path d="M24 6c-7.2 0-12.5 5.4-12.5 12.4C11.5 27.6 24 42 24 42s12.5-14.4 12.5-23.6C36.5 11.4 31.2 6 24 6Z" />
          <circle cx="24" cy="18.5" r="4.5" />
        </svg>
      );
    case "parques":
      return (
        <svg {...common}>
          <path d="M19 38V25" />
          <path d="M12 20.5A7 7 0 0 1 26 20a5.5 5.5 0 0 1-2.2 9.9H14a5.5 5.5 0 0 1-2-9.4Z" />
          <path d="M33 38v-8" />
          <circle cx="33" cy="24" r="5.5" />
        </svg>
      );
    case "centros":
      return (
        <svg {...common}>
          <path d="M13 17h22l-2 21H15l-2-21Z" />
          <path d="M18 17v-3.5a6 6 0 0 1 12 0V17" />
        </svg>
      );
    case "eventos":
      return (
        <svg {...common}>
          <rect x="8" y="10" width="32" height="27" rx="3" />
          <path d="M8 19h32M15 6v6M33 6v6" />
          <path d="M24 22.5l2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7 2.1-4.3Z" />
        </svg>
      );
    case "rapidas":
      return (
        <svg {...common}>
          <path d="M10 21C10 14 16.3 9 24 9s14 5 14 12" />
          <path d="M9 21h30" />
          <circle cx="19" cy="16.5" r="0.8" fill="currentColor" />
          <circle cx="24" cy="14.5" r="0.8" fill="currentColor" />
          <circle cx="29" cy="16.5" r="0.8" fill="currentColor" />
          <path d="M9 27h30" />
          <path d="M10 27c0 3 1.5 6.5 3 8h22c1.5-1.5 3-5 3-8" />
        </svg>
      );
    case "parrillas":
      return (
        <svg {...common}>
          <path d="M19 12c1.5 2-1.5 3-1.5 5.5S20 21 20 21" />
          <path d="M24 10c1.5 2-1.5 3-1.5 5.5S25 20 25 20" />
          <path d="M29 12c1.5 2-1.5 3-1.5 5.5S31 21 31 21" />
          <ellipse cx="24" cy="28" rx="15" ry="4.5" />
          <path d="M15 28l4-13M33 28l-4-13" />
          <path d="M24 28v10M17 38h14" />
        </svg>
      );
    case "tipica":
      return (
        <svg {...common}>
          <ellipse cx="24" cy="31" rx="19" ry="4" />
          <path d="M13 30.5a11 8.5 0 0 1 22 0" />
          <circle cx="24" cy="24" r="2.2" />
          <path d="M20 23.3a4.4 4.4 0 0 1 8 0" />
        </svg>
      );
    case "rutas":
      return (
        <svg {...common}>
          <path d="M24 6v36" />
          <path d="M13 13h10l-2.6 4L23 21H13Z" />
          <path d="M35 22H25l2.6-4L25 14h10Z" />
        </svg>
      );
    case "clima":
      return (
        <svg {...common}>
          <circle cx="17" cy="14" r="5.5" />
          <path d="M17 5.5v2.3M17 20.2v2.3M9 14h-2.3M25 14h2.3M11.3 8.3 9.7 6.7M22.7 8.3l1.6-1.6" />
          <path d="M15 33a7 7 0 0 1 .4-14 9.4 9.4 0 0 1 18 3.4A6.3 6.3 0 0 1 32 34.5H16.8A6.5 6.5 0 0 1 15 33Z" />
        </svg>
      );
    case "transporte":
      return (
        <svg {...common}>
          <rect x="8" y="13" width="32" height="20" rx="4" />
          <path d="M8 24h32M15 13v20M33 13v20" />
          <circle cx="15" cy="37" r="2.6" />
          <circle cx="33" cy="37" r="2.6" />
        </svg>
      );
    case "domicilios":
      return (
        <svg {...common}>
          <circle cx="12" cy="34" r="5" />
          <circle cx="34" cy="34" r="5" />
          <path d="M12 34h9l5-12h9l5 8M26 22h6" />
          <rect x="30" y="10" width="9" height="9" rx="1.5" />
        </svg>
      );
  }
}
