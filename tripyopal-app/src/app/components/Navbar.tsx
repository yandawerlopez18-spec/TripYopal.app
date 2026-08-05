"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ChevronDownIcon, HelpCircleIcon, ShieldIcon } from "./home/infoIcons";

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
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/buscar?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <nav className="border-b border-forest-700/60 bg-forest-950 text-slate-100">
      <div className="mx-auto flex max-w-8xl flex-wrap items-center justify-between gap-3 px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full border border-forest-700 bg-forest-900 py-1.5 pl-1.5 pr-3 transition hover:border-brand-400"
        >
          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
            <Image src="/icono-actual.png" alt="Casanare" fill sizes="36px" priority className="object-cover" />
          </span>
          <span className="leading-tight">
            <span className="block text-[11px] font-medium text-brand-400">Descubre</span>
            <span className="block text-sm font-bold text-white">Yopal - Casanare</span>
          </span>
          <ChevronDownIcon className="h-4 w-4 text-slate-400" />
        </Link>

        <Link href="/" className="relative hidden h-14 w-32 shrink-0 lg:block">
          <Image src="/logo-final.png" alt="TripYopal - Vive lo mejor" fill sizes="128px" priority className="object-contain" />
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-3 text-sm font-medium text-slate-300">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 rounded-full border border-forest-700 bg-forest-900 px-3 py-1.5"
          >
            <button type="submit" aria-label="Buscar" className="text-slate-400 transition hover:text-brand-400">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar lugares, eventos, rutas..."
              className="w-52 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none lg:w-80"
            />
          </form>

          {permissions?.role === "superadmin" || permissions?.role === "admin" ? (
            <Link
              href="/admin"
              className="btn-brand-font btn-gradient inline-flex items-center gap-1.5 rounded-full px-3 py-2 font-semibold text-forest-950 transition"
            >
              <ShieldIcon className="h-4 w-4" /> Admin
            </Link>
          ) : null}

          {!permissions ? (
            <Link href="/registro" className="btn-brand-font btn-gradient rounded-full px-3 py-2 font-semibold text-forest-950 transition">
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
                className="flex items-center gap-1 rounded-full border border-forest-700 bg-forest-900 py-1 pl-1 pr-2 text-slate-200 transition hover:bg-forest-800"
                aria-label="Cuenta"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-800">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                    <path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" strokeLinecap="round" />
                  </svg>
                </span>
                <ChevronDownIcon className="h-4 w-4 text-slate-400" />
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
                      className="btn-brand-font btn-gradient rounded-full px-3 py-2 text-sm font-semibold text-forest-950 transition"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          <Link
            href="/manual-de-uso"
            title="Manual de uso"
            className="flex items-center gap-1.5 rounded-full border border-forest-700 bg-forest-900 px-3 py-2 text-slate-200 transition hover:border-brand-400 hover:text-brand-400"
          >
            <HelpCircleIcon className="h-4 w-4" />
            Ayuda
          </Link>
        </div>
      </div>
    </nav>
  );
}
