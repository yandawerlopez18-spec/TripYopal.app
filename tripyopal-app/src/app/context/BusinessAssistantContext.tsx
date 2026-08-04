"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Prestador } from "../services/prestadores";

type BusinessAssistantContextValue = {
  activeBusiness: Prestador | null;
  setActiveBusiness: (prestador: Prestador | null) => void;
};

const BusinessAssistantContext = createContext<BusinessAssistantContextValue | null>(null);

export function BusinessAssistantProvider({ children }: { children: ReactNode }) {
  const [activeBusiness, setActiveBusiness] = useState<Prestador | null>(null);
  const value = useMemo(() => ({ activeBusiness, setActiveBusiness }), [activeBusiness]);

  return <BusinessAssistantContext.Provider value={value}>{children}</BusinessAssistantContext.Provider>;
}

export function useBusinessAssistant() {
  const context = useContext(BusinessAssistantContext);
  if (!context) {
    throw new Error("useBusinessAssistant must be used within a BusinessAssistantProvider");
  }
  return context;
}
