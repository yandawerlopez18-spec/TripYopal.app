"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { hydrateContentFromDatabase } from "../services/content";
import { hydratePrestadoresFromDatabase } from "../services/prestadores";
import { hydrateUsersFromDatabase } from "../services/permissions";
import { hydrateSiteContentFromDatabase } from "../services/siteContent";

const DataHydrationContext = createContext(0);

/**
 * All module-level "databases" in services/ start from seed data (identical on
 * server and client) so the first client render matches the server-rendered HTML
 * and hydration never mismatches. The real rows from PostgreSQL are only fetched
 * after mount, here, which then bumps this context's version number.
 *
 * Mutating the module-level arrays alone is not enough to update already-mounted
 * components — Next.js's App Router does not re-render `children` just because an
 * ancestor layout's local state changes. Reading this context's value (even if
 * unused) in any component that reads services/* data at render time forces that
 * component to re-render once the real data replaces the seed data.
 */
export function DataHydrationProvider({ children }: { children: React.ReactNode }) {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    async function hydrate() {
      await Promise.all([
        hydrateContentFromDatabase(),
        hydratePrestadoresFromDatabase(),
        hydrateUsersFromDatabase(),
        hydrateSiteContentFromDatabase(),
      ]);
      setVersion((value) => value + 1);
    }

    hydrate();
  }, []);

  return <DataHydrationContext.Provider value={version}>{children}</DataHydrationContext.Provider>;
}

export function useDataHydration() {
  return useContext(DataHydrationContext);
}
