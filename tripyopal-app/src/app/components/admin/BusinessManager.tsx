"use client";

import { Fragment, useState } from "react";
import { BUSINESS_CATEGORIES, type IconKey } from "../home/categoryIcons";
import { deletePrestador, listPrestadoresByCategory, registerPrestador, updatePrestador, type Prestador } from "../../services/prestadores";
import { RESOURCE_CAPABILITY_PRESETS, createScopedAdmin } from "../../services/permissions";
import { CheckIcon, EventPinIcon, EyeIcon, PencilIcon, TrendUpIcon, TrashIcon } from "../home/infoIcons";
import ImageUploadField from "./ImageUploadField";
import PrestadorItemsSection from "./PrestadorItemsSection";
import PrestadorProfileEditor from "./PrestadorProfileEditor";

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";

const LEVEL_STYLES: Record<string, string> = {
  Alto: "bg-emerald-500/10 text-emerald-400",
  Medio: "bg-amber-500/10 text-amber-400",
  Bajo: "bg-slate-500/10 text-slate-400",
};

function LevelBadge({ priceRange }: { priceRange?: string }) {
  if (!priceRange) return <span className="text-xs text-slate-500">—</span>;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${LEVEL_STYLES[priceRange] ?? LEVEL_STYLES.Bajo}`}>
      <TrendUpIcon className="h-3 w-3" /> {priceRange}
    </span>
  );
}

const ADMIN_EMAIL_DOMAIN = "@tripyopal.com";

const emptyProfileForm = { name: "", category: "" as IconKey | "", description: "", address: "", phone: "", instagram: "", schedule: "", priceRange: "", imageUrl: "" };
const emptyAddForm = { ...emptyProfileForm, adminName: "", adminEmail: "", adminPassword: "" };

function RegisterBusinessForm({
  category,
  onCancel,
  onSuccess,
}: {
  category: IconKey;
  onCancel: () => void;
  onSuccess: (successMessage: string) => void;
}) {
  const [addForm, setAddForm] = useState(emptyAddForm);
  const [capabilities, setCapabilities] = useState<string[]>(RESOURCE_CAPABILITY_PRESETS.prestador);
  const [message, setMessage] = useState("");

  const categoryLabel = BUSINESS_CATEGORIES.find((c) => c.key === category)?.label ?? category;
  const adminEmailLocal = addForm.adminEmail.endsWith(ADMIN_EMAIL_DOMAIN)
    ? addForm.adminEmail.slice(0, -ADMIN_EMAIL_DOMAIN.length)
    : addForm.adminEmail;

  const setAdminEmailLocal = (value: string) => {
    const local = value.trim().toLowerCase().replace(/\s+/g, "");
    setAddForm({ ...addForm, adminEmail: local ? `${local}${ADMIN_EMAIL_DOMAIN}` : "" });
  };

  const toggleCapability = (capability: string) => {
    setCapabilities((current) =>
      current.includes(capability) ? current.filter((item) => item !== capability) : [...current, capability],
    );
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!addForm.name || !addForm.description || !addForm.address || !addForm.phone || !addForm.adminName || !addForm.adminEmail || !addForm.adminPassword) {
      setMessage("Completa la hoja de vida del negocio (nombre, descripción, dirección, teléfono) y los datos del administrador.");
      return;
    }

    const prestador = await registerPrestador({
      name: addForm.name,
      tipo: categoryLabel,
      category,
      description: addForm.description,
      address: addForm.address,
      phone: addForm.phone,
      instagram: addForm.instagram || undefined,
      schedule: addForm.schedule || undefined,
      priceRange: addForm.priceRange || undefined,
      imageUrl: addForm.imageUrl || undefined,
    });

    await createScopedAdmin({
      name: addForm.adminName,
      email: addForm.adminEmail,
      password: addForm.adminPassword,
      resourceType: "prestador",
      resourceId: prestador.id,
      resourceName: prestador.name,
      capabilities,
    });

    onSuccess(`"${prestador.name}" quedó registrado en ${categoryLabel}, con administrador ${addForm.adminName}.`);
  };

  return (
    <div className="rounded-2xl border border-forest-700 bg-forest-950 p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-100">Registrar nuevo negocio</h3>
          <p className="mt-1 text-xs text-slate-400">
            Categoría: <span className="font-semibold text-brand-400">{categoryLabel}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-forest-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-forest-800"
        >
          ← Volver a la lista
        </button>
      </div>

      <form onSubmit={handleAddSubmit} className="mt-5 grid gap-3 sm:grid-cols-2">

        <p className="text-sm font-medium text-slate-300 sm:col-span-2">
          Hoja de vida del negocio — así se presenta {categoryLabel.toLowerCase()} dentro de la plataforma.
        </p>
        <input
          className={`${inputClass} sm:col-span-2`}
          placeholder={`Nombre del ${categoryLabel.toLowerCase()}`}
          required
          value={addForm.name}
          onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
        />
        <ImageUploadField
          className="sm:col-span-2"
          value={addForm.imageUrl}
          onChange={(value) => setAddForm({ ...addForm, imageUrl: value })}
        />
        <textarea
          className={`${inputClass} sm:col-span-2`}
          placeholder="Descripción del negocio"
          required
          value={addForm.description}
          onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
        />
        <input
          className={inputClass}
          placeholder="Dirección"
          required
          value={addForm.address}
          onChange={(e) => setAddForm({ ...addForm, address: e.target.value })}
        />
        <input
          className={inputClass}
          placeholder="Teléfono"
          required
          value={addForm.phone}
          onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
        />
        <input
          className={inputClass}
          placeholder="Instagram (opcional)"
          value={addForm.instagram}
          onChange={(e) => setAddForm({ ...addForm, instagram: e.target.value })}
        />
        <input
          className={inputClass}
          placeholder="Horario de atención (opcional)"
          value={addForm.schedule}
          onChange={(e) => setAddForm({ ...addForm, schedule: e.target.value })}
        />
        <select
          className={`${inputClass} sm:col-span-2`}
          value={addForm.priceRange}
          onChange={(e) => setAddForm({ ...addForm, priceRange: e.target.value })}
        >
          <option value="">Rango de precios (opcional)</option>
          <option value="Bajo">Bajo</option>
          <option value="Medio">Medio</option>
          <option value="Alto">Alto</option>
        </select>

        <p className="mt-2 text-sm font-medium text-slate-300 sm:col-span-2">
          Administrador asignado a este negocio <span className="text-red-400">(obligatorio para completar el registro)</span>
        </p>
        <input
          className={inputClass}
          placeholder="Nombre del administrador"
          required
          value={addForm.adminName}
          onChange={(e) => setAddForm({ ...addForm, adminName: e.target.value })}
        />
        <div className={`${inputClass} flex items-center gap-1`}>
          <input
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            placeholder="Nombre para el correo del administrador"
            required
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            value={adminEmailLocal}
            onChange={(e) => setAdminEmailLocal(e.target.value)}
          />
          <span className="shrink-0 text-sm text-slate-400">{ADMIN_EMAIL_DOMAIN}</span>
        </div>
        <input
          className={`${inputClass} sm:col-span-2`}
          placeholder="Contraseña del administrador"
          type="password"
          required
          value={addForm.adminPassword}
          onChange={(e) => setAddForm({ ...addForm, adminPassword: e.target.value })}
        />
        <div className="sm:col-span-2">
          <p className="mb-2 text-sm font-medium text-slate-300">Capacidades del administrador (limita lo que puede hacer)</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {RESOURCE_CAPABILITY_PRESETS.prestador.map((capability) => (
              <label key={capability} className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" checked={capabilities.includes(capability)} onChange={() => toggleCapability(capability)} />
                {capability}
              </label>
            ))}
          </div>
        </div>
        <button className="btn-gradient rounded-full px-4 py-3 text-sm font-semibold text-forest-950 transition sm:col-span-2">
          Registrar negocio y administrador
        </button>
      </form>

      {message ? <p className="mt-4 text-sm text-brand-400">{message}</p> : null}
    </div>
  );
}

export default function BusinessManager() {
  const [category, setCategory] = useState<IconKey>(BUSINESS_CATEGORIES[0].key);
  const [, setRefreshKey] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyProfileForm);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState("");

  const prestadores = listPrestadoresByCategory(category);
  const categoryLabel = BUSINESS_CATEGORIES.find((c) => c.key === category)?.label ?? category;

  const refresh = () => setRefreshKey((key) => key + 1);

  const handleCategoryChange = (key: IconKey) => {
    setCategory(key);
    setEditingId(null);
    setMessage("");
  };

  const startEdit = (prestador: Prestador) => {
    setEditingId(prestador.id);
    setExpandedId(null);
    setEditForm({
      name: prestador.name,
      category: prestador.category as IconKey,
      description: prestador.description ?? "",
      address: prestador.address ?? "",
      phone: prestador.phone ?? "",
      instagram: prestador.instagram ?? "",
      schedule: prestador.schedule ?? "",
      priceRange: prestador.priceRange ?? "",
      imageUrl: prestador.imageUrl ?? "",
    });
  };

  const saveEdit = async (id: string) => {
    const label = BUSINESS_CATEGORIES.find((c) => c.key === editForm.category)?.label ?? editForm.category;
    await updatePrestador(id, {
      name: editForm.name,
      category: editForm.category,
      tipo: label,
      description: editForm.description,
      address: editForm.address,
      phone: editForm.phone,
      instagram: editForm.instagram,
      schedule: editForm.schedule,
      priceRange: editForm.priceRange,
      imageUrl: editForm.imageUrl,
    });
    setEditingId(null);
    refresh();
  };

  const handleDelete = async (prestador: Prestador) => {
    if (!window.confirm(`¿Eliminar "${prestador.name}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    await deletePrestador(prestador.id);
    refresh();
  };

  if (showAddForm) {
    return (
      <RegisterBusinessForm
        category={category}
        onCancel={() => setShowAddForm(false)}
        onSuccess={(successMessage) => {
          setShowAddForm(false);
          setMessage(successMessage);
          refresh();
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">Filtrar por categoría</label>
        <select
          className={`${inputClass} w-full max-w-sm`}
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value as IconKey)}
        >
          {BUSINESS_CATEGORIES.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border border-forest-700 bg-forest-950 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold text-slate-100">
            {categoryLabel} <span className="text-slate-400">({prestadores.length})</span>
          </h3>
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="btn-brand-font btn-gradient inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
          >
            + Agregar negocio
          </button>
        </div>

        {prestadores.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">Aún no hay negocios registrados en esta categoría.</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-forest-700">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-forest-950 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Negocio</th>
                  <th className="px-4 py-3 font-medium">Categoría</th>
                  <th className="px-4 py-3 font-medium">Nivel</th>
                  <th className="px-4 py-3 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {prestadores.map((prestador) => {
                  const isVerified = (prestador.badges ?? []).some((b) => b.toLowerCase().includes("verifi"));
                  return (
                    <Fragment key={prestador.id}>
                      <tr className="border-t border-forest-700 bg-forest-900">
                        <td className="px-4 py-3">
                          <div className="flex min-w-0 items-center gap-3">
                            {prestador.imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={prestador.imageUrl} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                            ) : (
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-800 text-xs text-slate-500">Sin foto</span>
                            )}
                            <div className="min-w-0">
                              <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-slate-100">
                                {prestador.name}
                                {isVerified ? <CheckIcon className="h-3.5 w-3.5 shrink-0 text-emerald-400" /> : null}
                              </p>
                              <p className="flex items-center gap-1 text-xs text-slate-500">
                                <EventPinIcon className="h-3 w-3 shrink-0" /> Yopal, Casanare
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-300">{prestador.tipo}</td>
                        <td className="px-4 py-3">
                          <LevelBadge priceRange={prestador.priceRange} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setExpandedId((current) => (current === prestador.id ? null : prestador.id))}
                              className="inline-flex items-center gap-1.5 rounded-full border border-forest-700 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-forest-800"
                            >
                              <EyeIcon className="h-3.5 w-3.5" /> {expandedId === prestador.id ? "Ocultar" : "Ver ficha"}
                            </button>
                            <button
                              type="button"
                              onClick={() => startEdit(prestador)}
                              className="inline-flex items-center gap-1.5 rounded-full border border-forest-700 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-forest-800"
                            >
                              <PencilIcon className="h-3.5 w-3.5" /> Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(prestador)}
                              className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10"
                            >
                              <TrashIcon className="h-3.5 w-3.5" /> Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                      {editingId === prestador.id ? (
                        <tr className="border-t border-forest-700 bg-forest-950">
                          <td colSpan={4} className="p-4">
                            <div className="grid gap-2 sm:grid-cols-2">
                              <input
                                className={`${inputClass} !py-2 sm:col-span-2`}
                                placeholder="Nombre del negocio"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              />
                              <select
                                className={`${inputClass} !py-2`}
                                value={editForm.category}
                                onChange={(e) => setEditForm({ ...editForm, category: e.target.value as IconKey })}
                              >
                                {BUSINESS_CATEGORIES.map((c) => (
                                  <option key={c.key} value={c.key}>
                                    {c.label}
                                  </option>
                                ))}
                              </select>
                              <select
                                className={`${inputClass} !py-2`}
                                value={editForm.priceRange}
                                onChange={(e) => setEditForm({ ...editForm, priceRange: e.target.value })}
                              >
                                <option value="">Rango de precios</option>
                                <option value="Bajo">Bajo</option>
                                <option value="Medio">Medio</option>
                                <option value="Alto">Alto</option>
                              </select>
                              <input
                                className={`${inputClass} !py-2`}
                                placeholder="Dirección"
                                value={editForm.address}
                                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                              />
                              <input
                                className={`${inputClass} !py-2`}
                                placeholder="Teléfono"
                                value={editForm.phone}
                                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                              />
                              <input
                                className={`${inputClass} !py-2`}
                                placeholder="Instagram (usuario o enlace)"
                                value={editForm.instagram}
                                onChange={(e) => setEditForm({ ...editForm, instagram: e.target.value })}
                              />
                              <input
                                className={`${inputClass} !py-2`}
                                placeholder="Horario de atención"
                                value={editForm.schedule}
                                onChange={(e) => setEditForm({ ...editForm, schedule: e.target.value })}
                              />
                              <ImageUploadField
                                className="sm:col-span-2"
                                compact
                                value={editForm.imageUrl}
                                onChange={(value) => setEditForm({ ...editForm, imageUrl: value })}
                              />
                              <textarea
                                className={`${inputClass} sm:col-span-2`}
                                placeholder="Descripción (hoja de vida del negocio)"
                                value={editForm.description}
                                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                              />
                              <div className="flex shrink-0 gap-2 sm:col-span-2">
                                <button type="button" onClick={() => saveEdit(prestador.id)} className="btn-gradient rounded-full px-3 py-1.5 text-xs font-semibold text-forest-950">
                                  Guardar
                                </button>
                                <button type="button" onClick={() => setEditingId(null)} className="rounded-full border border-forest-700 px-3 py-1.5 text-xs text-slate-300">
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : null}
                      {expandedId === prestador.id ? (
                        <tr className="border-t border-forest-700 bg-forest-950">
                          <td colSpan={4} className="p-4">
                            <dl className="grid gap-2 text-xs sm:grid-cols-2">
                              <div className="sm:col-span-2">
                                <dt className="text-slate-500">Descripción</dt>
                                <dd className="text-slate-300">{prestador.description || "Sin descripción."}</dd>
                              </div>
                              <div>
                                <dt className="text-slate-500">Dirección</dt>
                                <dd className="text-slate-300">{prestador.address || "—"}</dd>
                              </div>
                              <div>
                                <dt className="text-slate-500">Teléfono</dt>
                                <dd className="text-slate-300">{prestador.phone || "—"}</dd>
                              </div>
                              <div>
                                <dt className="text-slate-500">Instagram</dt>
                                <dd className="text-slate-300">{prestador.instagram || "—"}</dd>
                              </div>
                              <div>
                                <dt className="text-slate-500">Horario</dt>
                                <dd className="text-slate-300">{prestador.schedule || "—"}</dd>
                              </div>
                            </dl>
                            <PrestadorItemsSection prestadorId={prestador.id} category={prestador.category} />
                            <PrestadorProfileEditor prestadorId={prestador.id} category={prestador.category} />
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {message ? <p className="mt-4 text-sm text-brand-400">{message}</p> : null}
      </div>
    </div>
  );
}
