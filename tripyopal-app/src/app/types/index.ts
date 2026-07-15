export type Place = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  rating?: number;
  location?: string;
};

export type EventItem = {
  id: string;
  title: string;
  date: string;
  place: string;
  description: string;
};

export type RouteItem = {
  id: string;
  name: string;
  duration: string;
  description: string;
  budget: string;
};
