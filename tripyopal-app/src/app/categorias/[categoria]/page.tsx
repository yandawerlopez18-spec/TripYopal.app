"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useMemo, useRef, useState } from "react";
import { BUSINESS_CATEGORIES, CategoryIcon, getCategoryLabel, type IconKey } from "../../components/home/categoryIcons";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  EventPinIcon,
  HeartIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
  ShieldIcon,
  SortIcon,
  StarIcon,
  UsersIcon,
} from "../../components/home/infoIcons";
import { useDataHydration } from "../../context/DataHydrationContext";
import { listPrestadoresByCategory, type Prestador } from "../../services/prestadores";
import { siteContent } from "../../services/siteContent";
import { AMENITY_CATALOG, getDisplayRating } from "../../utils/businessProfileConfig";

const AMENITY_BY_KEY = new Map(AMENITY_CATALOG.map((a) => [a.key, a]));

const gradients = [
  "linear-gradient(135deg,#f59e0b,#166534)",
  "linear-gradient(135deg,#0ea5e9,#166534)",
  "linear-gradient(135deg,#22c55e,#0f2a1d)",
  "linear-gradient(135deg,#fb7185,#065f46)",
];

const TAG_COLORS = [
  "bg-emerald-50/90 text-emerald-700 backdrop-blur",
  "bg-sky-50/90 text-sky-700 backdrop-blur",
  "bg-purple-50/90 text-purple-700 backdrop-blur",
];

const CATEGORY_META: Partial<Record<IconKey, { singular: string; description: string; statLabel: string }>> = {
  hoteles: { singular: "hotel", description: "Encuentra el lugar perfecto para hospedarte en Yopal.", statLabel: "Hospedaje de calidad" },
  restaurantes: { singular: "restaurante", description: "Descubre desde comida típica llanera hasta cocina internacional.", statLabel: "Diversidad gastronómica" },
  bares: { singular: "bar", description: "Los mejores lugares para tomar algo y disfrutar la noche llanera.", statLabel: "Ambiente y buena música" },
  sitios: { singular: "sitio turístico", description: "Explora los rincones más atractivos de Yopal y sus alrededores.", statLabel: "Naturaleza y cultura" },
  parques: { singular: "parque", description: "Espacios al aire libre para descansar y disfrutar en familia.", statLabel: "Aire libre y recreación" },
  centros: { singular: "centro comercial", description: "Compras, comida y entretenimiento en un solo lugar.", statLabel: "Comercio y entretenimiento" },
  rapidas: { singular: "comida rápida", description: "Antojos rápidos y deliciosos para cualquier momento del día.", statLabel: "Rápido y delicioso" },
  parrillas: { singular: "parrilla o asadero", description: "Carnes a la brasa y sabor llanero en su máxima expresión.", statLabel: "Sabor a la brasa" },
  discotecas: { singular: "discoteca", description: "Los mejores lugares para bailar y vivir la rumba de Yopal.", statLabel: "Rumba y diversión" },
  transporte: { singular: "servicio de transporte", description: "Muévete por Yopal y Casanare de forma segura y cómoda.", statLabel: "Movilidad y conexión" },
  domicilios: { singular: "servicio a domicilio", description: "Pide lo que necesites sin salir de casa.", statLabel: "Comodidad a tu puerta" },
  educacion: { singular: "institución educativa", description: "Centros de formación y educación en Yopal.", statLabel: "Formación y conocimiento" },
  comercios: { singular: "comercio", description: "Variedad de comercios locales para todo lo que necesitas.", statLabel: "Comercio local" },
};

const PAGE_SIZE = 9;
const RATING_OPTIONS = [0, 3, 4, 4.5];
const SORT_OPTIONS = [
  { key: "relevancia", label: "Relevancia" },
  { key: "calificacion", label: "Mejor calificados" },
  { key: "nombre", label: "Nombre (A-Z)" },
] as const;
type SortKey = (typeof SORT_OPTIONS)[number]["key"];

function FavoriteToggle({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(false);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        setActive((v) => !v);
      }}
      aria-label="Guardar en favoritos"
      className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
        active ? "border-brand-400 bg-brand-500/10 text-brand-400" : "border-forest-700 text-slate-400 hover:bg-forest-800"
      } ${className}`}
    >
      <HeartIcon filled={active} />
    </button>
  );
}

function FilterDropdown({
  label,
  icon,
  showChevron = true,
  options,
  value,
  onChange,
}: {
  label: string;
  icon?: React.ReactNode;
  showChevron?: boolean;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-forest-700 bg-forest-950 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-brand-400"
      >
        {icon}
        {label}
        {showChevron ? (
          <ChevronDownIcon className={`h-3.5 w-3.5 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} />
        ) : null}
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-20 mt-2 max-h-64 min-w-[190px] overflow-y-auto rounded-xl border border-forest-700 bg-forest-950 p-1.5 shadow-xl">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                value === opt.value ? "bg-brand-500/10 font-semibold text-brand-400" : "text-slate-300 hover:bg-forest-800"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function BusinessCard({
  prestador,
  index,
  categoryKey,
  categoryLabel,
}: {
  prestador: Prestador;
  index: number;
  categoryKey: string;
  categoryLabel: string;
}) {
  const rating = getDisplayRating(prestador);
  const tag = prestador.badges?.[0];

  return (
    <article className="flex h-full min-h-[520px] flex-col overflow-hidden rounded-2xl border border-forest-700 bg-forest-950 shadow-sm">
      <div className="relative h-72 w-full shrink-0">
        {prestador.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={prestador.imageUrl} alt={prestador.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center" style={{ background: gradients[index % gradients.length] }}>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur">
              <CategoryIcon icon={categoryKey as IconKey} />
            </span>
          </div>
        )}

        {tag ? (
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold ${TAG_COLORS[index % TAG_COLORS.length]}`}>
            {tag}
          </span>
        ) : null}

        <div className="absolute right-3 top-3 flex items-center gap-1.5">
          {rating ? (
            <span className="flex items-center gap-1 rounded-full bg-forest-950/90 px-2.5 py-1 backdrop-blur">
              <StarIcon filled className="h-3.5 w-3.5 text-yellow-400" />
              <span className="text-xs font-bold text-white">{rating}</span>
            </span>
          ) : null}
          {prestador.status ? (
            <span
              className={`rounded-full px-2 py-1 text-[11px] font-bold ${
                prestador.status === "Abierto" ? "bg-brand-500 text-forest-950" : "bg-red-500 text-forest-950"
              }`}
            >
              {prestador.status}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">{categoryLabel}</p>
        <h3 className="mt-1.5 text-lg font-bold text-slate-100">{prestador.name}</h3>

        {prestador.description ? (
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">{prestador.description}</p>
        ) : null}

        <div className="mt-4 space-y-2 text-xs text-slate-300">
          {prestador.address ? (
            <p className="flex min-w-0 items-center gap-2">
              <EventPinIcon className="h-3.5 w-3.5 shrink-0 text-brand-400" />
              <span className="truncate">{prestador.address}</span>
            </p>
          ) : null}
          {prestador.phone ? (
            <p className="flex min-w-0 items-center gap-2">
              <PhoneIcon className="h-3.5 w-3.5 shrink-0 text-brand-400" />
              <span className="truncate">{prestador.phone}</span>
            </p>
          ) : null}
          {prestador.email ? (
            <p className="flex min-w-0 items-center gap-2">
              <MailIcon className="h-3.5 w-3.5 shrink-0 text-brand-400" />
              <span className="truncate">{prestador.email}</span>
            </p>
          ) : null}
          {prestador.schedule ? (
            <p className="flex min-w-0 items-center gap-2">
              <ClockIcon className="h-3.5 w-3.5 shrink-0 text-brand-400" />
              <span className="truncate">{prestador.schedule}</span>
            </p>
          ) : null}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <Link
            href={`/categorias/${categoryKey}/${prestador.id}`}
            className="btn-brand-font btn-gradient flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-forest-950"
          >
            Ver perfil completo →
          </Link>
          <FavoriteToggle />
        </div>
      </div>
    </article>
  );
}

export default function CategoriaPage({ params }: { params: Promise<{ categoria: string }> }) {
  const hydrationVersion = useDataHydration();
  const { categoria } = use(params);
  const category = BUSINESS_CATEGORIES.find((c) => c.key === categoria);

  const [search, setSearch] = useState("");
  const [zoneFilter, setZoneFilter] = useState("Todas");
  const [priceFilter, setPriceFilter] = useState("Todos");
  const [serviceFilter, setServiceFilter] = useState("Todos");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortKey>("relevancia");
  const [page, setPage] = useState(1);

  const prestadores = useMemo(() => (category ? listPrestadoresByCategory(category.key) : []), [category]);

  const ratings = prestadores.map((p) => getDisplayRating(p)).filter((r): r is number => r !== null);
  const avgRating = ratings.length ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10 : null;

  const zoneOptions = useMemo(() => {
    const zones = Array.from(new Set(prestadores.map((p) => p.neighborhood).filter((z): z is string => !!z)));
    return [{ value: "Todas", label: "Todas las zonas" }, ...zones.map((z) => ({ value: z, label: z }))];
  }, [prestadores]);

  const serviceOptions = useMemo(() => {
    const keys = Array.from(new Set(prestadores.flatMap((p) => p.amenities ?? [])));
    const known = keys.map((key) => AMENITY_BY_KEY.get(key)).filter((a): a is NonNullable<typeof a> => !!a);
    return [{ value: "Todos", label: "Todos los servicios" }, ...known.map((a) => ({ value: a.key, label: a.label }))];
  }, [prestadores]);

  const filtered = useMemo(() => {
    const list = prestadores.filter((p) => {
      const matchesSearch = search.trim() === "" || p.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesZone = zoneFilter === "Todas" || p.neighborhood === zoneFilter;
      const matchesPrice = priceFilter === "Todos" || p.priceRange === priceFilter;
      const matchesService = serviceFilter === "Todos" || (p.amenities ?? []).includes(serviceFilter);
      const matchesRating = minRating === 0 || (getDisplayRating(p) ?? 0) >= minRating;
      return matchesSearch && matchesZone && matchesPrice && matchesService && matchesRating;
    });

    if (sortBy === "calificacion") {
      return [...list].sort((a, b) => (getDisplayRating(b) ?? 0) - (getDisplayRating(a) ?? 0));
    }
    if (sortBy === "nombre") {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [prestadores, search, zoneFilter, priceFilter, serviceFilter, minRating, sortBy]);

  if (!category) {
    notFound();
  }

  const meta = CATEGORY_META[category.key] ?? { singular: "negocio", description: "", statLabel: "" };
  const categoryLabel = getCategoryLabel(category.key, category.label);
  const heroImage = prestadores.find((p) => p.imageUrl)?.imageUrl;

  const singularWords = meta.singular.split(" ");
  const noEncuentrasLastWord = singularWords[singularWords.length - 1];
  const noEncuentrasLeading = singularWords.slice(0, -1).join(" ");

  const categoryTrustFeatures = [
    { icon: EventPinIcon, title: "Información actualizada", description: "Siempre al día para que tomes mejores decisiones." },
    { icon: ShieldIcon, title: "Viaja con confianza", description: "Conoce opciones confiables y recomendadas." },
    { icon: UsersIcon, title: "Más opciones para ti", description: "Explora diferentes alternativas según tus necesidades." },
    { icon: ClockIcon, title: "Ahorra tiempo", description: "Encuentra lo que necesitas de manera rápida y sencilla." },
  ];
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const resetToPageOne = <T,>(setter: (v: T) => void) => (value: T) => {
    setter(value);
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-forest-950 text-slate-100">
      <div className="mx-auto max-w-8xl px-6 py-6 lg:px-8">
        <Link
          href="/"
          className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          ← Volver al inicio
        </Link>

        <div
          className="relative mt-6 overflow-hidden rounded-3xl border border-forest-700 bg-cover bg-center p-6 shadow-xl lg:p-10"
          style={heroImage ? { backgroundImage: `url('${heroImage}')` } : undefined}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/85 to-forest-950/40" />

          <div className="relative z-10 max-w-2xl">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
              <CategoryIcon icon={category.key} />
            </span>
            <h1 className="mt-4 font-[family-name:var(--font-brand)] text-4xl font-bold text-white sm:text-5xl">
              {categoryLabel} <span className="text-brand-400">en Yopal</span>
            </h1>
            <p className="mt-3 max-w-xl text-slate-300">{meta.description}</p>

            <div className="mt-6 flex flex-wrap gap-6">
              {avgRating ? (
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-950/70 text-yellow-400">
                    <StarIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-bold text-slate-100">{avgRating}</p>
                    <p className="text-xs text-slate-400">Calificación promedio</p>
                  </div>
                </div>
              ) : null}
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-950/70 text-brand-400">
                  <CategoryIcon icon={category.key} />
                </span>
                <div>
                  <p className="font-bold text-slate-100">{prestadores.length}</p>
                  <p className="text-xs text-slate-400">{categoryLabel}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-950/70 text-brand-400">
                  <EventPinIcon className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-bold text-slate-100">Yopal, Casanare</p>
                  <p className="text-xs text-slate-400">{meta.statLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-forest-700 bg-forest-900 p-4">
          <div className="flex min-w-[180px] flex-1 items-center gap-2 rounded-full border border-forest-700 bg-forest-950 px-4 py-2.5">
            <SearchIcon className="h-4 w-4 shrink-0 text-slate-500" />
            <input
              value={search}
              onChange={(e) => resetToPageOne(setSearch)(e.target.value)}
              placeholder={`Buscar ${meta.singular} o zona...`}
              className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
          </div>

          <FilterDropdown label="Zona" options={zoneOptions} value={zoneFilter} onChange={resetToPageOne(setZoneFilter)} />

          <FilterDropdown
            label="Precio"
            options={[
              { value: "Todos", label: "Cualquier precio" },
              { value: "Bajo", label: "$ Bajo" },
              { value: "Medio", label: "$$ Medio" },
              { value: "Alto", label: "$$$ Alto" },
            ]}
            value={priceFilter}
            onChange={resetToPageOne(setPriceFilter)}
          />

          <FilterDropdown label="Servicios" options={serviceOptions} value={serviceFilter} onChange={resetToPageOne(setServiceFilter)} />

          <FilterDropdown
            label="Calificación"
            options={RATING_OPTIONS.map((value) => ({ value: String(value), label: value === 0 ? "Cualquier calificación" : `★ ${value}+` }))}
            value={String(minRating)}
            onChange={(v) => resetToPageOne(setMinRating)(Number(v))}
          />

          <div className="ml-auto">
            <FilterDropdown
              label="Ordenar"
              icon={<SortIcon className="h-4 w-4 text-slate-400" />}
              showChevron={false}
              options={SORT_OPTIONS.map((opt) => ({ value: opt.key, label: opt.label }))}
              value={sortBy}
              onChange={(v) => setSortBy(v as SortKey)}
            />
          </div>
        </div>

        {paged.length === 0 && hydrationVersion === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-forest-700 bg-forest-900 p-10 text-center">
            <p className="text-slate-300">Cargando negocios...</p>
          </div>
        ) : paged.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-forest-700 bg-forest-900 p-10 text-center">
            <p className="text-slate-300">
              {prestadores.length === 0 ? "Aún no hay negocios registrados en esta categoría." : "Ningún resultado coincide con tus filtros."}
            </p>
            <Link href="/registro" className="btn-brand-font btn-gradient rounded-full px-6 py-3 font-semibold text-forest-950">
              Registrar {meta.singular}
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((prestador, index) => (
              <BusinessCard key={prestador.id} prestador={prestador} index={index} categoryKey={category.key} categoryLabel={meta.singular.toUpperCase()} />
            ))}
          </div>
        )}

        {totalPages > 1 ? (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Página anterior"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-forest-700 text-slate-300 transition hover:bg-forest-800 disabled:opacity-40"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <ChevronLeftIcon className="-ml-2.5 h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition ${
                  n === currentPage ? "bg-brand-500 text-forest-950" : "border border-forest-700 text-slate-300 hover:bg-forest-800"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Página siguiente"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-forest-700 text-slate-300 transition hover:bg-forest-800 disabled:opacity-40"
            >
              <ChevronRightIcon className="h-4 w-4" />
              <ChevronRightIcon className="-ml-2.5 h-4 w-4" />
            </button>
          </div>
        ) : null}

        <div className="relative mt-10 overflow-hidden rounded-3xl border border-forest-700 bg-forest-900 p-6 lg:p-10">
          <span className="pointer-events-none absolute -right-10 top-1/2 hidden h-64 w-64 -translate-y-1/2 text-brand-500/10 lg:flex">
            <CategoryIcon icon={category.key} />
          </span>

          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center">
            <span className="mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-brand-400 sm:mx-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={siteContent.images.mascot} alt="Capibara de TripYopal" className="h-full w-full object-cover" />
            </span>
            <span className="hidden h-20 w-px shrink-0 bg-forest-700 sm:block" />
            <div>
              <h3 className="text-center font-[family-name:var(--font-brand)] text-3xl font-bold text-white sm:text-left sm:text-4xl">
                ¿No encuentras tu{noEncuentrasLeading ? ` ${noEncuentrasLeading}` : ""} <span className="text-brand-400">{noEncuentrasLastWord}</span>?
              </h3>
              <p className="mt-3 text-center text-slate-300 sm:text-left">
                En <span className="font-semibold text-brand-400">TripYopal</span> conectamos a los viajeros con las mejores opciones de {meta.singular} en Yopal, de forma fácil y segura.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categoryTrustFeatures.map((feature, index) => (
              <div key={feature.title} className={`flex items-start gap-3 ${index > 0 ? "sm:border-l sm:border-forest-700 sm:pl-6" : ""}`}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
                  <feature.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-slate-100">{feature.title}</p>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-slate-500">
          ⓘ La información de los {categoryLabel.toLowerCase()} es proporcionada por los mismos establecimientos. TripYopal no se responsabiliza por cambios en horarios o disponibilidad.
        </p>
      </div>
    </main>
  );
}
