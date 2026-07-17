import Link from "next/link";
import { CategoryIcon, type IconKey } from "./categoryIcons";

const categories: { key: IconKey; label: string; href: string }[] = [
  { key: "hoteles", label: "Hoteles", href: "/categorias/hoteles" },
  { key: "restaurantes", label: "Restaurantes", href: "/categorias/restaurantes" },
  { key: "bares", label: "Bares", href: "/categorias/bares" },
  { key: "sitios", label: "Sitios turísticos", href: "/categorias/sitios" },
  { key: "parques", label: "Parques", href: "/categorias/parques" },
  { key: "centros", label: "Centros comerciales", href: "/categorias/centros" },
  { key: "eventos", label: "Eventos", href: "/eventos" },
  { key: "rapidas", label: "Comidas rápidas", href: "/categorias/rapidas" },
  { key: "parrillas", label: "Parrillas y asaderos", href: "/categorias/parrillas" },
  { key: "tipica", label: "Comida típica llanera", href: "/categorias/tipica" },
  { key: "rutas", label: "Rutas", href: "/rutas" },
  { key: "clima", label: "Clima", href: "/clima" },
  { key: "transporte", label: "Transporte", href: "/categorias/transporte" },
  { key: "domicilios", label: "Domicilios", href: "/categorias/domicilios" },
];

export default function CategorySidebar() {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-forest-700 bg-forest-900 p-4 text-slate-100">
      <h3 className="px-5 text-center font-[family-name:var(--font-brand)] text-base font-semibold uppercase tracking-[0.2em] text-brand-400">Categorías</h3>
      <nav className="mt-3 flex flex-1 flex-col justify-between">
        {categories.map((category) => (
          <Link
            key={category.label}
            href={category.href}
            className="flex items-center gap-3 rounded-xl px-1 py-2 text-left text-slate-200 transition hover:bg-forest-800 hover:text-brand-400"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center text-brand-400">
              <CategoryIcon icon={category.key} />
            </span>
            <span className="text-sm leading-tight">{category.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
