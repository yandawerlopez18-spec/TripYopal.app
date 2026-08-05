"use client";

import Image from "next/image";
import Link from "next/link";
import { siteContent } from "../services/siteContent";

type IconProps = { className?: string };

function ChevronRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
      <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CompassIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-2 6-6 2 2-6 6-2Z" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5" strokeLinecap="round" />
      <circle cx="12" cy="7.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function HeadsetIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" strokeLinecap="round" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19v.5a3 3 0 0 1-3 3h-2.5" strokeLinecap="round" />
    </svg>
  );
}

function MapPinIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}

function UtensilsIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <path d="M7 3v7a2 2 0 0 0 4 0V3M9 10v11" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 3c-1.2 0-2 1.4-2 4s.8 4 2 4v10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BedIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 18v2M21 18v2" strokeLinecap="round" />
      <path d="M3 13V7a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 9h6a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M8 3v3M16 3v3" strokeLinecap="round" />
    </svg>
  );
}

function RouteIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <circle cx="6" cy="7" r="2.3" />
      <circle cx="18" cy="17" r="2.3" />
      <path d="M8 7h7a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H9a3 3 0 0 0-3 3v0" strokeLinecap="round" strokeDasharray="1 3.2" />
    </svg>
  );
}

function UsersIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
      <path d="M16 4.3a3 3 0 0 1 0 5.8M21 20c0-2.8-2-5.1-4.6-5.8" strokeLinecap="round" />
    </svg>
  );
}

function PencilIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <path d="M12 20h9" strokeLinecap="round" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinejoin="round" />
    </svg>
  );
}

function BriefcaseIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="8" width="18" height="11" rx="2" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileTextIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <path d="M7 3h7l4 4v14H7Z" strokeLinejoin="round" />
      <path d="M14 3v4h4M9.5 12.5h6M9.5 16h6" strokeLinecap="round" />
    </svg>
  );
}

function ShieldLockIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3.5 5 6v5.5c0 5 3 8.3 7 9 4-.7 7-4 7-9V6l-7-2.5Z" strokeLinejoin="round" />
      <rect x="9.3" y="11" width="5.4" height="4.3" rx="1" />
      <path d="M10.3 11V9.6a1.7 1.7 0 0 1 3.4 0V11" strokeLinecap="round" />
    </svg>
  );
}

function HelpCircleIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.3a2.5 2.5 0 1 1 3.7 2.2c-.8.5-1.2 1-1.2 1.9" strokeLinecap="round" />
      <circle cx="12" cy="16.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BookIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z" strokeLinejoin="round" />
      <path d="M4 5.5v15" strokeLinecap="round" />
    </svg>
  );
}

function MessageCircleIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <path d="M4 12a8 8 0 1 1 3.5 6.6L4 20l1.2-3.6A7.9 7.9 0 0 1 4 12Z" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 6.5 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramGlyph({ className = "h-4.5 w-4.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2c-2.7 0-3.1 0-4.1.1-1.1 0-1.8.2-2.4.5A4.8 4.8 0 0 0 2.6 5.5c-.3.6-.4 1.3-.5 2.4C2 8.9 2 9.3 2 12s0 3.1.1 4.1c0 1.1.2 1.8.5 2.4a4.8 4.8 0 0 0 2.9 2.9c.6.3 1.3.4 2.4.5C8.9 22 9.3 22 12 22s3.1 0 4.1-.1c1.1 0 1.8-.2 2.4-.5a4.8 4.8 0 0 0 2.9-2.9c.3-.6.4-1.3.5-2.4.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c0-1.1-.2-1.8-.5-2.4a4.8 4.8 0 0 0-2.9-2.9c-.6-.3-1.3-.4-2.4-.5C15.1 2 14.7 2 12 2Zm0 2.2c2.6 0 3 0 4 .1.9 0 1.5.2 1.8.3.5.2.8.4 1.1.7.3.3.5.6.7 1.1.1.3.3.9.3 1.8.1 1 .1 1.4.1 4s0 3-.1 4c0 .9-.2 1.5-.3 1.8-.2.5-.4.8-.7 1.1-.3.3-.6.5-1.1.7-.3.1-.9.3-1.8.3-1 .1-1.4.1-4 .1s-3 0-4-.1c-.9 0-1.5-.2-1.8-.3a3 3 0 0 1-1.1-.7 3 3 0 0 1-.7-1.1c-.1-.3-.3-.9-.3-1.8-.1-1-.1-1.4-.1-4s0-3 .1-4c0-.9.2-1.5.3-1.8.2-.5.4-.8.7-1.1.3-.3.6-.5 1.1-.7.3-.1.9-.3 1.8-.3 1-.1 1.4-.1 4-.1Zm0 3.7a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2Zm0 6.8a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.2-7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    </svg>
  );
}

function FacebookGlyph({ className = "h-4.5 w-4.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13 22v-8h2.7l.4-3H13V9.1c0-.9.2-1.5 1.5-1.5H16V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.3-3.8 3.8V11H7.5v3H10v8h3Z" />
    </svg>
  );
}

function TikTokGlyph({ className = "h-4.5 w-4.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.6 3c.4 2.1 1.7 3.6 3.9 3.9v3a7 7 0 0 1-3.9-1.2v6.2a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v3.1a2.6 2.6 0 1 0 1.8 2.5V3h3Z" />
    </svg>
  );
}

function YouTubeGlyph({ className = "h-4.5 w-4.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        fill="currentColor"
        d="M22 12c0-1.6-.1-3.2-.4-4.6a2.8 2.8 0 0 0-2-2C17.9 5 12 5 12 5s-5.9 0-7.6.4a2.8 2.8 0 0 0-2 2C2 8.8 2 10.4 2 12s.1 3.2.4 4.6a2.8 2.8 0 0 0 2 2C6.1 19 12 19 12 19s5.9 0 7.6-.4a2.8 2.8 0 0 0 2-2c.3-1.4.4-3 .4-4.6Z"
      />
      <path fill="#0b1f16" d="M10 15.4V8.6L16 12l-6 3.4Z" />
    </svg>
  );
}

type FooterLink = { label: string; href: string; icon: (props: IconProps) => React.JSX.Element };

const footerColumns: { title: string; icon: (props: IconProps) => React.JSX.Element; links: FooterLink[] }[] = [
  {
    title: "Explora",
    icon: CompassIcon,
    links: [
      { label: "Lugares turísticos", href: "/lugares", icon: MapPinIcon },
      { label: "Restaurantes", href: "/categorias/restaurantes", icon: UtensilsIcon },
      { label: "Hoteles", href: "/categorias/hoteles", icon: BedIcon },
      { label: "Eventos", href: "/eventos", icon: CalendarIcon },
      { label: "Rutas", href: "/rutas", icon: RouteIcon },
    ],
  },
  {
    title: "Información",
    icon: InfoIcon,
    links: [
      { label: "Sobre nosotros", href: "/sobre-nosotros", icon: UsersIcon },
      { label: "Blog", href: "/blog", icon: PencilIcon },
      { label: "Guía de viaje", href: "/rutas", icon: BriefcaseIcon },
      { label: "Términos y condiciones", href: "/terminos", icon: FileTextIcon },
      { label: "Política de privacidad", href: "/politica-de-privacidad", icon: ShieldLockIcon },
    ],
  },
  {
    title: "Ayuda",
    icon: HeadsetIcon,
    links: [
      { label: "Centro de ayuda", href: "/centro-de-ayuda", icon: HelpCircleIcon },
      { label: "Manual de uso", href: "/manual-de-uso", icon: BookIcon },
      { label: "Preguntas frecuentes", href: "/preguntas-frecuentes", icon: MessageCircleIcon },
      { label: "Contacto", href: "/#contacto", icon: MailIcon },
    ],
  },
];

const socialLinks = [
  { label: "Instagram", key: "instagram" as const, icon: InstagramGlyph },
  { label: "Facebook", key: "facebook" as const, icon: FacebookGlyph },
  { label: "TikTok", key: "tiktok" as const, icon: TikTokGlyph },
  { label: "YouTube", key: "youtube" as const, icon: YouTubeGlyph },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-forest-700 bg-forest-950">
      <div className="mx-auto max-w-8xl px-6 py-12 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-xl lg:p-10">
          <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />

          <div className="relative grid gap-10 sm:grid-cols-3 sm:divide-x sm:divide-forest-700">
            {footerColumns.map((column) => (
              <div key={column.title} className="sm:px-8 sm:first:pl-0 sm:last:pr-0">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-500/40 bg-brand-500/10 text-brand-400">
                    <column.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-brand)] text-base font-bold uppercase tracking-wide text-white">
                      {column.title}
                    </h3>
                    <span className="mt-1 block h-0.5 w-8 rounded-full bg-brand-500" />
                  </div>
                </div>

                <ul className="mt-5 divide-y divide-forest-800">
                  {column.links.map((link) => {
                    const rowContent = (
                      <>
                        <span className="flex items-center gap-3">
                          <link.icon className="h-4 w-4 shrink-0 text-brand-400" />
                          <span className="text-sm text-slate-300">{link.label}</span>
                        </span>
                        <ChevronRightIcon className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-brand-400" />
                      </>
                    );
                    return (
                      <li key={link.label}>
                        {link.href.startsWith("#") ? (
                          <a href={link.href} className="group flex items-center justify-between py-3 transition hover:text-brand-400">
                            {rowContent}
                          </a>
                        ) : (
                          <Link href={link.href} className="group flex items-center justify-between py-3 transition hover:text-brand-400">
                            {rowContent}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="relative mt-10 grid gap-8 border-t border-forest-700 pt-8 lg:grid-cols-3 lg:items-center">
            <div className="flex justify-center lg:justify-start">
              <Link href="/" className="relative h-16 w-52 shrink-0 sm:h-20 sm:w-64">
                <Image src="/logo-final.png" alt="TripYopal - Vive lo mejor" fill sizes="256px" className="object-contain" />
              </Link>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={siteContent.social[social.key] || "#"}
                    target={siteContent.social[social.key] ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-forest-600 text-slate-300 transition hover:border-brand-400 hover:text-brand-400"
                  >
                    <social.icon />
                  </a>
                ))}
              </div>

              <p className="text-center text-xs text-slate-500">
                © 2026 <span className="font-semibold text-brand-400">TripYopal</span>. Todos los derechos reservados.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 lg:justify-end lg:border-l lg:border-forest-700 lg:pl-8">
              <p className="text-center text-sm text-slate-400 lg:text-right">
                Desarrollado con 💚 por
                <br />
                <a href="#" className="text-base font-semibold text-brand-400 hover:text-brand-300">
                  Cristian López
                </a>{" "}
                <span className="text-slate-500">y</span>{" "}
                <a href="#" className="text-base font-semibold text-brand-400 hover:text-brand-300">
                  Duvan Segovia
                </a>
              </p>
              <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-brand-400/60 shadow-[0_0_25px_-5px_rgba(74,222,128,0.6)]">
                <Image src={siteContent.images.mascot} alt="Capibara de TripYopal" fill sizes="96px" className="object-cover" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
