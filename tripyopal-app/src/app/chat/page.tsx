import AssistantWidget from "../components/assistant/AssistantWidget";

export default function ChatPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Chatbot de apoyo turístico</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Este módulo prepara el asistente virtual para responder dudas sobre lugares, rutas, clima y eventos de Yopal.
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-600">
          <span className="rounded-full bg-emerald-50 px-3 py-1">Disponible 24/7</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">Responde en español</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">Recomendaciones guiadas</span>
        </div>
      </div>
      <div className="mt-10">
        <AssistantWidget />
      </div>
    </main>
  );
}
