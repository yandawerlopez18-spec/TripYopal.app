import Link from "next/link";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/lugares", label: "Lugares" },
  { href: "/eventos", label: "Eventos" },
  { href: "/chat", label: "Chatbot" },
  { href: "/rutas", label: "Rutas" },
];

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="text-xl font-bold text-slate-900">
          TripYopal
        </Link>
        <div className="flex flex-wrap gap-2 text-sm font-medium text-slate-700">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-emerald-700">
              {link.label}
            </Link>
          ))}
          <Link href="/login" className="rounded-full bg-slate-900 px-3 py-2 text-white transition hover:bg-slate-800">
            Ingresar
          </Link>
          <Link href="/admin" className="rounded-full border border-slate-300 px-3 py-2 transition hover:bg-slate-50">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
