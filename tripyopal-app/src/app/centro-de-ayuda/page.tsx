import Link from "next/link";
import { BookIcon, HeadsetIcon, MailIcon, MessageCircleIcon, ShieldIcon } from "../components/home/infoIcons";
import { siteContent } from "../services/siteContent";

const helpLinks = [
  {
    icon: BookIcon,
    title: "Manual de uso",
    text: "Guía paso a paso para sacarle el máximo provecho a TripYopal.",
    href: "/manual-de-uso",
    cta: "Ver manual",
  },
  {
    icon: MessageCircleIcon,
    title: "Preguntas frecuentes",
    text: "Respuestas rápidas a las dudas más comunes de la plataforma.",
    href: "/preguntas-frecuentes",
    cta: "Ver preguntas",
  },
  {
    icon: ShieldIcon,
    title: "Seguridad y emergencias",
    text: "Números de policía, hospitales y líneas de emergencia en Yopal.",
    href: "/seguridad",
    cta: "Ver seguridad",
  },
  {
    icon: MailIcon,
    title: "Contacto directo",
    text: "Escríbenos si tu duda no está resuelta en las secciones anteriores.",
    href: "/#contacto",
    cta: "Ir a contacto",
  },
];

export default function CentroDeAyudaPage() {
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
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/10 blur-3xl" />
          <span className="relative inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-400">
            <HeadsetIcon className="h-3.5 w-3.5" /> Centro de ayuda
          </span>
          <h1 className="relative mt-4 font-[family-name:var(--font-brand)] text-3xl font-bold text-white sm:text-5xl">¿En qué te podemos ayudar?</h1>
          <p className="relative mx-auto mt-3 max-w-xl text-sm text-slate-400 sm:text-base">
            Elige una de las opciones para resolver tu duda lo más rápido posible.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {helpLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-3xl border border-forest-700 bg-forest-900 p-6 transition hover:border-brand-400"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-brand-500 text-brand-400">
                <item.icon className="h-6 w-6" />
              </span>
              <p className="mt-4 font-[family-name:var(--font-brand)] text-lg font-bold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-slate-400">{item.text}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 transition group-hover:gap-2.5">
                {item.cta} →
              </span>
            </Link>
          ))}
        </div>

        <section className="mt-6 flex flex-col items-center gap-2 rounded-3xl border border-forest-700 bg-forest-900 p-6 text-center sm:p-8">
          <p className="text-sm text-slate-400">También puedes escribirnos directamente:</p>
          <p className="text-sm font-semibold text-brand-400">
            {siteContent.contact.phone} · {siteContent.contact.email}
          </p>
        </section>
      </div>
    </main>
  );
}
