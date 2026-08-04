"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import HotelOwnerEditor from "./HotelOwnerEditor";
import {
  ArrowUpRightIcon,
  BuildingIcon,
  CalendarIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  EventPinIcon,
  FacebookIcon,
  GlobeIcon,
  HeartIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  StarIcon,
  TiktokIcon,
  TwitterIcon,
  UsersIcon,
  WhatsAppIcon,
} from "../home/infoIcons";
import { addReview, listPrestadoresByCategory, type PolicyItem, type Prestador, type Review, type ReviewAspects } from "../../services/prestadores";
import { AMENITY_CATALOG, getDisplayRating } from "../../utils/businessProfileConfig";
import { formatCOP } from "../../utils/formatters";
import ImageUploadField from "../admin/ImageUploadField";

const TABS = [
  { key: "descripcion", label: "Descripción" },
  { key: "habitaciones", label: "Habitaciones" },
  { key: "servicios", label: "Servicios" },
  { key: "ubicacion", label: "Ubicación" },
  { key: "opiniones", label: "Opiniones" },
  { key: "politicas", label: "Políticas" },
] as const;

const GUEST_ASPECTS: { key: keyof ReviewAspects; label: string }[] = [
  { key: "cleanliness", label: "Limpieza" },
  { key: "location", label: "Ubicación" },
  { key: "service", label: "Servicio" },
  { key: "comfort", label: "Comodidad" },
  { key: "price", label: "Relación calidad-precio" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function findPolicy(policies: PolicyItem[] | undefined, keyword: string): PolicyItem | undefined {
  return policies?.find((p) => p.title.toLowerCase().includes(keyword));
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

function reviewDisplayRating(review: Review): number {
  const aspectValues = Object.values(review.aspects ?? {}).filter((v): v is number => typeof v === "number");
  return aspectValues.length ? aspectValues.reduce((sum, v) => sum + v, 0) / aspectValues.length : review.rating;
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

function todayPlus(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export default function HotelDetailView({
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
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["key"]>("descripcion");
  const [roomsPage, setRoomsPage] = useState(1);
  const [servicesPage, setServicesPage] = useState(1);
  const [checkInDate, setCheckInDate] = useState(todayPlus(0));
  const [checkOutDate, setCheckOutDate] = useState(todayPlus(1));
  const [guests, setGuests] = useState("2 adultos");
  const [roomCount, setRoomCount] = useState("1 habitación");
  const [dataVersion, setDataVersion] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewAspects, setReviewAspects] = useState<ReviewAspects>({});
  const [reviewText, setReviewText] = useState("");
  const [reviewImageUrl, setReviewImageUrl] = useState("");
  const [reviewPage, setReviewPage] = useState(1);

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
  const items = prestador.items ?? [];
  const highlights = prestador.highlights ?? [];
  const promotions = prestador.promotions ?? [];

  const REVIEWS_PER_PAGE = 3;
  const totalReviewPages = Math.max(1, Math.ceil(reviews.length / REVIEWS_PER_PAGE));
  const currentReviewPage = Math.min(reviewPage, totalReviewPages);
  const visibleReviews = reviews.slice((currentReviewPage - 1) * REVIEWS_PER_PAGE, currentReviewPage * REVIEWS_PER_PAGE);

  const numRooms = Math.max(1, Number(roomCount.match(/\d+/)?.[0] ?? 1));
  const totalGuests = Math.max(1, (guests.match(/\d+/g) ?? ["1"]).reduce((sum, n) => sum + Number(n), 0));
  const guestsPerRoom = Math.ceil(totalGuests / numRooms);

  const nights = useMemo(() => {
    const diff = Math.round(
      (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24),
    );
    return Number.isFinite(diff) && diff > 0 ? diff : 1;
  }, [checkInDate, checkOutDate]);

  const selectedRoomPrice = useMemo(() => {
    const parsed = items
      .map((i) => {
        const numeric = i.price ? Number(i.price.replace(/[^0-9]/g, "")) : NaN;
        const capacityMatch = i.capacity?.match(/\d+/);
        return { numeric, capacity: capacityMatch ? Number(capacityMatch[0]) : null };
      })
      .filter((p): p is { numeric: number; capacity: number | null } => !Number.isNaN(p.numeric) && p.numeric > 0);
    if (parsed.length === 0) return null;
    const sorted = [...parsed].sort((a, b) => a.numeric - b.numeric);
    return sorted.find((p) => p.capacity !== null && p.capacity >= guestsPerRoom) ?? sorted[0];
  }, [items, guestsPerRoom]);

  const estimatedTotal = selectedRoomPrice ? selectedRoomPrice.numeric * numRooms * nights : null;

  const availableAmenities = AMENITY_CATALOG.filter((a) => (prestador.amenities ?? []).includes(a.key));
  const SERVICES_PER_PAGE = 7;
  const totalServicesPages = Math.max(1, Math.ceil(availableAmenities.length / SERVICES_PER_PAGE));
  const currentServicesPage = Math.min(servicesPage, totalServicesPages);
  const visibleServices = availableAmenities.slice((currentServicesPage - 1) * SERVICES_PER_PAGE, currentServicesPage * SERVICES_PER_PAGE);

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

  const otherHotels = listPrestadoresByCategory(categoryKey)
    .filter((p) => p.id !== prestador.id)
    .slice(0, 4);

  const ROOMS_PER_PAGE = 3;
  const totalRoomsPages = Math.max(1, Math.ceil(items.length / ROOMS_PER_PAGE));
  const currentRoomsPage = Math.min(roomsPage, totalRoomsPages);
  const visibleRooms = items.slice((currentRoomsPage - 1) * ROOMS_PER_PAGE, currentRoomsPage * ROOMS_PER_PAGE);

  const bookingMessage = encodeURIComponent(
    `Hola, quiero reservar en ${prestador.name} del ${checkInDate} al ${checkOutDate} para ${guests} (${roomCount}).`,
  );

  const cancellationIsFree = /gratis|gratuita|sin costo/i.test(findPolicy(prestador.policies, "cancel")?.description ?? "");

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

  const mapQuery = encodeURIComponent(prestador.address ?? `${prestador.name}, Yopal, Casanare`);

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
              {editMode ? "Salir del modo edición" : "Editar información del hotel"}
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

        {canEdit && editMode ? <HotelOwnerEditor prestadorId={prestador.id} categoryKey={categoryKey} onSaved={() => setDataVersion((v) => v + 1)} /> : null}

        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            {/* Gallery */}
            <div className="grid grid-cols-1 gap-2 sm:h-[400px] sm:grid-cols-[2.2fr_1fr]">
              <div className="relative h-72 min-h-0 overflow-hidden rounded-2xl border border-forest-700 sm:h-full">
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
                <div className="grid h-44 min-h-0 grid-rows-3 gap-2 sm:h-full">
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
              <div className="flex flex-wrap items-center gap-2">
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
                {prestador.stars ? (
                  <span className="flex items-center gap-1.5">
                    <BuildingIcon className="h-4 w-4 text-brand-400" /> Hotel {prestador.stars} estrellas
                  </span>
                ) : null}
                {prestador.schedule ? (
                  <span className="flex items-center gap-1.5">
                    <ClockIcon className="h-4 w-4 text-brand-400" /> {prestador.schedule}
                  </span>
                ) : null}
              </div>

              {prestador.address ? (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-400">
                  <EventPinIcon className="h-4 w-4 shrink-0 text-brand-400" /> {prestador.address}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.key);
                      scrollToSection(tab.key);
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                      activeTab === tab.key
                        ? "btn-brand-font btn-gradient text-forest-950"
                        : "border border-forest-700 text-slate-200 hover:bg-forest-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
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
            </div>

            {/* Descripción + Lo que nos hace únicos */}
            <div id="descripcion" className={`mt-6 scroll-mt-20 grid gap-6 ${highlights.length > 0 ? "lg:grid-cols-2" : ""}`}>
              <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-lg font-bold text-slate-100">Sobre el hotel</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{prestador.description ?? "Próximamente más información sobre este lugar."}</p>
              </div>
              {highlights.length > 0 ? (
                <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
                  <h2 className="text-lg font-bold text-slate-100">Lo que nos hace únicos</h2>
                  <div className="mt-4 grid grid-cols-2 gap-3">
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
            </div>

            {/* Video y recorrido virtual */}
            {prestador.videoUrl || prestador.tourUrl ? (
              <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-lg font-bold text-slate-100">Video y recorrido virtual</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {prestador.videoUrl ? (
                    <div className="overflow-hidden rounded-2xl border border-forest-700">
                      <iframe src={prestador.videoUrl} className="aspect-video w-full" title="Video promocional" allowFullScreen />
                    </div>
                  ) : null}
                  {prestador.tourUrl ? (
                    <div className="overflow-hidden rounded-2xl border border-forest-700">
                      <iframe src={prestador.tourUrl} className="aspect-video w-full" title="Recorrido virtual 360" allowFullScreen />
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {/* Habitaciones */}
            {items.length > 0 ? (
              <div id="habitaciones" className="mt-6 scroll-mt-20 rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-100">Habitaciones disponibles</h2>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleRooms.map((item) => (
                    <div key={item.id} className="flex h-full flex-col overflow-hidden rounded-2xl border border-forest-700 bg-forest-950">
                      {item.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.imageUrl} alt={item.name} className="h-36 w-full shrink-0 object-cover" />
                      ) : (
                        <div className="h-36 w-full shrink-0 bg-gradient-to-br from-forest-800 to-forest-950" />
                      )}
                      <div className="flex flex-1 flex-col p-4">
                        <p className="font-semibold text-slate-100">{item.name}</p>
                        <div className="mt-1.5 flex flex-wrap gap-2 text-xs text-slate-400">
                          {item.capacity ? (
                            <span className="flex items-center gap-1 rounded-full bg-forest-900 px-2 py-1">
                              <UsersIcon className="h-3 w-3" /> {item.capacity}
                            </span>
                          ) : null}
                          {item.beds ? (
                            <span className="flex items-center gap-1 rounded-full bg-forest-900 px-2 py-1">
                              <CalendarIcon className="h-3 w-3" /> {item.beds} cama(s)
                            </span>
                          ) : null}
                        </div>
                        {item.amenities && item.amenities.length > 0 ? (
                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400">
                            {AMENITY_CATALOG.filter((a) => item.amenities!.includes(a.key)).map((a) => (
                              <span key={a.key} className="flex items-center gap-1">
                                <span>{a.icon}</span> {a.label}
                              </span>
                            ))}
                          </div>
                        ) : null}
                        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                          <div>
                            {item.price ? (
                              <>
                                <p className="text-xs text-slate-500">Desde</p>
                                <p className="font-bold text-brand-400">{formatCOP(item.price)}</p>
                                <p className="text-xs text-slate-500">por noche</p>
                              </>
                            ) : null}
                          </div>
                          <button
                            type="button"
                            onClick={() => scrollToSection("reserva-widget")}
                            className="btn-brand-font btn-gradient rounded-full px-4 py-2 text-xs font-semibold text-forest-950 transition"
                          >
                            Reservar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {totalRoomsPages > 1 ? (
                  <div className="mt-5 flex items-center justify-center gap-2">
                    {Array.from({ length: totalRoomsPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setRoomsPage(page)}
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition ${
                          currentRoomsPage === page
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

            {/* Servicios */}
            {availableAmenities.length > 0 ? (
              <div id="servicios" className="mt-6 scroll-mt-20 rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-lg font-bold text-slate-100">Servicios</h2>
                <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                  {visibleServices.map((amenity) => (
                    <div key={amenity.key} className="flex flex-col items-center gap-1 rounded-xl border border-forest-700 bg-forest-950 p-3 text-center">
                      <span className="text-xl">{amenity.icon}</span>
                      <p className="text-[11px] font-medium leading-tight text-slate-200">{amenity.label}</p>
                      {amenity.sublabel ? <p className="text-[10px] leading-tight text-slate-500">{amenity.sublabel}</p> : null}
                    </div>
                  ))}
                </div>
                {totalServicesPages > 1 ? (
                  <div className="mt-5 flex items-center justify-center gap-2">
                    {Array.from({ length: totalServicesPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setServicesPage(page)}
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition ${
                          currentServicesPage === page
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
                <h2 className="text-lg font-bold text-slate-100">Opiniones de nuestros huéspedes</h2>
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
                          <p className="w-40 shrink-0 truncate text-xs text-slate-400">{aspect.label}</p>
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
                <p className="mt-4 text-sm text-slate-500">Aún no hay opiniones para este hotel.</p>
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

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {reviews.length === 0 ? (
                  <p className="text-sm text-slate-500">Sé el primero en dejar una opinión.</p>
                ) : (
                  visibleReviews.map((review) => (
                    <div key={review.id} className="flex h-full flex-col rounded-2xl border border-forest-700 bg-forest-950 p-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-sm font-bold text-brand-400">
                          {review.author.charAt(0).toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-100">{review.author}</p>
                          <p className="text-xs text-slate-500">{daysAgoLabel(review.date)}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <StarRating value={reviewDisplayRating(review)} className="h-4 w-4" />
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{review.text}</p>
                      {review.reply ? (
                        <div className="mt-3 rounded-xl bg-forest-900 p-3 text-xs text-slate-300">
                          <p className="font-semibold text-brand-400">Respuesta del hotel</p>
                          <p className="mt-1">{review.reply}</p>
                        </div>
                      ) : null}
                      {review.imageUrl ? (
                        <div className="mt-auto pt-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={review.imageUrl} alt="" className="h-48 w-full shrink-0 rounded-xl object-cover" />
                        </div>
                      ) : null}
                    </div>
                  ))
                )}
              </div>

              {totalReviewPages > 1 ? (
                <div className="mt-5 flex items-center justify-center gap-2">
                  {Array.from({ length: totalReviewPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setReviewPage(page)}
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
            {otherHotels.length > 0 ? (
              <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-lg font-bold text-slate-100">También te puede interesar</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {otherHotels.map((other) => {
                    const otherPrice = other.items?.map((i) => i.price).find((p) => Boolean(p));
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
                          <img src={other.imageUrl} alt={other.name} className="h-28 w-full object-cover" />
                        ) : (
                          <div className="h-28 w-full bg-gradient-to-br from-forest-800 to-forest-950" />
                        )}
                        <div className="p-3">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-brand-400">Hotel</p>
                          <p className="mt-1 truncate text-sm font-semibold text-slate-100">{other.name}</p>
                          {otherAvgRating !== null ? (
                            <div className="mt-1 flex items-center gap-1.5">
                              <StarRating value={otherAvgRating} className="h-3 w-3" />
                              <span className="text-xs font-semibold text-slate-100">{otherAvgRating.toFixed(1)}</span>
                              {otherReviews.length > 0 ? (
                                <span className="text-[11px] text-slate-500">({otherReviews.length})</span>
                              ) : null}
                            </div>
                          ) : null}
                          {other.address ? (
                            <p className="mt-1 flex items-center gap-1 truncate text-[11px] text-slate-400">
                              <EventPinIcon className="h-3 w-3 shrink-0 text-brand-400" /> {other.address}
                            </p>
                          ) : null}
                          {otherPrice ? <p className="mt-1.5 text-xs font-semibold text-brand-400">Desde {formatCOP(otherPrice)}</p> : null}
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
            <div id="reserva-widget" className="scroll-mt-20 rounded-2xl border border-forest-700 bg-forest-900 p-6">
              <h2 className="text-center text-lg font-bold text-slate-100">Reserva tu estadía</h2>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                <CheckIcon className="h-3.5 w-3.5 text-brand-400" /> Mejor precio garantizado
              </p>

              <div className="mt-4 space-y-3 text-sm">
                <label className="block">
                  <span className="text-xs text-slate-400">Fecha de entrada</span>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-forest-700 bg-forest-950 px-3 py-2.5 text-slate-100 [color-scheme:dark]"
                  />
                </label>
                <label className="block">
                  <span className="text-xs text-slate-400">Fecha de salida</span>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-forest-700 bg-forest-950 px-3 py-2.5 text-slate-100 [color-scheme:dark]"
                  />
                </label>
                <label className="block">
                  <span className="text-xs text-slate-400">Huéspedes</span>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-forest-700 bg-forest-950 px-3 py-2.5 text-slate-100"
                  >
                    {["1 adulto", "2 adultos", "3 adultos", "2 adultos, 1 niño", "4 adultos"].map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs text-slate-400">Habitación</span>
                  <select
                    value={roomCount}
                    onChange={(e) => setRoomCount(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-forest-700 bg-forest-950 px-3 py-2.5 text-slate-100"
                  >
                    {["1 habitación", "2 habitaciones", "3 habitaciones"].map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>

              {selectedRoomPrice ? (
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-forest-700 bg-forest-950 p-3.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-slate-400">Precio por noche</p>
                      <p className="text-base font-bold text-slate-100">{formatCOP(selectedRoomPrice.numeric)}</p>
                    </div>
                    <p className="mt-2 flex flex-wrap items-center gap-1 text-[11px] text-slate-500">
                      <span>{formatCOP(selectedRoomPrice.numeric)}</span>
                      <span className="text-slate-600">×</span>
                      <span>{numRooms} habitación{numRooms > 1 ? "es" : ""}</span>
                      <span className="text-slate-600">×</span>
                      <span>{nights} noche{nights > 1 ? "s" : ""}</span>
                    </p>
                  </div>

                  <div className="rounded-xl border border-brand-500/30 bg-brand-500/10 p-3.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-300">Total estimado</p>
                    <p className="mt-1 text-3xl font-extrabold leading-tight text-brand-400">{formatCOP(estimatedTotal ?? 0)}</p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      Para {totalGuests} huésped{totalGuests > 1 ? "es" : ""} · {nights} noche{nights > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="mt-4 space-y-1.5 text-xs text-slate-400">
                {cancellationIsFree ? (
                  <p className="flex items-center gap-1.5"><CheckIcon className="h-3.5 w-3.5 text-brand-400" /> Cancelación gratuita</p>
                ) : null}
                {(prestador.amenities ?? []).includes("desayuno") ? (
                  <p className="flex items-center gap-1.5"><CheckIcon className="h-3.5 w-3.5 text-brand-400" /> Desayuno incluido</p>
                ) : null}
                <p className="flex items-center gap-1.5"><CheckIcon className="h-3.5 w-3.5 text-brand-400" /> Sin cargos ocultos</p>
              </div>

              <a
                href={prestador.whatsapp ? `https://wa.me/${prestador.whatsapp}?text=${bookingMessage}` : prestador.phone ? `tel:${prestador.phone}` : "#"}
                target={prestador.whatsapp ? "_blank" : undefined}
                rel="noreferrer"
                className="btn-brand-font btn-gradient mt-5 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-forest-950 transition"
              >
                Reservar ahora
              </a>
            </div>

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
                  {prestador.nearbyPlaces!.slice(0, 3).map((place) => (
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
                href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
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

            {prestador.checkIn || prestador.checkOut || prestador.languages || prestador.paymentMethods || prestador.neighborhood || prestador.responseTime || findPolicy(prestador.policies, "mascota") ? (
              <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-center text-lg font-bold text-slate-100">Información útil</h2>
                <div className="mt-4 space-y-4">
                  {prestador.checkIn ? (
                    <div className="flex items-start gap-3">
                      <ClockIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-400" />
                      <span className="min-w-0 break-words">
                        <span className="block text-sm text-slate-400">Check-in</span>
                        <span className="text-base font-semibold text-slate-100">{prestador.checkIn}</span>
                      </span>
                    </div>
                  ) : null}
                  {prestador.checkOut ? (
                    <div className="flex items-start gap-3">
                      <ClockIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-400" />
                      <span className="min-w-0 break-words">
                        <span className="block text-sm text-slate-400">Check-out</span>
                        <span className="text-base font-semibold text-slate-100">{prestador.checkOut}</span>
                      </span>
                    </div>
                  ) : null}
                  {findPolicy(prestador.policies, "mascota") ? (
                    <div className="flex items-start gap-3">
                      <HeartIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-400" />
                      <span className="min-w-0 break-words">
                        <span className="block text-sm text-slate-400">Mascotas</span>
                        <span className="text-base font-semibold text-slate-100">{findPolicy(prestador.policies, "mascota")?.description}</span>
                      </span>
                    </div>
                  ) : null}
                  {prestador.languages ? (
                    <div className="flex items-start gap-3">
                      <UsersIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-400" />
                      <span className="min-w-0 break-words">
                        <span className="block text-sm text-slate-400">Idiomas</span>
                        <span className="text-base font-semibold text-slate-100">{prestador.languages}</span>
                      </span>
                    </div>
                  ) : null}
                  {prestador.paymentMethods ? (
                    <div className="flex items-start gap-3">
                      <CalendarIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-400" />
                      <span className="min-w-0 break-words">
                        <span className="block text-sm text-slate-400">Métodos de pago</span>
                        <span className="text-base font-semibold text-slate-100">{prestador.paymentMethods}</span>
                      </span>
                    </div>
                  ) : null}
                  {prestador.neighborhood ? (
                    <div className="flex items-start gap-3">
                      <EventPinIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-400" />
                      <span className="min-w-0 break-words">
                        <span className="block text-sm text-slate-400">Barrio</span>
                        <span className="text-base font-semibold text-slate-100">{prestador.neighborhood}</span>
                      </span>
                    </div>
                  ) : null}
                  {prestador.responseTime ? (
                    <div className="flex items-start gap-3">
                      <ClockIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-400" />
                      <span className="min-w-0 break-words">
                        <span className="block text-sm text-slate-400">Tiempo de respuesta</span>
                        <span className="text-base font-semibold text-slate-100">{prestador.responseTime}</span>
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {prestador.phone || prestador.whatsapp || prestador.email || prestador.address || prestador.instagram || prestador.website ? (
              <div className="rounded-2xl border border-forest-700 bg-forest-900 p-6">
                <h2 className="text-center text-lg font-bold text-slate-100">Contacto</h2>
                <div className="mt-4 space-y-4 text-base font-semibold text-slate-100">
                  {prestador.phone ? (
                    <a href={`tel:${prestador.phone}`} className="flex items-center gap-3 hover:text-brand-400">
                      <PhoneIcon className="h-6 w-6 shrink-0 text-brand-400" />
                      <span className="min-w-0 break-words">{prestador.phone}</span>
                    </a>
                  ) : null}
                  {prestador.whatsapp && prestador.whatsapp !== prestador.phone ? (
                    <a href={`https://wa.me/${prestador.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-brand-400">
                      <WhatsAppIcon className="h-6 w-6 shrink-0 text-brand-400" />
                      <span className="min-w-0 break-words">{prestador.whatsapp}</span>
                    </a>
                  ) : null}
                  {prestador.email ? (
                    <a href={`mailto:${prestador.email}`} className="flex items-center gap-3 hover:text-brand-400">
                      <MailIcon className="h-6 w-6 shrink-0 text-brand-400" />
                      <span className="min-w-0 break-words">{prestador.email}</span>
                    </a>
                  ) : null}
                  {prestador.address ? (
                    <p className="flex items-start gap-3">
                      <EventPinIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-400" />
                      <span className="min-w-0 break-words">{prestador.address}</span>
                    </p>
                  ) : null}
                  {prestador.website ? (
                    <a
                      href={prestador.website.startsWith("http") ? prestador.website : `https://${prestador.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 hover:text-brand-400"
                    >
                      <GlobeIcon className="h-6 w-6 shrink-0 text-brand-400" />
                      <span className="min-w-0 break-words">{prestador.website.replace(/^https?:\/\//, "")}</span>
                    </a>
                  ) : null}
                  {prestador.instagram ? (
                    <a
                      href={`https://instagram.com/${prestador.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 hover:text-brand-400"
                    >
                      <InstagramIcon className="h-6 w-6 shrink-0 text-brand-400" />
                      <span className="min-w-0 break-words">{prestador.instagram}</span>
                    </a>
                  ) : null}
                  {prestador.facebook ? (
                    <a
                      href={prestador.facebook.startsWith("http") ? prestador.facebook : `https://facebook.com/${prestador.facebook}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 hover:text-brand-400"
                    >
                      <FacebookIcon className="h-6 w-6 shrink-0 text-brand-400" />
                      <span className="min-w-0 break-words">{prestador.facebook}</span>
                    </a>
                  ) : null}
                  {prestador.twitter ? (
                    <a
                      href={prestador.twitter.startsWith("http") ? prestador.twitter : `https://x.com/${prestador.twitter.replace("@", "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 hover:text-brand-400"
                    >
                      <TwitterIcon className="h-6 w-6 shrink-0 text-brand-400" />
                      <span className="min-w-0 break-words">{prestador.twitter}</span>
                    </a>
                  ) : null}
                  {prestador.tiktok ? (
                    <a
                      href={prestador.tiktok.startsWith("http") ? prestador.tiktok : `https://tiktok.com/@${prestador.tiktok.replace("@", "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 hover:text-brand-400"
                    >
                      <TiktokIcon className="h-6 w-6 shrink-0 text-brand-400" />
                      <span className="min-w-0 break-words">{prestador.tiktok}</span>
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="overflow-hidden rounded-2xl border border-forest-700 bg-forest-900 p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hoteles.jpeg" alt="TripYopal IA" className="h-40 w-full object-contain" />
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
