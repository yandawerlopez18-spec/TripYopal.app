"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { getPermissionsForUser } from "../services/permissions";
import type { UserPermission } from "../types/roles";

type AuthContextValue = {
  email: string | null;
  permissions: UserPermission | null;
  login: (email: string, password: string) => UserPermission | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<UserPermission | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      email,
      permissions,
      login: (loginEmail: string, password: string) => {
        const result = getPermissionsForUser(loginEmail, password);

        if (!result) {
          return null;
        }

        setEmail(loginEmail);
        setPermissions(result);
        return result;
      },
      logout: () => {
        setEmail(null);
        setPermissions(null);
      },
    }),
    [email, permissions],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
