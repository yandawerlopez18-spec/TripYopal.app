import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Place } from "../types";
import { featuredPlaces } from "./content";

export async function getPlaces(): Promise<Place[]> {
  if (!db) {
    return featuredPlaces;
  }

  const snapshot = await getDocs(collection(db, "places"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Place, "id">),
  }));
}
