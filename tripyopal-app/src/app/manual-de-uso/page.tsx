import Link from "next/link";
import {
  ArrowUpRightIcon,
  BuildingIcon,
  CalendarIcon,
  ClockIcon,
  CompassIcon,
  DocumentIcon,
  DropletIcon,
  EventPinIcon,
  ForkIcon,
  GridIcon,
  HeadsetIcon,
  HeartIcon,
  HelpCircleIcon,
  LeafIcon,
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
        text: "Usar TripYopal no tiene ningún costo ni comisión, ni para explorar ni para registrar tu negocio.",
      },
      {
        title: "Para turistas y locales",
        text: "Sin importar si vienes de visita o vives en Casanare, encontrarás recomendaciones, clima, seguridad y eventos actualizados.",
      },
      {
        title: "Siempre a la mano",
        text: "El menú superior (barra de navegación) te acompaña en cada página: búsqueda, categorías, tu cuenta y el botón de Ayuda que te trajo aquí.",
      },
    ],
  },
  {
    id: "cuenta",
    navLabel: "Tu cuenta",
    title: "Crea tu cuenta",
    icon: UsersIcon,
    intro: "Registrarte es gratuito y te permite guardar tus preferencias, tus favoritos y volver a iniciar sesión desde cualquier dispositivo.",
    steps: [
      { title: "Toca \"Registro\"", text: "Está en la esquina superior derecha de cualquier página del sitio." },
      { title: "Completa tus datos", text: "Nombre, apellido, usuario, correo, contraseña, fecha de nacimiento, ciudad y teléfono. Los campos marcados son obligatorios." },
      {
        title: "Acepta los términos",
        text: "Confirma que aceptas los términos y condiciones y la política de datos antes de continuar (puedes leerlos completos desde el pie de página).",
      },
      {
        title: "Inicia sesión cuando quieras",
        text: "Usa el ícono de perfil junto al botón de Registro para entrar con tu correo y contraseña las próximas veces.",
      },
      {
        title: "Cierra sesión con seguridad",
        text: "Toca tu ícono de perfil (ya iniciada la sesión) y elige \"Cerrar sesión\" en el menú desplegable.",
      },
    ],
  },
  {
    id: "categorias",
    navLabel: "Categorías",
    title: "Explora por categorías",
    icon: GridIcon,
    intro: "Todos los negocios registrados en TripYopal están organizados en 11 categorías, cada una con su propia ficha detallada.",
    steps: [
      {
        title: "Abre el menú de categorías",
        text: "Toca el selector \"Descubre / Yopal - Casanare\" arriba a la izquierda, o baja hasta el bloque \"Categorías\" en el inicio.",
      },
      {
        title: "Elige tu categoría",
        text: "Hoteles, Restaurantes, Bares, Sitios turísticos, Parques, Centros comerciales, Comidas rápidas, Parrillas y asaderos, Discotecas, Transporte o Domicilios.",
      },
      {
        title: "Filtra los resultados",
        text: "Ajusta por presupuesto, ubicación o calificación dentro del listado de la categoría para encontrar justo lo que buscas.",
      },
      {
        title: "Guarda mientras exploras",
        text: "Toca el ícono de corazón en cualquier tarjeta para guardar ese negocio en tus favoritos sin salir del listado.",
      },
      {
        title: "Abre la ficha completa",
        text: "Toca cualquier tarjeta para ver fotos, precios, horarios, servicios, eventos, reseñas y contacto directo del negocio.",
      },
    ],
  },
  {
    id: "ficha-negocio",
    navLabel: "Ficha de un negocio",
    title: "Cómo leer la ficha de un negocio",
    icon: DocumentIcon,
    intro: "Aunque cada categoría se ve un poco distinta, todas las fichas comparten la misma estructura básica para que siempre sepas dónde mirar.",
    steps: [
      {
        title: "Galería de fotos",
        text: "En la parte superior, toca cualquier foto o \"Ver todas las fotos\" para abrirlas en grande.",
      },
      {
        title: "Calificación y descripción",
        text: "Justo debajo del nombre verás la calificación con estrellas y el número de opiniones, seguido de la descripción del negocio (toca \"Leer más\" si está recortada).",
      },
      {
        title: "Botones de acción",
        text: "\"¿Cómo llegar?\" abre la ruta en Google Maps, \"Compartir\" copia o comparte el enlace, y el ícono de corazón lo guarda en tus favoritos.",
      },
      {
        title: "Servicios y políticas",
        text: "Los íconos de servicios (wifi, parqueadero, accesibilidad, etc.) y las políticas del lugar (cancelación, mascotas, edad mínima, entre otras) aparecen en su propia sección cuando el negocio las tiene cargadas.",
      },
      {
        title: "Opiniones de visitantes",
        text: "Al final de la ficha puedes leer las reseñas de otros usuarios y tocar \"Escribir reseña\" para dejar la tuya con calificación por aspectos.",
      },
      {
        title: "Ubicación y TripYopal IA",
        text: "En la columna lateral encontrarás el mini mapa del lugar, sus horarios, y la tarjeta de \"TripYopal IA\" para pedir recomendaciones relacionadas con ese negocio.",
      },
    ],
  },
  {
    id: "menus",
    navLabel: "Menús y catálogos",
    title: "Menús, cartas y catálogos",
    icon: ForkIcon,
    intro: "Cada categoría tiene su propio catálogo de productos o servicios, con su nombre adaptado al tipo de negocio.",
    steps: [
      {
        title: "Menú",
        text: "En Restaurantes, Comidas rápidas y Parrillas y asaderos verás el \"Menú\" con platos, fotos y precios.",
      },
      {
        title: "Carta",
        text: "En Bares y Discotecas el catálogo se llama \"Carta\", con bebidas y productos disponibles.",
      },
      {
        title: "Habitaciones y tarifas",
        text: "En Hoteles encontrarás los tipos de habitación con su tarifa por noche.",
      },
      {
        title: "Actividades, locales y servicios",
        text: "Sitios turísticos y Parques muestran \"Actividades y tarifas\"; Centros comerciales muestra \"Locales y servicios\"; Transporte y Domicilios muestran \"Servicios y tarifas\".",
      },
      {
        title: "Navega con los números de página",
        text: "Cuando hay muchos productos, usa los botones numerados (1, 2, 3…) debajo de la cuadrícula para ver el resto sin recargar la página.",
      },
    ],
  },
  {
    id: "eventos-negocio",
    navLabel: "Eventos de un negocio",
    title: "Próximos eventos de cada negocio",
    icon: CalendarIcon,
    intro: "Bares, discotecas, parrillas, comidas rápidas, parques, centros comerciales y otros negocios pueden publicar sus propios eventos y promociones.",
    steps: [
      {
        title: "Los 2 más próximos, en grande",
        text: "En \"Próximos eventos\" (o \"Eventos y promociones\"), los 2 eventos más cercanos por fecha se muestran uno al lado del otro con su flyer completo.",
      },
      {
        title: "El resto, a la derecha",
        text: "Los demás eventos próximos aparecen en una lista compacta al lado derecho.",
      },
      {
        title: "Toca para destacarlo",
        text: "Haz clic en cualquier evento de la lista de la derecha y pasa a mostrarse en grande junto al otro destacado, como un carrusel.",
      },
      {
        title: "Se archivan solos en la Galería",
        text: "Cuando la fecha de un evento ya pasó, deja de aparecer en \"Próximos eventos\" y se guarda automáticamente en la sección \"Galería\" del negocio, con su flyer y fecha.",
      },
    ],
  },
  {
    id: "reservas",
    navLabel: "Reservas y promociones",
    title: "Reservas y promociones",
    icon: ClockIcon,
    intro: "Algunos negocios (como bares y parrillas) permiten dejar los datos de tu reserva directamente desde su ficha.",
    steps: [
      {
        title: "Completa fecha, hora y personas",
        text: "En la tarjeta de reserva de la ficha del negocio, elige la fecha, la hora y el número de personas.",
      },
      {
        title: "Confirma tu reserva",
        text: "Toca \"Reservar ahora\" para enviar tu solicitud al negocio.",
      },
      {
        title: "Revisa las promociones",
        text: "Si el negocio tiene descuentos u ofertas activas, aparecerán en la sección \"Promociones\" de su ficha.",
      },
    ],
  },
  {
    id: "transporte-vuelos",
    navLabel: "Vuelos y transporte",
    title: "Vuelos y transporte",
    icon: ArrowUpRightIcon,
    intro: "La categoría Transporte incluye información especial para terminales, aeropuertos y puntos de conexión.",
    steps: [
      {
        title: "Vuelos principales",
        text: "Muestra las aerolíneas que operan la ruta, con su logo (cuando está cargado), origen, destino, frecuencia y si es vuelo directo.",
      },
      {
        title: "Transporte desde/hacia el lugar",
        text: "Justo debajo, revisa las opciones para llegar o salir de ese punto (taxi, bus urbano, transporte privado) con su duración estimada.",
      },
      {
        title: "Noticias y actualizaciones",
        text: "Cambios de horario, rutas nuevas o avisos importantes, organizados en una cuadrícula con páginas numeradas.",
      },
      {
        title: "Políticas y consejos de viaje",
        text: "Revisa las políticas del lugar y, en la columna lateral, los consejos para tu viaje antes de salir.",
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
        text: "Cada ficha de negocio muestra su mini mapa y el botón \"Cómo llegar\" con la dirección exacta.",
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
    navLabel: "Eventos en vivo",
    title: "Descubre eventos en tiempo real",
    icon: EventPinIcon,
    intro: "Además de los eventos de cada negocio, TripYopal tiene una sección general con todos los eventos de la ciudad, publicados por administradores y organizadores.",
    steps: [
      { title: "Abre \"Eventos en tiempo real\"", text: "Desde el inicio o entrando a la página de Eventos." },
      { title: "Filtra a tu gusto", text: "Usa los filtros \"Hoy\", \"Próximos\" o \"Fin de semana\"." },
      { title: "Revisa el calendario", text: "Consulta todos los eventos programados del mes, día por día." },
      { title: "Ve el detalle", text: "Toca \"Ver detalles\" para conocer fecha, hora, lugar, modalidad, agenda y cómo llegar." },
    ],
  },
  {
    id: "rutas",
    navLabel: "Rutas",
    title: "Genera tu ruta de viaje",
    icon: LeafIcon,
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
        text: "En cualquier tarjeta de categoría o en la ficha del negocio, toca el ícono de corazón para guardarlo en tus favoritos.",
      },
      { title: "Revisa las opiniones", text: "En la ficha de cada negocio puedes ver su calificación y las reseñas de otros visitantes." },
      { title: "Deja tu reseña", text: "Toca \"Escribir reseña\", califica por aspectos (limpieza, atención, ambiente, entre otros) y comparte tu experiencia." },
    ],
  },
  {
    id: "seguridad",
    navLabel: "Seguridad",
    title: "Seguridad, salud y emergencias",
    icon: ShieldIcon,
    intro: "Esta información es cargada manualmente por el equipo de TripYopal (no generada por IA) para que siempre sea confiable.",
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
      { title: "Abre el chat", text: "Entra a la página de Chatbot desde el sitio, o toca \"Hablar con IA\" en la ficha de cualquier negocio." },
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
      {
        title: "Administra tu información",
        text: "Una vez activada tu ficha, podrás editar fotos, menú, eventos, políticas, horarios y responder reseñas desde el modo de edición de tu negocio.",
      },
    ],
  },
  {
    id: "soporte",
    navLabel: "Más recursos",
    title: "Centro de ayuda y más recursos",
    icon: HelpCircleIcon,
    intro: "Además de este manual, el pie de página de TripYopal reúne otros recursos útiles.",
    steps: [
      { title: "Centro de ayuda", text: "Un menú central que reúne el manual, las preguntas frecuentes, seguridad y contacto directo." },
      { title: "Preguntas frecuentes", text: "Respuestas rápidas a las dudas más comunes sobre la plataforma." },
      { title: "Sobre nosotros y Blog", text: "Conoce la misión de TripYopal y, próximamente, artículos sobre rutas, gastronomía y eventos." },
      { title: "Términos y Política de privacidad", text: "El detalle legal de cómo funciona la plataforma y cómo protegemos tus datos." },
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
              <CompassIcon className="h-3.5 w-3.5" /> Guía completa, paso a paso
            </span>
            <h1 className="mt-4 font-[family-name:var(--font-brand)] text-3xl font-bold text-white sm:text-5xl">Manual de uso</h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
              Todo lo que necesitas saber para aprovechar TripYopal al máximo: cómo leer la ficha de un negocio, explorar menús y
              eventos, planear tu ruta, revisar el clima, guardar favoritos y mantenerte seguro en Yopal-Casanare.
            </p>
            <div className="mx-auto mt-6 flex max-w-md flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <StarIcon className="h-4 w-4 text-brand-400" /> {sections.length} secciones
              </span>
              <span className="h-4 w-px bg-forest-700" />
              <span className="flex items-center gap-1.5">
                <GridIcon className="h-4 w-4 text-brand-400" /> Las 11 categorías
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
            <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto rounded-3xl border border-forest-700 bg-forest-900 p-5">
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
                <a
                  href="#ayuda"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-forest-800 hover:text-brand-400"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
                    <MailIcon className="h-3 w-3" />
                  </span>
                  Contacto
                </a>
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
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-400">Sección {index + 1}</p>
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
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/preguntas-frecuentes"
                  className="rounded-full border border-forest-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-forest-800"
                >
                  Ver preguntas frecuentes
                </Link>
                <Link
                  href="/"
                  className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-forest-950 transition"
                >
                  Volver al inicio
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
