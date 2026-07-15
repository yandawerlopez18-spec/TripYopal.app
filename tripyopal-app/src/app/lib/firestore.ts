import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function getPlaces() {
  if (!db) {
    return [];
  }

  const snapshot = await getDocs(collection(db, "places"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getEvents() {
  if (!db) {
    return [];
  }

  const snapshot = await getDocs(collection(db, "events"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
