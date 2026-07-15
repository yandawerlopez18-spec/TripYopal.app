"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegistroPage() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [status, setStatus] = useState("Crea tu cuenta para guardar preferencias y rutas.");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.password) {
      setStatus("Todos los campos son obligatorios.");
      return;
    }

    setStatus(`Registro simulado para ${form.email}.`);
  };

  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center justify-center px-6 py-20 lg:px-8">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-slate-900">Crear cuenta</h1>
        <p className="mt-2 text-sm text-slate-600">Regístrate para guardar rutas, favoritos y recibir recomendaciones.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            className="w-full rounded-2xl border border-slate-300 px-4 py-3"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <input
            className="w-full rounded-2xl border border-slate-300 px-4 py-3"
            placeholder="Correo electrónico"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full rounded-2xl border border-slate-300 px-4 py-3"
            placeholder="Contraseña"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700">
            Registrarme
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-600">{status}</p>
        <p className="mt-4 text-sm text-slate-600">
          ¿Ya tienes cuenta? <Link href="/login" className="font-semibold text-emerald-700">Inicia sesión</Link>
        </p>
      </div>
    </main>
  );
}
