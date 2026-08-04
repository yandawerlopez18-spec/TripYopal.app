"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import SitioOwnerEditor from "./SitioOwnerEditor";
import {
  ArrowUpRightIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CompassIcon,
  EventPinIcon,
  HeartIcon,
  PhoneIcon,
  ShareIcon,
  StarIcon,
  ThermometerIcon,
  UsersIcon,
  WalkIcon,
} from "../home/infoIcons";
import { addReview, listPrestadoresByCategory, type Prestador, type ReviewAspects } from "../../services/prestadores";
import { siteContent } from "../../services/siteContent";
import { getDisplayRating } from "../../utils/businessProfileConfig";
import { formatCOP } from "../../utils/formatters";
import ImageUploadField from "../admin/ImageUploadField";

const GUEST_ASPECTS: { key: keyof ReviewAspects; label: string }[] = [
  { key: "cleanliness", label: "Limpieza" },
  { key: "location", label: "Acceso" },
  { key: "comfort", label: "Paisaje" },
  { key: "security", label: "Seguridad" },
  { key: "service", label: "Experiencia" },
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

export default function SitioDetailView({
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
  const [activitiesPage, setActivitiesPage] = useState(1);
  const [whatToFindPage, setWhatToFindPage] = useState(1);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [dataVersion, setDataVersion] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewAspects, setReviewAspects] = useState<ReviewAspects>({});
  const [reviewText, setReviewText] = useState("");
  const [reviewImageUrl, setReviewImageUrl] = useState("");

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

  const galleryImages = [
    prestador.imageUrl,
    ...(prestador.gallery ?? []),
    ...(prestador.media ?? []).map((item) => item.url),
  ].filter((url): url is string => Boolean(url));
  const reviews = prestador.reviews ?? [];
  const promotions = prestador.promotions ?? [];
  const activities = prestador.items ?? [];
  const whatToFind = prestador.whatToFind ?? [];
  const highlights = prestador.highlights ?? [];
  const visitTips = prestador.visitTips ?? [];

  const ACTIVITIES_PER_PAGE = 6;
  const totalActivitiesPages = Math.max(1, Math.ceil(activities.length / ACTIVITIES_PER_PAGE));
  const currentActivitiesPage = Math.min(activitiesPage, totalActivitiesPages);
  const visibleActivities = activities.slice((currentActivitiesPage - 1) * ACTIVITIES_PER_PAGE, currentActivitiesPage * ACTIVITIES_PER_PAGE);

  const WHAT_TO_FIND_PER_PAGE = 6;
  const totalWhatToFindPages = Math.max(1, Math.ceil(whatToFind.length / WHAT_TO_FIND_PER_PAGE));
  const currentWhatToFindPage = Math.min(whatToFindPage, totalWhatToFindPages);
  const visibleWhatToFind = whatToFind.slice((currentWhatToFindPage - 1) * WHAT_TO_FIND_PER_PAGE, currentWhatToFindPage * WHAT_TO_FIND_PER_PAGE);

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

  const otherSites = listPrestadoresByCategory(categoryKey)
    .filter((p) => p.id !== prestador.id)
    .slice(0, 4);

  const refreshReviews = () => setDataVersion((v) => v + 1);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewText) return;
    await addReview(prestador.id, { author: reviewAuthor, rating: reviewRating, aspects: reviewAspects, text: reviewText, imageUrl: reviewImageUrl || undefined });
    setReviewAuthor("");
    setReviewRating(5);
    setReviewAspects({});
    setReviewText("");
    setReviewImageUrl("");
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
              {editMode ? "Salir del modo edición" : "Editar información del sitio"}
            </button>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
          <Link href="/" className="hover:text-brand-400">Inicio</Link>
          <span>›</span>
          <Link href={`/categorias/${categoryKey}`} className="hover:text-brand-400">{categoryLabel}</Link>
          <span>›</span>
          <span className="text-slate-300">{prestador.name}</span>
        </div>

        {canEdit && editMode ? <SitioOwnerEditor prestadorId={prestador.id} categoryKey={categoryKey} onSaved={() => setDataVersion((v) => v + 1)} /> : null}

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
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">Sitio turístico</p>
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
                <span className="flex items-center gap-1.5">
                  <EventPinIcon className="h-4 w-4 text-brand-400" /> Imperdible en Yopal
                </span>
                {prestador.difficultyLevel ? (
                  <span className="flex items-center gap-1.5">
                    <WalkIcon className="h-4 w-4 text-brand-400" /> {prestador.difficultyLevel} acceso
                  </span>
                ) : null}
                <span className="flex items-center gap-1.5">
                  <UsersIcon className="h-4 w-4 text-brand-400" /> Apto para toda la familia
                </span>
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
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-full border border-forest-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-forest-800"
                >
                  <ShareIcon className="h-4 w-4" /> Compartir
                </button>
                <span className="inline-flex items-center gap-2 rounded-full border border-forest-700 px-5 py-2.5 text-sm font-semibold text-slate-200">
                  <StarIcon className="h-4 w-4 text-amber-400" filled /> Sitio recomendado
                </span>
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

            {/* Actividades recomendadas */}
            {activities.length > 0 ? (
              <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-lg font-bold text-slate-100">Actividades recomendadas</h2>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {visibleActivities.map((activity) => (
                    <div key={activity.id} className="overflow-hidden rounded-xl border border-forest-700 bg-forest-950">
                      {activity.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={activity.imageUrl} alt={activity.name} className="h-36 w-full object-cover" />
                      ) : (
                        <div className="h-36 w-full bg-gradient-to-br from-forest-800 to-forest-950" />
                      )}
                      <div className="p-3">
                        <p className="truncate text-sm font-semibold text-slate-100">{activity.name}</p>
                        {activity.description ? <p className="mt-1 line-clamp-2 text-xs leading-snug text-slate-400">{activity.description}</p> : null}
                      </div>
                    </div>
                  ))}
                </div>
                {totalActivitiesPages > 1 ? (
                  <div className="mt-5 flex items-center justify-center gap-2">
                    {Array.from({ length: totalActivitiesPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setActivitiesPage(page)}
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition ${
                          currentActivitiesPage === page
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

            {/* Qué podemos encontrar */}
            {whatToFind.length > 0 ? (
              <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-lg font-bold text-slate-100">Qué podemos encontrar</h2>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {visibleWhatToFind.map((item) => (
                    <div key={item.id} className="overflow-hidden rounded-xl border border-forest-700 bg-forest-950">
                      {item.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.imageUrl} alt={item.name} className="h-36 w-full object-cover" />
                      ) : (
                        <div className="h-36 w-full bg-gradient-to-br from-forest-800 to-forest-950" />
                      )}
                      <div className="p-3">
                        <p className="truncate text-sm font-semibold text-slate-100">{item.name}</p>
                        {item.description ? <p className="mt-1 line-clamp-2 text-xs leading-snug text-slate-400">{item.description}</p> : null}
                        {item.price ? <p className="mt-1 text-sm font-bold text-brand-400">{formatCOP(item.price)}</p> : null}
                      </div>
                    </div>
                  ))}
                </div>
                {totalWhatToFindPages > 1 ? (
                  <div className="mt-5 flex items-center justify-center gap-2">
                    {Array.from({ length: totalWhatToFindPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setWhatToFindPage(page)}
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition ${
                          currentWhatToFindPage === page
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
                <p className="mt-4 text-sm text-slate-500">Aún no hay opiniones para este sitio.</p>
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
                  <ImageUploadField value={reviewImageUrl} onChange={setReviewImageUrl} />
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
                      {review.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={review.imageUrl} alt="" className="mt-3 h-24 w-full rounded-xl object-cover" />
                      ) : null}
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

            {/* También te puede interesar */}
            {otherSites.length > 0 ? (
              <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-100">También te puede interesar</h2>
                  <Link href={`/categorias/${categoryKey}`} className="text-sm font-semibold text-brand-400 hover:underline">
                    Ver más
                  </Link>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {otherSites.map((other) => {
                    const otherReviews = other.reviews ?? [];
                    const otherAvgRating = otherReviews.length
                      ? otherReviews.reduce((sum, r) => sum + r.rating, 0) / otherReviews.length
                      : getDisplayRating(other);
                    return (
                      <Link
                        key={other.id}
                        href={`/categorias/${categoryKey}/${other.id}`}
                        className="overflow-hidden rounded-2xl border border-forest-700 bg-forest-950 transition hover:border-brand-400"
                      >
                        {other.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={other.imageUrl} alt={other.name} className="h-24 w-full object-cover" />
                        ) : (
                          <div className="h-24 w-full bg-gradient-to-br from-forest-800 to-forest-950" />
                        )}
                        <div className="p-3">
                          <p className="truncate text-sm font-semibold text-slate-100">{other.name}</p>
                          {otherAvgRating !== null ? (
                            <div className="mt-1 flex items-center gap-1.5">
                              <StarRating value={otherAvgRating} className="h-3 w-3" />
                              <span className="text-xs font-semibold text-slate-100">{otherAvgRating.toFixed(1)}</span>
                            </div>
                          ) : null}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}

          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            {prestador.schedule || prestador.siteType || prestador.bestTimeToVisit || prestador.averageClimate || prestador.visitRecommendations || prestador.difficultyLevel || prestador.entryFee ? (
              <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-center text-base font-bold text-slate-100">Información importante</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 text-sm">
                  {prestador.schedule ? (
                    <div className="flex items-start gap-3">
                      <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                      <span><span className="block text-slate-500">Horario de visita</span><span className="text-slate-200">{prestador.schedule}</span></span>
                    </div>
                  ) : null}
                  {prestador.siteType ? (
                    <div className="flex items-start gap-3">
                      <EventPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                      <span><span className="block text-slate-500">Tipo de lugar</span><span className="text-slate-200">{prestador.siteType}</span></span>
                    </div>
                  ) : null}
                  {prestador.bestTimeToVisit ? (
                    <div className="flex items-start gap-3">
                      <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                      <span><span className="block text-slate-500">Mejor momento</span><span className="text-slate-200">{prestador.bestTimeToVisit}</span></span>
                    </div>
                  ) : null}
                  {prestador.averageClimate ? (
                    <div className="flex items-start gap-3">
                      <ThermometerIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                      <span><span className="block text-slate-500">Clima promedio</span><span className="text-slate-200">{prestador.averageClimate}</span></span>
                    </div>
                  ) : null}
                  {prestador.visitRecommendations ? (
                    <div className="flex items-start gap-3">
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                      <span><span className="block text-slate-500">Recomendaciones</span><span className="text-slate-200">{prestador.visitRecommendations}</span></span>
                    </div>
                  ) : null}
                  {prestador.difficultyLevel ? (
                    <div className="flex items-start gap-3">
                      <WalkIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                      <span><span className="block text-slate-500">Nivel de dificultad</span><span className="text-slate-200">{prestador.difficultyLevel}</span></span>
                    </div>
                  ) : null}
                  {prestador.entryFee ? (
                    <div className="flex items-start gap-3">
                      <UsersIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                      <span><span className="block text-slate-500">Ingreso</span><span className="text-slate-200">{prestador.entryFee}</span></span>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {visitTips.length > 0 ? (
              <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-base font-bold text-slate-100">Consejos para tu visita</h2>
                <ul className="mt-3 space-y-2.5 text-sm text-slate-300">
                  {visitTips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" /> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {highlights.length > 0 ? (
              <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-base font-bold text-slate-100">Lo que nos hace únicos</h2>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {highlights.map((highlight) => (
                    <div key={highlight.id} className="rounded-xl border border-forest-700 bg-forest-950 p-3 text-center">
                      <span className="text-xl">{highlight.icon}</span>
                      <p className="mt-1 text-xs font-semibold text-slate-100">{highlight.title}</p>
                      <p className="mt-0.5 text-[11px] leading-tight text-slate-400">{highlight.description}</p>
                    </div>
                  ))}
                </div>
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
                  src={`https://www.google.com/maps?q=${mapQuery}&z=14&output=embed`}
                  className="h-40 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mini mapa de ${prestador.name}`}
                />
              </div>
              {(prestador.nearbyPlaces?.length ?? 0) > 0 ? (
                <div className="mt-3 space-y-2 text-xs">
                  {prestador.nearbyPlaces!.slice(0, 4).map((place) => (
                    <div key={place.id} className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1.5 truncate">
                        <EventPinIcon className="h-3.5 w-3.5 shrink-0 text-brand-400" /> {place.name}
                      </span>
                      <span className="shrink-0 text-slate-500">{place.distance}</span>
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
              <p className="mt-1 text-xs text-slate-400">¿Necesitas recomendaciones de lugares turísticos en Yopal? Estoy aquí para ayudarte.</p>
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
