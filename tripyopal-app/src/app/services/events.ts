import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { EventItem } from "../types";
import { eventos as localEvents } from "../lib/data";

export async function getEvents(): Promise<EventItem[]> {
  if (!db) {
    return localEvents.map((evento) => ({
      id: String(evento.id),
      title: evento.titulo,
      date: evento.fecha,
      place: evento.lugar,
      description: evento.descripcion,
    }));
  }

  const snapshot = await getDocs(collection(db, "events"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<EventItem, "id">),
  }));
}
