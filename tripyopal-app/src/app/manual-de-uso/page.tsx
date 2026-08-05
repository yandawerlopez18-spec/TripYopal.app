import Link from "next/link";
import {
  BuildingIcon,
  CalendarIcon,
  CompassIcon,
  DropletIcon,
  GridIcon,
  HeadsetIcon,
  HeartIcon,
  MailIcon,
  MapIcon,
  SearchIcon,
  ShieldIcon,
  StarIcon,
  UsersIcon,
} from "../components/home/infoIcons";
import { siteContent } from "../services/siteContent";

type IconProps = { className?: string };
type Step = { title: string; text: string };
type ManualSection = {
  id: string;
  navLabel: string;
  title: string;
  icon: (props: IconProps) => React.JSX.Element;
  intro: string;
  steps: Step[];
};

const sections: ManualSection[] = [
  {
    id: "bienvenida",
    navLabel: "Bienvenida",
    title: "Bienvenida a TripYopal",
    icon: CompassIcon,
    intro:
      "TripYopal es la plataforma turística de Yopal, Casanare, para descubrir lugares, servicios, eventos y rutas en un solo lugar, de forma gratuita.",
    steps: [
      {
        title: "Todo Yopal en un solo lugar",
        text: "Hoteles, restaurantes, bares, sitios turísticos, parques, centros comerciales, comidas rápidas, parrillas, discotecas, transporte y domicilios, organizados por categoría.",
      },
      {
        title: "100% gratuita",
        text: "Usar TripYopal no tiene ningún costo ni comisión. Puedes explorar todo el contenido sin necesidad de pagar nada.",
      },
      {
        title: "Para turistas y locales",
        text: "Sin importar si vienes de visita o vives en Casanare, encontrarás recomendaciones, clima, seguridad y eventos actualizados.",
      },
    ],
  },
  {
    id: "cuenta",
    navLabel: "Tu cuenta",
    title: "Crea tu cuenta",
    icon: UsersIcon,
    intro: "Registrarte es gratuito y te permite guardar tus preferencias, favoritos y volver a iniciar sesión desde cualquier dispositivo.",
    steps: [
      { title: "Toca \"Registro\"", text: "Está en la esquina superior derecha de cualquier página del sitio." },
      { title: "Completa tus datos", text: "Nombre, correo, contraseña, ubicación y teléfono. Todos los campos marcados son obligatorios." },
      {
        title: "Acepta los términos",
        text: "Confirma que aceptas los términos y condiciones y la política de datos antes de continuar.",
      },
      {
        title: "Inicia sesión cuando quieras",
        text: "Usa el ícono de perfil junto al botón de Registro para entrar con tu correo y contraseña las próximas veces.",
      },
    ],
  },
  {
    id: "categorias",
    navLabel: "Categorías",
    title: "Explora por categorías",
    icon: GridIcon,
    intro:
      "Todos los negocios registrados en TripYopal están organizados por categoría, con fichas detalladas de cada uno.",
    steps: [
      {
        title: "Abre el menú de categorías",
        text: "Toca el selector \"Descubre / Yopal - Casanare\" arriba a la izquierda, o baja hasta el bloque \"Categorías\" en el inicio.",
      },
      {
        title: "Elige una categoría",
        text: "Hoteles, Restaurantes, Bares, Sitios turísticos, Parques, Centros comerciales, Comidas rápidas, Parrillas y asaderos, Discotecas, Transporte o Domicilios.",
      },
      {
        title: "Filtra los resultados",
        text: "Ajusta por presupuesto, ubicación o calificación para encontrar justo lo que buscas.",
      },
      {
        title: "Abre la ficha completa",
        text: "Toca cualquier tarjeta para ver fotos, precios, horarios, servicios, ubicación, reseñas y contacto directo del negocio.",
      },
    ],
  },
  {
    id: "buscar",
    navLabel: "Buscar",
    title: "Busca lugares, eventos y rutas",
    icon: SearchIcon,
    intro: "La barra de búsqueda está disponible en la parte superior de todas las páginas.",
    steps: [
      { title: "Escribe tu búsqueda", text: "Ingresa el nombre de un lugar, evento, ruta o categoría." },
      { title: "Presiona Enter", text: "También puedes tocar el ícono de lupa para lanzar la búsqueda." },
      { title: "Revisa los resultados", text: "Toca cualquier resultado para ver el detalle completo." },
    ],
  },
  {
    id: "mapa",
    navLabel: "Mapa",
    title: "Usa el mapa interactivo",
    icon: MapIcon,
    intro: "TripYopal está conectado con Google Maps para ayudarte a llegar a cada lugar.",
    steps: [
      { title: "Encuentra la tarjeta \"Mapa interactivo\"", text: "Está disponible en la página de inicio." },
      { title: "Toca \"Abrir en Maps\"", text: "Se abre la ubicación en Google Maps para trazar tu ruta." },
      {
        title: "Revisa la dirección exacta",
        text: "Cada ficha de negocio muestra su dirección y, cuando está disponible, su ubicación en el mapa.",
      },
    ],
  },
  {
    id: "clima",
    navLabel: "Clima",
    title: "Consulta el clima",
    icon: DropletIcon,
    intro: "Conoce el clima actual de Yopal antes de salir y planifica mejor tu visita.",
    steps: [
      { title: "Ve a la sección de clima", text: "Desde el inicio o entrando directo a la página \"Clima\"." },
      {
        title: "Revisa el pronóstico",
        text: "Temperatura actual, humedad, viento y pronóstico por horas para el resto del día.",
      },
      {
        title: "Sigue las recomendaciones",
        text: "Qué llevar, qué hacer, qué evitar, cuidado ambiental y salud, ajustadas al clima del momento.",
      },
    ],
  },
  {
    id: "eventos",
    navLabel: "Eventos",
    title: "Descubre eventos en tiempo real",
    icon: CalendarIcon,
    intro: "Los eventos son publicados por administradores y organizadores, y se actualizan en tiempo real.",
    steps: [
      { title: "Abre \"Eventos en tiempo real\"", text: "Desde el inicio o entrando a la página de Eventos." },
      { title: "Filtra a tu gusto", text: "Usa los filtros \"Hoy\", \"Próximos\" o \"Fin de semana\"." },
      { title: "Revisa el calendario", text: "Consulta todos los eventos programados del mes, día por día." },
      { title: "Ve el detalle", text: "Toca \"Ver detalles\" para conocer fecha, hora, lugar y modalidad de cada evento." },
    ],
  },
  {
    id: "rutas",
    navLabel: "Rutas",
    title: "Genera tu ruta de viaje",
    icon: MapIcon,
    intro: "Organiza tu visita con rutas sugeridas según el tiempo, el presupuesto y el tipo de experiencia que buscas.",
    steps: [
      { title: "Entra a \"Rutas recomendadas\"", text: "Desde el inicio o la página de Rutas." },
      {
        title: "Elige según duración y presupuesto",
        text: "Rutas de un día, culturales o de aventura, con presupuesto Bajo, Medio o Alto.",
      },
      { title: "Revisa qué incluye", text: "Lee la descripción y los lugares sugeridos antes de salir." },
    ],
  },
  {
    id: "recomendaciones",
    navLabel: "Recomendaciones",
    title: "Recibe recomendaciones personalizadas",
    icon: StarIcon,
    intro: "Cuéntale a TripYopal qué te gusta y te sugerimos planes a la medida.",
    steps: [
      { title: "Usa el bloque \"¿Qué quieres hacer?\"", text: "Disponible en la página de inicio." },
      {
        title: "Elige tus filtros",
        text: "Interés (Aventura, Naturaleza, Cultura, Recreación), ubicación, fecha y presupuesto.",
      },
      { title: "Toca \"Explorar lugares\"", text: "Verás los resultados que mejor coinciden con lo que elegiste." },
      { title: "O visita Recomendaciones", text: "Entra directo a la página de Recomendaciones para ver una selección curada." },
    ],
  },
  {
    id: "favoritos",
    navLabel: "Favoritos y reseñas",
    title: "Guarda tus favoritos y opina",
    icon: HeartIcon,
    intro: "Con tu cuenta iniciada puedes guardar lo que más te gusta y ayudar a otros visitantes con tu opinión.",
    steps: [
      {
        title: "Toca el corazón",
        text: "En cualquier tarjeta de categoría, toca el ícono de corazón para guardar el negocio en tus favoritos.",
      },
      { title: "Revisa las opiniones", text: "En la ficha de cada negocio puedes ver su calificación y las reseñas de otros visitantes." },
      { title: "Deja tu reseña", text: "Comparte tu experiencia después de visitar el lugar para ayudar a la comunidad." },
    ],
  },
  {
    id: "seguridad",
    navLabel: "Seguridad",
    title: "Seguridad, salud y emergencias",
    icon: ShieldIcon,
    intro:
      "Esta información es cargada manualmente por el equipo de TripYopal (no generada por IA) para que siempre sea confiable.",
    steps: [
      { title: "Entra a \"Seguridad\"", text: "Desde el inicio, en la sección \"Tu bienestar es lo primero\", o directo a la página de Seguridad." },
      { title: "Ubica el CAI más cercano", text: "Junto con las líneas de denuncia y estaciones de policía de la zona." },
      {
        title: "Revisa los números importantes",
        text: "Hospital, bomberos, defensa civil y Cruz Roja, en la sección \"Números importantes\".",
      },
      { title: "Llama directo desde la tarjeta", text: "Cada contacto muestra su número y dirección para actuar rápido si lo necesitas." },
    ],
  },
  {
    id: "chatbot",
    navLabel: "Chatbot",
    title: "Habla con el chatbot",
    icon: HeadsetIcon,
    intro: "El asistente virtual de TripYopal está en preparación para resolver tus dudas sobre la plataforma, 24/7.",
    steps: [
      { title: "Abre el chat", text: "Entra a la página de Chatbot desde el sitio." },
      {
        title: "Pregunta sobre la plataforma",
        text: "Lugares, rutas, clima y eventos de Yopal: el chatbot solo responde temas relacionados con TripYopal.",
      },
    ],
  },
  {
    id: "negocio",
    navLabel: "Tu negocio",
    title: "Registra tu negocio",
    icon: BuildingIcon,
    intro: "Súmate a la plataforma y haz crecer tu negocio en Yopal, sin ningún costo por ahora.",
    steps: [
      { title: "Toca \"Registra tu negocio\"", text: "En el bloque de categorías del inicio, o crea tu cuenta desde \"Registro\"." },
      { title: "Cuéntanos de tu negocio", text: "Escríbenos con el nombre, la categoría y los datos de contacto de tu negocio." },
      {
        title: "Te ayudamos a activarlo",
        text: `Contáctanos por WhatsApp al ${siteContent.contact.phone} o al correo ${siteContent.contact.email} y activamos tu ficha.`,
      },
    ],
  },
];

export default function ManualDeUsoPage() {
  return (
    <main className="min-h-screen bg-forest-950 px-6 py-6 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          ← Volver al inicio
        </Link>

        <div className="relative mt-6 overflow-hidden rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-xl sm:p-10">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="relative text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-400">
              <CompassIcon className="h-3.5 w-3.5" /> Guía paso a paso
            </span>
            <h1 className="mt-4 font-[family-name:var(--font-brand)] text-3xl font-bold text-white sm:text-5xl">Manual de uso</h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
              Todo lo que necesitas saber para aprovechar TripYopal al máximo: explorar categorías, planear tu ruta, revisar el clima,
              guardar favoritos y mantenerte seguro en Yopal-Casanare.
            </p>
            <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <StarIcon className="h-4 w-4 text-brand-400" /> {sections.length} secciones
              </span>
              <span className="h-4 w-px bg-forest-700" />
              <span className="flex items-center gap-1.5">
                <ShieldIcon className="h-4 w-4 text-brand-400" /> 100% gratuito
              </span>
            </div>
          </div>
        </div>

        {/* Índice para móvil */}
        <div className="-mx-6 mt-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:hidden">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-forest-700 bg-forest-900 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-brand-400 hover:text-brand-400"
            >
              <section.icon className="h-3.5 w-3.5" />
              {section.navLabel}
            </a>
          ))}
        </div>

        <div className="mt-6 flex gap-6">
          {/* Índice para escritorio */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-6 rounded-3xl border border-forest-700 bg-forest-900 p-5">
              <p className="px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Contenido</p>
              <nav className="mt-3 space-y-1">
                {sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-forest-800 hover:text-brand-400"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-800 text-[11px] font-bold text-brand-400">
                      {index + 1}
                    </span>
                    {section.navLabel}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Contenido */}
          <div className="min-w-0 flex-1 space-y-6">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-6 rounded-3xl border border-forest-700 bg-forest-900 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-brand-500 text-brand-400">
                    <section.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-400">Paso {index + 1}</p>
                    <h2 className="font-[family-name:var(--font-brand)] text-xl font-bold text-white sm:text-2xl">{section.title}</h2>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-400">{section.intro}</p>

                <ol className="mt-5 space-y-3">
                  {section.steps.map((step, stepIndex) => (
                    <li key={step.title} className="flex gap-4 rounded-2xl border border-forest-700 bg-forest-950 p-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-sm font-bold text-brand-400">
                        {stepIndex + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-100">{step.title}</p>
                        <p className="mt-1 text-sm text-slate-400">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ))}

            {/* Ayuda adicional */}
            <section id="ayuda" className="scroll-mt-6 rounded-3xl border border-forest-700 bg-forest-900 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-brand-500 text-brand-400">
                  <MailIcon className="h-6 w-6" />
                </span>
                <h2 className="font-[family-name:var(--font-brand)] text-xl font-bold text-white sm:text-2xl">¿Necesitas más ayuda?</h2>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Si algo no quedó claro o tienes una duda puntual, escríbenos directamente y te ayudamos.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-forest-700 bg-forest-950 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Teléfono / WhatsApp</p>
                  <p className="mt-1 text-sm font-semibold text-brand-400">{siteContent.contact.phone}</p>
                </div>
                <div className="rounded-2xl border border-forest-700 bg-forest-950 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
                  <p className="mt-1 text-sm font-semibold text-brand-400">{siteContent.contact.email}</p>
                </div>
                <div className="rounded-2xl border border-forest-700 bg-forest-950 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Instagram</p>
                  <p className="mt-1 text-sm font-semibold text-brand-400">@{siteContent.contact.instagram}</p>
                </div>
              </div>
              <Link
                href="/"
                className="btn-brand-font btn-gradient mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-forest-950 transition"
              >
                Volver al inicio
              </Link>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
