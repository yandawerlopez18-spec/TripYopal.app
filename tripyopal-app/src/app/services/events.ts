import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { EventItem } from "../types";
import { featuredEvents } from "./content";

export async function getEvents(): Promise<EventItem[]> {
  if (!db) {
    return featuredEvents;
  }

  const snapshot = await getDocs(collection(db, "events"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<EventItem, "id">),
  }));
}
