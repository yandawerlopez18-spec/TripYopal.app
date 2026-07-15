import SimpleMap from "./components/map/SimpleMap";
import WeatherCard from "./components/weather/WeatherCard";
import { featuredEvents, featuredPlaces, featuredRoutes } from "./services/content";

const features = [
  {
    title: "Chatbot 24/7",
    description: "Asistente virtual para responder sobre lugares, rutas, clima y eventos de Yopal.",
  },
  {
    title: "Mapas interactivos",
    description: "Explora sitios turísticos y servicios con ubicación precisa y fácil navegación.",
  },
  {
    title: "Recomendaciones inteligentes",
    description: "Sugerencias personalizadas según presupuesto, intereses y tipo de viaje.",
  },
  {
    title: "Seguridad y salud",
    description: "Recomendaciones útiles, números de emergencia y centros de salud por ruta o lugar.",
  },
];

const highlights = [
  "Eventos en tiempo real",
  "Rutas de viaje guiadas",
  "Clima actual de Yopal",
  "Calificaciones y reseñas",
];

const recommendations = [
  {
    title: "Presupuesto bajo",
    description: "Parques, miradores, plazas y recorridos sencillos para disfrutar sin gastar demasiado.",
  },
  {
    title: "Presupuesto medio",
    description: "Experiencias mixtas con gastronomía, cultura, transporte y visitas guiadas.",
  },
  {
    title: "Presupuesto alto",
    description: "Opciones premium con alojamiento, actividades exclusivas y recorridos más completos.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fef3c7,_#fff7ed_45%,_#f8fafc_100%)] text-slate-900">
      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
              Descubre Yopal con tecnología y turismo inteligente
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Una plataforma web para mostrar lo mejor de Yopal, Casanare.
            </h1>
            <p className="max-w-2xl text-lg text-slate-700">
              Construimos una experiencia digital moderna para turistas, visitantes y prestadores de servicios, con chatbot, mapas, eventos, rutas y recomendaciones personalizadas.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#funciones"
                className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Ver funciones
              </a>
              <a
                href="#ruta"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Ver roadmap
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur">
            <div className="rounded-2xl bg-slate-900 p-6 text-white">
              <p className="text-sm text-emerald-300">Estado del proyecto</p>
              <h2 className="mt-2 text-2xl font-semibold">MVP orientado a turismo inteligente</h2>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-emerald-300">Clima en Yopal</p>
                <p className="mt-2 text-3xl font-semibold">28°C</p>
                <p className="mt-1 text-sm text-slate-300">Cielo parcialmente nublado · Ideal para recorrer</p>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-slate-300">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-emerald-400">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="funciones" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">Funciones clave</p>
          <h2 className="mt-2 text-3xl font-bold">Todo lo que tu proyecto necesita para destacar</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">Recomendaciones por presupuesto</p>
          <h2 className="mt-2 text-3xl font-bold">Ayuda a los visitantes a planear su experiencia</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {recommendations.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">Contenido destacado</p>
          <h2 className="mt-2 text-3xl font-bold">Lugares, eventos y rutas que ya están preparados para mostrar</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Lugares destacados</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {featuredPlaces.map((place) => (
                <li key={place.id} className="rounded-xl bg-slate-50 p-3">
                  <p className="font-semibold text-slate-900">{place.name}</p>
                  <p>{place.category} · {place.price}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Eventos</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {featuredEvents.map((event) => (
                <li key={event.id} className="rounded-xl bg-slate-50 p-3">
                  <p className="font-semibold text-slate-900">{event.title}</p>
                  <p>{event.date} · {event.place}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Rutas recomendadas</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {featuredRoutes.map((route) => (
                <li key={route.id} className="rounded-xl bg-slate-50 p-3">
                  <p className="font-semibold text-slate-900">{route.name}</p>
                  <p>{route.duration} · {route.budget}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <SimpleMap />
          <WeatherCard />
        </div>
      </section>

      <section id="ruta" className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Ruta de desarrollo</p>
          <h2 className="mt-2 text-3xl font-bold">Paso a paso para llegar a un producto sólido</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Autenticación y roles",
              "Lugares, eventos y mapas",
              "Chatbot, clima y rutas",
              "Dashboard y despliegue",
            ].map((step, index) => (
              <li key={step} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-emerald-300">0{index + 1}</p>
                <p className="mt-2 font-semibold">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">Listo para explorar</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Convierte la visita a Yopal en una experiencia guiada, segura y memorable</h2>
            </div>
            <a href="/lugares" className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700">
              Explorar ahora
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
