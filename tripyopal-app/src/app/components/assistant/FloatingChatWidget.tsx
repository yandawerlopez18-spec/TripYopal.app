"use client";

import { useState } from "react";
import { getAssistantReply } from "../../services/assistant";

type Message = { role: "user" | "bot"; text: string };

const suggestions = [
  "¿Qué lugares me recomiendas hoy?",
  "¿Qué eventos hay esta semana?",
  "¿Cómo está el clima?",
];

const initialMessages: Message[] = [
  { role: "bot", text: "Hola, soy tu guía virtual. ¿Qué plan tienes hoy?" },
];

const capybaraImageUrl = "https://images.unsplash.com/photo-1712743586807-93f857693f3f?w=200&q=80";

export default function FloatingChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((current) => [...current, { role: "user", text }, { role: "bot", text: getAssistantReply(text) }]);
    setInput("");
  };

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:inset-x-auto sm:right-6 sm:bottom-6">
      {open ? (
        <div className="flex max-h-[75vh] w-full flex-col overflow-hidden rounded-3xl border border-forest-700 bg-forest-900 shadow-2xl sm:h-[28rem] sm:w-[22rem]">
          <div className="flex items-center justify-between border-b border-forest-700 bg-forest-950 px-4 py-3">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={capybaraImageUrl} alt="TripBot" className="h-8 w-8 rounded-full object-cover" />
              <p className="font-[family-name:var(--font-brand)] text-sm font-semibold text-slate-100">TripBot</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-forest-800 hover:text-slate-100"
              aria-label="Cerrar chat"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
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
          </div>

          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {suggestions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => send(item)}
                className="rounded-full border border-forest-700 px-2.5 py-1 text-xs text-slate-300 transition hover:bg-forest-800"
              >
                {item}
              </button>
            ))}
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
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-forest-950 transition hover:bg-brand-400"
              aria-label="Enviar"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-500 text-forest-950 shadow-xl transition hover:bg-brand-400"
        aria-label={open ? "Cerrar chatbot" : "Abrir chatbot"}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={capybaraImageUrl} alt="Abrir chatbot" className="h-full w-full object-cover" />
        )}
      </button>
    </div>
  );
}
