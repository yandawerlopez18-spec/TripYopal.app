import Link from "next/link";
import AssistantWidget from "../components/assistant/AssistantWidget";

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-forest-950 px-6 py-6 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          ← Volver al inicio
        </Link>

        <div className="mt-6 rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-sm">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-brand)] text-4xl font-bold text-white sm:text-5xl">Chatbot de apoyo turístico</h1>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              Este módulo prepara el asistente virtual para responder dudas sobre lugares, rutas, clima y eventos de Yopal.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm text-slate-300">
            <span className="rounded-full bg-brand-500/10 px-3 py-1 text-brand-400">Disponible 24/7</span>
            <span className="rounded-full border border-forest-700 px-3 py-1">Responde en español</span>
            <span className="rounded-full border border-forest-700 px-3 py-1">Recomendaciones guiadas</span>
          </div>
          <div className="mt-8 border-t border-forest-700 pt-8">
            <AssistantWidget />
          </div>
        </div>
      </div>
    </main>
  );
}
