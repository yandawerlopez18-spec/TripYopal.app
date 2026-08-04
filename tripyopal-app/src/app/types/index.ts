export type Place = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  rating?: number;
  location?: string;
  imageUrl?: string;
};

export type EventFeature = { id: string; icon: string; label: string };
export type AgendaItem = { id: string; time: string; title: string; description?: string; imageUrl?: string };
export type Ally = { id: string; name: string; subtitle?: string; imageUrl?: string };

export type EventItem = {
  id: string;
  title: string;
  date: string;
  place: string;
  description: string;
  imageUrl?: string;
  time?: string;
  modality?: string;
  category?: string;
  longDescription?: string;
  endTime?: string;
  address?: string;
  organizer?: string;
  contactPhone?: string;
  contactEmail?: string;
  featured?: boolean;
  interestedCount?: number;
  features?: EventFeature[];
  agenda?: AgendaItem[];
  allies?: Ally[];
  whyAttend?: string[];
};

export type RouteItem = {
  id: string;
  name: string;
  duration: string;
  description: string;
  budget: string;
  imageUrl?: string;
};
