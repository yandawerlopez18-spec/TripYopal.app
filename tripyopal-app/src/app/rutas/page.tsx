import Link from "next/link";
import RouteGuide from "../components/travel/RouteGuide";
import { LeafIcon } from "../components/home/infoIcons";

export default function RutasPage() {
  return (
    <main className="min-h-screen bg-forest-950 px-6 py-6 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          ← Volver al inicio
        </Link>

        <div className="mt-6 rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 text-brand-400">
              <span className="h-px w-10 bg-brand-500/40" />
              <LeafIcon className="h-4 w-4" />
              <p className="text-xs font-bold uppercase tracking-[0.3em]">Explora Yopal-Casanare</p>
              <span className="h-px w-10 bg-brand-500/40" />
            </div>
            <h1 className="mt-3 font-[family-name:var(--font-brand)] text-4xl font-bold sm:text-5xl">
              <span className="text-white">Rutas</span> <span className="text-brand-400">recomendadas</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              Organiza tu viaje con rutas sugeridas según tiempo, presupuesto e intereses.
            </p>
          </div>
          <div className="mt-10">
            <RouteGuide />
          </div>
        </div>
      </div>
    </main>
  );
}
