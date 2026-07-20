import Link from "next/link";
import RouteGuide from "../components/travel/RouteGuide";

export default function RutasPage() {
  return (
    <main className="min-h-screen bg-forest-950 px-6 py-6 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="btn-brand-font inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-forest-950 transition hover:bg-brand-400"
        >
          ← Volver al inicio
        </Link>

        <div className="mt-6 rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-xl">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-brand)] text-4xl font-bold text-white sm:text-5xl">Rutas recomendadas</h1>
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
