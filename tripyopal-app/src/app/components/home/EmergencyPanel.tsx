"use client";

import Link from "next/link";
import { emergencyContacts, sectionText } from "../../services/siteContent";
import { telHref } from "../../utils/phone";
import { AlertIcon, AmbulanceIcon, FireIcon, HospitalIcon, PhoneIcon, RedCrossIcon, ShieldIcon } from "./infoIcons";

const typeIcons: Record<string, (props: { className?: string }) => React.ReactElement> = {
  Hospital: HospitalIcon,
  Bomberos: FireIcon,
  Ambulancia: AmbulanceIcon,
  "Defensa Civil": ShieldIcon,
  "Cruz Roja": RedCrossIcon,
};

export default function EmergencyPanel() {
  return (
    <div id="emergencias" className="flex h-full flex-col rounded-3xl border border-forest-700 bg-forest-900 p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
          <AlertIcon />
        </span>
        <h3 className="font-[family-name:var(--font-brand)] text-lg font-semibold">{sectionText("emergency", "title", "Emergencias")}</h3>
      </div>
      <p className="mt-1 text-sm text-slate-400">{sectionText("emergency", "subtitle", "Números importantes")}</p>

      <div className="mt-4 flex-1 space-y-3 overflow-y-auto text-sm">
        {emergencyContacts.map((contact) => {
          const Icon = typeIcons[contact.type] ?? AlertIcon;
          return (
            <div key={contact.id} className="flex items-start gap-3 rounded-2xl border border-forest-700 bg-forest-950/60 p-4">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-200">{contact.type}</p>
                <p className="mt-0.5 text-slate-400">{contact.name}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  {contact.phone ? (
                    <a
                      href={telHref(contact.phone)}
                      className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400 transition hover:bg-red-500/20"
                    >
                      <PhoneIcon /> {contact.phone}
                    </a>
                  ) : null}
                  {contact.address ? <span className="text-xs text-slate-500">{contact.address}</span> : null}
                </div>
              </div>
            </div>
          );
        })}
        {emergencyContacts.length === 0 ? <p className="text-slate-500">Aún no hay contactos de emergencia cargados.</p> : null}
      </div>

      <Link
        href="/seguridad#emergencias"
        className="btn-gradient mt-5 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-forest-950 transition"
      >
        {sectionText("emergency", "buttonText", "Ver más información")} →
      </Link>
    </div>
  );
}
