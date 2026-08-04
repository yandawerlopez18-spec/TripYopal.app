"use client";

import { useState } from "react";
import { siteContent, updateSection } from "../../services/siteContent";

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";

type Field = { key: string; label: string; multiline?: boolean };

/**
 * Generic text editor for any "section" of the public site (title, subtitle,
 * description, button label, etc.). Backed by the freeform `sections` JSON
 * column, so adding a brand-new editable section anywhere on the site is just
 * one more <SectionTextEditor> below — no new component, no migration.
 */
export default function SectionTextEditor({
  sectionKey,
  title,
  description,
  fields,
  defaults,
}: {
  sectionKey: string;
  title: string;
  description?: string;
  fields: Field[];
  defaults: Record<string, string>;
}) {
  const [form, setForm] = useState<Record<string, string>>(() => {
    const current = siteContent.sections[sectionKey] ?? {};
    const initial: Record<string, string> = {};
    for (const field of fields) initial[field.key] = current[field.key] ?? defaults[field.key] ?? "";
    return initial;
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSection(sectionKey, form);
    setMessage("Sección actualizada.");
  };

  return (
    <div className="rounded-2xl border border-forest-700 bg-forest-950 p-5">
      <h3 className="font-semibold text-slate-100">{title}</h3>
      {description ? <p className="mt-1 text-sm text-slate-400">{description}</p> : null}
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
        {fields.map((field) =>
          field.multiline ? (
            <textarea
              key={field.key}
              className={`${inputClass} sm:col-span-2`}
              placeholder={field.label}
              value={form[field.key] ?? ""}
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
            />
          ) : (
            <input
              key={field.key}
              className={inputClass}
              placeholder={field.label}
              value={form[field.key] ?? ""}
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
            />
          ),
        )}
        <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">Guardar</button>
        {message ? <p className="text-sm text-brand-400 sm:col-span-2">{message}</p> : null}
      </form>
    </div>
  );
}
