"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login, permissions } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("Ingrese sus credenciales para continuar.");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setStatus("Complete todos los campos antes de continuar.");
      return;
    }

    const result = login(form.email, form.password);

    if (!result) {
      setStatus("Credenciales inválidas. Prueba con admin@tripyopal.com, dueno@sitex.com o visitante@example.com.");
      return;
    }

    if (result.role === "superadmin" || (result.role === "admin" && result.scope)) {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  const statusMessage = (() => {
    if (!permissions) return status;

    if (permissions.role === "superadmin") {
      return "Acceso concedido: superadministrador con control total de la plataforma.";
    }

    if (permissions.role === "admin" && permissions.scope) {
      return `Acceso concedido: administrador limitado a "${permissions.scope.resourceName}".`;
    }

    if (permissions.role === "prestador") {
      return "Acceso concedido: prestador de servicios.";
    }

    if (permissions.role === "multiusuario") {
      return "Acceso concedido: cuenta multiusuario (empresa).";
    }

    if (permissions.role === "agente-viajes") {
      return "Acceso concedido: agente de viajes.";
    }

    return "Acceso concedido: turista con permisos de visitante.";
  })();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-forest-950 px-6 py-20 text-slate-100 lg:px-8">
      <div className="w-full max-w-xl rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-xl">
        <h1 className="text-center font-[family-name:var(--font-brand)] text-3xl font-bold text-white">Iniciar sesión</h1>
        <p className="mt-2 text-center text-sm text-slate-400">Accede a tus rutas, favoritos y recomendaciones personalizadas.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            className="w-full rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
            placeholder="Correo electrónico"
            type="email"
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
            placeholder="Contraseña"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="w-full rounded-full bg-brand-500 px-4 py-3 font-semibold text-forest-950 transition hover:bg-brand-400">
            Entrar
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-400">{statusMessage}</p>
        <p className="mt-4 text-sm text-slate-400">
          ¿No tienes cuenta? <Link href="/registro" className="font-semibold text-brand-400 hover:text-brand-300">Regístrate</Link>
        </p>
      </div>
    </main>
  );
}
