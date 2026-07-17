export type Role = "turista" | "prestador" | "multiusuario" | "agente-viajes" | "admin" | "superadmin";

export type ResourceType = "prestador" | "lugar" | "evento" | "ruta";

export type AdminScope = {
  resourceType: ResourceType;
  resourceId: string;
  resourceName: string;
  capabilities: string[];
};

export type UserPermission = {
  role: Role;
  capabilities: string[];
  scope?: AdminScope;
};

export type AppUser = {
  id: string;
  name: string;
  lastName?: string;
  username?: string;
  email: string;
  password: string;
  role: Role;
  businessType?: string;
  scope?: AdminScope;
  birthDate?: string;
  gender?: string;
  country?: string;
  department?: string;
  city?: string;
  phone?: string;
};
