"use client";

import Link from "next/link";
import { safetyPoints, sectionText } from "../../services/siteContent";
import { telHref } from "../../utils/phone";
import { CaiIcon, MegaphoneIcon, PhoneIcon, PoliceBadgeIcon, ShieldIcon, SirenIcon, TourismIcon } from "./infoIcons";

const typeIcons: Record<string, (props: { className?: string }) => React.ReactElement> = {
  "Estación de Policía": PoliceBadgeIcon,
  CAI: CaiIcon,
  "Policía de Turismo": TourismIcon,
  "Línea de Denuncias": MegaphoneIcon,
  "Línea de Emergencias": SirenIcon,
};

export default function SafetyPanel() {
  return (
    <div id="seguridad" className="flex h-full flex-col rounded-3xl border border-forest-700 bg-forest-900 p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
          <ShieldIcon />
        </span>
        <h3 className="font-[family-name:var(--font-brand)] text-lg font-semibold">{sectionText("safety", "title", "Seguridad")}</h3>
      </div>
      <p className="mt-1 text-sm text-slate-400">{sectionText("safety", "subtitle", "Tu bienestar es lo primero")}</p>

      <div className="mt-4 flex-1 space-y-3 overflow-y-auto text-sm">
        {safetyPoints.map((point) => {
          const Icon = typeIcons[point.type] ?? ShieldIcon;
          return (
            <div key={point.id} className="flex items-start gap-3 rounded-2xl border border-forest-700 bg-forest-950/60 p-4">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-200">{point.type}</p>
                <p className="mt-0.5 text-slate-400">{point.name}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  {point.phone ? (
                    <a
                      href={telHref(point.phone)}
                      className="inline-flex items-center gap-1 rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-semibold text-brand-400 transition hover:bg-brand-500/20"
                    >
                      <PhoneIcon /> {point.phone}
                    </a>
                  ) : null}
                  {point.address ? <span className="text-xs text-slate-500">{point.address}</span> : null}
                </div>
              </div>
            </div>
          );
        })}
        {safetyPoints.length === 0 ? <p className="text-slate-500">Aún no hay puntos de seguridad cargados.</p> : null}
      </div>

      <Link
        href="/seguridad#seguridad"
        className="btn-brand-font btn-gradient mt-5 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-forest-950 transition"
      >
        {sectionText("safety", "buttonText", "Ver más información")} →
      </Link>
    </div>
  );
}
