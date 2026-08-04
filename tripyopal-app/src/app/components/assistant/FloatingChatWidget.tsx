"use client";

import { useState } from "react";
import { getAssistantReply } from "../../services/assistant";
import { getBusinessAssistantReply } from "../../services/businessAssistant";
import { useBusinessAssistant } from "../../context/BusinessAssistantContext";
import { siteContent } from "../../services/siteContent";

type Message = { role: "user" | "bot"; text: string };

const defaultSuggestions = [
  { icon: "📍", text: "¿Qué lugares puedo visitar?" },
  { icon: "📅", text: "¿Qué eventos hay esta semana?" },
  { icon: "🍽️", text: "¿Dónde puedo comer?" },
];

const businessSuggestions = [
  { icon: "💲", text: "¿Cuánto cuesta?" },
  { icon: "📅", text: "¿Hay disponibilidad?" },
  { icon: "📍", text: "¿Cómo llegar?" },
];

export default function FloatingChatWidget() {
  const { activeBusiness } = useBusinessAssistant();
  const [open, setOpen] = useState(false);
  const [greetedBusinessId, setGreetedBusinessId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "¡Hola! Soy tu asistente virtual 👋 ¿En qué puedo ayudarte hoy sobre Yopal?" },
  ]);
  const [input, setInput] = useState("");

  const currentBusinessId = activeBusiness?.id ?? null;
  if (greetedBusinessId !== currentBusinessId) {
    setGreetedBusinessId(currentBusinessId);
    setMessages([
      {
        role: "bot",
        text: activeBusiness
          ? `¡Hola! Soy el asistente virtual de ${activeBusiness.name} 👋 ¿En qué puedo ayudarte?`
          : "¡Hola! Soy tu asistente virtual 👋 ¿En qué puedo ayudarte hoy sobre Yopal?",
      },
    ]);
  }

  const suggestions = activeBusiness ? businessSuggestions : defaultSuggestions;

  const send = (text: string) => {
    if (!text.trim()) return;
    const reply = activeBusiness ? getBusinessAssistantReply(activeBusiness, text) : getAssistantReply(text);
    setMessages((current) => [...current, { role: "user", text }, { role: "bot", text: reply }]);
    setInput("");
  };

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:inset-x-auto sm:right-6 sm:bottom-6">
      {open ? (
        <div className="flex max-h-[75vh] w-full flex-col overflow-hidden rounded-3xl border border-forest-700 bg-forest-900 shadow-2xl sm:h-[30rem] sm:w-[22rem]">
          <div className="relative shrink-0">
            <div
              className="h-40 w-full bg-cover bg-top"
              style={{
                backgroundImage: "url('" + siteContent.images.chatWidget + "'), linear-gradient(135deg,#0b1f16,#1c3a28)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/40 to-transparent" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
              aria-label="Cerrar chat"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>

            <div className="absolute inset-x-4 bottom-3">
              <div className="flex items-center gap-1.5">
                <p className="font-[family-name:var(--font-brand)] text-base font-bold text-brand-400">TripYopal IA</p>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-forest-950">
                  <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5" stroke="currentColor" strokeWidth="3">
                    <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-300">
                <span>{activeBusiness ? `Asistente de ${activeBusiness.name}` : "Asistente Virtual"}</span>
                <span className="rounded-full bg-brand-500/20 px-1.5 py-0.5 text-[9px] font-bold text-brand-400">IA</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                En línea
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-2">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <p
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                      message.role === "user" ? "bg-brand-500 text-forest-950" : "bg-forest-800 text-slate-200"
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
              ))}

              {messages.length === 1 ? (
                <div className="space-y-2 pt-1">
                  {suggestions.map((item) => (
                    <button
                      key={item.text}
                      type="button"
                      onClick={() => send(item.text)}
                      className="flex w-full items-center gap-3 rounded-2xl border border-forest-700 bg-forest-950 px-3 py-2.5 text-left text-sm text-slate-200 transition hover:border-brand-400 hover:bg-forest-800"
                    >
                      <span>{item.icon}</span>
                      {item.text}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-forest-700 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-1 rounded-full border border-forest-700 bg-forest-950 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
              />
              <button
                type="submit"
                className="btn-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-forest-950 transition"
                aria-label="Enviar"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

          <p className="pb-2 text-center text-[11px] text-slate-500">✨ Powered by IA</p>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="btn-gradient relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full text-forest-950 shadow-xl transition"
        aria-label={open ? "Cerrar chatbot" : "Abrir chatbot"}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={siteContent.images.mascot} alt="Abrir chatbot" className="capybara-bounce h-full w-full object-cover" />
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-forest-950 bg-emerald-400" />
          </>
        )}
      </button>
    </div>
  );
}
