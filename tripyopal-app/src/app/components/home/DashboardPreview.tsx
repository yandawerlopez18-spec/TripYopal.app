import { BUSINESS_CATEGORIES, CategoryIcon } from "./categoryIcons";
import { listPrestadores, listPrestadoresByCategory } from "../../services/prestadores";
import { featuredEvents, featuredPlaces } from "../../services/content";

const palette = ["#22c55e", "#0ea5e9", "#f59e0b", "#fb7185", "#a78bfa", "#facc15", "#34d399", "#f472b6", "#38bdf8", "#fb923c", "#4ade80"];

function buildConicGradient(data: { count: number; color: string }[]) {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  if (total === 0) return "conic-gradient(#143624 0deg 360deg)";

  let acc = 0;
  const stops = data
    .filter((item) => item.count > 0)
    .map((item) => {
      const start = acc;
      acc += (item.count / total) * 360;
      return `${item.color} ${start}deg ${acc}deg`;
    });

  return `conic-gradient(${stops.join(",")})`;
}

export default function DashboardPreview() {
  const totalBusinesses = listPrestadores().length;

  const categoryData = BUSINESS_CATEGORIES.map((category, index) => ({
    ...category,
    count: listPrestadoresByCategory(category.key).length,
    color: palette[index % palette.length],
  })).sort((a, b) => b.count - a.count);

  const activeCategories = categoryData.filter((c) => c.count > 0).length;
  const maxCount = Math.max(...categoryData.map((c) => c.count), 1);

  const stats = [
    { label: "Negocios registrados", value: totalBusinesses },
    { label: "Categorías activas", value: `${activeCategories}/${BUSINESS_CATEGORIES.length}` },
    { label: "Lugares destacados", value: featuredPlaces.length },
    { label: "Eventos programados", value: featuredEvents.length },
  ];

  return (
    <section className="mx-auto max-w-8xl px-6 pb-2 lg:px-8">
      <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6 shadow-xl lg:p-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-400">Panel de gestión</p>
          <h2 className="mt-2 font-[family-name:var(--font-brand)] text-3xl font-bold">Un vistazo a la actividad de TripYopal</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
            Datos reales de la plataforma, actualizados con cada nuevo registro.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-forest-700 bg-forest-950 p-4">
              <p className="text-2xl font-bold text-slate-100">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl border border-forest-700 bg-forest-950 p-6">
            <h3 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">Negocios por categoría</h3>
            <div className="mt-5 flex items-center justify-center">
              <div
                className="h-36 w-36 rounded-full"
                style={{ background: buildConicGradient(categoryData) }}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-forest-950 text-center">
                    <p className="text-lg font-bold text-slate-100">{totalBusinesses}</p>
                  </div>
                </div>
              </div>
            </div>
            <ul className="mt-5 space-y-1.5">
              {categoryData
                .filter((c) => c.count > 0)
                .map((c) => (
                  <li key={c.key} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: c.color }} />
                    {c.label} · {c.count}
                  </li>
                ))}
              {activeCategories === 0 ? (
                <li className="text-xs text-slate-500">Aún no hay negocios registrados.</li>
              ) : null}
            </ul>
          </div>

          <div className="rounded-2xl border border-forest-700 bg-forest-950 p-6">
            <h3 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">Distribución por categoría</h3>
            <div className="mt-5 space-y-3">
              {categoryData.map((c) => (
                <div key={c.key} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center text-slate-400">
                    <CategoryIcon icon={c.key} />
                  </span>
                  <p className="w-36 shrink-0 truncate text-xs text-slate-300">{c.label}</p>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-forest-800">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${(c.count / maxCount) * 100}%`, backgroundColor: c.count > 0 ? c.color : "transparent" }}
                    />
                  </div>
                  <span className="w-4 shrink-0 text-right text-xs font-semibold text-slate-400">{c.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-950 p-6">
          <h3 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">Actividad reciente</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {featuredEvents.map((event) => (
              <li key={event.id} className="flex items-start gap-3 rounded-xl bg-forest-900 p-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-100">{event.title}</p>
                  <p className="text-xs text-slate-400">{event.date} · {event.place}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
