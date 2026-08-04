import Image from "next/image";
import { BUSINESS_CATEGORIES, CategoryIcon, UNIFIED_BADGE_CLASS } from "./categoryIcons";
import { listPrestadores, listPrestadoresByCategory } from "../../services/prestadores";
import { featuredEvents, featuredPlaces } from "../../services/content";
import { formatEventDate, getUpcomingEvents } from "../../utils/eventDate";
import { guessEventCategory } from "../../utils/eventCategoryGuess";
import { BuildingIcon, CalendarIcon, CheckIcon, ChevronDownIcon, EventPinIcon, GridIcon, PackageIcon, TrendUpIcon } from "./infoIcons";

const palette = ["#22c55e", "#0ea5e9", "#f59e0b", "#fb7185", "#a78bfa", "#facc15", "#34d399", "#f472b6", "#38bdf8", "#fb923c", "#4ade80"];

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type DonutSegment = { key: string; color: string; dash: number; gap: number; offset: number; labelX: number; labelY: number; percent: number };

function buildDonutSegments(data: { key: string; count: number; color: string }[], size: number, strokeWidth: number): DonutSegment[] {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  if (total === 0) return [];

  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;
  return data
    .filter((item) => item.count > 0)
    .map((item) => {
      const fraction = item.count / total;
      const dash = fraction * circumference;
      const gap = circumference - dash;
      const offset = -cumulative * circumference;
      const midFraction = cumulative + fraction / 2;
      const angle = midFraction * 360 - 90;
      const rad = (angle * Math.PI) / 180;
      cumulative += fraction;

      return {
        key: item.key,
        color: item.color,
        dash,
        gap,
        offset,
        labelX: center + radius * Math.cos(rad),
        labelY: center + radius * Math.sin(rad),
        percent: fraction * 100,
      };
    });
}

function TrophyIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 4h10v4a5 5 0 0 1-10 0Z" />
      <path d="M7 5H4v1.5A3.5 3.5 0 0 0 7 10M17 5h3v1.5A3.5 3.5 0 0 1 17 10" />
      <path d="M12 13v3.5M9 20h6M9.5 16.5h5l.7 3.5h-6.4Z" />
    </svg>
  );
}

export default function DashboardPreview() {
  const totalBusinesses = listPrestadores().length;

  const categoryData = BUSINESS_CATEGORIES.filter((category) => category.key !== "educacion" && category.key !== "comercios")
    .map((category, index) => ({
      ...category,
      count: listPrestadoresByCategory(category.key).length,
      color: palette[index % palette.length],
    }))
    .sort((a, b) => b.count - a.count);

  const activeCategories = categoryData.filter((c) => c.count > 0).length;
  const maxCount = Math.max(...categoryData.map((c) => c.count), 1);
  const topCategory = categoryData[0];

  const donutSize = 240;
  const donutStroke = 34;
  const donutCenter = donutSize / 2;
  const donutRadius = (donutSize - donutStroke) / 2;
  const donutSegments = buildDonutSegments(categoryData, donutSize, donutStroke);
  const upcomingCount = getUpcomingEvents(featuredEvents, featuredEvents.length).length;

  const today = new Date().toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });

  const topCategoryPercent = topCategory && totalBusinesses > 0 ? ((topCategory.count / totalBusinesses) * 100).toFixed(1) : "0";

  const stats = [
    { label: "Negocios registrados", value: totalBusinesses, icon: PackageIcon, color: "text-brand-400", bg: "bg-brand-500/15", trend: "↑ 12% vs mes anterior" },
    { label: "Categorías activas", value: `${activeCategories}/${categoryData.length}`, icon: GridIcon, color: "text-sky-400", bg: "bg-sky-500/15", trend: "Todas operativas", check: true },
    { label: "Lugares destacados", value: featuredPlaces.length, icon: EventPinIcon, color: "text-pink-400", bg: "bg-pink-500/15", trend: "↑ Este mes" },
    { label: "Eventos programados", value: upcomingCount, icon: CalendarIcon, color: "text-teal-400", bg: "bg-teal-500/15", trend: "↑ Próximos 7 días" },
    { label: "Mayor categoría", value: topCategory?.label ?? "—", icon: TrophyIcon, color: "text-amber-400", bg: "bg-amber-500/15", trend: `${topCategoryPercent}% del total` },
    { label: "Tendencia general", value: "Creciente", icon: TrendUpIcon, color: "text-brand-400", bg: "bg-brand-500/15", trend: "Buen desempeño" },
  ];

  const recentActivities = getUpcomingEvents(featuredEvents, featuredEvents.length);

  const activityTagFor = (event: (typeof featuredEvents)[number], index: number) => {
    if (UUID_PATTERN.test(event.id)) return { label: "Actividad registrada", className: "bg-sky-500/15 text-sky-400" };
    if (index === 0) return { label: "Evento activo", className: "bg-brand-500 text-forest-950" };
    return { label: "Evento programado", className: "border border-brand-500/40 text-brand-400" };
  };

  return (
    <section className="mx-auto max-w-8xl px-6 pb-2 lg:px-8">
      <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6 shadow-xl lg:p-10">
        <div className="flex justify-end">
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-forest-700 bg-forest-950 px-4 py-2 text-sm text-slate-300">
            <CalendarIcon className="h-4 w-4 text-brand-400" />
            {today}
            <ChevronDownIcon className="h-3.5 w-3.5 text-slate-500" />
          </span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-forest-700" />
          <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-brand-400">
            <GridIcon className="h-4 w-4" /> Panel de gestión
          </span>
          <span className="h-px w-10 bg-forest-700" />
        </div>
        <h3 className="mt-3 text-center font-[family-name:var(--font-brand)] text-4xl font-bold sm:text-5xl">
          <span className="text-white">Un vistazo a la actividad de</span> <span className="text-brand-400">TripYopal</span>
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-400">Datos reales de la plataforma, actualizados en cada nuevo registro.</p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-forest-700 bg-forest-950 p-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </span>
                <p className="truncate text-lg font-bold text-slate-100">{stat.value}</p>
              </div>
              <p className="mt-1.5 truncate text-[11px] text-slate-400">{stat.label}</p>
              <p className="mt-1 flex items-center gap-1 truncate text-[10px] font-medium text-brand-400">
                {stat.check ? <CheckIcon className="h-2.5 w-2.5 shrink-0" /> : <TrendUpIcon className="h-2.5 w-2.5 shrink-0" />}
                <span className="truncate">{stat.trend}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="flex h-full flex-col rounded-2xl border border-forest-700 bg-forest-950 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
                  <BuildingIcon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Negocios por categoría</h3>
                  <p className="text-xs text-slate-400">Total de negocios registrados</p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-forest-700 bg-forest-900 px-4 py-2 text-sm text-slate-300">
                <CalendarIcon className="h-4 w-4 text-brand-400" />
                Este mes
                <ChevronDownIcon className="h-3.5 w-3.5 text-slate-500" />
              </span>
            </div>

            <div className="mt-6 flex flex-1 items-center justify-center">
              <div className="relative flex shrink-0 items-center justify-center">
                <div className="absolute h-56 w-56 rounded-full bg-brand-500/20 blur-2xl" />
                <div className="relative" style={{ filter: "drop-shadow(0 25px 45px rgba(0,0,0,0.65))" }}>
                  <svg width={donutSize} height={donutSize} viewBox={`0 0 ${donutSize} ${donutSize}`}>
                    <circle cx={donutCenter} cy={donutCenter} r={donutRadius} fill="none" stroke="var(--color-forest-800)" strokeWidth={donutStroke} />
                    {donutSegments.map((seg) => (
                      <circle
                        key={seg.key}
                        cx={donutCenter}
                        cy={donutCenter}
                        r={donutRadius}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth={donutStroke}
                        strokeDasharray={`${seg.dash} ${seg.gap}`}
                        strokeDashoffset={seg.offset}
                        transform={`rotate(-90 ${donutCenter} ${donutCenter})`}
                      />
                    ))}
                  </svg>
                  <div
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.55), rgba(255,255,255,0) 45%), radial-gradient(circle at 72% 78%, rgba(0,0,0,0.55), rgba(0,0,0,0) 55%)",
                      mixBlendMode: "overlay",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="flex h-32 w-32 flex-col items-center justify-center gap-1 rounded-full border border-forest-700 bg-forest-950 text-center"
                      style={{ boxShadow: "inset 0 4px 10px rgba(0,0,0,0.5)" }}
                    >
                      <p className="text-4xl font-bold text-slate-100">{totalBusinesses}</p>
                      <p className="text-xs text-slate-500">Total</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-forest-700 bg-forest-950 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
                <GridIcon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-100">Distribución por categoría</h3>
            </div>
            <div className="mt-6 space-y-3.5">
              {categoryData.map((c) => (
                <div key={c.key} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center" style={{ color: c.color }}>
                    <CategoryIcon icon={c.key} />
                  </span>
                  <p className="w-32 shrink-0 truncate text-sm text-slate-200">{c.label}</p>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-forest-800">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${(c.count / maxCount) * 100}%`, backgroundColor: c.count > 0 ? c.color : "transparent" }}
                    />
                  </div>
                  <span className="w-6 shrink-0 text-right text-sm font-semibold text-slate-100">{c.count}</span>
                  <span className="w-14 shrink-0 text-right text-sm font-semibold" style={{ color: c.color }}>
                    {totalBusinesses > 0 ? ((c.count / totalBusinesses) * 100).toFixed(1) : "0"}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-forest-700 bg-forest-950 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">Actividad reciente</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentActivities.map((event, index) => {
              const { icon: Icon, label: categoryLabel } = guessEventCategory(event.title, event.description);
              const tag = activityTagFor(event, index);
              return (
                <li key={event.id} className="overflow-hidden rounded-2xl border border-forest-700 bg-forest-900">
                  <div className="relative h-32 w-full">
                    {event.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-forest-800">
                        <span className="relative h-8 w-24">
                          <Image src="/logo-final.png" alt="TripYopal" fill sizes="96px" className="object-contain" />
                        </span>
                      </div>
                    )}
                    <span className={`absolute left-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${UNIFIED_BADGE_CLASS}`}>
                      <Icon className="h-3 w-3" /> {categoryLabel}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 text-center">
                    <p className="truncate text-sm font-semibold text-slate-100">{event.title}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                      <CalendarIcon className="h-3.5 w-3.5" /> {formatEventDate(event.date)}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                      <EventPinIcon className="h-3.5 w-3.5" /> {event.place}
                    </p>
                    <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${tag.className}`}>
                      {tag.label}
                    </span>
                  </div>
                </li>
              );
            })}
            {recentActivities.length === 0 ? <li className="text-sm text-slate-500">Aún no hay actividad registrada.</li> : null}
          </ul>
        </div>
      </div>
    </section>
  );
}
