import Link from "next/link";

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-forest-950 px-6 py-16 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-xl">
        <Link
          href="/registro"
          className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          ← Volver al registro
        </Link>

        <h1 className="mt-6 font-[family-name:var(--font-brand)] text-3xl font-bold text-white">Términos y condiciones</h1>
        <p className="mt-3 text-sm text-slate-400">
          Al registrarte y usar TripYopal aceptas las siguientes condiciones de uso de la plataforma.
        </p>

        <div className="mt-6 space-y-5 text-sm leading-6 text-slate-300">
          <section>
            <h2 className="font-semibold text-slate-100">1. Uso de la plataforma</h2>
            <p className="mt-1 text-slate-400">
              TripYopal es una plataforma turística informativa para descubrir lugares, servicios, eventos y rutas en Yopal,
              Casanare. El registro es gratuito y está dirigido a turistas, prestadores de servicios y organizadores.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-100">2. Cuenta de usuario</h2>
            <p className="mt-1 text-slate-400">
              Eres responsable de mantener la confidencialidad de tu contraseña y de la información que registras en tu perfil.
              La información de contacto de emergencia y salud publicada en la plataforma se carga manualmente por el equipo
              administrador y debe usarse solo como referencia.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-100">3. Contenido de negocios y eventos</h2>
            <p className="mt-1 text-slate-400">
              Los prestadores de servicios y organizadores son responsables de la veracidad de la información que publican
              (precios, disponibilidad, fechas). TripYopal puede moderar o retirar contenido que incumpla estas condiciones.
            </p>
          </section>
          <section id="datos">
            <h2 className="font-semibold text-slate-100">4. Política de datos</h2>
            <p className="mt-1 text-slate-400">
              Los datos que ingresas (nombre, correo, teléfono, ubicación) se usan únicamente para operar la plataforma:
              autenticación, recomendaciones personalizadas y comunicación relacionada con tu cuenta. No vendemos tu
              información a terceros. Puedes solicitar la eliminación de tu cuenta y tus datos escribiendo a
              TripYopal.co@gmail.com.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-100">5. Cambios</h2>
            <p className="mt-1 text-slate-400">
              Estas condiciones pueden actualizarse a medida que la plataforma crezca. El uso continuado de TripYopal implica
              la aceptación de los cambios vigentes en cada momento.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
