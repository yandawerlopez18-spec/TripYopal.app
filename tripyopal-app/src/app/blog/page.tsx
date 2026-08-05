import Link from "next/link";
import { CalendarIcon, InstagramIcon, LeafIcon, MapIcon, PencilIcon } from "../components/home/infoIcons";
import { siteContent } from "../services/siteContent";

const upcoming = [
  { icon: MapIcon, title: "Rutas y planes por Casanare", text: "Itinerarios listos para explorar Yopal según tu tiempo y presupuesto." },
  { icon: LeafIcon, title: "Gastronomía llanera", text: "Los sabores típicos que no te puedes perder y dónde probarlos." },
  { icon: CalendarIcon, title: "Agenda de eventos", text: "Recomendaciones sobre las mejores fechas y ferias para visitar la región." },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-forest-950 px-6 py-6 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          ← Volver al inicio
        </Link>

        <div className="relative mt-6 overflow-hidden rounded-3xl border border-forest-700 bg-forest-900 p-8 text-center shadow-xl sm:p-10">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/10 blur-3xl" />
          <span className="relative inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-400">
            <PencilIcon className="h-3.5 w-3.5" /> Muy pronto
          </span>
          <h1 className="relative mt-4 font-[family-name:var(--font-brand)] text-3xl font-bold text-white sm:text-5xl">Blog de TripYopal</h1>
          <p className="relative mx-auto mt-3 max-w-xl text-sm text-slate-400 sm:text-base">
            Estamos preparando artículos sobre qué hacer en Yopal, gastronomía llanera, rutas y eventos. Mientras tanto, sigue
            explorando la plataforma o síguenos en redes para enterarte primero.
          </p>
        </div>

        <section className="mt-6 rounded-3xl border border-forest-700 bg-forest-900 p-6 sm:p-8">
          <h2 className="font-[family-name:var(--font-brand)] text-lg font-bold text-white">Lo que se viene</h2>
          <div className="mt-5 space-y-3">
            {upcoming.map((item) => (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-forest-700 bg-forest-950 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-500/40 bg-brand-500/10 text-brand-400">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 border-t border-forest-700 pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-sm text-slate-400">Mientras publicamos el primer artículo, explora rutas y eventos ya disponibles.</p>
            <div className="flex shrink-0 gap-2">
              <Link
                href="/rutas"
                className="rounded-full border border-forest-700 bg-forest-950 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-brand-400 hover:text-brand-400"
              >
                Ver rutas
              </Link>
              <a
                href={siteContent.social.instagram || "#"}
                target={siteContent.social.instagram ? "_blank" : undefined}
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-forest-700 bg-forest-950 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-brand-400 hover:text-brand-400"
              >
                <InstagramIcon className="h-4 w-4" /> Síguenos
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
