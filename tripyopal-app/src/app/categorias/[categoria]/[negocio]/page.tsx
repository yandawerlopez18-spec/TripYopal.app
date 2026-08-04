"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { BUSINESS_CATEGORIES, CategoryIcon } from "../../../components/home/categoryIcons";
import { useDataHydration } from "../../../context/DataHydrationContext";
import { listPrestadoresByCategory } from "../../../services/prestadores";
import { getPrestadorItemLabels } from "../../../utils/prestadorItemLabels";
import { AMENITY_CATALOG, SECURITY_CATALOG, MEDIA_CATEGORIES_BY_GROUP, getProfileGroup } from "../../../utils/businessProfileConfig";
import { formatCOP } from "../../../utils/formatters";
import { useBusinessAssistant } from "../../../context/BusinessAssistantContext";
import BusinessReviews from "../../../components/business/BusinessReviews";
import AvailabilityCalendar from "../../../components/business/AvailabilityCalendar";
import MediaGallery from "../../../components/business/MediaGallery";
import HotelDetailView from "../../../components/business/HotelDetailView";
import RestaurantDetailView from "../../../components/business/RestaurantDetailView";
import BarDetailView from "../../../components/business/BarDetailView";
import SitioDetailView from "../../../components/business/SitioDetailView";
import ParqueDetailView from "../../../components/business/ParqueDetailView";
import CentroDetailView from "../../../components/business/CentroDetailView";
import RapidaDetailView from "../../../components/business/RapidaDetailView";
import ParrillaDetailView from "../../../components/business/ParrillaDetailView";
import DiscotecaDetailView from "../../../components/business/DiscotecaDetailView";
import DomicilioDetailView from "../../../components/business/DomicilioDetailView";
import TransporteDetailView from "../../../components/business/TransporteDetailView";

const FAVORITES_KEY = "tripyopal_favorites";

function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(FAVORITES_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export default function NegocioDetallePage({ params }: { params: Promise<{ categoria: string; negocio: string }> }) {
  const hydrationVersion = useDataHydration();
  const { categoria, negocio } = use(params);
  const category = BUSINESS_CATEGORIES.find((c) => c.key === categoria);
  const prestador = category ? listPrestadoresByCategory(category.key).find((entry) => entry.id === negocio) : undefined;

  const { setActiveBusiness } = useBusinessAssistant();
  const [favoriteCheckedId, setFavoriteCheckedId] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [, setReviewsVersion] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);

  if (prestador && favoriteCheckedId !== prestador.id) {
    setFavoriteCheckedId(prestador.id);
    setIsFavorite(getFavorites().includes(prestador.id));
  }

  useEffect(() => {
    if (!prestador) return;
    setActiveBusiness(prestador);
    return () => setActiveBusiness(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prestador?.id]);

  if (!category) {
    notFound();
  }

  if (!prestador) {
    // The Prestador list starts as seed data and only gets the real database rows
    // after DataHydrationProvider's effect resolves. On a hard reload/direct link,
    // this component's first render always happens before that finishes — bailing
    // out to notFound() here unconditionally would 404 every real business on
    // every reload. Only give up once hydration has actually completed.
    if (hydrationVersion === 0) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-forest-950 px-6 py-16 text-slate-100 lg:px-8">
          <p className="text-slate-400">Cargando información...</p>
        </main>
      );
    }
    notFound();
  }

  const group = getProfileGroup(prestador.category);
  const isHospedaje = group === "hospedaje";
  const labels = getPrestadorItemLabels(prestador.category);
  const items = prestador.items ?? [];
  const reviews = prestador.reviews ?? [];
  const amenities = prestador.amenities ?? [];
  const security = prestador.security ?? [];
  const galleryImages = [prestador.imageUrl, ...(prestador.gallery ?? [])].filter((url): url is string => Boolean(url));

  const averageRating = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : null;

  const toggleFavorite = () => {
    const current = getFavorites();
    const next = current.includes(prestador.id) ? current.filter((id) => id !== prestador.id) : [...current, prestador.id];
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    setIsFavorite(next.includes(prestador.id));
  };

  const handleShare = async () => {
    const shareData = { title: prestador.name, text: prestador.description ?? "", url: window.location.href };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled share, no action needed
      }
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    setShareMessage("Enlace copiado al portapapeles.");
    setTimeout(() => setShareMessage(""), 2500);
  };

  const statusColor =
    prestador.status === "Cerrado" ? "bg-red-500/10 text-red-400" : prestador.status === "Disponible" ? "bg-sky-500/10 text-sky-400" : "bg-emerald-500/10 text-emerald-400";

  if (category.key === "hoteles") {
    return (
      <HotelDetailView
        prestador={prestador}
        categoryKey={category.key}
        categoryLabel={category.label}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        handleShare={handleShare}
        shareMessage={shareMessage}
      />
    );
  }

  if (category.key === "restaurantes") {
    return (
      <RestaurantDetailView
        prestador={prestador}
        categoryKey={category.key}
        categoryLabel={category.label}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        handleShare={handleShare}
        shareMessage={shareMessage}
      />
    );
  }

  if (category.key === "bares") {
    return (
      <BarDetailView
        prestador={prestador}
        categoryKey={category.key}
        categoryLabel={category.label}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        handleShare={handleShare}
        shareMessage={shareMessage}
      />
    );
  }

  if (category.key === "sitios") {
    return (
      <SitioDetailView
        prestador={prestador}
        categoryKey={category.key}
        categoryLabel={category.label}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        handleShare={handleShare}
        shareMessage={shareMessage}
      />
    );
  }

  if (category.key === "parques") {
    return (
      <ParqueDetailView
        prestador={prestador}
        categoryKey={category.key}
        categoryLabel={category.label}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        handleShare={handleShare}
        shareMessage={shareMessage}
      />
    );
  }

  if (category.key === "centros") {
    return (
      <CentroDetailView
        prestador={prestador}
        categoryKey={category.key}
        categoryLabel={category.label}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        handleShare={handleShare}
        shareMessage={shareMessage}
      />
    );
  }

  if (category.key === "rapidas") {
    return (
      <RapidaDetailView
        prestador={prestador}
        categoryKey={category.key}
        categoryLabel={category.label}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        handleShare={handleShare}
        shareMessage={shareMessage}
      />
    );
  }

  if (category.key === "parrillas") {
    return (
      <ParrillaDetailView
        prestador={prestador}
        categoryKey={category.key}
        categoryLabel={category.label}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        handleShare={handleShare}
        shareMessage={shareMessage}
      />
    );
  }

  if (category.key === "discotecas") {
    return (
      <DiscotecaDetailView
        prestador={prestador}
        categoryKey={category.key}
        categoryLabel={category.label}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        handleShare={handleShare}
        shareMessage={shareMessage}
      />
    );
  }

  if (category.key === "domicilios") {
    return (
      <DomicilioDetailView
        prestador={prestador}
        categoryKey={category.key}
        categoryLabel={category.label}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        handleShare={handleShare}
        shareMessage={shareMessage}
      />
    );
  }

  if (category.key === "transporte") {
    return (
      <TransporteDetailView
        prestador={prestador}
        categoryKey={category.key}
        categoryLabel={category.label}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        handleShare={handleShare}
        shareMessage={shareMessage}
      />
    );
  }

  return (
    <main className="min-h-screen bg-forest-950 px-6 py-6 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/categorias/${category.key}`}
          className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          ← Volver a {category.label}
        </Link>

        {/* Hero */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-forest-700 bg-forest-900 shadow-xl">
          <div className="relative">
            {galleryImages.length > 0 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={galleryImages[heroIndex]} alt={prestador.name} className="h-80 w-full object-cover sm:h-96" />
            ) : (
              <div className="flex h-80 w-full items-center justify-center bg-gradient-to-br from-forest-800 to-forest-950 sm:h-96">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/30 text-brand-400">
                  <CategoryIcon icon={category.key} />
                </span>
              </div>
            )}
            {galleryImages.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => setHeroIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1))}
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
                  aria-label="Anterior"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setHeroIndex((i) => (i + 1) % galleryImages.length)}
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
                  aria-label="Siguiente"
                >
                  →
                </button>
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {galleryImages.map((_, i) => (
                    <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === heroIndex ? "bg-brand-400" : "bg-white/40"}`} />
                  ))}
                </div>
              </>
            ) : null}
          </div>

          <div className="p-8">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor}`}>{prestador.status ?? "Abierto"}</span>
              {(prestador.badges ?? []).map((badge) => (
                <span key={badge} className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-400">
                  {badge}
                </span>
              ))}
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-400">{prestador.tipo}</p>
              <h1 className="mt-2 font-[family-name:var(--font-brand)] text-4xl font-bold text-white sm:text-5xl">{prestador.name}</h1>
              {isHospedaje && prestador.stars ? <p className="mt-2 text-amber-400">{"★".repeat(prestador.stars)}</p> : null}
              <div className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-300">
                {averageRating !== null ? (
                  <>
                    <span className="font-semibold text-brand-400">★ {averageRating.toFixed(1)}</span>
                    <span className="text-slate-500">
                      ({reviews.length} {reviews.length === 1 ? "opinión" : "opiniones"})
                    </span>
                  </>
                ) : (
                  <span className="text-slate-500">Sin opiniones aún</span>
                )}
              </div>
              {prestador.description ? <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">{prestador.description}</p> : null}
            </div>

            {/* Quick actions */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <a href={`#${labels.sectionLabel.toLowerCase()}`} className="btn-brand-font btn-gradient rounded-full px-5 py-2.5 text-sm font-semibold text-forest-950 transition">
                Reservar
              </a>
              {prestador.whatsapp ? (
                <a href={`https://wa.me/${prestador.whatsapp}`} target="_blank" rel="noreferrer" className="rounded-full border border-forest-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-forest-800">
                  WhatsApp
                </a>
              ) : null}
              {prestador.phone ? (
                <a href={`tel:${prestador.phone}`} className="rounded-full border border-forest-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-forest-800">
                  Llamar
                </a>
              ) : null}
              {prestador.email ? (
                <a href={`mailto:${prestador.email}`} className="rounded-full border border-forest-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-forest-800">
                  Correo
                </a>
              ) : null}
              <button type="button" onClick={handleShare} className="rounded-full border border-forest-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-forest-800">
                Compartir
              </button>
              <button
                type="button"
                onClick={toggleFavorite}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                  isFavorite ? "border-brand-400 bg-brand-500/10 text-brand-400" : "border-forest-700 text-slate-200 hover:bg-forest-800"
                }`}
              >
                {isFavorite ? "★ Guardado" : "☆ Guardar"}
              </button>
              {prestador.website ? (
                <a href={prestador.website} target="_blank" rel="noreferrer" className="rounded-full border border-forest-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-forest-800">
                  Sitio web
                </a>
              ) : null}
            </div>
            {shareMessage ? <p className="mt-3 text-center text-sm text-brand-400">{shareMessage}</p> : null}

            {/* General info */}
            <div className="mt-8 grid gap-3 rounded-2xl bg-forest-950 p-6 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {prestador.address ? (
                <div>
                  <p className="text-slate-500">Dirección</p>
                  <p className="mt-1 text-slate-200">{prestador.address}</p>
                </div>
              ) : null}
              {prestador.neighborhood ? (
                <div>
                  <p className="text-slate-500">Barrio</p>
                  <p className="mt-1 text-slate-200">{prestador.neighborhood}</p>
                </div>
              ) : null}
              <div>
                <p className="text-slate-500">Ciudad</p>
                <p className="mt-1 text-slate-200">Yopal, Casanare</p>
              </div>
              {prestador.coordinates ? (
                <div>
                  <p className="text-slate-500">Coordenadas</p>
                  <p className="mt-1 text-slate-200">{prestador.coordinates}</p>
                </div>
              ) : null}
              {prestador.schedule ? (
                <div>
                  <p className="text-slate-500">Horario</p>
                  <p className="mt-1 text-slate-200">{prestador.schedule}</p>
                </div>
              ) : null}
              {isHospedaje && prestador.checkIn ? (
                <div>
                  <p className="text-slate-500">Check-in</p>
                  <p className="mt-1 text-slate-200">{prestador.checkIn}</p>
                </div>
              ) : null}
              {isHospedaje && prestador.checkOut ? (
                <div>
                  <p className="text-slate-500">Check-out</p>
                  <p className="mt-1 text-slate-200">{prestador.checkOut}</p>
                </div>
              ) : null}
              {prestador.responseTime ? (
                <div>
                  <p className="text-slate-500">Tiempo de respuesta</p>
                  <p className="mt-1 text-slate-200">{prestador.responseTime}</p>
                </div>
              ) : null}
              {prestador.languages ? (
                <div>
                  <p className="text-slate-500">Idiomas hablados</p>
                  <p className="mt-1 text-slate-200">{prestador.languages}</p>
                </div>
              ) : null}
              {prestador.paymentMethods ? (
                <div>
                  <p className="text-slate-500">Métodos de pago</p>
                  <p className="mt-1 text-slate-200">{prestador.paymentMethods}</p>
                </div>
              ) : null}
              {prestador.instagram ? (
                <div>
                  <p className="text-slate-500">Instagram</p>
                  <p className="mt-1 text-slate-200">{prestador.instagram}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Items / rooms / menu */}
        {items.length > 0 ? (
          <div id={labels.sectionLabel.toLowerCase()} className="mt-10 rounded-3xl border border-forest-700 bg-forest-900 p-8">
            <h2 className="text-center font-[family-name:var(--font-brand)] text-2xl font-semibold text-white">{labels.sectionLabel}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div key={item.id} className="overflow-hidden rounded-2xl border border-forest-700 bg-forest-950">
                  {item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.imageUrl} alt={item.name} className="h-40 w-full object-cover" />
                  ) : (
                    <div className="h-40 w-full bg-gradient-to-br from-forest-800 to-forest-950" />
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-slate-100">{item.name}</h3>
                      {item.price ? <p className="shrink-0 font-semibold text-brand-400">{formatCOP(item.price)}</p> : null}
                    </div>
                    {isHospedaje ? (
                      <div className="mt-2 flex flex-wrap gap-1.5 text-xs text-slate-400">
                        {item.capacity ? <span className="rounded-full bg-forest-900 px-2 py-1">{item.capacity}</span> : null}
                        {item.size ? <span className="rounded-full bg-forest-900 px-2 py-1">{item.size}</span> : null}
                        {item.beds ? <span className="rounded-full bg-forest-900 px-2 py-1">{item.beds} cama(s)</span> : null}
                        {item.view ? <span className="rounded-full bg-forest-900 px-2 py-1">Vista: {item.view}</span> : null}
                      </div>
                    ) : null}
                    {item.description ? <p className="mt-2 text-sm text-slate-400">{item.description}</p> : null}
                    {item.availableUnits !== undefined ? (
                      <p className={`mt-2 text-xs font-semibold ${item.availableUnits > 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {item.availableUnits > 0 ? `${item.availableUnits} disponibles` : "Sin disponibilidad"}
                      </p>
                    ) : null}
                    <div className="mt-4 flex gap-2">
                      {prestador.whatsapp ? (
                        <a
                          href={`https://wa.me/${prestador.whatsapp}?text=${encodeURIComponent(`Hola, quiero reservar: ${item.name}`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-brand-font btn-gradient flex-1 rounded-full px-3 py-2 text-center text-xs font-semibold text-forest-950 transition"
                        >
                          Reservar
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Prices table */}
            <div className="mt-8 overflow-x-auto rounded-2xl border border-forest-700">
              <table className="w-full text-left text-sm">
                <thead className="bg-forest-950 text-slate-400">
                  <tr>
                    <th className="px-4 py-3">{labels.namePlaceholder}</th>
                    <th className="px-4 py-3">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-t border-forest-700 text-slate-200">
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3 font-semibold text-brand-400">{item.price ? formatCOP(item.price) : "Consultar"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {/* Promotions */}
        {(prestador.promotions?.length ?? 0) > 0 ? (
          <div className="mt-10 rounded-3xl border border-forest-700 bg-forest-900 p-8">
            <h2 className="text-center font-[family-name:var(--font-brand)] text-2xl font-semibold text-white">Promociones</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {prestador.promotions!.map((promo) => (
                <div key={promo.id} className="rounded-2xl border border-brand-500/30 bg-forest-950 p-5">
                  <p className="font-semibold text-brand-400">{promo.title}</p>
                  <p className="mt-2 text-sm text-slate-300">{promo.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Availability */}
        {isHospedaje && items.length > 0 ? <AvailabilityCalendar items={items} blockedDates={prestador.blockedDates ?? []} /> : null}

        {/* Amenities */}
        {amenities.length > 0 ? (
          <div className="mt-10 rounded-3xl border border-forest-700 bg-forest-900 p-8">
            <h2 className="text-center font-[family-name:var(--font-brand)] text-2xl font-semibold text-white">Servicios</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {AMENITY_CATALOG.filter((a) => amenities.includes(a.key)).map((amenity) => (
                <div key={amenity.key} className="flex items-center gap-2 rounded-xl bg-forest-950 p-3 text-sm text-slate-300">
                  <span className="text-lg">{amenity.icon}</span> {amenity.label}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Map */}
        <div className="mt-10 rounded-3xl border border-forest-700 bg-forest-900 p-8">
          <h2 className="text-center font-[family-name:var(--font-brand)] text-2xl font-semibold text-white">Ubicación</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-forest-700">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(prestador.address ?? "Yopal, Casanare")}&z=15&output=embed`}
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa de ${prestador.name}`}
            />
          </div>
        </div>

        {/* Nearby places */}
        {(prestador.nearbyPlaces?.length ?? 0) > 0 ? (
          <div className="mt-10 rounded-3xl border border-forest-700 bg-forest-900 p-8">
            <h2 className="text-center font-[family-name:var(--font-brand)] text-2xl font-semibold text-white">Lugares cercanos</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {prestador.nearbyPlaces!.map((place) => (
                <div key={place.id} className="rounded-2xl bg-forest-950 p-4">
                  <p className="font-semibold text-slate-100">{place.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-brand-400">{place.category}</p>
                  <p className="mt-1 text-sm text-slate-400">{place.distance}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Reviews */}
        <BusinessReviews prestadorId={prestador.id} onChange={() => setReviewsVersion((v) => v + 1)} />

        {/* Media gallery */}
        <MediaGallery media={prestador.media ?? []} categories={MEDIA_CATEGORIES_BY_GROUP[group]} />

        {/* Video / tour */}
        {prestador.videoUrl || prestador.tourUrl ? (
          <div className="mt-10 rounded-3xl border border-forest-700 bg-forest-900 p-8">
            <h2 className="text-center font-[family-name:var(--font-brand)] text-2xl font-semibold text-white">Video y recorrido virtual</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
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

        {/* FAQ */}
        {(prestador.faq?.length ?? 0) > 0 ? (
          <div className="mt-10 rounded-3xl border border-forest-700 bg-forest-900 p-8">
            <h2 className="text-center font-[family-name:var(--font-brand)] text-2xl font-semibold text-white">Preguntas frecuentes</h2>
            <div className="mt-6 space-y-3">
              {prestador.faq!.map((item) => (
                <details key={item.id} className="rounded-2xl bg-forest-950 p-4">
                  <summary className="cursor-pointer font-semibold text-slate-100">{item.question}</summary>
                  <p className="mt-2 text-sm text-slate-400">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        ) : null}

        {/* Policies */}
        {prestador.policies && prestador.policies.length > 0 ? (
          <div className="mt-10 rounded-3xl border border-forest-700 bg-forest-900 p-8">
            <h2 className="text-center font-[family-name:var(--font-brand)] text-2xl font-semibold text-white">Políticas</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {prestador.policies.map((policy) => (
                <div key={policy.id} className="rounded-2xl bg-forest-950 p-4">
                  <p className="text-sm font-semibold text-brand-400">{policy.title}</p>
                  <p className="mt-1 text-sm text-slate-300">{policy.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Security */}
        {security.length > 0 ? (
          <div className="mt-10 rounded-3xl border border-forest-700 bg-forest-900 p-8">
            <h2 className="text-center font-[family-name:var(--font-brand)] text-2xl font-semibold text-white">Seguridad</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {SECURITY_CATALOG.filter((s) => security.includes(s.key)).map((item) => (
                <div key={item.key} className="flex items-center gap-2 rounded-xl bg-forest-950 p-3 text-sm text-slate-300">
                  <span className="text-lg">{item.icon}</span> {item.label}
                </div>
              ))}
            </div>
          </div>
        ) : null}

      </div>
    </main>
  );
}
