"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("Ingrese sus credenciales para continuar.");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setStatus("Complete todos los campos antes de continuar.");
      return;
    }

    setStatus(`Inicio de sesión simulado para ${form.email}.`);
  };

  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center justify-center px-6 py-20 lg:px-8">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-slate-900">Iniciar sesión</h1>
        <p className="mt-2 text-sm text-slate-600">Accede a tus rutas, favoritos y recomendaciones personalizadas.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
          <button className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800">
            Entrar
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-600">{status}</p>
        <p className="mt-4 text-sm text-slate-600">
          ¿No tienes cuenta? <Link href="/registro" className="font-semibold text-emerald-700">Regístrate</Link>
        </p>
      </div>
    </main>
  );
}
