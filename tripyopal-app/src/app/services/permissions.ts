import type { AdminScope, AppUser, Role, UserPermission } from "../types/roles";
import { listPrestadores } from "./prestadores";

export const ROLE_CAPABILITIES: Record<Exclude<Role, "admin">, string[]> = {
  turista: [
    "Explorar destinos",
    "Buscar lugares y servicios",
    "Consultar eventos y clima",
    "Generar rutas con IA",
    "Crear agenda de viaje",
    "Reservar servicios",
    "Guardar favoritos",
    "Calificar y comentar",
    "Hablar con el chatbot",
  ],
  prestador: [
    "Registrarse y crear perfil",
    "Publicar servicios y productos",
    "Gestionar precios",
    "Gestionar disponibilidad",
    "Gestionar reservas",
    "Gestionar inventario",
    "Ver estadísticas",
    "Responder reseñas",
  ],
  multiusuario: [
    "Gestionar sucursales",
    "Gestionar empleados",
    "Gestionar múltiples servicios",
    "Gestionar productos",
    "Gestionar reservas",
    "Ver reportes consolidados",
    "Asignar roles y permisos",
  ],
  "agente-viajes": [
    "Crear paquetes turísticos",
    "Diseñar rutas e itinerarios",
    "Organizar agenda de viaje",
    "Recomendar destinos",
    "Gestionar reservas",
    "Vender paquetes",
    "Gestionar clientes",
    "Ver comisiones y reportes",
  ],
  superadmin: [
    "Aprobar prestadores y agentes",
    "Gestionar usuarios y roles",
    "Gestionar lugares y eventos",
    "Gestionar seguridad",
    "Gestionar contenido",
    "Ver estadísticas y reportes",
    "Configurar el sistema",
    "Crear y limitar administradores",
  ],
};

export const RESOURCE_CAPABILITY_PRESETS: Record<AdminScope["resourceType"], string[]> = {
  prestador: [
    "Gestionar servicios y productos del negocio",
    "Gestionar precios y disponibilidad",
    "Gestionar reservas",
    "Gestionar inventario",
    "Ver estadísticas del negocio",
    "Responder reseñas",
  ],
  lugar: [
    "Editar información del lugar",
    "Gestionar galería de imágenes",
    "Responder reseñas",
    "Ver estadísticas del lugar",
  ],
  evento: [
    "Editar información del evento",
    "Gestionar cupos y fechas",
    "Ver estadísticas del evento",
  ],
  ruta: [
    "Editar itinerario de la ruta",
    "Gestionar recomendaciones asociadas",
    "Ver estadísticas de la ruta",
  ],
};

const seedUsers: AppUser[] = [
  {
    id: "super-1",
    name: "Administrador principal",
    email: "admin@tripyopal.com",
    password: "",
    role: "superadmin",
  },
  {
    id: "admin-hotel-la-sabana",
    name: "Dueño de Hotel La Sabana",
    email: "dueno@sitex.com",
    password: "",
    role: "admin",
    scope: {
      resourceType: "prestador",
      resourceId: "hotel-la-sabana",
      resourceName: "Hotel La Sabana",
      capabilities: RESOURCE_CAPABILITY_PRESETS.prestador,
    },
  },
  {
    id: "turista-1",
    name: "Visitante",
    email: "visitante@example.com",
    password: "",
    role: "turista",
  },
];

/**
 * Starts as seed data (identical on server and client, password stripped since it's
 * never needed for display) so the first client render matches the server-rendered
 * HTML and hydration never mismatches. `hydrateUsersFromDatabase` replaces its
 * contents with the real rows from PostgreSQL (also without passwords) right after
 * mount (see DataHydrationContext). Login/session verification never goes through
 * this cache — it's handled server-side by /api/auth/*.
 */
const demoUsers: AppUser[] = [...seedUsers];

export async function hydrateUsersFromDatabase() {
  try {
    const response = await fetch("/api/users");
    const data: AppUser[] = await response.json();
    demoUsers.length = 0;
    demoUsers.push(...data);
  } catch {
    // Keep the seed data as a fallback if the database is unreachable.
  }
}

/** Used server-side (by /api/auth/login and /api/auth/session) to shape a User row into a UserPermission. */
export function resolvePermission(user: { role: string; scope?: unknown }): UserPermission {
  if (user.role === "admin" && user.scope) {
    const scope = user.scope as AdminScope;
    return { role: "admin", capabilities: scope.capabilities, scope };
  }

  return { role: user.role as Role, capabilities: ROLE_CAPABILITIES[user.role as Exclude<Role, "admin">] ?? [] };
}

export async function createDemoUser(user: AppUser) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const created: AppUser = await response.json();
  demoUsers.push(created);
  return created;
}

export async function findUserByEmail(email: string) {
  const response = await fetch(`/api/users?email=${encodeURIComponent(email)}`);
  const user: AppUser | null = await response.json();
  return user ?? undefined;
}

export function listUsers() {
  return demoUsers;
}

export function listAdmins() {
  return demoUsers.filter((entry) => entry.role === "admin" && entry.scope);
}

export function getAdminCategoryKey(user: AppUser): string | null {
  if (user.role !== "admin" || !user.scope) return null;

  if (user.scope.resourceType === "prestador") {
    const prestador = listPrestadores().find((entry) => entry.id === user.scope!.resourceId);
    return prestador?.category ?? null;
  }

  return user.scope.resourceType;
}

export async function updateUser(id: string, updates: Partial<Omit<AppUser, "id">>) {
  const response = await fetch(`/api/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  const updated: AppUser = await response.json();
  const user = demoUsers.find((entry) => entry.id === id);
  if (user) Object.assign(user, updated);
  return user;
}

/** Superadmin-only: fetches a user's real password from the database (never included in listUsers/listAdmins). */
export async function getUserPassword(id: string): Promise<string> {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("tripyopal_session_token") : null;
  if (!token) return "";

  const response = await fetch(`/api/users/${id}/password`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) return "";
  const data = await response.json();
  return data.password ?? "";
}

export async function deleteUser(id: string) {
  await fetch(`/api/users/${id}`, { method: "DELETE" });
  const index = demoUsers.findIndex((entry) => entry.id === id);
  if (index !== -1) demoUsers.splice(index, 1);
}

export async function createScopedAdmin(input: {
  name: string;
  email: string;
  password: string;
  resourceType: AdminScope["resourceType"];
  resourceId: string;
  resourceName: string;
  capabilities: string[];
}) {
  const user: AppUser = {
    id: crypto.randomUUID(),
    name: input.name,
    email: input.email,
    password: input.password,
    role: "admin",
    scope: {
      resourceType: input.resourceType,
      resourceId: input.resourceId,
      resourceName: input.resourceName,
      capabilities: input.capabilities,
    },
  };

  return createDemoUser(user);
}
