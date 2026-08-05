import Link from "next/link";
import { ChevronDownIcon, HelpCircleIcon } from "../components/home/infoIcons";
import { siteContent } from "../services/siteContent";

const faqs = [
  {
    question: "¿TripYopal tiene algún costo?",
    answer: "No. Usar la plataforma es completamente gratuito, tanto para explorar como para registrar tu negocio, por ahora sin ningún tipo de comisión.",
  },
  {
    question: "¿Necesito una cuenta para explorar el sitio?",
    answer: "No es obligatorio: puedes navegar por categorías, lugares, eventos, rutas, clima y seguridad sin registrarte. Solo necesitas una cuenta para guardar favoritos y dejar reseñas.",
  },
  {
    question: "¿Cómo registro mi negocio en TripYopal?",
    answer: "Ve a \"Registra tu negocio\" en el bloque de categorías del inicio, crea tu cuenta y escríbenos por WhatsApp o correo con los datos de tu negocio para activar tu ficha.",
  },
  {
    question: "¿La información de seguridad y salud es confiable?",
    answer: "Sí. Los números de emergencia, CAI, hospitales y demás datos críticos se cargan manualmente por nuestro equipo, nunca son generados por inteligencia artificial.",
  },
  {
    question: "¿Cómo guardo un lugar en mis favoritos?",
    answer: "Toca el ícono de corazón en cualquier tarjeta de categoría. Necesitas tener tu cuenta iniciada para que se guarde en tu perfil.",
  },
  {
    question: "¿Cómo genero una ruta de viaje?",
    answer: "Entra a \"Rutas\" desde el inicio o el menú, y elige una ruta sugerida según duración y presupuesto (Bajo, Medio o Alto).",
  },
  {
    question: "¿El chatbot ya está disponible?",
    answer: "El asistente virtual está en preparación. Por ahora puedes visitar la página de Chatbot para conocer cómo funcionará y qué tipo de preguntas podrá responder.",
  },
  {
    question: "¿Cómo dejo una reseña de un negocio?",
    answer: "Entra a la ficha del negocio, busca la sección \"Opiniones de nuestros visitantes\" y comparte tu calificación y comentario después de tu visita.",
  },
];

export default function PreguntasFrecuentesPage() {
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
          <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand-500/10 blur-3xl" />
          <span className="relative inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-400">
            <HelpCircleIcon className="h-3.5 w-3.5" /> Ayuda
          </span>
          <h1 className="relative mt-4 font-[family-name:var(--font-brand)] text-3xl font-bold text-white sm:text-5xl">Preguntas frecuentes</h1>
          <p className="relative mx-auto mt-3 max-w-xl text-sm text-slate-400 sm:text-base">
            Resolvemos las dudas más comunes sobre TripYopal. Si no encuentras lo que buscas, escríbenos.
          </p>
        </div>

        <section className="mt-6 space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-forest-700 bg-forest-900 p-5 open:border-brand-500/40">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-100 marker:content-none">
                {faq.question}
                <ChevronDownIcon className="h-4 w-4 shrink-0 text-brand-400 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-400">{faq.answer}</p>
            </details>
          ))}
        </section>

        <section className="mt-6 flex flex-col items-center gap-3 rounded-3xl border border-forest-700 bg-forest-900 p-6 text-center sm:p-8">
          <p className="text-sm text-slate-400">¿Sigues con dudas? Escríbenos y te ayudamos directamente.</p>
          <p className="text-sm font-semibold text-brand-400">
            {siteContent.contact.phone} · {siteContent.contact.email}
          </p>
          <Link
            href="/manual-de-uso"
            className="btn-brand-font btn-gradient mt-1 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-forest-950 transition"
          >
            Ver manual de uso
          </Link>
        </section>
      </div>
    </main>
  );
}
