import type { AdminScope, AppUser, Role, UserPermission } from "../types/roles";

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

const demoUsers: AppUser[] = [
  {
    id: "super-1",
    name: "Administrador principal",
    email: "admin@tripyopal.com",
    password: "admin123",
    role: "superadmin",
  },
  {
    id: "admin-hotel-la-sabana",
    name: "Dueño de Hotel La Sabana",
    email: "dueno@sitex.com",
    password: "site123",
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
    password: "visit123",
    role: "turista",
  },
];

function resolvePermission(user: AppUser): UserPermission {
  if (user.role === "admin" && user.scope) {
    return { role: user.role, capabilities: user.scope.capabilities, scope: user.scope };
  }

  return { role: user.role, capabilities: ROLE_CAPABILITIES[user.role as Exclude<Role, "admin">] ?? [] };
}

export function getPermissionsForUser(email: string, password: string): UserPermission | null {
  const user = demoUsers.find((entry) => entry.email === email && entry.password === password);

  if (!user) {
    return null;
  }

  return resolvePermission(user);
}

export function createDemoUser(user: AppUser) {
  demoUsers.push(user);
  return user;
}

export function createScopedAdmin(input: {
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
