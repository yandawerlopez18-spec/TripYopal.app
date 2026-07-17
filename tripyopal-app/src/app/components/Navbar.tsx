"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const roleLabels: Record<string, string> = {
  turista: "Turista",
  prestador: "Prestador",
  multiusuario: "Multiusuario",
  "agente-viajes": "Agente de viajes",
  superadmin: "Superadmin",
};

function getRoleLabel(permissions: ReturnType<typeof useAuth>["permissions"]) {
  if (!permissions) return "Invitado";
  if (permissions.role === "admin" && permissions.scope) {
    return `Admin · ${permissions.scope.resourceName}`;
  }
  return roleLabels[permissions.role] ?? "Usuario";
}

export default function Navbar() {
  const { permissions, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="border-b border-forest-700/60 bg-forest-950 text-slate-100">
      <div className="mx-auto grid max-w-8xl grid-cols-1 items-center gap-3 px-6 py-4 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-500/20">
            <Image src="/TripYopal_logonuevo_jpg.jpg" alt="TripYopal" fill sizes="40px" priority className="object-cover" />
          </span>
          <span className="leading-tight">
            <span className="block text-xs font-normal text-slate-400">Descubre</span>
            <span className="block text-base font-bold text-white">Yopal - Casanare</span>
          </span>
        </Link>

        <span className="hidden justify-self-center font-[family-name:var(--font-brand)] text-3xl font-bold tracking-tight text-white lg:block">
          Trip<span className="text-brand-400">Yopal</span>
        </span>

        <div className="flex flex-wrap items-center justify-end gap-3 text-sm font-medium text-slate-300">
          <Link href="/" className="rounded-full px-3 py-2 transition hover:bg-forest-800 hover:text-brand-400">
            Inicio
          </Link>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 rounded-full border border-forest-700 bg-forest-900 px-3 py-1.5"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-slate-400" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder="Buscar lugares, eventos, rutas..."
              className="w-52 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none lg:w-80"
            />
          </form>

          {permissions?.role === "superadmin" || permissions?.role === "admin" ? (
            <Link href="/admin" className="btn-brand-font rounded-full border border-forest-700 px-3 py-2 transition hover:bg-forest-800">
              Admin
            </Link>
          ) : null}

          {!permissions ? (
            <Link href="/registro" className="btn-brand-font rounded-full border border-forest-700 px-3 py-2 transition hover:bg-forest-800">
              Registro
            </Link>
          ) : null}

          {!permissions ? (
            <Link
              href="/login"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-forest-700 bg-forest-900 text-slate-200 transition hover:bg-forest-800"
              aria-label="Iniciar sesión"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                <path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" strokeLinecap="round" />
              </svg>
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-forest-700 bg-forest-900 text-slate-200 transition hover:bg-forest-800"
                aria-label="Cuenta"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                  <path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" strokeLinecap="round" />
                </svg>
              </button>

              {profileOpen ? (
                <div className="absolute right-0 top-12 z-10 w-64 rounded-2xl border border-forest-700 bg-forest-900 p-4 shadow-xl">
                  <div className="flex flex-col gap-2">
                    <div className="rounded-full bg-brand-500/10 px-3 py-2 text-center text-sm font-medium text-brand-400">
                      {getRoleLabel(permissions)}
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                      }}
                      className="rounded-full border border-forest-700 px-3 py-2 text-sm text-slate-300 transition hover:bg-forest-800"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
