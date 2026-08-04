"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import DomicilioOwnerEditor from "./DomicilioOwnerEditor";
import {
  ArrowUpRightIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CompassIcon,
  EventPinIcon,
  HeadsetIcon,
  HeartIcon,
  InstagramIcon,
  MailIcon,
  PackageIcon,
  PhoneIcon,
  PhoneIcon as TrackingIcon,
  ShareIcon,
  ShieldIcon,
  StarIcon,
  UsersIcon,
  WhatsAppIcon,
} from "../home/infoIcons";
import { addReview, likeReview, listPrestadoresByCategory, type Prestador, type ReviewAspects } from "../../services/prestadores";
import { siteContent } from "../../services/siteContent";
import { formatCOP } from "../../utils/formatters";

const GUEST_ASPECTS: { key: keyof ReviewAspects; label: string }[] = [
  { key: "facilities", label: "Servicio" },
  { key: "internet", label: "Rapidez" },
  { key: "cleanliness", label: "Calidad" },
  { key: "service", label: "Atención" },
  { key: "price", label: "Precio" },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Elige tu restaurante", icon: EventPinIcon },
  { step: "2", title: "Realiza tu pedido", icon: PackageIcon },
  { step: "3", title: "Confirmamos tu pedido", icon: CheckIcon },
  { step: "4", title: "Recibe en la puerta de tu casa", icon: HeartIcon },
];

const TRUST_BADGES = [
  { icon: CheckIcon, title: "100% Confiable", subtitle: "Servicio verificado" },
  { icon: ShieldIcon, title: "Entregas seguras", subtitle: "Tu pedido protegido" },
  { icon: HeadsetIcon, title: "Atención 24/7", subtitle: "Siempre disponibles" },
  { icon: PackageIcon, title: "Repartidores certificados", subtitle: "Entregas seguras" },
  { icon: ArrowUpRightIcon, title: "Apoya lo local", subtitle: "Vive Yopal al máximo" },
];

function scrollCarousel(ref: React.RefObject<HTMLDivElement | null>, direction: 1 | -1) {
  ref.current?.scrollBy({ left: direction * 280, behavior: "smooth" });
}

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

export default function DomicilioDetailView({
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
  const [reviewsExpanded, setReviewsExpanded] = useState(false);
  const [dataVersion, setDataVersion] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewAspects, setReviewAspects] = useState<ReviewAspects>({});
  const [reviewText, setReviewText] = useState("");

  const reviewScrollRef = useRef<HTMLDivElement>(null);

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

  const reviews = prestador.reviews ?? [];
  const averageRating = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : null;
  const items = prestador.items ?? [];
  const menuCategories = prestador.menuCategories ?? [];
  const allies = prestador.allies ?? [];
  const promotions = prestador.promotions ?? [];
  const featuredPromo = promotions[0];
  const extraPromos = promotions.slice(1, 3);
  const visibleAllies = allies.slice(0, 5);
  const extraAllies = Math.max(0, allies.length - 5);

  const hasImportantInfo = Boolean(
    prestador.schedule || prestador.deliveryTime || prestador.minOrder || prestador.deliveryFee || prestador.paymentMethods || prestador.orderTracking,
  );

  const visibleReviews = reviewsExpanded ? reviews : reviews.slice(0, 6);

  const aspectAverages = useMemo(
    () =>
      GUEST_ASPECTS.map(({ key, label }) => {
        const values = reviews.map((r) => r.aspects?.[key]).filter((v): v is number => typeof v === "number");
        const avg = values.length ? values.reduce((sum, v) => sum + v, 0) / values.length : null;
        return { key, label, avg };
      }).filter((a) => a.avg !== null),
    [reviews],
  );

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

  const handleLikeReview = async (reviewId: string) => {
    await likeReview(prestador.id, reviewId);
    refreshReviews();
  };

  const mapQuery = encodeURIComponent(prestador.address ?? `${prestador.name}, Yopal, Casanare`);
  const orderHref = prestador.whatsapp
    ? `https://wa.me/${prestador.whatsapp}?text=${encodeURIComponent(`Hola, quiero hacer un pedido en ${prestador.name}.`)}`
    : prestador.phone
      ? `tel:${prestador.phone}`
      : "#";

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
              {editMode ? "Salir del modo edición" : "Editar información del servicio"}
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

        {canEdit && editMode ? <DomicilioOwnerEditor prestadorId={prestador.id} categoryKey={categoryKey} onSaved={() => setDataVersion((v) => v + 1)} /> : null}

        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            {/* Hero */}
            <div className="relative h-72 overflow-hidden rounded-2xl border border-forest-700 sm:h-80">
              {prestador.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={prestador.imageUrl} alt={prestador.name} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-forest-800 to-forest-950" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/50 to-transparent" />
              {prestador.status ? (
                <span
                  className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                    prestador.status === "Abierto" ? "bg-brand-500 text-forest-950" : "bg-red-500 text-white"
                  }`}
                >
                  {prestador.status === "Abierto" ? "Abierto ahora" : prestador.status}
                </span>
              ) : null}

              <div className="relative flex h-full items-center gap-5 p-6 sm:p-10">
                {prestador.logoUrl ? (
                  <span className="hidden h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg sm:flex sm:h-36 sm:w-36">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={prestador.logoUrl} alt={`Logo de ${prestador.name}`} className="h-full w-full object-cover" />
                  </span>
                ) : null}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-[family-name:var(--font-brand)] text-2xl font-bold text-white sm:text-3xl">{prestador.name}</h1>
                    {(prestador.badges ?? []).some((b) => b.toLowerCase().includes("verifi")) ? (
                      <CheckIcon className="h-4 w-4 text-brand-400" />
                    ) : null}
                  </div>
                  {prestador.description ? <p className="mt-1 max-w-md text-sm text-slate-200">{prestador.description}</p> : null}
                  {averageRating !== null ? (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-semibold text-slate-100">{averageRating.toFixed(1)}</span>
                      <StarRating value={averageRating} />
                      <span className="text-sm text-slate-400">({reviews.length} opiniones)</span>
                    </div>
                  ) : null}
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <ClockIcon className="h-3.5 w-3.5 text-brand-400" /> Rápido
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldIcon className="h-3.5 w-3.5 text-brand-400" /> Seguro
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckIcon className="h-3.5 w-3.5 text-brand-400" /> Confiable
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <a
                href={orderHref}
                target={orderHref.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-forest-950 transition"
              >
                <PackageIcon className="h-4 w-4" /> Pedir ahora
              </a>
              {prestador.whatsapp ? (
                <a
                  href={`https://wa.me/${prestador.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-forest-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-forest-800"
                >
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
              ) : null}
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
              <button
                type="button"
                onClick={toggleFavorite}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                  isFavorite ? "border-brand-400 bg-brand-500/10 text-brand-400" : "border-forest-700 text-slate-200 hover:bg-forest-800"
                }`}
              >
                <HeartIcon filled={isFavorite} className="h-4 w-4" /> Guardar
              </button>
            </div>
            {shareMessage ? <p className="mt-2 text-sm text-brand-400">{shareMessage}</p> : null}

            {/* Trust feature row */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { icon: ClockIcon, label: "Entrega rápida", sub: "30-60 min" },
                { icon: ClockIcon, label: "24/7", sub: "Siempre disponible" },
                { icon: ShieldIcon, label: "Seguridad", sub: "Tu pedido seguro" },
                { icon: EventPinIcon, label: "Amplia cobertura", sub: "Yopal y alrededores" },
                { icon: UsersIcon, label: "Atención", sub: "Amigable y confiable" },
                { icon: TrackingIcon, label: "Seguimiento", sub: "En tiempo real" },
              ].map((feature) => (
                <div key={feature.label} className="flex flex-col items-center gap-1.5 rounded-xl border border-forest-700 bg-forest-900 p-3 text-center">
                  <feature.icon className="h-5 w-5 text-brand-400" />
                  <p className="text-[11px] font-medium leading-tight text-slate-200">{feature.label}</p>
                  <p className="text-[10px] leading-tight text-slate-500">{feature.sub}</p>
                </div>
              ))}
            </div>

            {/* ¿Qué quieres pedir hoy? */}
            {menuCategories.length > 0 ? (
              <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-100">¿Qué quieres pedir hoy?</h2>
                  <Link href={`/categorias/${categoryKey}`} className="text-sm font-semibold text-brand-400 hover:underline">
                    Ver todas las categorías
                  </Link>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {menuCategories.map((item) => (
                    <div key={item.id} className="flex flex-col items-center gap-2 rounded-xl border border-forest-700 bg-forest-950 p-3 text-center">
                      <span className="text-2xl">{item.icon}</span>
                      <p className="text-xs font-medium text-slate-200">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Restaurantes aliados */}
            {allies.length > 0 ? (
              <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-100">Restaurantes aliados</h2>
                  <Link href="/restaurantes" className="text-sm font-semibold text-brand-400 hover:underline">
                    Ver todos
                  </Link>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {visibleAllies.map((ally) => (
                    <div key={ally.id} className="overflow-hidden rounded-xl border border-forest-700 bg-forest-950 p-3 text-center">
                      {ally.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={ally.imageUrl} alt={ally.name} className="mx-auto h-8 object-contain" />
                      ) : null}
                      <p className="mt-2 truncate text-sm font-semibold text-slate-100">{ally.name}</p>
                      {ally.subtitle ? <p className="truncate text-[11px] text-slate-500">{ally.subtitle}</p> : null}
                    </div>
                  ))}
                  {extraAllies > 0 ? (
                    <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-forest-700 p-3 text-center">
                      <span className="text-lg font-bold text-brand-400">+{extraAllies}</span>
                      <p className="text-xs text-slate-400">Más aliados</p>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {/* Lo más pedido */}
            {items.length > 0 ? (
              <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-100">Lo más pedido</h2>
                  <Link href={`/categorias/${categoryKey}`} className="text-sm font-semibold text-brand-400 hover:underline">
                    Ver menú completo
                  </Link>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {items.slice(0, 6).map((item) => (
                    <div key={item.id} className="overflow-hidden rounded-xl border border-forest-700 bg-forest-950">
                      {item.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.imageUrl} alt={item.name} className="h-20 w-full object-cover" />
                      ) : (
                        <div className="h-20 w-full bg-gradient-to-br from-forest-800 to-forest-950" />
                      )}
                      <div className="p-2.5">
                        <p className="truncate text-xs font-semibold text-slate-100">{item.name}</p>
                        {item.price ? <p className="mt-0.5 text-xs font-bold text-brand-400">{formatCOP(item.price)}</p> : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Opiniones */}
            <div id="opiniones" className="mt-6 scroll-mt-20 rounded-2xl border border-forest-700 bg-forest-900 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-lg font-bold text-slate-100">Opiniones de nuestros usuarios</h2>
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
                <p className="mt-4 text-sm text-slate-500">Aún no hay opiniones para este servicio.</p>
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
              ) : !reviewsExpanded ? (
                <div className="relative mt-6">
                  {reviews.length > 2 ? (
                    <>
                      <button
                        type="button"
                        onClick={() => scrollCarousel(reviewScrollRef, -1)}
                        className="absolute -left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                        aria-label="Anterior"
                      >
                        <ChevronLeftIcon className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollCarousel(reviewScrollRef, 1)}
                        className="absolute -right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                        aria-label="Siguiente"
                      >
                        <ChevronRightIcon className="h-4 w-4" />
                      </button>
                    </>
                  ) : null}
                  <div ref={reviewScrollRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-1">
                    {visibleReviews.map((review) => (
                      <div key={review.id} className="w-72 shrink-0 rounded-2xl border border-forest-700 bg-forest-950 p-4">
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
                        <p className="mt-1 line-clamp-3 text-sm leading-6 text-slate-400">{review.text}</p>
                        <button
                          type="button"
                          onClick={() => handleLikeReview(review.id)}
                          className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 transition hover:text-brand-400"
                        >
                          👍 {review.likes}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {reviews.map((review) => (
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
                      <button
                        type="button"
                        onClick={() => handleLikeReview(review.id)}
                        className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 transition hover:text-brand-400"
                      >
                        👍 {review.likes}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {reviews.length > 2 ? (
                <button
                  type="button"
                  onClick={() => setReviewsExpanded((v) => !v)}
                  className="mt-5 block w-full rounded-full border border-forest-700 py-2.5 text-center text-sm font-semibold text-slate-200 transition hover:bg-forest-800"
                >
                  {reviewsExpanded ? "Ver menos" : "Ver todas las opiniones"}
                </button>
              ) : null}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            {hasImportantInfo ? (
              <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-base font-bold text-slate-100">Información importante</h2>
                <div className="mt-3 space-y-3 text-xs">
                  {prestador.schedule ? (
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 shrink-0 text-brand-400" />
                      <div>
                        <p className="text-slate-500">Horario de atención</p>
                        <p className="flex flex-wrap items-center gap-2 text-slate-200">
                          {prestador.schedule}
                          {prestador.status === "Abierto" ? (
                            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">Abierto ahora</span>
                          ) : null}
                        </p>
                      </div>
                    </div>
                  ) : null}
                  {prestador.deliveryTime ? (
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 shrink-0 text-brand-400" />
                      <div><p className="text-slate-500">Tiempo de entrega</p><p className="text-slate-200">{prestador.deliveryTime}</p></div>
                    </div>
                  ) : null}
                  {prestador.minOrder ? (
                    <div className="flex items-center gap-2">
                      <PackageIcon className="h-4 w-4 shrink-0 text-brand-400" />
                      <div><p className="text-slate-500">Pedido mínimo</p><p className="text-slate-200">{prestador.minOrder}</p></div>
                    </div>
                  ) : null}
                  {prestador.deliveryFee ? (
                    <div className="flex items-center gap-2">
                      <CompassIcon className="h-4 w-4 shrink-0 text-brand-400" />
                      <div><p className="text-slate-500">Costo de domicilio</p><p className="text-slate-200">{prestador.deliveryFee}</p></div>
                    </div>
                  ) : null}
                  {prestador.paymentMethods ? (
                    <div className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 shrink-0 text-brand-400" />
                      <div><p className="text-slate-500">Métodos de pago</p><p className="text-slate-200">{prestador.paymentMethods}</p></div>
                    </div>
                  ) : null}
                  {prestador.orderTracking ? (
                    <div className="flex items-center gap-2">
                      <TrackingIcon className="h-4 w-4 shrink-0 text-brand-400" />
                      <div><p className="text-slate-500">Seguimiento de pedido</p><p className="text-slate-200">{prestador.orderTracking}</p></div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-100">Cobertura de entrega</h2>
                <a
                  href={`https://www.google.com/maps?q=${mapQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-brand-400 hover:underline"
                >
                  Ver mapa completo <ArrowUpRightIcon className="h-3 w-3" />
                </a>
              </div>
              <div className="mt-3 overflow-hidden rounded-xl border border-forest-700">
                <iframe
                  src={`https://www.google.com/maps?q=${mapQuery}&z=13&output=embed`}
                  className="h-44 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Cobertura de ${prestador.name}`}
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Cobertura completa</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Cobertura limitada</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-500" /> Fuera de cobertura</span>
              </div>
            </div>

            {promotions.length > 0 ? (
              <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-100">Promociones del día</h2>
                  <Link href={`/categorias/${categoryKey}`} className="text-xs font-semibold text-brand-400 hover:underline">
                    Ver todas
                  </Link>
                </div>
                {featuredPromo ? (
                  <div className="mt-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 p-4 text-white">
                    <p className="text-sm font-bold uppercase tracking-wide">{featuredPromo.title}</p>
                    <p className="mt-1 text-xs">{featuredPromo.description}</p>
                  </div>
                ) : null}
                {extraPromos.length > 0 ? (
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {extraPromos.map((promo) => (
                      <div key={promo.id} className="rounded-xl border border-forest-700 bg-forest-950 p-3">
                        <p className="text-sm font-semibold text-slate-100">{promo.title}</p>
                        <p className="mt-0.5 text-xs text-slate-400">{promo.description}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
              <h2 className="text-base font-bold text-slate-100">¿Cómo funciona tu pedido?</h2>
              <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                {HOW_IT_WORKS.map((item, index) => (
                  <div key={item.step} className="flex flex-col items-center gap-1.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <p className="text-[10px] leading-tight text-slate-300">{item.title}</p>
                    {index < HOW_IT_WORKS.length - 1 ? <span className="hidden text-slate-600 sm:block">→</span> : null}
                  </div>
                ))}
              </div>
            </div>

            {prestador.phone || prestador.email || prestador.instagram ? (
              <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-base font-bold text-slate-100">Contáctanos</h2>
                <div className="mt-3 flex items-start gap-4">
                  <div className="min-w-0 flex-1 space-y-2 text-sm text-slate-200">
                    {prestador.phone ? (
                      <a href={`tel:${prestador.phone}`} className="flex items-center gap-2 hover:text-brand-400">
                        <PhoneIcon className="h-4 w-4 text-brand-400" /> {prestador.phone}
                      </a>
                    ) : null}
                    {prestador.email ? (
                      <a href={`mailto:${prestador.email}`} className="flex items-center gap-2 hover:text-brand-400">
                        <MailIcon className="h-4 w-4 text-brand-400" /> {prestador.email}
                      </a>
                    ) : null}
                    {prestador.instagram ? (
                      <a
                        href={`https://instagram.com/${prestador.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 hover:text-brand-400"
                      >
                        <InstagramIcon className="h-4 w-4 text-brand-400" /> {prestador.instagram}
                      </a>
                    ) : null}
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={siteContent.images.mascot} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-forest-700 bg-forest-900 p-6 sm:grid-cols-5">
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
    </main>
  );
}
