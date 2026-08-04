import type { EventItem } from "../types";
import { featuredEvents } from "./content";

export async function getEvents(): Promise<EventItem[]> {
  return featuredEvents;
}
