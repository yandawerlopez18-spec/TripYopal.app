import { MuseumIcon, TagIcon, TreeIcon, WalkIcon } from "../components/home/infoIcons";

type IconComponent = (props: { className?: string }) => React.ReactElement;

type PlaceCategoryStyle = { icon: IconComponent; badgeClass: string; textClass: string };

const styles: Record<string, PlaceCategoryStyle> = {
  Naturaleza: { icon: TreeIcon, badgeClass: "bg-emerald-500/90 text-emerald-950", textClass: "text-emerald-400" },
  Cultura: { icon: MuseumIcon, badgeClass: "bg-purple-500/90 text-purple-950", textClass: "text-purple-400" },
  Recreación: { icon: WalkIcon, badgeClass: "bg-sky-500/90 text-sky-950", textClass: "text-sky-400" },
};

const fallback: PlaceCategoryStyle = { icon: TagIcon, badgeClass: "bg-forest-700 text-slate-100", textClass: "text-slate-300" };

export function getPlaceCategoryStyle(category: string): PlaceCategoryStyle {
  return styles[category] ?? fallback;
}
