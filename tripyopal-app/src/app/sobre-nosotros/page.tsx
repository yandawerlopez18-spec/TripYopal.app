import Image from "next/image";
import Link from "next/link";
import {
  CalendarIcon,
  CompassIcon,
  DropletIcon,
  HeadsetIcon,
  HeartIcon,
  LeafIcon,
  MapIcon,
  ShieldIcon,
  StarIcon,
} from "../components/home/infoIcons";
import { siteContent } from "../services/siteContent";

const features = [
  { icon: CompassIcon, title: "Lugares y servicios", text: "Hoteles, restaurantes, bares, sitios turísticos y mucho más, organizados por categoría." },
  { icon: MapIcon, title: "Mapa interactivo", text: "Ubica cada negocio y traza tu recorrido conectado con Google Maps." },
  { icon: DropletIcon, title: "Clima en vivo", text: "Consulta la temperatura y el pronóstico antes de salir a explorar." },
  { icon: CalendarIcon, title: "Eventos en tiempo real", text: "Entérate de lo que está pasando en Yopal, publicado por organizadores reales." },
  { icon: LeafIcon, title: "Rutas y recomendaciones", text: "Planes sugeridos según tu tiempo, presupuesto e intereses." },
  { icon: HeadsetIcon, title: "Chatbot de apoyo", text: "Un asistente en preparación para resolver tus dudas sobre la plataforma." },
];

const commitments = [
  { icon: HeartIcon, title: "100% gratuita", text: "Validamos la plataforma sin cobrar comisión por usarla ni por publicar tu negocio." },
  { icon: ShieldIcon, title: "Datos críticos verificados", text: "La información de seguridad, salud y emergencias se carga manualmente por nuestro equipo, nunca generada por IA." },
  { icon: StarIcon, title: "Abierta desde el inicio", text: "Construimos de forma incremental, pero cada módulo queda listo y disponible para todos." },
];

export default function SobreNosotrosPage() {
  return (
    <main className="min-h-screen bg-forest-950 px-6 py-6 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          ← Volver al inicio
        </Link>

        <div className="relative mt-6 overflow-hidden rounded-3xl border border-forest-700 bg-forest-900 p-8 text-center shadow-xl sm:p-10">
          <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand-500/10 blur-3xl" />
          <span className="relative inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-400">
            <LeafIcon className="h-3.5 w-3.5" /> Sobre nosotros
          </span>
          <h1 className="relative mt-4 font-[family-name:var(--font-brand)] text-3xl font-bold text-white sm:text-5xl">
            Impulsamos el turismo de Yopal y Casanare
          </h1>
          <p className="relative mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
            TripYopal es la plataforma turística digital de Yopal, Casanare: descubrimiento de lugares, servicios, eventos y rutas,
            con recomendaciones personalizadas y un chatbot de apoyo, todo pensado para vivir lo mejor de los Llanos Orientales.
          </p>
        </div>

        <section className="mt-6 rounded-3xl border border-forest-700 bg-forest-900 p-6 sm:p-8">
          <h2 className="font-[family-name:var(--font-brand)] text-xl font-bold text-white sm:text-2xl">Nuestra misión</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Queremos que cualquier persona que llegue a Yopal —o que ya viva aquí— encuentre en un solo lugar todo lo que necesita para
            disfrutar la región: dónde ir, qué comer, qué eventos hay, cómo llegar y con qué clima. Al mismo tiempo, ayudamos a los
            prestadores de servicios locales a darse a conocer y crecer con su negocio, sin barreras de entrada.
          </p>
        </section>

        <section className="mt-6 rounded-3xl border border-forest-700 bg-forest-900 p-6 sm:p-8">
          <h2 className="font-[family-name:var(--font-brand)] text-xl font-bold text-white sm:text-2xl">Qué encuentras en TripYopal</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-forest-700 bg-forest-950 p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-500/40 bg-brand-500/10 text-brand-400">
                  <feature.icon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-sm font-semibold text-slate-100">{feature.title}</p>
                <p className="mt-1 text-sm text-slate-400">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-forest-700 bg-forest-900 p-6 sm:p-8">
          <h2 className="font-[family-name:var(--font-brand)] text-xl font-bold text-white sm:text-2xl">Nuestro compromiso</h2>
          <div className="mt-5 space-y-3">
            {commitments.map((item) => (
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
        </section>

        <section className="mt-6 flex flex-col items-center gap-4 rounded-3xl border border-forest-700 bg-forest-900 p-6 text-center sm:p-8">
          <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-brand-400/60 shadow-[0_0_25px_-5px_rgba(74,222,128,0.6)]">
            <Image src={siteContent.images.mascot} alt="Capibara de TripYopal" fill sizes="80px" className="object-cover" />
          </span>
          <div>
            <p className="font-semibold text-white">
              Hecho en los <span className="text-brand-400">Llanos Orientales</span> 💚
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Desarrollado con cariño por{" "}
              <span className="font-semibold text-brand-400">Cristian López</span> y{" "}
              <span className="font-semibold text-brand-400">Duvan Segovia</span>.
            </p>
          </div>
          <Link
            href="/"
            className="btn-brand-font btn-gradient mt-2 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-forest-950 transition"
          >
            Explorar TripYopal
          </Link>
        </section>
      </div>
    </main>
  );
}
