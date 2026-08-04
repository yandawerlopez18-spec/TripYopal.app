"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { UserPermission } from "../types/roles";

const SESSION_TOKEN_KEY = "tripyopal_session_token";

type AuthContextValue = {
  email: string | null;
  permissions: UserPermission | null;
  sessionLoading: boolean;
  login: (email: string, password: string) => Promise<UserPermission | null>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<UserPermission | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const token = window.localStorage.getItem(SESSION_TOKEN_KEY);

      if (token) {
        try {
          const response = await fetch("/api/auth/session", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const data = await response.json();
            setEmail(data.email);
            setPermissions(data.permission);
          } else {
            window.localStorage.removeItem(SESSION_TOKEN_KEY);
          }
        } catch {
          // Keep the user logged out if the database is unreachable.
        }
      }

      setSessionLoading(false);
    }

    restoreSession();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      email,
      permissions,
      sessionLoading,
      login: async (loginEmail: string, password: string) => {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: loginEmail, password }),
        });

        if (!response.ok) {
          return null;
        }

        const data = await response.json();
        setEmail(data.email);
        setPermissions(data.permission);
        window.localStorage.setItem(SESSION_TOKEN_KEY, data.token);
        return data.permission;
      },
      logout: () => {
        const token = window.localStorage.getItem(SESSION_TOKEN_KEY);

        if (token) {
          fetch("/api/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          }).catch(() => {});
        }

        setEmail(null);
        setPermissions(null);
        window.localStorage.removeItem(SESSION_TOKEN_KEY);
      },
    }),
    [email, permissions, sessionLoading],
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
