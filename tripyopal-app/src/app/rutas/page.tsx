import RouteGuide from "../components/travel/RouteGuide";

export default function RutasPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Rutas recomendadas</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Organiza tu viaje con rutas sugeridas según tiempo, presupuesto e intereses.
      </p>
      <div className="mt-10">
        <RouteGuide />
      </div>
    </main>
  );
}
