"use client";

import { useState } from "react";
import { BUSINESS_CATEGORIES, type IconKey } from "../home/categoryIcons";
import { deletePrestador, listPrestadoresByCategory, registerPrestador, updatePrestador, type Prestador } from "../../services/prestadores";
import { RESOURCE_CAPABILITY_PRESETS, createScopedAdmin } from "../../services/permissions";

const inputClass = "rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";

const emptyProfileForm = { name: "", category: "" as IconKey | "", description: "", address: "", phone: "", email: "", schedule: "", priceRange: "", imageUrl: "" };
const emptyAddForm = { ...emptyProfileForm, adminName: "", adminEmail: "", adminPassword: "" };

export default function BusinessManager() {
  const [category, setCategory] = useState<IconKey>(BUSINESS_CATEGORIES[0].key);
  const [, setRefreshKey] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyProfileForm);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState(emptyAddForm);
  const [capabilities, setCapabilities] = useState<string[]>(RESOURCE_CAPABILITY_PRESETS.prestador);
  const [message, setMessage] = useState("");

  const prestadores = listPrestadoresByCategory(category);
  const categoryLabel = BUSINESS_CATEGORIES.find((c) => c.key === category)?.label ?? category;

  const refresh = () => setRefreshKey((key) => key + 1);

  const handleCategoryChange = (key: IconKey) => {
    setCategory(key);
    setEditingId(null);
    setShowAddForm(false);
    setCapabilities(RESOURCE_CAPABILITY_PRESETS.prestador);
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
      email: prestador.email ?? "",
      schedule: prestador.schedule ?? "",
      priceRange: prestador.priceRange ?? "",
      imageUrl: prestador.imageUrl ?? "",
    });
  };

  const saveEdit = (id: string) => {
    const label = BUSINESS_CATEGORIES.find((c) => c.key === editForm.category)?.label ?? editForm.category;
    updatePrestador(id, {
      name: editForm.name,
      category: editForm.category,
      tipo: label,
      description: editForm.description || undefined,
      address: editForm.address || undefined,
      phone: editForm.phone || undefined,
      email: editForm.email || undefined,
      schedule: editForm.schedule || undefined,
      priceRange: editForm.priceRange || undefined,
      imageUrl: editForm.imageUrl || undefined,
    });
    setEditingId(null);
    refresh();
  };

  const handleDelete = (prestador: Prestador) => {
    if (!window.confirm(`¿Eliminar "${prestador.name}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    deletePrestador(prestador.id);
    refresh();
  };

  const toggleCapability = (capability: string) => {
    setCapabilities((current) =>
      current.includes(capability) ? current.filter((item) => item !== capability) : [...current, capability],
    );
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!addForm.name || !addForm.description || !addForm.address || !addForm.phone || !addForm.adminName || !addForm.adminEmail || !addForm.adminPassword) {
      setMessage("Completa la hoja de vida del negocio (nombre, descripción, dirección, teléfono) y los datos del administrador.");
      return;
    }

    const prestador = registerPrestador({
      name: addForm.name,
      tipo: categoryLabel,
      category,
      description: addForm.description,
      address: addForm.address,
      phone: addForm.phone,
      email: addForm.email || undefined,
      schedule: addForm.schedule || undefined,
      priceRange: addForm.priceRange || undefined,
      imageUrl: addForm.imageUrl || undefined,
    });

    createScopedAdmin({
      name: addForm.adminName,
      email: addForm.adminEmail,
      password: addForm.adminPassword,
      resourceType: "prestador",
      resourceId: prestador.id,
      resourceName: prestador.name,
      capabilities,
    });

    setMessage(`"${prestador.name}" quedó registrado en ${categoryLabel}, con administrador ${addForm.adminName}.`);
    setAddForm(emptyAddForm);
    setShowAddForm(false);
    refresh();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">Categoría</label>
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
            onClick={() => setShowAddForm((value) => !value)}
            className="btn-brand-font rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-forest-950 transition hover:bg-brand-400"
          >
            {showAddForm ? "Cancelar" : "Agregar negocio"}
          </button>
        </div>

        {prestadores.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">Aún no hay negocios registrados en esta categoría.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {prestadores.map((prestador) => (
              <li key={prestador.id} className="rounded-xl border border-forest-700 bg-forest-900 p-3">
                {editingId === prestador.id ? (
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
                      placeholder="Correo de contacto"
                      type="email"
                      spellCheck={false}
                      autoCorrect="off"
                      autoCapitalize="off"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    />
                    <input
                      className={`${inputClass} !py-2`}
                      placeholder="Horario de atención"
                      value={editForm.schedule}
                      onChange={(e) => setEditForm({ ...editForm, schedule: e.target.value })}
                    />
                    <input
                      className={`${inputClass} !py-2 sm:col-span-2`}
                      placeholder="URL de la imagen (opcional)"
                      value={editForm.imageUrl}
                      onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                    />
                    <textarea
                      className={`${inputClass} sm:col-span-2`}
                      placeholder="Descripción (hoja de vida del negocio)"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    />
                    <div className="flex shrink-0 gap-2 sm:col-span-2">
                      <button type="button" onClick={() => saveEdit(prestador.id)} className="rounded-full bg-brand-500 px-3 py-1.5 text-xs font-semibold text-forest-950">
                        Guardar
                      </button>
                      <button type="button" onClick={() => setEditingId(null)} className="rounded-full border border-forest-700 px-3 py-1.5 text-xs text-slate-300">
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        {prestador.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={prestador.imageUrl} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                        ) : (
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-800 text-xs text-slate-500">Sin foto</span>
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-100">{prestador.name}</p>
                          <p className="text-xs text-slate-400">
                            {prestador.tipo}
                            {prestador.priceRange ? ` · ${prestador.priceRange}` : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={() => setExpandedId((current) => (current === prestador.id ? null : prestador.id))}
                          className="rounded-full border border-forest-700 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-forest-800"
                        >
                          {expandedId === prestador.id ? "Ocultar" : "Ver hoja de vida"}
                        </button>
                        <button type="button" onClick={() => startEdit(prestador)} className="rounded-full border border-forest-700 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-forest-800">
                          Editar
                        </button>
                        <button type="button" onClick={() => handleDelete(prestador)} className="rounded-full border border-red-500/40 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10">
                          Eliminar
                        </button>
                      </div>
                    </div>
                    {expandedId === prestador.id ? (
                      <dl className="mt-3 grid gap-2 border-t border-forest-700 pt-3 text-xs sm:grid-cols-2">
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
                          <dt className="text-slate-500">Correo de contacto</dt>
                          <dd className="text-slate-300">{prestador.email || "—"}</dd>
                        </div>
                        <div>
                          <dt className="text-slate-500">Horario</dt>
                          <dd className="text-slate-300">{prestador.schedule || "—"}</dd>
                        </div>
                      </dl>
                    ) : null}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {showAddForm ? (
          <form onSubmit={handleAddSubmit} className="mt-5 grid gap-3 border-t border-forest-700 pt-5 sm:grid-cols-2">
            <p className="text-sm font-medium text-slate-300 sm:col-span-2">
              Hoja de vida del negocio — así se presenta {categoryLabel.toLowerCase()} dentro de la plataforma.
            </p>
            <input
              className={`${inputClass} sm:col-span-2`}
              placeholder={`Nombre del ${categoryLabel.toLowerCase()}`}
              value={addForm.name}
              onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
            />
            <input
              className={`${inputClass} sm:col-span-2`}
              placeholder="URL de la imagen del establecimiento (opcional)"
              value={addForm.imageUrl}
              onChange={(e) => setAddForm({ ...addForm, imageUrl: e.target.value })}
            />
            <textarea
              className={`${inputClass} sm:col-span-2`}
              placeholder="Descripción del negocio"
              value={addForm.description}
              onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
            />
            <input
              className={inputClass}
              placeholder="Dirección"
              value={addForm.address}
              onChange={(e) => setAddForm({ ...addForm, address: e.target.value })}
            />
            <input
              className={inputClass}
              placeholder="Teléfono"
              value={addForm.phone}
              onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
            />
            <input
              className={inputClass}
              placeholder="Correo de contacto (opcional)"
              type="email"
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              value={addForm.email}
              onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
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

            <p className="mt-2 text-sm font-medium text-slate-300 sm:col-span-2">Administrador asignado a este negocio</p>
            <input
              className={inputClass}
              placeholder="Nombre del administrador"
              value={addForm.adminName}
              onChange={(e) => setAddForm({ ...addForm, adminName: e.target.value })}
            />
            <input
              className={inputClass}
              placeholder="Correo del administrador"
              type="email"
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              value={addForm.adminEmail}
              onChange={(e) => setAddForm({ ...addForm, adminEmail: e.target.value })}
            />
            <input
              className={`${inputClass} sm:col-span-2`}
              placeholder="Contraseña del administrador"
              type="password"
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
            <button className="rounded-full bg-brand-500 px-4 py-3 text-sm font-semibold text-forest-950 transition hover:bg-brand-400 sm:col-span-2">
              Registrar negocio y administrador
            </button>
          </form>
        ) : null}

        {message ? <p className="mt-4 text-sm text-brand-400">{message}</p> : null}
      </div>
    </div>
  );
}
