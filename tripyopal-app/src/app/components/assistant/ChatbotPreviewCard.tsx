import Link from "next/link";

const quickLinks = [
  { href: "/lugares", label: "Lugares" },
  { href: "/rutas", label: "Rutas" },
  { href: "/eventos", label: "Eventos" },
];

export default function ChatbotPreviewCard() {
  return (
    <div className="rounded-3xl border border-forest-700 bg-forest-900 p-6 text-slate-100 shadow-sm">
      <div className="flex items-center justify-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/20 text-brand-400">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
            <rect x="4" y="7" width="16" height="11" rx="4" />
            <path d="M9 3v3M15 3v3M9 12h.01M15 12h.01" strokeLinecap="round" />
          </svg>
        </span>
        <h3 className="font-[family-name:var(--font-brand)] text-lg font-semibold">Chatbot con IA</h3>
      </div>
      <p className="mt-4 rounded-2xl bg-forest-800 p-3 text-sm leading-6 text-slate-200">
        <span className="font-semibold">Hola, soy tu guía virtual.</span> ¿Qué plan tienes hoy?
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-forest-700 bg-forest-950 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-forest-800"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <Link
        href="/chat"
        className="btn-brand-font mx-auto mt-4 flex w-fit items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-forest-950 transition hover:bg-brand-400"
      >
        Abrir chat
      </Link>
    </div>
  );
}
