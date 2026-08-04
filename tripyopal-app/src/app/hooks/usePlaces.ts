"use client";

import { useEffect, useState } from "react";
import { useDataHydration } from "../context/DataHydrationContext";
import { getPlaces } from "../services/places";
import type { Place } from "../types";

export function usePlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hydrationVersion = useDataHydration();

  useEffect(() => {
    async function loadPlaces() {
      try {
        const data = await getPlaces();
        // getPlaces() returns the shared featuredPlaces array, mutated in place by
        // hydration rather than replaced — spread it so React sees a new reference
        // and doesn't bail out of re-rendering when only the contents changed.
        setPlaces([...data]);
      } catch {
        setError("No fue posible cargar los lugares");
      } finally {
        setLoading(false);
      }
    }

    loadPlaces();
  }, [hydrationVersion]);

  return { places, loading, error };
}
