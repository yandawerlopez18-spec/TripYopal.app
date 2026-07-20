"use client";

import { useState } from "react";
import { getAssistantReply } from "../../services/assistant";

const suggestions = [
  "¿Qué lugares me recomiendas hoy?",
  "¿Qué eventos hay esta semana?",
  "¿Qué ruta puedo hacer en un día?",
];

export default function AssistantWidget() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("Hola, puedo ayudarte a encontrar lugares, eventos y rutas recomendadas para tu visita.");

  const handleSend = () => {
    if (!message.trim()) return;
    setReply(getAssistantReply(message));
    setMessage("");
  };

  return (
    <div>
      <h3 className="text-center font-[family-name:var(--font-brand)] text-xl font-semibold text-slate-100">Asistente virtual TripBot</h3>
      <p className="mt-2 text-center text-sm text-slate-400">Tu guía para descubrir Yopal, eventos, rutas y recomendaciones.</p>
      <div className="mt-6 rounded-2xl bg-forest-950 p-4 text-slate-100">
        <p className="text-sm text-brand-400">TripBot</p>
        <p className="mt-2 text-sm leading-6">{reply}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {suggestions.map((item) => (
          <button
            key={item}
            onClick={() => {
              setMessage(item);
              setReply(getAssistantReply(item));
            }}
            className="btn-brand-font rounded-full bg-brand-500 px-3 py-2 text-sm font-semibold text-forest-950 transition hover:bg-brand-400"
          >
            {item}
          </button>
        ))}
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu pregunta aquí..."
        className="mt-4 min-h-24 w-full rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
      />
      <button
        onClick={handleSend}
        className="btn-brand-font mt-4 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-forest-950 transition hover:bg-brand-400"
      >
        Enviar
      </button>
    </div>
  );
}
