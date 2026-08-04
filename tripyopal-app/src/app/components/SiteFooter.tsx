"use client";

import Image from "next/image";
import Link from "next/link";
import { siteContent } from "../services/siteContent";

export default function SiteFooter() {
  return (
    <footer className="border-t border-forest-700 bg-forest-900">
      <div className="mx-auto flex max-w-8xl flex-col items-center gap-6 px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="relative h-16 w-40 shrink-0">
          <Image src="/logo-final.png" alt="TripYopal - Vive lo mejor" fill sizes="160px" className="object-contain" />
        </Link>

        <div className="text-center text-xs text-slate-500">
          <p>© 2026 TripYopal. Todos los derechos reservados.</p>
          <p className="mt-1 flex flex-wrap items-center justify-center gap-2">
            <a href="#" className="font-medium text-brand-400 hover:text-brand-300">
              Política de privacidad
            </a>
            <span className="text-slate-700">|</span>
            <Link href="/terminos" className="font-medium text-brand-400 hover:text-brand-300">
              Términos y condiciones
            </Link>
            <span className="text-slate-700">|</span>
            <a href="#" className="font-medium text-brand-400 hover:text-brand-300">
              Cookies
            </a>
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <p className="text-right text-xs text-slate-500">
            Desarrollado con 💚 por
            <br />
            <a href="#" className="font-semibold text-brand-400 hover:text-brand-300">
              Cristian López
            </a>
          </p>
          <span className="relative hidden h-24 w-24 shrink-0 overflow-hidden rounded-full sm:block">
            <Image src={siteContent.images.mascot} alt="Capibara de TripYopal" fill sizes="96px" className="object-cover" />
          </span>
        </div>
      </div>
    </footer>
  );
}
