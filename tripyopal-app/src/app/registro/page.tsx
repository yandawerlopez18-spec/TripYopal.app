"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { createDemoUser, findUserByEmail } from "../services/permissions";
import { COLOMBIA_DEPARTMENTS, COLOMBIA_DEPARTMENT_NAMES } from "../services/colombia";

const inputClass =
  "w-full rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-300";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  return [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 10)].filter(Boolean).join(" ");
}

export default function RegistroPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    gender: "",
    country: "Colombia",
    department: "",
    city: "",
    phone: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [status, setStatus] = useState("Crea tu cuenta para guardar preferencias y rutas.");

  const isColombia = form.country === "Colombia";
  const cityOptions = isColombia ? COLOMBIA_DEPARTMENTS[form.department] ?? [] : [];

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForm({ ...form, country: e.target.value, department: "", city: "" });

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForm({ ...form, department: e.target.value, city: "" });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, phone: formatPhone(e.target.value) });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const required = [
      form.nombre,
      form.apellido,
      form.username,
      form.email,
      form.password,
      form.confirmPassword,
      form.country,
      form.department,
      form.city,
      form.phone,
    ];

    if (required.some((field) => !field)) {
      setStatus("Completa todos los campos obligatorios.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setStatus("La contraseña y la confirmación no coinciden.");
      return;
    }

    if (await findUserByEmail(form.email)) {
      setStatus("Ya existe una cuenta registrada con este correo. Inicia sesión en su lugar.");
      return;
    }

    if (!acceptedTerms) {
      setStatus("Debes aceptar los términos y condiciones y la política de datos para continuar.");
      return;
    }

    await createDemoUser({
      id: crypto.randomUUID(),
      name: form.nombre,
      lastName: form.apellido,
      username: form.username,
      email: form.email,
      password: form.password,
      role: "turista",
      birthDate: form.birthDate || undefined,
      gender: form.gender || undefined,
      country: form.country,
      department: form.department,
      city: form.city,
      phone: form.phone,
    });

    await login(form.email, form.password);
    setStatus(`Cuenta creada, ¡bienvenido ${form.nombre}! Ya iniciaste sesión como turista.`);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-forest-950 px-6 py-16 text-slate-100 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/"
          className="btn-brand-font btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-forest-950 transition"
        >
          ← Volver al inicio
        </Link>

        <div className="mt-6 rounded-3xl border border-forest-700 bg-forest-900 p-8 shadow-xl">
        <h1 className="text-center font-[family-name:var(--font-brand)] text-3xl font-bold text-white">Crear cuenta</h1>
        <p className="mt-2 text-center text-sm text-slate-400">
          El registro público es para turistas. Explora lugares, guarda favoritos y recibe recomendaciones personalizadas.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Nombre</label>
            <input className={inputClass} value={form.nombre} onChange={update("nombre")} placeholder="Ej. Andrea" />
          </div>
          <div>
            <label className={labelClass}>Apellido</label>
            <input className={inputClass} value={form.apellido} onChange={update("apellido")} placeholder="Ej. Torres" />
          </div>

          <div>
            <label className={labelClass}>Nombre de usuario</label>
            <input className={inputClass} value={form.username} onChange={update("username")} placeholder="Ej. andrea.t" />
          </div>
          <div>
            <label className={labelClass}>Correo electrónico</label>
            <input
              className={inputClass}
              type="email"
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              value={form.email}
              onChange={update("email")}
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div>
            <label className={labelClass}>Contraseña</label>
            <input className={inputClass} type="password" value={form.password} onChange={update("password")} placeholder="••••••••" />
          </div>
          <div>
            <label className={labelClass}>Confirmar contraseña</label>
            <input className={inputClass} type="password" value={form.confirmPassword} onChange={update("confirmPassword")} placeholder="••••••••" />
          </div>

          <div>
            <label className={labelClass}>Fecha de nacimiento (opcional)</label>
            <input className={inputClass} type="date" value={form.birthDate} onChange={update("birthDate")} />
          </div>
          <div>
            <label className={labelClass}>Género (opcional)</label>
            <select className={inputClass} value={form.gender} onChange={update("gender")}>
              <option value="">Prefiero no decir</option>
              <option value="femenino">Femenino</option>
              <option value="masculino">Masculino</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>País</label>
            <select className={inputClass} value={form.country} onChange={handleCountryChange}>
              <option value="Colombia">Colombia</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Departamento</label>
            {isColombia ? (
              <select className={inputClass} value={form.department} onChange={handleDepartmentChange}>
                <option value="">Selecciona un departamento</option>
                {COLOMBIA_DEPARTMENT_NAMES.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            ) : (
              <input className={inputClass} value={form.department} onChange={update("department")} placeholder="Escribe tu departamento o región" />
            )}
          </div>

          <div>
            <label className={labelClass}>Ciudad</label>
            {isColombia ? (
              <select className={inputClass} value={form.city} onChange={update("city")} disabled={!form.department}>
                <option value="">{form.department ? "Selecciona una ciudad" : "Elige primero un departamento"}</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            ) : (
              <input className={inputClass} value={form.city} onChange={update("city")} placeholder="Escribe tu ciudad" />
            )}
          </div>
          <div>
            <label className={labelClass}>Número de celular</label>
            <input className={inputClass} value={form.phone} onChange={handlePhoneChange} placeholder="300 000 0000" inputMode="numeric" />
          </div>

          <label className="flex items-start gap-2.5 text-sm text-slate-300 sm:col-span-2">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-forest-700 bg-forest-950 accent-brand-500"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <span>
              He leído y acepto los{" "}
              <Link href="/terminos" target="_blank" className="font-semibold text-brand-400 hover:text-brand-300">
                términos y condiciones
              </Link>{" "}
              y la{" "}
              <Link href="/terminos#datos" target="_blank" className="font-semibold text-brand-400 hover:text-brand-300">
                política de datos
              </Link>{" "}
              de TripYopal.
            </span>
          </label>

          <button
            disabled={!acceptedTerms}
            className="btn-gradient rounded-full px-4 py-3 font-semibold text-forest-950 transition disabled:cursor-not-allowed disabled:opacity-40 sm:col-span-2"
          >
            Registrarme
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-400">{status}</p>
        <p className="mt-4 text-sm text-slate-400">
          ¿Ya tienes cuenta? <Link href="/login" className="font-semibold text-brand-400 hover:text-brand-300">Inicia sesión</Link>
        </p>
        </div>
      </div>
    </main>
  );
}
