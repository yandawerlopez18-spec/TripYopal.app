"use client";

import Link from "next/link";
import { sectionText, siteContent, tips } from "../../services/siteContent";
import { BackpackIcon, CameraIcon, LeafIcon, ShieldIcon, WarningIcon } from "./infoIcons";

const categoryIcons: Record<string, (props: { className?: string }) => React.ReactElement> = {
  "Qué llevar": BackpackIcon,
  "Qué cuidar": LeafIcon,
  Seguridad: ShieldIcon,
  "Qué hacer": CameraIcon,
  "Qué evitar": WarningIcon,
};

export default function RecommendationsPanel() {
  return (
    <div id="recomendaciones" className="flex h-full flex-col rounded-3xl border border-forest-700 bg-forest-900 p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
          <ShieldIcon />
        </span>
        <h3 className="font-[family-name:var(--font-brand)] text-lg font-semibold">{sectionText("recommendations", "title", "Recomendaciones")}</h3>
      </div>
      <p className="mt-1 text-sm text-slate-400">{sectionText("recommendations", "subtitle", "Prepárate antes de salir")}</p>

      <div className="mt-4 flex-1 space-y-3 overflow-y-auto text-sm">
        {tips.map((tip) => {
          const Icon = categoryIcons[tip.category] ?? ShieldIcon;
          return (
            <div key={tip.id} className="flex items-start gap-3 rounded-2xl border border-forest-700 bg-forest-950/60 p-4">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-slate-200">{tip.category}</p>
                <p className="mt-0.5 text-slate-400">{tip.text}</p>
              </div>
            </div>
          );
        })}
        {tips.length === 0 ? <p className="text-slate-500">Aún no hay recomendaciones cargadas.</p> : null}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-forest-700">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={siteContent.images.recommendationsIllustration} alt="¡Yopal te espera!" className="w-full object-cover" />
      </div>

      <Link
        href="/recomendaciones"
        className="btn-brand-font btn-gradient mt-5 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-forest-950 transition"
      >
        {sectionText("recommendations", "buttonText", "Ver más recomendaciones")} →
      </Link>
    </div>
  );
}
