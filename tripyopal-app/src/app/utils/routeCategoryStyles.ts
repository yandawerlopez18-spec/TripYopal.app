import { EventPinIcon, MountainIcon, MuseumIcon, TreeIcon } from "../components/home/infoIcons";

type IconComponent = (props: { className?: string }) => React.ReactElement;

type RouteStyle = {
  category: string;
  tagline: string;
  icon: IconComponent;
  badgeClass: string;
  iconBgClass: string;
  accentClass: string;
  pillClass: string;
  buttonClass: string;
};

const styles: Record<string, RouteStyle> = {
  "ruta-centro": {
    category: "Naturaleza",
    tagline: "Conecta con la naturaleza y relájate",
    icon: TreeIcon,
    badgeClass: "bg-forest-950/85 text-white border border-brand-500/60 backdrop-blur",
    iconBgClass: "bg-lime-500/10 text-lime-400",
    accentClass: "text-lime-400",
    pillClass: "border border-lime-500/30 bg-lime-500/10 text-lime-400",
    buttonClass: "border border-lime-500/40 text-lime-400 hover:bg-lime-500/10",
  },
  "ruta-cultural": {
    category: "Cultura",
    tagline: "Descubre la historia y tradiciones llaneras",
    icon: MuseumIcon,
    badgeClass: "bg-forest-950/85 text-white border border-brand-500/60 backdrop-blur",
    iconBgClass: "bg-pink-500/10 text-pink-400",
    accentClass: "text-pink-400",
    pillClass: "border border-pink-500/30 bg-pink-500/10 text-pink-400",
    buttonClass: "border border-pink-500/40 text-pink-400 hover:bg-pink-500/10",
  },
  "ruta-aventura": {
    category: "Aventura",
    tagline: "Vive experiencias inolvidables",
    icon: MountainIcon,
    badgeClass: "bg-forest-950/85 text-white border border-brand-500/60 backdrop-blur",
    iconBgClass: "bg-sky-500/10 text-sky-400",
    accentClass: "text-sky-400",
    pillClass: "border border-sky-500/30 bg-sky-500/10 text-sky-400",
    buttonClass: "border border-sky-500/40 text-sky-400 hover:bg-sky-500/10",
  },
};

const fallback: RouteStyle = {
  category: "Explora",
  tagline: "Vive una experiencia única en Yopal",
  icon: EventPinIcon,
  badgeClass: "bg-forest-950/85 text-white border border-brand-500/60 backdrop-blur",
  iconBgClass: "bg-brand-500/10 text-brand-400",
  accentClass: "text-brand-400",
  pillClass: "border border-brand-500/30 bg-brand-500/10 text-brand-400",
  buttonClass: "border border-brand-500/40 text-brand-400 hover:bg-brand-500/10",
};

export function getRouteStyle(routeId: string): RouteStyle {
  return styles[routeId] ?? fallback;
}
