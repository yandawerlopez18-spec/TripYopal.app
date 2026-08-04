import { CapIcon, EventPinIcon, ForkIcon, LeafIcon, PaletteIcon } from "../components/home/infoIcons";

type IconComponent = (props: { className?: string }) => React.ReactElement;

type EventCategoryGuess = { label: string; icon: IconComponent; badgeClass: string };

/**
 * EventItem has no dedicated category field, so the label/icon shown on activity
 * cards is guessed from keywords in the title/description — good enough for a
 * decorative badge, not used for any filtering logic.
 */
export function guessEventCategory(title: string, description = ""): EventCategoryGuess {
  const text = `${title} ${description}`.toLowerCase();

  if (text.includes("gastronom") || text.includes("comida")) {
    return { label: "Gastronomía", icon: ForkIcon, badgeClass: "bg-amber-500 text-amber-950" };
  }
  if (text.includes("ecológic") || text.includes("ecologic") || text.includes("camina") || text.includes("natural")) {
    return { label: "Naturaleza", icon: LeafIcon, badgeClass: "bg-emerald-500 text-emerald-950" };
  }
  if (text.includes("médic") || text.includes("medic") || text.includes("salud") || text.includes("clínic") || text.includes("clinic") || text.includes("hospital")) {
    return { label: "Salud", icon: EventPinIcon, badgeClass: "bg-teal-500 text-teal-950" };
  }
  if (text.includes("artesan") || text.includes("feria") || text.includes("fiesta") || text.includes("tradici") || text.includes("danza")) {
    return { label: "Cultura", icon: PaletteIcon, badgeClass: "bg-purple-500 text-purple-950" };
  }
  if (text.includes("universi") || text.includes("aniversario") || text.includes("unitr")) {
    return { label: "Educativo", icon: CapIcon, badgeClass: "bg-sky-500 text-sky-950" };
  }

  return { label: "Evento", icon: EventPinIcon, badgeClass: "bg-brand-500 text-forest-950" };
}
