"use client";

import { useEffect, useState } from "react";
import { getEvents } from "../services/events";
import type { EventItem } from "../types";

export function useEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch {
        setError("No fue posible cargar los eventos");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  return { events, loading, error };
}
