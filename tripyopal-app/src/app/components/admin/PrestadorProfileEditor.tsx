"use client";

import { useState } from "react";
import {
  addHighlight,
  addMediaItem,
  addNearbyPlace,
  addPolicy,
  addPromotion,
  deleteHighlight,
  deleteMediaItem,
  deleteNearbyPlace,
  deletePolicy,
  deletePromotion,
  deleteReview,
  listPrestadores,
  replyToReview,
  updateHighlight,
  updatePolicy,
  updatePrestador,
  type WeeklyHoursEntry,
} from "../../services/prestadores";
import { AMENITY_CATALOG, SECURITY_CATALOG, MEDIA_CATEGORIES_BY_GROUP, getProfileGroup } from "../../utils/businessProfileConfig";
import ImageUploadField from "./ImageUploadField";

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";
const sectionClass = "mt-6 rounded-2xl border border-forest-700 bg-forest-950 p-5";

const WEEK_DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export default function PrestadorProfileEditor({ prestadorId, category }: { prestadorId: string; category: string }) {
  const [, setRefreshKey] = useState(0);
  const refresh = () => setRefreshKey((key) => key + 1);

  const prestador = listPrestadores().find((entry) => entry.id === prestadorId);
  const group = getProfileGroup(category);
  const isHospedaje = group === "hospedaje";
  const isGastronomia = group === "gastronomia";
  const isBar = category === "bares";
  const isSitio = category === "sitios";
  const isParque = category === "parques";
  const isCentro = category === "centros";
  const isRapida = category === "rapidas";
  const isParrilla = category === "parrillas";
  const isDiscoteca = category === "discotecas";
  const isDomicilio = category === "domicilios";
  const isTransporte = category === "transporte";

  const [generalForm, setGeneralForm] = useState(() => ({
    neighborhood: prestador?.neighborhood ?? "",
    coordinates: prestador?.coordinates ?? "",
    checkIn: prestador?.checkIn ?? "",
    checkOut: prestador?.checkOut ?? "",
    responseTime: prestador?.responseTime ?? "",
    languages: prestador?.languages ?? "",
    paymentMethods: prestador?.paymentMethods ?? "",
    website: prestador?.website ?? "",
    whatsapp: prestador?.whatsapp ?? "",
    email: prestador?.email ?? "",
    facebook: prestador?.facebook ?? "",
    tiktok: prestador?.tiktok ?? "",
    twitter: prestador?.twitter ?? "",
    status: prestador?.status ?? "Abierto",
    stars: prestador?.stars ? String(prestador.stars) : "",
    videoUrl: prestador?.videoUrl ?? "",
    tourUrl: prestador?.tourUrl ?? "",
    cuisineType: prestador?.cuisineType ?? "",
    ambiance: prestador?.ambiance ?? "",
    dietaryOptions: prestador?.dietaryOptions ?? "",
    musicGenre: prestador?.musicGenre ?? "",
    dressCode: prestador?.dressCode ?? "",
    siteType: prestador?.siteType ?? "",
    bestTimeToVisit: prestador?.bestTimeToVisit ?? "",
    averageClimate: prestador?.averageClimate ?? "",
    visitRecommendations: prestador?.visitRecommendations ?? "",
    difficultyLevel: prestador?.difficultyLevel ?? "",
    entryFee: prestador?.entryFee ?? "",
    parkArea: prestador?.parkArea ?? "",
    foundingYear: prestador?.foundingYear ?? "",
    parkType: prestador?.parkType ?? "",
    managedBy: prestador?.managedBy ?? "",
    safetyNote: prestador?.safetyNote ?? "",
    idealFor: prestador?.idealFor ?? "",
    storeCount: prestador?.storeCount ?? "",
    keyServices: prestador?.keyServices ?? "",
    deliveryTime: prestador?.deliveryTime ?? "",
    minOrder: prestador?.minOrder ?? "",
    deliveryFee: prestador?.deliveryFee ?? "",
    orderTracking: prestador?.orderTracking ?? "",
  }));
  const [generalMessage, setGeneralMessage] = useState("");
  const [tipInput, setTipInput] = useState("");

  const [editingPolicyId, setEditingPolicyId] = useState<string | null>(null);
  const [editPolicyForm, setEditPolicyForm] = useState({ title: "", description: "" });
  const [policyForm, setPolicyForm] = useState({ title: "", description: "" });

  const [editingHighlightId, setEditingHighlightId] = useState<string | null>(null);
  const [editHighlightForm, setEditHighlightForm] = useState({ icon: "", title: "", description: "" });
  const [highlightForm, setHighlightForm] = useState({ icon: "", title: "", description: "" });

  const [hoursForm, setHoursForm] = useState<WeeklyHoursEntry[]>(() =>
    WEEK_DAYS.map((day) => ({
      day,
      hours: prestador?.weeklyHours?.find((entry) => entry.day === day)?.hours ?? "",
    })),
  );
  const [hoursMessage, setHoursMessage] = useState("");
  const [promoForm, setPromoForm] = useState({ title: "", description: "" });
  const [nearbyForm, setNearbyForm] = useState({ name: "", category: "", distance: "" });
  const [mediaForm, setMediaForm] = useState({ url: "", category: MEDIA_CATEGORIES_BY_GROUP[group][0] });
  const [blockDateInput, setBlockDateInput] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  if (!prestador) return null;

  const amenities = prestador.amenities ?? [];
  const security = prestador.security ?? [];

  const toggleAmenity = async (key: string) => {
    const next = amenities.includes(key) ? amenities.filter((entry) => entry !== key) : [...amenities, key];
    await updatePrestador(prestadorId, { amenities: next });
    refresh();
  };

  const toggleSecurity = async (key: string) => {
    const next = security.includes(key) ? security.filter((entry) => entry !== key) : [...security, key];
    await updatePrestador(prestadorId, { security: next });
    refresh();
  };

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePrestador(prestadorId, {
      neighborhood: generalForm.neighborhood,
      coordinates: generalForm.coordinates,
      checkIn: generalForm.checkIn,
      checkOut: generalForm.checkOut,
      responseTime: generalForm.responseTime,
      languages: generalForm.languages,
      paymentMethods: generalForm.paymentMethods,
      website: generalForm.website,
      whatsapp: generalForm.whatsapp,
      email: generalForm.email,
      facebook: generalForm.facebook,
      tiktok: generalForm.tiktok,
      twitter: generalForm.twitter,
      status: generalForm.status || undefined,
      stars: generalForm.stars ? Number(generalForm.stars) : undefined,
      videoUrl: generalForm.videoUrl,
      tourUrl: generalForm.tourUrl,
      cuisineType: generalForm.cuisineType,
      ambiance: generalForm.ambiance,
      dietaryOptions: generalForm.dietaryOptions,
      musicGenre: generalForm.musicGenre,
      dressCode: generalForm.dressCode,
      siteType: generalForm.siteType,
      bestTimeToVisit: generalForm.bestTimeToVisit,
      averageClimate: generalForm.averageClimate,
      visitRecommendations: generalForm.visitRecommendations,
      difficultyLevel: generalForm.difficultyLevel,
      entryFee: generalForm.entryFee,
      parkArea: generalForm.parkArea,
      foundingYear: generalForm.foundingYear,
      parkType: generalForm.parkType,
      managedBy: generalForm.managedBy,
      safetyNote: generalForm.safetyNote,
      idealFor: generalForm.idealFor,
      storeCount: generalForm.storeCount,
      keyServices: generalForm.keyServices,
      deliveryTime: generalForm.deliveryTime,
      minOrder: generalForm.minOrder,
      deliveryFee: generalForm.deliveryFee,
      orderTracking: generalForm.orderTracking,
    });
    setGeneralMessage("Información general guardada.");
    refresh();
  };

  const handleHighlightSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!highlightForm.title || !highlightForm.description) return;
    await addHighlight(prestadorId, { icon: highlightForm.icon || "✨", title: highlightForm.title, description: highlightForm.description });
    setHighlightForm({ icon: "", title: "", description: "" });
    refresh();
  };

  const startHighlightEdit = (highlight: { id: string; icon: string; title: string; description: string }) => {
    setEditingHighlightId(highlight.id);
    setEditHighlightForm({ icon: highlight.icon, title: highlight.title, description: highlight.description });
  };

  const saveHighlightEdit = async (highlightId: string) => {
    if (!editHighlightForm.title || !editHighlightForm.description) return;
    await updateHighlight(prestadorId, highlightId, { ...editHighlightForm, icon: editHighlightForm.icon || "✨" });
    setEditingHighlightId(null);
    refresh();
  };

  const handleDeleteHighlight = async (highlightId: string) => {
    await deleteHighlight(prestadorId, highlightId);
    refresh();
  };

  const handlePolicySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!policyForm.title || !policyForm.description) return;
    await addPolicy(prestadorId, policyForm);
    setPolicyForm({ title: "", description: "" });
    refresh();
  };

  const startPolicyEdit = (policy: { id: string; title: string; description: string }) => {
    setEditingPolicyId(policy.id);
    setEditPolicyForm({ title: policy.title, description: policy.description });
  };

  const savePolicyEdit = async (policyId: string) => {
    if (!editPolicyForm.title || !editPolicyForm.description) return;
    await updatePolicy(prestadorId, policyId, editPolicyForm);
    setEditingPolicyId(null);
    refresh();
  };

  const handleDeletePolicy = async (policyId: string) => {
    await deletePolicy(prestadorId, policyId);
    refresh();
  };

  const handleHoursSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = hoursForm.filter((entry) => entry.hours.trim() !== "");
    await updatePrestador(prestadorId, { weeklyHours: cleaned.length > 0 ? cleaned : undefined });
    setHoursMessage("Horarios guardados.");
    refresh();
  };

  const handlePromoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoForm.title) return;
    await addPromotion(prestadorId, promoForm);
    setPromoForm({ title: "", description: "" });
    refresh();
  };

  const handleNearbySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nearbyForm.name || !nearbyForm.category) return;
    await addNearbyPlace(prestadorId, nearbyForm);
    setNearbyForm({ name: "", category: "", distance: "" });
    refresh();
  };

  const handleMediaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaForm.url) return;
    await addMediaItem(prestadorId, mediaForm);
    setMediaForm({ url: "", category: MEDIA_CATEGORIES_BY_GROUP[group][0] });
    refresh();
  };

  const blockedDates = prestador.blockedDates ?? [];

  const handleAddBlockedDate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockDateInput || blockedDates.includes(blockDateInput)) return;
    await updatePrestador(prestadorId, { blockedDates: [...blockedDates, blockDateInput].sort() });
    setBlockDateInput("");
    refresh();
  };

  const removeBlockedDate = async (date: string) => {
    await updatePrestador(prestadorId, { blockedDates: blockedDates.filter((entry) => entry !== date) });
    refresh();
  };

  const visitTips = prestador.visitTips ?? [];

  const handleAddTip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipInput.trim()) return;
    await updatePrestador(prestadorId, { visitTips: [...visitTips, tipInput.trim()] });
    setTipInput("");
    refresh();
  };

  const removeTip = async (tip: string) => {
    await updatePrestador(prestadorId, { visitTips: visitTips.filter((entry) => entry !== tip) });
    refresh();
  };

  const handleDeleteReview = async (reviewId: string) => {
    await deleteReview(prestadorId, reviewId);
    refresh();
  };

  const handleReplySubmit = async (reviewId: string) => {
    const reply = (replyDrafts[reviewId] ?? "").trim();
    if (!reply) return;
    await replyToReview(prestadorId, reviewId, reply);
    setReplyDrafts((current) => ({ ...current, [reviewId]: "" }));
    refresh();
  };

  return (
    <div>
      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Información general</h3>
        <form onSubmit={handleGeneralSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
          <input className={inputClass} placeholder="Barrio" value={generalForm.neighborhood} onChange={(e) => setGeneralForm({ ...generalForm, neighborhood: e.target.value })} />
          <input className={inputClass} placeholder="Coordenadas (lat, lng)" value={generalForm.coordinates} onChange={(e) => setGeneralForm({ ...generalForm, coordinates: e.target.value })} />
          {isHospedaje ? (
            <>
              <input className={inputClass} placeholder="Check-in (ej. 2:00 p. m.)" value={generalForm.checkIn} onChange={(e) => setGeneralForm({ ...generalForm, checkIn: e.target.value })} />
              <input className={inputClass} placeholder="Check-out (ej. 12:00 m.)" value={generalForm.checkOut} onChange={(e) => setGeneralForm({ ...generalForm, checkOut: e.target.value })} />
              <input className={inputClass} placeholder="Categoría (número de estrellas 1-5)" type="number" min={1} max={5} value={generalForm.stars} onChange={(e) => setGeneralForm({ ...generalForm, stars: e.target.value })} />
            </>
          ) : null}
          {isGastronomia ? (
            <>
              <input className={inputClass} placeholder="Tipo de cocina (ej. Crepes, Postres, Café)" value={generalForm.cuisineType} onChange={(e) => setGeneralForm({ ...generalForm, cuisineType: e.target.value })} />
              <input className={inputClass} placeholder="Ambiente (ej. Familiar, Casual, Acogedor)" value={generalForm.ambiance} onChange={(e) => setGeneralForm({ ...generalForm, ambiance: e.target.value })} />
              <input className={inputClass} placeholder="Opciones dietéticas (ej. Vegetariano, Sin gluten)" value={generalForm.dietaryOptions} onChange={(e) => setGeneralForm({ ...generalForm, dietaryOptions: e.target.value })} />
            </>
          ) : null}
          {isBar ? (
            <>
              <input className={inputClass} placeholder="Música (ej. Reggaetón, Salsa, Rock, Pop)" value={generalForm.musicGenre} onChange={(e) => setGeneralForm({ ...generalForm, musicGenre: e.target.value })} />
              <input className={inputClass} placeholder="Código de vestimenta (ej. Casual)" value={generalForm.dressCode} onChange={(e) => setGeneralForm({ ...generalForm, dressCode: e.target.value })} />
            </>
          ) : null}
          {isSitio ? (
            <>
              <input className={inputClass} placeholder="Tipo de lugar (ej. Mirador - Religioso - Natural)" value={generalForm.siteType} onChange={(e) => setGeneralForm({ ...generalForm, siteType: e.target.value })} />
              <input className={inputClass} placeholder="Mejor momento para visitar (ej. Amanecer y atardecer)" value={generalForm.bestTimeToVisit} onChange={(e) => setGeneralForm({ ...generalForm, bestTimeToVisit: e.target.value })} />
              <input className={inputClass} placeholder="Clima promedio (ej. 24°C - 30°C)" value={generalForm.averageClimate} onChange={(e) => setGeneralForm({ ...generalForm, averageClimate: e.target.value })} />
              <input className={inputClass} placeholder="Nivel de dificultad (ej. Fácil)" value={generalForm.difficultyLevel} onChange={(e) => setGeneralForm({ ...generalForm, difficultyLevel: e.target.value })} />
              <input className={inputClass} placeholder="Ingreso (ej. Gratuito, $5.000 COP)" value={generalForm.entryFee} onChange={(e) => setGeneralForm({ ...generalForm, entryFee: e.target.value })} />
              <input className={`${inputClass} sm:col-span-2`} placeholder="Recomendaciones (ej. Llevar agua, bloqueador solar...)" value={generalForm.visitRecommendations} onChange={(e) => setGeneralForm({ ...generalForm, visitRecommendations: e.target.value })} />
            </>
          ) : null}
          {isParque ? (
            <>
              <input className={inputClass} placeholder="Mejor momento para visitar (ej. Mañana y atardecer)" value={generalForm.bestTimeToVisit} onChange={(e) => setGeneralForm({ ...generalForm, bestTimeToVisit: e.target.value })} />
              <input className={inputClass} placeholder="Clima recomendado (ej. 24°C - 30°C)" value={generalForm.averageClimate} onChange={(e) => setGeneralForm({ ...generalForm, averageClimate: e.target.value })} />
              <input className={inputClass} placeholder="Entrada (ej. Entrada gratuita, $5.000 COP)" value={generalForm.entryFee} onChange={(e) => setGeneralForm({ ...generalForm, entryFee: e.target.value })} />
              <input className={inputClass} placeholder="Ideal para (ej. Familias, niños, deportistas y turistas)" value={generalForm.idealFor} onChange={(e) => setGeneralForm({ ...generalForm, idealFor: e.target.value })} />
              <input className={inputClass} placeholder="Seguridad (ej. Zona segura y vigilada)" value={generalForm.safetyNote} onChange={(e) => setGeneralForm({ ...generalForm, safetyNote: e.target.value })} />
              <input className={`${inputClass} sm:col-span-2`} placeholder="Recomendaciones (ej. Usa protector solar, lleva agua...)" value={generalForm.visitRecommendations} onChange={(e) => setGeneralForm({ ...generalForm, visitRecommendations: e.target.value })} />
              <input className={inputClass} placeholder="Área aproximada (ej. 2.5 hectáreas)" value={generalForm.parkArea} onChange={(e) => setGeneralForm({ ...generalForm, parkArea: e.target.value })} />
              <input className={inputClass} placeholder="Año de fundación (ej. 1973)" value={generalForm.foundingYear} onChange={(e) => setGeneralForm({ ...generalForm, foundingYear: e.target.value })} />
              <input className={inputClass} placeholder="Tipo de parque (ej. Urbano - Recreativo)" value={generalForm.parkType} onChange={(e) => setGeneralForm({ ...generalForm, parkType: e.target.value })} />
              <input className={inputClass} placeholder="Administrado por (ej. Alcaldía de Yopal)" value={generalForm.managedBy} onChange={(e) => setGeneralForm({ ...generalForm, managedBy: e.target.value })} />
            </>
          ) : null}
          {isCentro ? (
            <>
              <input className={inputClass} placeholder="Cantidad de tiendas (ej. 80)" value={generalForm.storeCount} onChange={(e) => setGeneralForm({ ...generalForm, storeCount: e.target.value })} />
              <input className={inputClass} placeholder="Tipo de lugar (ej. Compras - Entretenimiento - Servicios)" value={generalForm.siteType} onChange={(e) => setGeneralForm({ ...generalForm, siteType: e.target.value })} />
              <input className={inputClass} placeholder="Mejor momento para visitar (ej. Tarde y fines de semana)" value={generalForm.bestTimeToVisit} onChange={(e) => setGeneralForm({ ...generalForm, bestTimeToVisit: e.target.value })} />
              <input className={inputClass} placeholder="Clima recomendado (ej. 24°C - 30°C)" value={generalForm.averageClimate} onChange={(e) => setGeneralForm({ ...generalForm, averageClimate: e.target.value })} />
              <input className={inputClass} placeholder="Ideal para (ej. Compras, compartir en familia, plan de amigos)" value={generalForm.idealFor} onChange={(e) => setGeneralForm({ ...generalForm, idealFor: e.target.value })} />
              <input className={`${inputClass} sm:col-span-2`} placeholder="Servicios destacados (ej. Parqueadero gratuito, WiFi, cine, zona de comidas...)" value={generalForm.keyServices} onChange={(e) => setGeneralForm({ ...generalForm, keyServices: e.target.value })} />
            </>
          ) : null}
          {isRapida ? (
            <>
              <input className={inputClass} placeholder="Mejor momento para visitar (ej. Noches y fines de semana)" value={generalForm.bestTimeToVisit} onChange={(e) => setGeneralForm({ ...generalForm, bestTimeToVisit: e.target.value })} />
              <input className={inputClass} placeholder="Ideal para (ej. Amigos, grupos, celebrar cumpleaños, pasar un buen rato)" value={generalForm.idealFor} onChange={(e) => setGeneralForm({ ...generalForm, idealFor: e.target.value })} />
              <input className={`${inputClass} sm:col-span-2`} placeholder="Servicios destacados (ej. Terraza, música en vivo, cocktails, zona de fumadores)" value={generalForm.keyServices} onChange={(e) => setGeneralForm({ ...generalForm, keyServices: e.target.value })} />
            </>
          ) : null}
          {isParrilla ? (
            <>
              <input className={inputClass} placeholder="Mejor momento para visitar (ej. Almuerzo y fines de semana)" value={generalForm.bestTimeToVisit} onChange={(e) => setGeneralForm({ ...generalForm, bestTimeToVisit: e.target.value })} />
              <input className={inputClass} placeholder="Ideal para (ej. Familias, grupos, celebraciones, almuerzos empresariales)" value={generalForm.idealFor} onChange={(e) => setGeneralForm({ ...generalForm, idealFor: e.target.value })} />
              <input className={`${inputClass} sm:col-span-2`} placeholder="Servicios destacados (ej. Parqueadero gratuito, zona infantil, música en vivo, ambiente familiar)" value={generalForm.keyServices} onChange={(e) => setGeneralForm({ ...generalForm, keyServices: e.target.value })} />
            </>
          ) : null}
          {isDiscoteca ? (
            <>
              <input className={inputClass} placeholder="Tipo de lugar (ej. Discoteca - Club nocturno)" value={generalForm.siteType} onChange={(e) => setGeneralForm({ ...generalForm, siteType: e.target.value })} />
              <input className={inputClass} placeholder="Mejor momento para visitar (ej. Viernes y Sábado)" value={generalForm.bestTimeToVisit} onChange={(e) => setGeneralForm({ ...generalForm, bestTimeToVisit: e.target.value })} />
              <input className={inputClass} placeholder="Ideal para (ej. Rumbear, celebrar cumpleaños, fiestas, grupos de amigos)" value={generalForm.idealFor} onChange={(e) => setGeneralForm({ ...generalForm, idealFor: e.target.value })} />
              <input className={`${inputClass} sm:col-span-2`} placeholder="Servicios destacados (ej. Música en vivo, DJ, shows, bar, zona VIP, pantallas LED)" value={generalForm.keyServices} onChange={(e) => setGeneralForm({ ...generalForm, keyServices: e.target.value })} />
            </>
          ) : null}
          {isDomicilio ? (
            <>
              <input className={inputClass} placeholder="Tiempo de entrega (ej. 30 - 60 min (Dependiendo de la zona))" value={generalForm.deliveryTime} onChange={(e) => setGeneralForm({ ...generalForm, deliveryTime: e.target.value })} />
              <input className={inputClass} placeholder="Pedido mínimo (ej. $5.000 COP)" value={generalForm.minOrder} onChange={(e) => setGeneralForm({ ...generalForm, minOrder: e.target.value })} />
              <input className={inputClass} placeholder="Costo de domicilio (ej. Desde $3.000 COP. Gratis en pedidos +$30.000)" value={generalForm.deliveryFee} onChange={(e) => setGeneralForm({ ...generalForm, deliveryFee: e.target.value })} />
              <input className={inputClass} placeholder="Seguimiento de pedido (ej. Te notificamos por WhatsApp)" value={generalForm.orderTracking} onChange={(e) => setGeneralForm({ ...generalForm, orderTracking: e.target.value })} />
            </>
          ) : null}
          {isTransporte ? (
            <>
              <input className={inputClass} placeholder="Tipo de transporte (ej. Aéreo, Terrestre, Taxi)" value={generalForm.siteType} onChange={(e) => setGeneralForm({ ...generalForm, siteType: e.target.value })} />
              <input className={inputClass} placeholder="Mejor momento para viajar (ej. Todo el año)" value={generalForm.bestTimeToVisit} onChange={(e) => setGeneralForm({ ...generalForm, bestTimeToVisit: e.target.value })} />
              <input className={inputClass} placeholder="Ideal para (ej. Viajeros de negocios, turismo, conexión de vuelos)" value={generalForm.idealFor} onChange={(e) => setGeneralForm({ ...generalForm, idealFor: e.target.value })} />
              <input className={`${inputClass} sm:col-span-2`} placeholder="Servicios destacados (ej. Salas VIP, WiFi gratuito, tiendas, cafés, alquiler de vehículos, cajeros)" value={generalForm.keyServices} onChange={(e) => setGeneralForm({ ...generalForm, keyServices: e.target.value })} />
            </>
          ) : null}
          <input className={inputClass} placeholder="Tiempo de respuesta (ej. Menos de 1 hora)" value={generalForm.responseTime} onChange={(e) => setGeneralForm({ ...generalForm, responseTime: e.target.value })} />
          <input className={inputClass} placeholder="Idiomas hablados" value={generalForm.languages} onChange={(e) => setGeneralForm({ ...generalForm, languages: e.target.value })} />
          <input className={inputClass} placeholder="Métodos de pago aceptados" value={generalForm.paymentMethods} onChange={(e) => setGeneralForm({ ...generalForm, paymentMethods: e.target.value })} />
          <select className={inputClass} value={generalForm.status} onChange={(e) => setGeneralForm({ ...generalForm, status: e.target.value })}>
            <option value="Abierto">Abierto</option>
            <option value="Cerrado">Cerrado</option>
            <option value="Disponible">Disponible</option>
          </select>
          <input className={inputClass} placeholder="Sitio web oficial" value={generalForm.website} onChange={(e) => setGeneralForm({ ...generalForm, website: e.target.value })} />
          <input className={inputClass} placeholder="WhatsApp (ej. 573001234567)" value={generalForm.whatsapp} onChange={(e) => setGeneralForm({ ...generalForm, whatsapp: e.target.value })} />
          <input className={inputClass} placeholder="Correo electrónico" type="email" value={generalForm.email} onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })} />
          <input className={inputClass} placeholder="Facebook (usuario o enlace, opcional)" value={generalForm.facebook} onChange={(e) => setGeneralForm({ ...generalForm, facebook: e.target.value })} />
          <input className={inputClass} placeholder="TikTok (usuario o enlace, opcional)" value={generalForm.tiktok} onChange={(e) => setGeneralForm({ ...generalForm, tiktok: e.target.value })} />
          <input className={inputClass} placeholder="Twitter / X (usuario o enlace, opcional)" value={generalForm.twitter} onChange={(e) => setGeneralForm({ ...generalForm, twitter: e.target.value })} />
          <input className={`${inputClass} sm:col-span-2`} placeholder="Video promocional (URL de YouTube, opcional)" value={generalForm.videoUrl} onChange={(e) => setGeneralForm({ ...generalForm, videoUrl: e.target.value })} />
          <input className={`${inputClass} sm:col-span-2`} placeholder="Recorrido virtual 360° (URL, opcional)" value={generalForm.tourUrl} onChange={(e) => setGeneralForm({ ...generalForm, tourUrl: e.target.value })} />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">Guardar información general</button>
          {generalMessage ? <p className="text-sm text-brand-400 sm:col-span-2">{generalMessage}</p> : null}
        </form>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Servicios disponibles</h3>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {AMENITY_CATALOG.map((amenity) => (
            <label key={amenity.key} className="flex items-center gap-2 rounded-xl border border-forest-700 bg-forest-900 px-3 py-2 text-sm text-slate-300">
              <input type="checkbox" checked={amenities.includes(amenity.key)} onChange={() => toggleAmenity(amenity.key)} />
              <span>{amenity.icon}</span> {amenity.label}
            </label>
          ))}
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Seguridad</h3>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SECURITY_CATALOG.map((item) => (
            <label key={item.key} className="flex items-center gap-2 rounded-xl border border-forest-700 bg-forest-900 px-3 py-2 text-sm text-slate-300">
              <input type="checkbox" checked={security.includes(item.key)} onChange={() => toggleSecurity(item.key)} />
              <span>{item.icon}</span> {item.label}
            </label>
          ))}
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Políticas</h3>
        <p className="mt-1 text-sm text-slate-400">Agrega, edita o elimina cualquier política del establecimiento (cancelación, mascotas, niños, fumadores, reservas, o las que necesites).</p>
        <ul className="mt-4 space-y-2">
          {(prestador.policies ?? []).map((policy) => (
            <li key={policy.id} className="rounded-xl border border-forest-700 bg-forest-900 p-3">
              {editingPolicyId === policy.id ? (
                <div className="grid gap-2">
                  <input
                    className={inputClass}
                    placeholder="Título (ej. Cancelación)"
                    value={editPolicyForm.title}
                    onChange={(e) => setEditPolicyForm({ ...editPolicyForm, title: e.target.value })}
                  />
                  <textarea
                    className={inputClass}
                    placeholder="Descripción de la política"
                    value={editPolicyForm.description}
                    onChange={(e) => setEditPolicyForm({ ...editPolicyForm, description: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <button type="button" onClick={() => savePolicyEdit(policy.id)} className="btn-gradient rounded-full px-3 py-1.5 text-xs font-semibold text-forest-950">
                      Guardar
                    </button>
                    <button type="button" onClick={() => setEditingPolicyId(null)} className="rounded-full border border-forest-700 px-3 py-1.5 text-xs text-slate-300">
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-brand-400">{policy.title}</p>
                    <p className="mt-1 text-sm text-slate-300">{policy.description}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button type="button" onClick={() => startPolicyEdit(policy)} className="btn-brand-font btn-gradient rounded-full px-3 py-1.5 text-xs font-semibold text-forest-950 transition">
                      Editar
                    </button>
                    <button type="button" onClick={() => handleDeletePolicy(policy.id)} className="rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10">
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
          {(prestador.policies ?? []).length === 0 ? <p className="text-sm text-slate-500">Aún no hay políticas cargadas.</p> : null}
        </ul>
        <form onSubmit={handlePolicySubmit} className="mt-4 grid gap-3 border-t border-forest-700 pt-4">
          <input className={inputClass} placeholder="Título (ej. Cancelación, Mascotas, Niños...)" value={policyForm.title} onChange={(e) => setPolicyForm({ ...policyForm, title: e.target.value })} />
          <textarea className={inputClass} placeholder="Descripción de la política" value={policyForm.description} onChange={(e) => setPolicyForm({ ...policyForm, description: e.target.value })} />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition">Agregar política</button>
        </form>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Lo que nos hace únicos</h3>
        <p className="mt-1 text-sm text-slate-400">Agrega, edita o elimina los aspectos que destacan tu establecimiento (ej. Ingredientes frescos, Hecho con amor, Ambiente acogedor).</p>
        <ul className="mt-4 space-y-2">
          {(prestador.highlights ?? []).map((highlight) => (
            <li key={highlight.id} className="rounded-xl border border-forest-700 bg-forest-900 p-3">
              {editingHighlightId === highlight.id ? (
                <div className="grid gap-2 sm:grid-cols-[80px_1fr]">
                  <input
                    className={inputClass}
                    placeholder="Ícono (emoji)"
                    value={editHighlightForm.icon}
                    onChange={(e) => setEditHighlightForm({ ...editHighlightForm, icon: e.target.value })}
                  />
                  <input
                    className={inputClass}
                    placeholder="Título (ej. Ingredientes frescos)"
                    value={editHighlightForm.title}
                    onChange={(e) => setEditHighlightForm({ ...editHighlightForm, title: e.target.value })}
                  />
                  <textarea
                    className={`${inputClass} sm:col-span-2`}
                    placeholder="Descripción breve"
                    value={editHighlightForm.description}
                    onChange={(e) => setEditHighlightForm({ ...editHighlightForm, description: e.target.value })}
                  />
                  <div className="flex gap-2 sm:col-span-2">
                    <button type="button" onClick={() => saveHighlightEdit(highlight.id)} className="btn-gradient rounded-full px-3 py-1.5 text-xs font-semibold text-forest-950">
                      Guardar
                    </button>
                    <button type="button" onClick={() => setEditingHighlightId(null)} className="rounded-full border border-forest-700 px-3 py-1.5 text-xs text-slate-300">
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-2">
                    <span className="text-lg">{highlight.icon}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-brand-400">{highlight.title}</p>
                      <p className="mt-1 text-sm text-slate-300">{highlight.description}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button type="button" onClick={() => startHighlightEdit(highlight)} className="btn-brand-font btn-gradient rounded-full px-3 py-1.5 text-xs font-semibold text-forest-950 transition">
                      Editar
                    </button>
                    <button type="button" onClick={() => handleDeleteHighlight(highlight.id)} className="rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10">
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
          {(prestador.highlights ?? []).length === 0 ? <p className="text-sm text-slate-500">Aún no hay aspectos destacados cargados.</p> : null}
        </ul>
        <form onSubmit={handleHighlightSubmit} className="mt-4 grid gap-3 border-t border-forest-700 pt-4 sm:grid-cols-[80px_1fr]">
          <input className={inputClass} placeholder="Ícono (emoji)" value={highlightForm.icon} onChange={(e) => setHighlightForm({ ...highlightForm, icon: e.target.value })} />
          <input className={inputClass} placeholder="Título (ej. Ingredientes frescos)" value={highlightForm.title} onChange={(e) => setHighlightForm({ ...highlightForm, title: e.target.value })} />
          <textarea
            className={`${inputClass} sm:col-span-2`}
            placeholder="Descripción breve"
            value={highlightForm.description}
            onChange={(e) => setHighlightForm({ ...highlightForm, description: e.target.value })}
          />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">Agregar aspecto destacado</button>
        </form>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Horarios de atención</h3>
        <p className="mt-1 text-sm text-slate-400">Define el horario para cada día de la semana; se mostrará en la tarjeta de horarios de la página pública, debajo de Ubicación.</p>
        <form onSubmit={handleHoursSubmit} className="mt-4 grid gap-2 sm:grid-cols-2">
          {hoursForm.map((entry, index) => (
            <div key={entry.day} className="flex items-center gap-2">
              <span className="w-24 shrink-0 text-sm text-slate-300">{entry.day}</span>
              <input
                className={`${inputClass} flex-1 !py-2`}
                placeholder="ej. 11:00 a.m. - 9:00 p.m. o Cerrado"
                value={entry.hours}
                onChange={(e) =>
                  setHoursForm((current) => current.map((item, i) => (i === index ? { ...item, hours: e.target.value } : item)))
                }
              />
            </div>
          ))}
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">Guardar horarios</button>
          {hoursMessage ? <p className="text-sm text-brand-400 sm:col-span-2">{hoursMessage}</p> : null}
        </form>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Promociones</h3>
        <ul className="mt-4 space-y-2">
          {(prestador.promotions ?? []).map((item) => (
            <li key={item.id} className="rounded-xl border border-forest-700 bg-forest-900 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    await deletePromotion(prestadorId, item.id);
                    refresh();
                  }}
                  className="shrink-0 rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
        <form onSubmit={handlePromoSubmit} className="mt-4 grid gap-3 border-t border-forest-700 pt-4">
          <input className={inputClass} placeholder="Título (ej. Plan romántico)" value={promoForm.title} onChange={(e) => setPromoForm({ ...promoForm, title: e.target.value })} />
          <textarea className={inputClass} placeholder="Descripción de la promoción" value={promoForm.description} onChange={(e) => setPromoForm({ ...promoForm, description: e.target.value })} />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition">Agregar promoción</button>
        </form>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Lugares cercanos</h3>
        <ul className="mt-4 space-y-2">
          {(prestador.nearbyPlaces ?? []).map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 rounded-xl border border-forest-700 bg-forest-900 p-3">
              <p className="text-sm text-slate-200">
                <span className="font-semibold">{item.name}</span> · {item.category} · {item.distance}
              </p>
              <button
                type="button"
                onClick={async () => {
                  await deleteNearbyPlace(prestadorId, item.id);
                  refresh();
                }}
                className="shrink-0 rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleNearbySubmit} className="mt-4 grid gap-3 border-t border-forest-700 pt-4 sm:grid-cols-3">
          <input className={inputClass} placeholder="Nombre del lugar" value={nearbyForm.name} onChange={(e) => setNearbyForm({ ...nearbyForm, name: e.target.value })} />
          <input className={inputClass} placeholder="Categoría (ej. Restaurante)" value={nearbyForm.category} onChange={(e) => setNearbyForm({ ...nearbyForm, category: e.target.value })} />
          <input className={inputClass} placeholder="Distancia (ej. 5 min caminando)" value={nearbyForm.distance} onChange={(e) => setNearbyForm({ ...nearbyForm, distance: e.target.value })} />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-3">Agregar lugar cercano</button>
        </form>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Galería multimedia</h3>
        <p className="mt-1 text-sm text-slate-400">Estas fotos se suman a la galería principal de la página, organizadas por categoría.</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(prestador.media ?? []).map((item) => (
            <div key={item.id} className="overflow-hidden rounded-xl border border-forest-700 bg-forest-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt="" className="h-24 w-full object-cover" />
              <div className="flex items-center justify-between p-2">
                <span className="truncate text-[10px] text-slate-400">{item.category}</span>
                <button
                  type="button"
                  onClick={async () => {
                    await deleteMediaItem(prestadorId, item.id);
                    refresh();
                  }}
                  className="shrink-0 text-[10px] text-red-400 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleMediaSubmit} className="mt-4 grid gap-3 border-t border-forest-700 pt-4 sm:grid-cols-2">
          <ImageUploadField value={mediaForm.url} onChange={(value) => setMediaForm({ ...mediaForm, url: value })} />
          <input
            className={inputClass}
            list="media-category-options"
            placeholder="Ej. Puesto de obleas, Miradores, Zonas comunes..."
            value={mediaForm.category}
            onChange={(e) => setMediaForm({ ...mediaForm, category: e.target.value })}
          />
          <datalist id="media-category-options">
            {MEDIA_CATEGORIES_BY_GROUP[group].map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">Agregar imagen a la galería</button>
        </form>
      </div>

      <div className={sectionClass}>
        <h3 className="font-semibold text-slate-100">Reseñas</h3>
        <p className="mt-1 text-sm text-slate-400">Modera las reseñas publicadas por los usuarios: elimina las inapropiadas o responde en nombre del negocio.</p>
        <ul className="mt-4 space-y-3">
          {(prestador.reviews ?? []).map((review) => (
            <li key={review.id} className="rounded-xl border border-forest-700 bg-forest-900 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-100">
                    {review.author} <span className="font-normal text-yellow-400">· {"★".repeat(review.rating)}</span>
                  </p>
                  <p className="mt-1 text-sm text-slate-400">{review.text}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {new Date(review.date).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })} · {review.likes} me gusta
                  </p>
                  {review.reply ? (
                    <p className="mt-2 rounded-lg bg-forest-950 p-2 text-xs text-brand-400">
                      <span className="font-semibold">Respuesta del negocio:</span> {review.reply}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteReview(review.id)}
                  className="shrink-0 rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10"
                >
                  Eliminar
                </button>
              </div>
              <div className="mt-3 flex gap-2">
                <input
                  className={`${inputClass} flex-1`}
                  placeholder={review.reply ? "Editar respuesta..." : "Responder a esta reseña..."}
                  value={replyDrafts[review.id] ?? ""}
                  onChange={(e) => setReplyDrafts((current) => ({ ...current, [review.id]: e.target.value }))}
                />
                <button
                  type="button"
                  onClick={() => handleReplySubmit(review.id)}
                  className="btn-gradient shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
                >
                  Responder
                </button>
              </div>
            </li>
          ))}
          {(prestador.reviews ?? []).length === 0 ? <p className="text-sm text-slate-500">Aún no hay reseñas para este negocio.</p> : null}
        </ul>
      </div>

      {isHospedaje ? (
        <div className={sectionClass}>
          <h3 className="font-semibold text-slate-100">Fechas bloqueadas</h3>
          <p className="mt-1 text-sm text-slate-400">Marca fechas en las que no hay habitaciones disponibles; se mostrarán en el calendario de disponibilidad.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {blockedDates.map((date) => (
              <span key={date} className="flex items-center gap-2 rounded-full bg-forest-900 px-3 py-1.5 text-xs text-slate-300">
                {new Date(date + "T00:00:00").toLocaleDateString("es-CO", { day: "numeric", month: "short" })}
                <button type="button" onClick={() => removeBlockedDate(date)} className="text-red-400 hover:text-red-300">
                  ×
                </button>
              </span>
            ))}
            {blockedDates.length === 0 ? <p className="text-sm text-slate-500">No hay fechas bloqueadas.</p> : null}
          </div>
          <form onSubmit={handleAddBlockedDate} className="mt-4 flex gap-2">
            <input type="date" className={inputClass} value={blockDateInput} onChange={(e) => setBlockDateInput(e.target.value)} />
            <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition">Bloquear fecha</button>
          </form>
        </div>
      ) : null}

      {isSitio || isParque || isCentro || isTransporte ? (
        <div className={sectionClass}>
          <h3 className="font-semibold text-slate-100">Consejos para tu visita</h3>
          <p className="mt-1 text-sm text-slate-400">Agrega recomendaciones de seguridad, salud y cuidado ambiental para quienes visiten este lugar.</p>
          <ul className="mt-4 space-y-2">
            {visitTips.map((tip) => (
              <li key={tip} className="flex items-center justify-between gap-3 rounded-xl border border-forest-700 bg-forest-900 p-3">
                <p className="text-sm text-slate-200">{tip}</p>
                <button
                  type="button"
                  onClick={() => removeTip(tip)}
                  className="shrink-0 rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10"
                >
                  Eliminar
                </button>
              </li>
            ))}
            {visitTips.length === 0 ? <p className="text-sm text-slate-500">Aún no hay consejos cargados.</p> : null}
          </ul>
          <form onSubmit={handleAddTip} className="mt-4 flex gap-2 border-t border-forest-700 pt-4">
            <input className={`${inputClass} flex-1`} placeholder="Ej. Lleva agua para mantenerte hidratado" value={tipInput} onChange={(e) => setTipInput(e.target.value)} />
            <button className="btn-gradient shrink-0 rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition">Agregar consejo</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
