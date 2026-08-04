"use client";

import { useState } from "react";
import { addReview, likeReview, listPrestadores, type ReviewAspects } from "../../services/prestadores";
import { REVIEW_ASPECT_LABELS } from "../../utils/businessProfileConfig";
import ImageUploadField from "../admin/ImageUploadField";

function StarPicker({ value, onChange, size = "text-xl" }: { value: number; onChange: (value: number) => void; size?: string }) {
  return (
    <div className={`flex gap-1 ${size}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => onChange(n)} className={n <= value ? "text-amber-400" : "text-slate-600"}>
          ★
        </button>
      ))}
    </div>
  );
}

const emptyAspects: ReviewAspects = {};

export default function BusinessReviews({ prestadorId, onChange }: { prestadorId: string; onChange?: () => void }) {
  const [, setRefreshKey] = useState(0);
  const refresh = () => {
    setRefreshKey((key) => key + 1);
    onChange?.();
  };

  const reviews = listPrestadores().find((entry) => entry.id === prestadorId)?.reviews ?? [];

  const [sortBy, setSortBy] = useState<"recientes" | "mejores" | "peores">("recientes");
  const [filterStars, setFilterStars] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [aspects, setAspects] = useState<ReviewAspects>(emptyAspects);
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const average = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  const aspectAverages = REVIEW_ASPECT_LABELS.map(({ key, label }) => {
    const values = reviews.map((r) => r.aspects?.[key]).filter((v): v is number => typeof v === "number");
    const avg = values.length ? values.reduce((sum, v) => sum + v, 0) / values.length : null;
    return { key, label, avg };
  });

  const visibleReviews = filterStars ? reviews.filter((r) => Math.round(r.rating) === filterStars) : [...reviews];
  if (sortBy === "recientes") visibleReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  if (sortBy === "mejores") visibleReviews.sort((a, b) => b.rating - a.rating);
  if (sortBy === "peores") visibleReviews.sort((a, b) => a.rating - b.rating);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) return;

    await addReview(prestadorId, {
      author,
      rating,
      aspects,
      text,
      imageUrl: imageUrl || undefined,
    });

    setAuthor("");
    setRating(5);
    setAspects({});
    setText("");
    setImageUrl("");
    setShowForm(false);
    refresh();
  };

  return (
    <div className="mt-10 rounded-3xl border border-forest-700 bg-forest-900 p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-[family-name:var(--font-brand)] text-2xl font-semibold text-white">Opiniones</h2>
          <p className="mt-1 text-sm text-slate-400">
            {reviews.length} {reviews.length === 1 ? "opinión" : "opiniones"} de visitantes reales.
          </p>
        </div>
        <div className="rounded-2xl bg-brand-500/10 px-4 py-3 text-center">
          <p className="text-2xl font-bold text-brand-400">{average.toFixed(1)}/5</p>
          <p className="text-xs text-slate-400">Puntuación promedio</p>
        </div>
      </div>

      {aspectAverages.some((a) => a.avg !== null) ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {aspectAverages
            .filter((a) => a.avg !== null)
            .map((aspect) => (
              <div key={aspect.key} className="flex items-center gap-3">
                <p className="w-32 shrink-0 text-sm text-slate-400">{aspect.label}</p>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-forest-800">
                  <div className="h-full rounded-full bg-brand-400" style={{ width: `${((aspect.avg ?? 0) / 5) * 100}%` }} />
                </div>
                <p className="w-8 shrink-0 text-right text-sm text-slate-300">{aspect.avg?.toFixed(1)}</p>
              </div>
            ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-forest-700 pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <select className="rounded-2xl border border-forest-700 bg-forest-950 px-3 py-2 text-sm text-slate-100" value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
            <option value="recientes">Más recientes</option>
            <option value="mejores">Mejor puntuadas</option>
            <option value="peores">Peor puntuadas</option>
          </select>
          <select
            className="rounded-2xl border border-forest-700 bg-forest-950 px-3 py-2 text-sm text-slate-100"
            value={filterStars ?? ""}
            onChange={(e) => setFilterStars(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">Todas las puntuaciones</option>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} estrellas
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="btn-brand-font btn-gradient rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          {showForm ? "Cancelar" : "Escribir reseña"}
        </button>
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="mt-4 grid gap-3 rounded-2xl border border-forest-700 bg-forest-950 p-5">
          <input
            className="rounded-2xl border border-forest-700 bg-forest-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500"
            placeholder="Tu nombre"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <p className="text-sm text-slate-300">Calificación general</p>
            <StarPicker value={rating} onChange={setRating} />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {REVIEW_ASPECT_LABELS.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between gap-2 rounded-xl bg-forest-900 px-3 py-2">
                <p className="text-xs text-slate-400">{label}</p>
                <StarPicker size="text-sm" value={aspects[key] ?? 0} onChange={(v) => setAspects({ ...aspects, [key]: v })} />
              </div>
            ))}
          </div>
          <textarea
            className="rounded-2xl border border-forest-700 bg-forest-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500"
            placeholder="Cuéntanos tu experiencia"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <ImageUploadField value={imageUrl} onChange={setImageUrl} />
          <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition">Publicar reseña</button>
        </form>
      ) : null}

      <div className="mt-6 space-y-4">
        {visibleReviews.length === 0 ? (
          <p className="text-sm text-slate-500">Aún no hay opiniones que coincidan.</p>
        ) : (
          visibleReviews.map((review) => (
            <div key={review.id} className="rounded-2xl border border-forest-700 bg-forest-950 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-100">{review.author}</p>
                  <p className="text-xs text-slate-500">{new Date(review.date).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
                <p className="text-amber-400">{"★".repeat(review.rating)}</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400">{review.text}</p>
              {review.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={review.imageUrl} alt="" className="mt-3 h-32 w-full max-w-xs rounded-xl object-cover" />
              ) : null}
              {review.reply ? (
                <div className="mt-3 rounded-xl bg-forest-900 p-3 text-sm text-slate-300">
                  <p className="text-xs font-semibold text-brand-400">Respuesta del establecimiento</p>
                  <p className="mt-1">{review.reply}</p>
                </div>
              ) : null}
              <button
                type="button"
                onClick={async () => {
                  await likeReview(prestadorId, review.id);
                  refresh();
                }}
                className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 transition hover:text-brand-400"
              >
                👍 Me gusta ({review.likes})
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
