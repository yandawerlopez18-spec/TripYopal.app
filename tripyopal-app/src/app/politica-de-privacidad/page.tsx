import Link from "next/link";
import { siteContent } from "../services/siteContent";

export default function PoliticaDePrivacidadPage() {
  return (
    <main className="min-h-screen bg-forest-950 px-6 py-16 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-xl">
        <Link
          href="/"
          className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          ← Volver al inicio
        </Link>

        <h1 className="mt-6 font-[family-name:var(--font-brand)] text-3xl font-bold text-white">Política de privacidad</h1>
        <p className="mt-3 text-sm text-slate-400">
          Esta política explica qué datos recopila TripYopal, para qué los usamos y cómo los protegemos.
        </p>

        <div className="mt-6 space-y-5 text-sm leading-6 text-slate-300">
          <section>
            <h2 className="font-semibold text-slate-100">1. Qué datos recopilamos</h2>
            <p className="mt-1 text-slate-400">
              Al registrarte guardamos tu nombre, correo, contraseña (cifrada), teléfono, ciudad y departamento. Si usas el mapa, el
              clima o el chatbot, también podemos guardar tus preferencias de búsqueda para mejorar tus recomendaciones.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-100">2. Para qué usamos tus datos</h2>
            <p className="mt-1 text-slate-400">
              Usamos tu información únicamente para operar la plataforma: autenticarte, mostrarte recomendaciones personalizadas,
              guardar tus favoritos y comunicarnos contigo sobre tu cuenta. No usamos tus datos para fines distintos a estos.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-100">3. Con quién compartimos tu información</h2>
            <p className="mt-1 text-slate-400">
              No vendemos ni compartimos tus datos personales con terceros con fines comerciales. Solo se comparte información
              técnica estrictamente necesaria con proveedores de servicios (por ejemplo, mapas o clima) para que la plataforma
              funcione correctamente.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-100">4. Cómo protegemos tus datos</h2>
            <p className="mt-1 text-slate-400">
              Tu contraseña se almacena cifrada y el acceso a la información de la plataforma está restringido según tu rol de
              usuario. Los datos críticos de seguridad y salud son cargados manualmente por nuestro equipo, no generados por IA.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-100">5. Tus derechos</h2>
            <p className="mt-1 text-slate-400">
              Puedes solicitar en cualquier momento acceder, corregir o eliminar tu información y tu cuenta escribiendo a{" "}
              <span className="font-medium text-brand-400">{siteContent.contact.email}</span>.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-100">6. Cookies</h2>
            <p className="mt-1 text-slate-400">
              Usamos cookies y almacenamiento local únicamente para mantener tu sesión iniciada y recordar tus preferencias de
              navegación, no para publicidad de terceros.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-100">7. Cambios a esta política</h2>
            <p className="mt-1 text-slate-400">
              Esta política puede actualizarse a medida que la plataforma crezca. El uso continuado de TripYopal implica la
              aceptación de la versión vigente en cada momento.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
