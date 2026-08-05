"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import TransporteOwnerEditor from "./TransporteOwnerEditor";
import {
  ArrowUpRightIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CompassIcon,
  EventPinIcon,
  FacebookIcon,
  GlobeIcon,
  HeadsetIcon,
  HeartIcon,
  MailIcon,
  PhoneIcon,
  ShareIcon,
  ShieldIcon,
  StarIcon,
  TiktokIcon,
  TwitterIcon,
  WhatsAppIcon,
} from "../home/infoIcons";
import { addReview, listPrestadoresByCategory, type Prestador, type ReviewAspects } from "../../services/prestadores";
import { siteContent } from "../../services/siteContent";
import { AMENITY_CATALOG } from "../../utils/businessProfileConfig";

const GUEST_ASPECTS: { key: keyof ReviewAspects; label: string }[] = [
  { key: "facilities", label: "Instalaciones" },
  { key: "cleanliness", label: "Limpieza" },
  { key: "service", label: "Atención" },
  { key: "comfort", label: "Comodidad" },
  { key: "internet", label: "Conectividad" },
];

const COMPACT_FEATURE_KEYS = [
  "vuelosNacionales",
  "vuelosInternacionales",
  "salasVipTransporte",
  "wifiGratuitoTransporte",
  "tiendasCafes",
  "parqueaderoTransporte",
  "accesibleTransporte",
];

const TRUST_BADGES = [
  { icon: CheckIcon, title: "Información verificada", subtitle: "Datos 100% reales" },
  { icon: CompassIcon, title: "Aeropuerto principal", subtitle: "De Yopal, Casanare" },
  { icon: HeadsetIcon, title: "Atención 24/7", subtitle: "Estamos para ayudarte" },
  { icon: ShieldIcon, title: "Vuelos seguros", subtitle: "Tu viaje, nuestra prioridad" },
  { icon: ArrowUpRightIcon, title: "Conectamos a Yopal", subtitle: "Contigo al mundo" },
];

function daysAgoLabel(dateStr: string): string {
  const days = Math.max(0, Math.round((Date.now() - new Date(dateStr).getTime()) / 86400000));
  if (days === 0) return "Hoy";
  if (days === 1) return "Hace 1 día";
  if (days < 30) return `Hace ${days} días`;
  const months = Math.round(days / 30);
  return months <= 1 ? "Hace 1 mes" : `Hace ${months} meses`;
}

function ratingLabel(avg: number): string {
  if (avg >= 4.5) return "Excelente";
  if (avg >= 4) return "Muy bueno";
  if (avg >= 3) return "Bueno";
  return "Regular";
}

function StarRating({ value, className = "h-4 w-4" }: { value: number; className?: string }) {
  const rounded = Math.round(value);
  return (
    <span className="flex items-center gap-0.5 text-amber-400">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} filled={i < rounded} className={className} />
      ))}
    </span>
  );
}

export default function TransporteDetailView({
  prestador: initialPrestador,
  categoryKey,
  categoryLabel,
  isFavorite,
  toggleFavorite,
  handleShare,
  shareMessage,
}: {
  prestador: Prestador;
  categoryKey: string;
  categoryLabel: string;
  isFavorite: boolean;
  toggleFavorite: () => void;
  handleShare: () => void;
  shareMessage: string;
}) {
  const { permissions } = useAuth();
  const [heroIndex, setHeroIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [newsPage, setNewsPage] = useState(1);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [dataVersion, setDataVersion] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewAspects, setReviewAspects] = useState<ReviewAspects>({});
  const [reviewText, setReviewText] = useState("");

  const canEdit =
    permissions?.role === "superadmin" ||
    (permissions?.role === "admin" && permissions.scope?.resourceType === "prestador" && permissions.scope.resourceId === initialPrestador.id);

  const prestador = useMemo(
    () => listPrestadoresByCategory(categoryKey).find((p) => p.id === initialPrestador.id) ?? initialPrestador,
    [categoryKey, initialPrestador, dataVersion],
  );

  useEffect(() => {
    if (!editMode) return;
    const interval = setInterval(() => setDataVersion((v) => v + 1), 1500);
    return () => clearInterval(interval);
  }, [editMode]);

  const galleryImages = [prestador.imageUrl, ...(prestador.gallery ?? [])].filter((url): url is string => Boolean(url));
  const reviews = prestador.reviews ?? [];
  const promotions = prestador.promotions ?? [];
  const amenities = prestador.amenities ?? [];
  const compactFeatures = AMENITY_CATALOG.filter((a) => COMPACT_FEATURE_KEYS.includes(a.key) && amenities.includes(a.key));
  const flights = prestador.flights ?? [];
  const transportOptions = prestador.transportOptions ?? [];
  const news = prestador.news ?? [];
  const NEWS_PER_PAGE = 6;
  const totalNewsPages = Math.max(1, Math.ceil(news.length / NEWS_PER_PAGE));
  const currentNewsPage = Math.min(newsPage, totalNewsPages);
  const visibleNews = news.slice((currentNewsPage - 1) * NEWS_PER_PAGE, currentNewsPage * NEWS_PER_PAGE);
  const visitTips = prestador.visitTips ?? [];
  const highlightChips = (prestador.highlights ?? []).slice(0, 2);
  const subtypeLabel = (prestador.siteType || categoryLabel).toLowerCase();

  const hasImportantInfo = Boolean(
    prestador.schedule || prestador.siteType || prestador.bestTimeToVisit || prestador.priceRange || prestador.keyServices || prestador.idealFor,
  );

  const REVIEWS_PER_PAGE = 3;
  const totalReviewPages = Math.max(1, Math.ceil(reviews.length / REVIEWS_PER_PAGE));
  const currentReviewPage = Math.min(reviewsPage, totalReviewPages);
  const visibleReviews = reviews.slice((currentReviewPage - 1) * REVIEWS_PER_PAGE, currentReviewPage * REVIEWS_PER_PAGE);

  const aspectAverages = useMemo(
    () =>
      GUEST_ASPECTS.map(({ key, label }) => {
        const values = reviews.map((r) => r.aspects?.[key]).filter((v): v is number => typeof v === "number");
        const avg = values.length ? values.reduce((sum, v) => sum + v, 0) / values.length : null;
        return { key, label, avg };
      }).filter((a) => a.avg !== null),
    [reviews],
  );

  const averageRating = aspectAverages.length
    ? aspectAverages.reduce((sum, a) => sum + (a.avg ?? 0), 0) / aspectAverages.length
    : reviews.length
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null;

  const refreshReviews = () => setDataVersion((v) => v + 1);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewText) return;
    await addReview(prestador.id, { author: reviewAuthor, rating: reviewRating, aspects: reviewAspects, text: reviewText });
    setReviewAuthor("");
    setReviewRating(5);
    setReviewAspects({});
    setReviewText("");
    setShowReviewForm(false);
    refreshReviews();
  };

  const openChat = () => {
    (document.querySelector('[aria-label="Abrir chatbot"]') as HTMLButtonElement | null)?.click();
  };

  const mapQuery = encodeURIComponent(prestador.address ?? `${prestador.name}, Yopal, Casanare`);
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  return (
    <main className="min-h-screen bg-forest-950 px-4 py-4 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-8xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href={`/categorias/${categoryKey}`}
            className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
          >
            ← Volver a {categoryLabel}
          </Link>
          {canEdit ? (
            <button
              type="button"
              onClick={() => setEditMode((v) => !v)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                editMode ? "border-brand-400 bg-brand-500/10 text-brand-400" : "border-forest-700 text-slate-300 hover:bg-forest-800"
              }`}
            >
              {editMode ? "Salir del modo edición" : "Editar información del establecimiento"}
            </button>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
          <Link href="/" className="hover:text-brand-400">Inicio</Link>
          <span>›</span>
          <Link href={`/categorias/${categoryKey}`} className="hover:text-brand-400">{categoryLabel}</Link>
          {prestador.siteType ? (
            <>
              <span>›</span>
              <span className="text-slate-300">{prestador.siteType}</span>
            </>
          ) : null}
          <span>›</span>
          <span className="text-slate-300">{prestador.name}</span>
        </div>

        {canEdit && editMode ? <TransporteOwnerEditor prestadorId={prestador.id} categoryKey={categoryKey} onSaved={() => setDataVersion((v) => v + 1)} /> : null}

        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            {/* Gallery */}
            <div className="grid grid-cols-1 gap-2 sm:h-[360px] sm:grid-cols-[2.2fr_1fr]">
              <div className="relative h-64 min-h-0 overflow-hidden rounded-2xl border border-forest-700 sm:h-full">
                {galleryImages.length > 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={galleryImages[heroIndex]} alt={prestador.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-forest-800 to-forest-950" />
                )}
                {(prestador.badges ?? []).length > 0 ? (
                  <span className="absolute left-3 top-3 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-forest-950">
                    {prestador.badges![0]}
                  </span>
                ) : null}
                {galleryImages.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setHeroIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1))}
                      className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
                      aria-label="Anterior"
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroIndex((i) => (i + 1) % galleryImages.length)}
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
                      aria-label="Siguiente"
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </>
                ) : null}
                <button
                  type="button"
                  onClick={() => setShowLightbox(true)}
                  className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-black/70"
                >
                  Ver todas las fotos
                </button>
              </div>

              {galleryImages.length > 1 ? (
                <div className="grid h-40 min-h-0 grid-rows-3 gap-2 sm:h-full">
                  {galleryImages[1] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={galleryImages[1]}
                      alt=""
                      className="h-full min-h-0 w-full cursor-pointer rounded-2xl border border-forest-700 object-cover"
                      onClick={() => setHeroIndex(1)}
                    />
                  ) : (
                    <div className="h-full w-full rounded-2xl bg-forest-900" />
                  )}
                  {galleryImages[2] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={galleryImages[2]}
                      alt=""
                      className="h-full min-h-0 w-full cursor-pointer rounded-2xl border border-forest-700 object-cover"
                      onClick={() => setHeroIndex(2)}
                    />
                  ) : (
                    <div className="h-full w-full rounded-2xl bg-forest-900" />
                  )}
                  <div className="grid min-h-0 grid-cols-2 gap-2">
                    {galleryImages[3] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={galleryImages[3]}
                        alt=""
                        className="h-full min-h-0 w-full cursor-pointer rounded-2xl border border-forest-700 object-cover"
                        onClick={() => setHeroIndex(3)}
                      />
                    ) : (
                      <div className="h-full w-full rounded-2xl bg-forest-900" />
                    )}
                    <button
                      type="button"
                      onClick={() => setShowLightbox(true)}
                      className="relative h-full min-h-0 w-full overflow-hidden rounded-2xl border border-forest-700"
                    >
                      {galleryImages[4] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={galleryImages[4]} alt="" className="h-full w-full object-cover opacity-50" />
                      ) : (
                        <div className="h-full w-full bg-forest-900" />
                      )}
                      {galleryImages.length > 4 ? (
                        <span className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                          <span className="text-lg font-bold">+{galleryImages.length - 4}</span>
                          <span className="text-xs">Ver más fotos</span>
                        </span>
                      ) : null}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Title / rating / description */}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">{categoryLabel}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <h1 className="font-[family-name:var(--font-brand)] text-3xl font-bold text-white">{prestador.name}</h1>
                {(prestador.badges ?? []).some((b) => b.toLowerCase().includes("verifi")) ? (
                  <span className="flex items-center gap-1 text-sm font-medium text-brand-400">
                    <CheckIcon className="h-4 w-4" /> Verificado por TripYopal
                  </span>
                ) : null}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300">
                {averageRating !== null ? (
                  <span className="flex items-center gap-1.5">
                    <StarRating value={averageRating} />
                    <span className="font-semibold text-slate-100">{averageRating.toFixed(1)}</span>
                    <span className="text-slate-500">({reviews.length} opiniones)</span>
                  </span>
                ) : null}
                {highlightChips.map((highlight) => (
                  <span key={highlight.id} className="flex items-center gap-1.5">
                    <span>{highlight.icon}</span> {highlight.title}
                  </span>
                ))}
                {prestador.schedule ? (
                  <span className="flex items-center gap-1.5">
                    <ClockIcon className="h-4 w-4 text-brand-400" /> {prestador.schedule}
                  </span>
                ) : null}
              </div>

              {prestador.description ? (
                <div className="mt-4">
                  <p className={`text-sm leading-6 text-slate-400 ${aboutExpanded ? "" : "line-clamp-3"}`}>{prestador.description}</p>
                  <button
                    type="button"
                    onClick={() => setAboutExpanded((v) => !v)}
                    className="mt-1 text-sm font-semibold text-brand-400 hover:underline"
                  >
                    {aboutExpanded ? "Leer menos ↑" : "Leer más ↓"}
                  </button>
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-forest-950 transition"
                >
                  <CompassIcon className="h-4 w-4" /> ¿Cómo llegar?
                </a>
                {prestador.phone ? (
                  <a
                    href={`tel:${prestador.phone}`}
                    className="inline-flex items-center gap-2 rounded-full border border-forest-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-forest-800"
                  >
                    <PhoneIcon className="h-4 w-4" /> Llamar
                  </a>
                ) : null}
                {prestador.website ? (
                  <a
                    href={prestador.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-forest-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-forest-800"
                  >
                    <GlobeIcon className="h-4 w-4" /> Sitio web
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-full border border-forest-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-forest-800"
                >
                  <ShareIcon className="h-4 w-4" /> Compartir
                </button>
                <button
                  type="button"
                  onClick={toggleFavorite}
                  className={`ml-auto inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                    isFavorite ? "border-brand-400 bg-brand-500/10 text-brand-400" : "border-forest-700 text-slate-200 hover:bg-forest-800"
                  }`}
                >
                  <HeartIcon filled={isFavorite} className="h-4 w-4" /> Guardar
                </button>
              </div>
              {shareMessage ? <p className="mt-2 text-sm text-brand-400">{shareMessage}</p> : null}
            </div>

            {/* Vuelos principales */}
            {flights.length > 0 ? (
              <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-100">Vuelos principales</h2>
                  <Link href={`/categorias/${categoryKey}`} className="text-sm font-semibold text-brand-400 hover:underline">
                    Ver todos los vuelos
                  </Link>
                </div>
                <div className="mt-4 space-y-2">
                  {flights.map((flight) => (
                    <div key={flight.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-forest-700 bg-forest-950 p-3">
                      {flight.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={flight.imageUrl} alt={flight.airline} className="h-8 w-8 shrink-0 rounded-full object-cover" />
                      ) : (
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-xs font-bold text-brand-400">
                          {flight.airline.charAt(0).toUpperCase()}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-100">{flight.airline}</p>
                        <p className="truncate text-xs text-slate-400">
                          {flight.origin} ⇄ {flight.destination} · {flight.frequency}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          flight.direct ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {flight.direct ? "Directo" : "Con conexión"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Transporte desde/hacia */}
            {transportOptions.length > 0 ? (
              <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-lg font-bold text-slate-100">Transporte desde/hacia el {subtypeLabel}</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {transportOptions.map((option) => (
                    <div key={option.id} className="flex items-start justify-between gap-3 rounded-xl border border-forest-700 bg-forest-950 p-3">
                      <span className="flex items-start gap-2">
                        <span className="text-base">{option.icon}</span>
                        <span>
                          <p className="text-sm font-semibold text-slate-200">{option.title}</p>
                          <p className="text-xs text-slate-500">{option.subtitle}</p>
                        </span>
                      </span>
                      <span className="shrink-0 text-right text-xs text-slate-300">{option.duration}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/categorias/${categoryKey}`}
                  className="mt-4 block rounded-full border border-forest-700 py-2 text-center text-sm font-semibold text-slate-200 transition hover:bg-forest-800"
                >
                  Ver opciones de transporte
                </Link>
              </div>
            ) : null}

            {/* Servicios */}
            {compactFeatures.length > 0 ? (
              <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-lg font-bold text-slate-100">Servicios</h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                  {compactFeatures.map((feature) => (
                    <div key={feature.key} className="flex flex-col items-center gap-1.5 rounded-xl border border-forest-700 bg-forest-950 p-3 text-center">
                      <span className="text-xl">{feature.icon}</span>
                      <p className="text-[11px] font-medium leading-tight text-slate-200">{feature.label}</p>
                      {feature.sublabel ? <p className="text-[10px] leading-tight text-slate-500">{feature.sublabel}</p> : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Opiniones */}
            <div id="opiniones" className="mt-6 scroll-mt-20 rounded-2xl border border-forest-700 bg-forest-900 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-lg font-bold text-slate-100">Opiniones de nuestros visitantes</h2>
                <button
                  type="button"
                  onClick={() => setShowReviewForm((v) => !v)}
                  className="btn-brand-font btn-gradient rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
                >
                  {showReviewForm ? "Cancelar" : "Escribir reseña"}
                </button>
              </div>

              {averageRating !== null ? (
                <div className="mt-5 flex flex-col gap-6 sm:flex-row">
                  <div className="shrink-0 text-center sm:w-32">
                    <p className="text-5xl font-bold text-slate-100">{averageRating.toFixed(1)}</p>
                    <div className="mt-1 flex justify-center">
                      <StarRating value={averageRating} />
                    </div>
                    <p className="mt-1 font-semibold text-brand-400">{ratingLabel(averageRating)}</p>
                    <p className="text-xs text-slate-500">Basado en {reviews.length} opiniones</p>
                  </div>
                  {aspectAverages.length > 0 ? (
                    <div className="flex-1 space-y-2">
                      {aspectAverages.map((aspect) => (
                        <div key={aspect.key} className="flex items-center gap-3">
                          <p className="w-24 shrink-0 truncate text-xs text-slate-400">{aspect.label}</p>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-forest-800">
                            <div className="h-full rounded-full bg-brand-400" style={{ width: `${((aspect.avg ?? 0) / 5) * 100}%` }} />
                          </div>
                          <p className="w-8 shrink-0 text-right text-sm text-slate-300">{aspect.avg?.toFixed(1)}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-500">Aún no hay opiniones para este establecimiento.</p>
              )}

              {showReviewForm ? (
                <form onSubmit={submitReview} className="mt-6 grid gap-3 rounded-2xl border border-forest-700 bg-forest-950 p-5">
                  <input
                    className="rounded-2xl border border-forest-700 bg-forest-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500"
                    placeholder="Tu nombre"
                    required
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                  />
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-slate-300">Calificación general</p>
                    <div className="flex gap-1 text-xl">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button key={n} type="button" onClick={() => setReviewRating(n)} className={n <= reviewRating ? "text-amber-400" : "text-slate-600"}>★</button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {GUEST_ASPECTS.map(({ key, label }) => (
                      <div key={key} className="flex items-center justify-between gap-2 rounded-xl bg-forest-900 px-3 py-2">
                        <p className="text-xs text-slate-400">{label}</p>
                        <div className="flex gap-1 text-sm">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => setReviewAspects((prev) => ({ ...prev, [key]: n }))}
                              className={n <= (reviewAspects[key] ?? 0) ? "text-amber-400" : "text-slate-600"}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <textarea
                    className="rounded-2xl border border-forest-700 bg-forest-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500"
                    placeholder="Cuéntanos tu experiencia"
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                  <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition">Publicar reseña</button>
                </form>
              ) : null}

              {reviews.length === 0 ? (
                <p className="mt-6 text-sm text-slate-500">Sé el primero en dejar una opinión.</p>
              ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleReviews.map((review) => (
                    <div key={review.id} className="rounded-2xl border border-forest-700 bg-forest-950 p-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-sm font-bold text-brand-400">
                          {review.author.charAt(0).toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-100">{review.author}</p>
                          <p className="text-xs text-slate-500">{daysAgoLabel(review.date)}</p>
                        </div>
                      </div>
                      <p className="mt-2 text-amber-400">{"★".repeat(review.rating)}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{review.text}</p>
                      {review.reply ? (
                        <div className="mt-3 rounded-xl bg-forest-900 p-3 text-xs text-slate-300">
                          <p className="font-semibold text-brand-400">Respuesta</p>
                          <p className="mt-1">{review.reply}</p>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}

              {totalReviewPages > 1 ? (
                <div className="mt-5 flex items-center justify-center gap-2">
                  {Array.from({ length: totalReviewPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setReviewsPage(page)}
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition ${
                        currentReviewPage === page
                          ? "bg-brand-500 text-forest-950"
                          : "border border-forest-700 text-slate-300 hover:bg-forest-800"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Noticias y actualizaciones */}
            {news.length > 0 ? (
              <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-100">Noticias y actualizaciones</h2>
                  <Link href={`/categorias/${categoryKey}`} className="text-sm font-semibold text-brand-400 hover:underline">
                    Ver todas
                  </Link>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {visibleNews.map((item) => (
                    <div key={item.id} className="overflow-hidden rounded-xl border border-forest-700 bg-forest-950">
                      {item.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.imageUrl} alt={item.title} className="h-24 w-full object-cover" />
                      ) : (
                        <div className="h-24 w-full bg-gradient-to-br from-forest-800 to-forest-950" />
                      )}
                      <div className="p-3">
                        <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                        <p className="mt-1 line-clamp-2 text-xs text-slate-400">{item.description}</p>
                        <span className="mt-2 inline-block text-xs font-semibold text-brand-400">Leer más ›</span>
                      </div>
                    </div>
                  ))}
                </div>
                {totalNewsPages > 1 ? (
                  <div className="mt-5 flex items-center justify-center gap-2">
                    {Array.from({ length: totalNewsPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setNewsPage(page)}
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition ${
                          currentNewsPage === page
                            ? "bg-brand-500 text-forest-950"
                            : "border border-forest-700 text-slate-300 hover:bg-forest-800"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            {/* Políticas */}
            {prestador.policies && prestador.policies.length > 0 ? (
              <div id="politicas" className="mt-6 scroll-mt-20 rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-lg font-bold text-slate-100">Políticas</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {prestador.policies.map((policy) => (
                    <div key={policy.id} className="rounded-2xl bg-forest-950 p-4">
                      <p className="text-sm font-semibold text-brand-400">{policy.title}</p>
                      <p className="mt-1 text-sm text-slate-300">{policy.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Contáctanos + confianza */}
            {prestador.address || prestador.phone || prestador.whatsapp || prestador.email || prestador.website ? (
              <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-lg font-bold text-slate-100">Contáctanos</h2>
                <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-200">
                  {prestador.address ? (
                    <span className="flex items-center gap-2">
                      <EventPinIcon className="h-4 w-4 text-brand-400" /> {prestador.address}
                    </span>
                  ) : null}
                  {prestador.phone ? (
                    <a href={`tel:${prestador.phone}`} className="flex items-center gap-2 hover:text-brand-400">
                      <PhoneIcon className="h-4 w-4 text-brand-400" /> {prestador.phone}
                    </a>
                  ) : null}
                  {prestador.whatsapp ? (
                    <a href={`https://wa.me/${prestador.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-brand-400">
                      <WhatsAppIcon className="h-4 w-4 text-brand-400" /> {prestador.whatsapp}
                    </a>
                  ) : null}
                  {prestador.email ? (
                    <a href={`mailto:${prestador.email}`} className="flex items-center gap-2 hover:text-brand-400">
                      <MailIcon className="h-4 w-4 text-brand-400" /> {prestador.email}
                    </a>
                  ) : null}
                  {prestador.website ? (
                    <a href={prestador.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-brand-400">
                      <GlobeIcon className="h-4 w-4 text-brand-400" /> {prestador.website.replace(/^https?:\/\//, "")}
                    </a>
                  ) : null}
                  {prestador.facebook || prestador.twitter || prestador.tiktok ? (
                    <span className="ml-auto flex items-center gap-3">
                      {prestador.facebook ? (
                        <a
                          href={prestador.facebook.startsWith("http") ? prestador.facebook : `https://facebook.com/${prestador.facebook}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-950 text-brand-400 transition hover:bg-brand-500/10"
                          aria-label="Facebook"
                        >
                          <FacebookIcon className="h-4 w-4" />
                        </a>
                      ) : null}
                      {prestador.twitter ? (
                        <a
                          href={prestador.twitter.startsWith("http") ? prestador.twitter : `https://x.com/${prestador.twitter.replace("@", "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-950 text-brand-400 transition hover:bg-brand-500/10"
                          aria-label="Twitter / X"
                        >
                          <TwitterIcon className="h-4 w-4" />
                        </a>
                      ) : null}
                      {prestador.tiktok ? (
                        <a
                          href={prestador.tiktok.startsWith("http") ? prestador.tiktok : `https://tiktok.com/@${prestador.tiktok.replace("@", "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-950 text-brand-400 transition hover:bg-brand-500/10"
                          aria-label="TikTok"
                        >
                          <TiktokIcon className="h-4 w-4" />
                        </a>
                      ) : null}
                    </span>
                  ) : null}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-forest-700 pt-6 sm:grid-cols-5">
                  {TRUST_BADGES.map(({ icon: Icon, title, subtitle }) => (
                    <div key={title} className="flex flex-col items-center gap-1.5 text-center">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold text-slate-100">{title}</p>
                      <p className="text-[11px] text-slate-500">{subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            {hasImportantInfo ? (
              <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-center text-base font-bold text-slate-100">Información importante</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 text-sm">
                  {prestador.schedule ? (
                    <div className="flex items-start gap-3">
                      <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                      <span><span className="block text-slate-500">Horario de atención</span><span className="text-slate-200">{prestador.schedule}</span></span>
                    </div>
                  ) : null}
                  {prestador.siteType ? (
                    <div className="flex items-start gap-3">
                      <EventPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                      <span><span className="block text-slate-500">Tipo de transporte</span><span className="text-slate-200">{prestador.siteType}</span></span>
                    </div>
                  ) : null}
                  {prestador.bestTimeToVisit ? (
                    <div className="flex items-start gap-3">
                      <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                      <span><span className="block text-slate-500">Mejor momento</span><span className="text-slate-200">{prestador.bestTimeToVisit}</span></span>
                    </div>
                  ) : null}
                  {prestador.priceRange ? (
                    <div className="flex items-start gap-3">
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                      <span>
                        <span className="block text-slate-500">Rango de precios</span>
                        <span className="text-slate-200">
                          {prestador.priceRange === "Bajo" ? "$ Económico" : prestador.priceRange === "Alto" ? "$$$ Alto" : "$$ Moderado"}
                        </span>
                      </span>
                    </div>
                  ) : null}
                  {prestador.keyServices ? (
                    <div className="flex items-start gap-3">
                      <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                      <span><span className="block text-slate-500">Servicios destacados</span><span className="text-slate-200">{prestador.keyServices}</span></span>
                    </div>
                  ) : null}
                  {prestador.idealFor ? (
                    <div className="flex items-start gap-3">
                      <HeartIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                      <span><span className="block text-slate-500">Ideal para</span><span className="text-slate-200">{prestador.idealFor}</span></span>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {visitTips.length > 0 ? (
              <div className="relative overflow-hidden rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-base font-bold text-slate-100">Consejos para tu viaje</h2>
                <ul className="mt-3 max-w-[75%] space-y-2.5 text-sm text-slate-300">
                  {visitTips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" /> {tip}
                    </li>
                  ))}
                </ul>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={siteContent.images.mascot} alt="" className="absolute bottom-2 right-2 h-24 w-24 object-contain opacity-90" />
              </div>
            ) : null}

            {promotions.length > 0 ? (
              <div className="rounded-2xl border border-brand-500/30 bg-forest-900 p-6">
                <h2 className="text-center text-lg font-bold text-slate-100">Promociones</h2>
                <div className="mt-4 space-y-3">
                  {promotions.map((promo) => (
                    <div key={promo.id} className="rounded-2xl border border-brand-500/30 bg-forest-950 p-4">
                      <p className="font-semibold text-brand-400">{promo.title}</p>
                      <p className="mt-1 text-sm text-slate-300">{promo.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div id="ubicacion" className="scroll-mt-20 rounded-2xl border border-forest-700 bg-forest-900 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-100">Ubicación</h2>
                <a
                  href={`https://www.google.com/maps?q=${mapQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-brand-400 hover:underline"
                >
                  Ver en Google Maps <ArrowUpRightIcon className="h-3 w-3" />
                </a>
              </div>
              <div className="mt-3 overflow-hidden rounded-xl border border-forest-700">
                <iframe
                  src={`https://www.google.com/maps?q=${mapQuery}&z=13&output=embed`}
                  className="h-40 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mini mapa de ${prestador.name}`}
                />
              </div>
              {(prestador.nearbyPlaces?.length ?? 0) > 0 ? (
                <div className="mt-3 space-y-2 text-xs">
                  {prestador.nearbyPlaces!.map((place) => (
                    <div key={place.id} className="flex items-center justify-between text-slate-300">
                      <span className="flex min-w-0 items-center gap-1.5 truncate">
                        <EventPinIcon className="h-3.5 w-3.5 shrink-0 text-brand-400" /> {place.name}
                      </span>
                      <span className="shrink-0 text-slate-500">{place.distance || "—"}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              <a
                href={directionsHref}
                target="_blank"
                rel="noreferrer"
                className="mt-4 block rounded-full border border-forest-700 py-2 text-center text-sm font-semibold text-slate-200 transition hover:bg-forest-800"
              >
                Cómo llegar
              </a>
            </div>

            {(prestador.weeklyHours?.length ?? 0) > 0 ? (
              <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-base font-bold text-slate-100">Horarios</h2>
                <div className="mt-3 space-y-1.5 text-sm">
                  {prestador.weeklyHours!.map((entry) => (
                    <div key={entry.day} className="flex items-center justify-between">
                      <span className="text-slate-400">{entry.day}</span>
                      <span className="text-slate-200">{entry.hours}</span>
                    </div>
                  ))}
                </div>
                <span
                  className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    prestador.status === "Abierto" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {prestador.status === "Abierto" ? "Abierto ahora" : prestador.status ?? "Cerrado"}
                </span>
              </div>
            ) : null}

            <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6 text-center">
              <span className="mx-auto block h-20 w-20 overflow-hidden rounded-full border-2 border-brand-400">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={siteContent.images.mascot} alt="TripYopal IA" className="h-full w-full object-cover" />
              </span>
              <h2 className="mt-3 text-base font-bold text-slate-100">TripYopal IA</h2>
              <p className="mt-1 text-xs text-slate-400">¿Necesitas ayuda para encontrar la mejor opción de transporte? Estoy aquí para ayudarte.</p>
              <button
                type="button"
                onClick={openChat}
                className="btn-brand-font btn-gradient mt-4 w-full rounded-full px-4 py-2.5 text-sm font-semibold text-forest-950 transition"
              >
                Hablar con IA
              </button>
            </div>
          </div>
        </div>
      </div>

      {showLightbox ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/90 p-4 sm:p-8" onClick={() => setShowLightbox(false)}>
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
            <p className="text-sm font-semibold text-white">{prestador.name} · Todas las fotos ({galleryImages.length})</p>
            <button
              type="button"
              onClick={() => setShowLightbox(false)}
              aria-label="Cerrar"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20"
            >
              ×
            </button>
          </div>
          <div
            className="mx-auto mt-4 grid w-full max-w-5xl gap-3 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3"
            onClick={(e) => e.stopPropagation()}
          >
            {galleryImages.map((url, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={index} src={url} alt="" className="h-48 w-full rounded-xl object-cover" />
            ))}
          </div>
        </div>
      ) : null}
    </main>
  );
}
