"use client";

const reviews = [
  {
    name: "Laura",
    rating: 5,
    category: "Naturaleza",
    comment: "Un lugar muy tranquilo y con excelente ambiente para pasar un rato agradable.",
  },
  {
    name: "Mateo",
    rating: 4,
    category: "Cultura",
    comment: "Muy buena recomendación para quienes quieren conocer más de Yopal.",
  },
  {
    name: "Sofía",
    rating: 5,
    category: "Gastronomía",
    comment: "La experiencia fue muy completa, desde la ruta hasta los lugares recomendados.",
  },
];

export default function ReviewList() {
  const average = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="mt-8 border-t border-forest-700 pt-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-brand)] text-xl font-semibold text-slate-100">Calificaciones y reseñas</h3>
          <p className="mt-2 text-sm text-slate-400">Opiniones reales de visitantes que ayudan a tomar mejores decisiones.</p>
        </div>
        <div className="rounded-2xl bg-brand-500/10 px-4 py-3 text-sm font-semibold text-brand-400">
          Puntuación promedio: {average}/5
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {reviews.map((review) => (
          <div key={review.name} className="rounded-2xl border border-forest-700 bg-forest-950 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-100">{review.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{review.category}</p>
              </div>
              <p className="text-amber-400">{"★".repeat(review.rating)}</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
