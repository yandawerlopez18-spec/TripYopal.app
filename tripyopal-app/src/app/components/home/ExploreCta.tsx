import Link from "next/link";
import { siteContent } from "../../services/siteContent";
import { CompassIcon, HeadsetIcon, EventPinIcon, RefreshIcon, StarIcon } from "./infoIcons";

const features = [
  { icon: StarIcon, label: "Recomendaciones personalizadas" },
  { icon: RefreshIcon, label: "Información actualizada" },
  { icon: EventPinIcon, label: "Rutas y lugares increíbles" },
  { icon: HeadsetIcon, label: "Soporte 24/7" },
];

export default function ExploreCta() {
  const [firstLine, secondLine] = siteContent.cta.title.split(" en una ");

  return (
    <section className="mx-auto max-w-8xl px-6 pb-14 lg:px-8">
      <div
        className="relative overflow-hidden rounded-3xl border border-forest-700 bg-cover bg-center p-8 shadow-xl lg:p-10"
        style={{ backgroundImage: "url('/fondo-casanare.jpg')" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/85 to-forest-950/40" />

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
                <CompassIcon />
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-400">{siteContent.cta.eyebrow}</p>
              <h2 className="mt-2 font-[family-name:var(--font-brand)] text-3xl font-bold text-slate-100 sm:text-4xl">
                {secondLine ? (
                  <>
                    {firstLine} en una
                    <br />
                    <span className="text-brand-400">{secondLine}</span>
                  </>
                ) : (
                  siteContent.cta.title
                )}
              </h2>
            </div>

            <Link
              href="/lugares"
              className="btn-brand-font btn-gradient inline-flex shrink-0 items-center gap-2 self-start rounded-full px-6 py-3 font-semibold text-forest-950 transition lg:self-center"
            >
              Explorar ahora →
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {features.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-forest-700 bg-forest-950/70 px-3 py-1.5 text-xs font-medium text-slate-300"
              >
                <Icon className="h-3.5 w-3.5 text-brand-400" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
