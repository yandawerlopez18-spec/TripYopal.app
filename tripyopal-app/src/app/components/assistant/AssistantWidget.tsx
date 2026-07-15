"use client";

import { useState } from "react";

const suggestions = [
  "¿Qué lugares me recomiendas hoy?",
  "¿Qué eventos hay esta semana?",
  "¿Qué ruta puedo hacer en un día?",
];

function getReply(question: string) {
  const normalized = question.toLowerCase();

  if (normalized.includes("lugar") || normalized.includes("lugares")) {
    return "Te recomiendo visitar el mirador de Yopal, la Plaza de Bolívar y los parques cercanos para una experiencia cultural y relajada.";
  }

  if (normalized.includes("evento") || normalized.includes("seman")) {
    return "En esta semana suele haber actividades culturales, gastronomía local y recorridos en la zona urbana. Te recomiendo revisar la sección de eventos para ver novedades.";
  }

  if (normalized.includes("ruta") || normalized.includes("día")) {
    return "Una ruta completa para un día sería: desayuno en el centro, visita a lugares emblemáticos, almuerzo típico y cierre con un mirador o plaza al atardecer.";
  }

  if (normalized.includes("presupuesto")) {
    return "Para un presupuesto bajo, prioriza plazas, parques y recorridos sencillos. Para uno medio, mezcla gastronomía y transporte. Para uno alto, considera actividades guiadas y alojamiento premium.";
  }

  if (normalized.includes("seguro") || normalized.includes("salud")) {
    return "Mantente hidratado, usa protección solar y verifica las condiciones del clima antes de salir. Si necesitas ayuda, consulta los puntos de salud y emergencia cercanos.";
  }

  return "Puedo ayudarte con lugares, eventos, rutas, presupuesto, salud y seguridad en Yopal. Prueba con una pregunta más concreta.";
}

export default function AssistantWidget() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("Hola, puedo ayudarte a encontrar lugares, eventos y rutas recomendadas para tu visita.");

  const handleSend = () => {
    if (!message.trim()) return;
    setReply(getReply(message));
    setMessage("");
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">Asistente virtual TripBot</h3>
      <p className="mt-2 text-sm text-slate-600">Tu guía para descubrir Yopal, eventos, rutas y recomendaciones.</p>
      <div className="mt-6 rounded-2xl bg-slate-900 p-4 text-white">
        <p className="text-sm text-emerald-300">TripBot</p>
        <p className="mt-2 text-sm leading-6">{reply}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {suggestions.map((item) => (
          <button
            key={item}
            onClick={() => {
              setMessage(item);
              setReply(getReply(item));
            }}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
          >
            {item}
          </button>
        ))}
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu pregunta aquí..."
        className="mt-4 min-h-24 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm"
      />
      <button
        onClick={handleSend}
        className="mt-4 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        Enviar
      </button>
    </div>
  );
}
