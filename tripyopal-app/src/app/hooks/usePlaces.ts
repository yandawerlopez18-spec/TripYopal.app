"use client";

import { useEffect, useState } from "react";
import { getPlaces } from "../services/places";
import type { Place } from "../types";

export function usePlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlaces() {
      try {
        const data = await getPlaces();
        setPlaces(data);
      } catch {
        setError("No fue posible cargar los lugares");
      } finally {
        setLoading(false);
      }
    }

    loadPlaces();
  }, []);

  return { places, loading, error };
}
