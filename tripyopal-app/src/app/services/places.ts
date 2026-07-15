import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Place } from "../types";
import { lugares as localPlaces } from "../lib/data";

export async function getPlaces(): Promise<Place[]> {
  if (!db) {
    return localPlaces.map((lugar) => ({
      id: String(lugar.id),
      name: lugar.nombre,
      category: lugar.categoria,
      description: lugar.descripcion,
      price: lugar.precio,
    }));
  }

  const snapshot = await getDocs(collection(db, "places"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Place, "id">),
  }));
}
