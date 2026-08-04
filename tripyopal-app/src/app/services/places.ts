import type { Place } from "../types";
import { featuredPlaces } from "./content";

export async function getPlaces(): Promise<Place[]> {
  return featuredPlaces;
}
