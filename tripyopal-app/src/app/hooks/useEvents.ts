"use client";

import { useEffect, useState } from "react";
import { useDataHydration } from "../context/DataHydrationContext";
import { getEvents } from "../services/events";
import type { EventItem } from "../types";

export function useEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hydrationVersion = useDataHydration();

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();
        // getEvents() returns the shared featuredEvents array, mutated in place by
        // hydration rather than replaced — spread it so React sees a new reference
        // and doesn't bail out of re-rendering when only the contents changed.
        setEvents([...data]);
      } catch {
        setError("No fue posible cargar los eventos");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, [hydrationVersion]);

  return { events, loading, error };
}
