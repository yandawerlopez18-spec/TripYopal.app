import { ForkIcon, LeafIcon, MusicIcon, MuseumIcon, SportIcon, UsersIcon } from "../components/home/infoIcons";

type IconComponent = (props: { className?: string }) => React.ReactElement;

export type LiveEventCategory = {
  key: string;
  label: string;
  icon: IconComponent;
  badgeClass: string;
  accentClass: string;
};

const BADGE_CLASS = "bg-forest-950/85 text-white border border-brand-500/60 backdrop-blur";

export const LIVE_EVENT_CATEGORIES: LiveEventCategory[] = [
  { key: "cultura", label: "Cultura", icon: MuseumIcon, badgeClass: BADGE_CLASS, accentClass: "text-brand-400" },
  { key: "deportes", label: "Deportes", icon: SportIcon, badgeClass: BADGE_CLASS, accentClass: "text-brand-400" },
  { key: "gastronomia", label: "Gastronomía", icon: ForkIcon, badgeClass: BADGE_CLASS, accentClass: "text-brand-400" },
  { key: "naturaleza", label: "Naturaleza", icon: LeafIcon, badgeClass: BADGE_CLASS, accentClass: "text-brand-400" },
  { key: "musica", label: "Música", icon: MusicIcon, badgeClass: BADGE_CLASS, accentClass: "text-brand-400" },
  { key: "familia", label: "Familia", icon: UsersIcon, badgeClass: BADGE_CLASS, accentClass: "text-brand-400" },
];

const fallback = LIVE_EVENT_CATEGORIES[0];

/** EventItem has no category field, so this is guessed from title/description keywords — a decorative/filtering aid, not a stored fact. */
export function guessLiveEventCategory(title: string, description: string): LiveEventCategory {
  const text = `${title} ${description}`.toLowerCase();

  if (/gastronom|comida|sabor|culinari/.test(text)) return LIVE_EVENT_CATEGORIES[2];
  if (/deport|marat[oó]n|ciclismo|f[uú]tbol|carrera|torneo/.test(text)) return LIVE_EVENT_CATEGORIES[1];
  if (/ecol[oó]gic|caminata|sendero|natural|parque/.test(text)) return LIVE_EVENT_CATEGORIES[3];
  if (/m[uú]sica|concierto|banda|\bdj\b/.test(text)) return LIVE_EVENT_CATEGORIES[4];
  if (/familiar|ni[ñn]os|infantil|familia/.test(text)) return LIVE_EVENT_CATEGORIES[5];
  if (/cultural|tradici|danza|arte|feria|aniversario|universi|festival/.test(text)) return LIVE_EVENT_CATEGORIES[0];

  return fallback;
}
