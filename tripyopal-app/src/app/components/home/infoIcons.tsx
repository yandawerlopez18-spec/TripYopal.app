type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SportIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="17" cy="5" r="1.8" />
      <path d="M9 21l2.5-6 2-2-1-4-4 1-2 4M11.5 13l3 2 3.5-1M8 8l3-2 2.5 1.5" />
    </svg>
  );
}

export function MusicIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9 17.5V5.5l10-2v12" />
      <circle cx="7" cy="18" r="2.5" />
      <circle cx="17" cy="15.5" r="2.5" />
    </svg>
  );
}

export function UsersIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c.7-3.4 3-5.3 6-5.3s5.3 1.9 6 5.3" />
      <path d="M16 8.3a2.6 2.6 0 1 0 0-5.2M21 19c-.4-2.3-1.6-3.9-3.5-4.7" />
    </svg>
  );
}

export function MenuIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 6.5h16M4 12h16M4 17.5h16" />
    </svg>
  );
}

export function HeartIcon({ className = "h-4 w-4", filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base} fill={filled ? "currentColor" : "none"} className={className}>
      <path d="M12 20s-7-4.5-9.3-9A5 5 0 0 1 12 6a5 5 0 0 1 9.3 5c-2.3 4.5-9.3 9-9.3 9Z" strokeLinejoin="round" />
    </svg>
  );
}

export function BookmarkIcon({ className = "h-4 w-4", filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base} fill={filled ? "currentColor" : "none"} className={className}>
      <path d="M6 3.5h12a1 1 0 0 1 1 1V21l-7-4-7 4V4.5a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
    </svg>
  );
}

export function ClockIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function TreeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3 6.5 11h2.8L5 18h5.7v3h2.6v-3H19l-4.3-7h2.8Z" strokeLinejoin="round" />
    </svg>
  );
}

export function MountainIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m4 18 6.5-11 4 6.5L17 9l3 9Z" strokeLinejoin="round" />
      <path d="m12.5 12.5 1.5-2.5 2 3" />
    </svg>
  );
}

export function MuseumIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 9.5 12 4l8.5 5.5" strokeLinejoin="round" />
      <path d="M5 10v9M9 10v9M15 10v9M19 10v9M3.5 19h17" />
    </svg>
  );
}

export function WalkIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="13.5" cy="4.5" r="1.6" fill="currentColor" stroke="none" />
      <path d="M11 8l2 2 3 1-1 3M13 10l-2.5 2-1 4M13 10l1 3 3 2" />
      <path d="M9.5 21l1.5-5" />
    </svg>
  );
}

export function TagIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M11.5 3.5H6a2.5 2.5 0 0 0-2.5 2.5v5.5L13 21l8-8-9.5-9.5Z" strokeLinejoin="round" />
      <circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CompassIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-4.2 1.8L9 15l4.2-1.8Z" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ className = "h-4 w-4", filled = true }: IconProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.6}>
      <path
        d="M12 2.7c.32 0 .6.19.72.49l2.1 4.98 5.4.46c.72.06 1.02.96.47 1.43l-4.1 3.53 1.24 5.28c.16.7-.6 1.26-1.22.88L12 16.9l-4.61 2.85c-.61.38-1.38-.18-1.22-.88l1.24-5.28-4.1-3.53c-.55-.47-.25-1.37.47-1.43l5.4-.46 2.1-4.98c.12-.3.4-.49.72-.49Z"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RefreshIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 12a7.5 7.5 0 0 1 12.6-5.5M19.5 12a7.5 7.5 0 0 1-12.6 5.5" />
      <path d="M17.5 4v3h-3M6.5 20v-3h3" />
    </svg>
  );
}

export function HeadsetIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 13v-1a7.5 7.5 0 0 1 15 0v1" />
      <rect x="3" y="13" width="4" height="5.5" rx="1.5" />
      <rect x="17" y="13" width="4" height="5.5" rx="1.5" />
      <path d="M19 18.5v1a3 3 0 0 1-3 3h-2.5" />
    </svg>
  );
}

export function PackageIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3 4 7v10l8 4 8-4V7Z" strokeLinejoin="round" />
      <path d="M4 7l8 4 8-4M12 11v10" strokeLinejoin="round" />
    </svg>
  );
}

export function DocumentIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5A1.5 1.5 0 0 1 7 3.5Z" strokeLinejoin="round" />
      <path d="M14 3.5V8h4.5M9 12h6M9 15.5h6" />
    </svg>
  );
}

export function BellIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 17v-5a6 6 0 1 1 12 0v5l1.5 2.5h-15Z" strokeLinejoin="round" />
      <path d="M10 21.5a2.2 2.2 0 0 0 4 0" />
    </svg>
  );
}

export function BoltIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M13 3 5 13.5h5.5L11 21l8-10.5h-5.5Z" strokeLinejoin="round" />
    </svg>
  );
}

export function LockIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="11" width="14" height="9.5" rx="2" />
      <path d="M8 11V7.5a4 4 0 0 1 8 0V11" />
    </svg>
  );
}

export function GearIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M21 12h-2.5M5.5 12H3M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6" />
    </svg>
  );
}

export function CrownIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 18h16l-1.3-7.5L14 14l-2-6.5L10 14l-4.7-3.5Z" strokeLinejoin="round" />
      <path d="M4 20.5h16" />
    </svg>
  );
}

export function EyeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  );
}

export function PencilIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m15.5 4.5 4 4L8 20 4 21l1-4Z" strokeLinejoin="round" />
      <path d="m13.5 6.5 4 4" />
    </svg>
  );
}

export function TrashIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 7h15M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2M6.5 7l1 12.5A1.5 1.5 0 0 0 9 21h6a1.5 1.5 0 0 0 1.5-1.5L17.5 7" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BuildingIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="4" width="10" height="16" rx="1" />
      <rect x="15" y="9" width="5" height="11" rx="1" />
      <path d="M8 8h1M11 8h1M8 12h1M11 12h1M8 16h1M11 16h1" />
    </svg>
  );
}

export function GridIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="4" width="7" height="7" rx="1.2" />
      <rect x="13" y="4" width="7" height="7" rx="1.2" />
      <rect x="4" y="13" width="7" height="7" rx="1.2" />
      <rect x="13" y="13" width="7" height="7" rx="1.2" />
    </svg>
  );
}

export function DownloadIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 4v11.5M8 12l4 4 4-4" />
      <path d="M5 18v1.5A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V18" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m5 8.5 7 7 7-7" />
    </svg>
  );
}

export function TrendUpIcon({ className = "h-3 w-3" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m4 16 6-6 4 4 6-8" />
      <path d="M14 6h6v6" />
    </svg>
  );
}

export function CheckIcon({ className = "h-3 w-3" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function ForkIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M8 3v7.5a2.5 2.5 0 0 0 5 0V3M10.5 10.5V21M6 3v5M6 8v-5" />
    </svg>
  );
}

export function PaletteIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5a8.5 8 0 1 0 0 17c1 0 1.7-.7 1.7-1.6 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.7-1.6 1.6-1.6h1.7A3.5 3.5 0 0 0 20 11.5C20 7.1 16.4 3.5 12 3.5Z" />
      <circle cx="8.2" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.8" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CapIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 4 2 9l10 5 10-5Z" strokeLinejoin="round" />
      <path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5" />
    </svg>
  );
}

export function MapIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9 4.5 4 6.5v13l5-2 6 2 5-2v-13l-5 2-6-2Z" strokeLinejoin="round" />
      <path d="M9 4.5v13M15 6.5v13" />
    </svg>
  );
}

export function CalendarIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v3M16 3v3" />
    </svg>
  );
}

export function ChevronLeftIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m14.5 5-7 7 7 7" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m9.5 5 7 7-7 7" />
    </svg>
  );
}

export function EventPinIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s6-5.2 6-10.2A6 6 0 0 0 6 10.8C6 15.8 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2" />
    </svg>
  );
}

export function ShieldIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5 5 6v5.5c0 5 3 8.3 7 9 4-.7 7-4 7-9V6l-7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function AlertIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5c-4.5 3-7 6.7-7 10.8a7 7 0 0 0 14 0c0-4.1-2.5-7.8-7-10.8Z" />
      <path d="M12 10.5v3.4" />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 4.5h3l1.3 4-1.9 1.4a11 11 0 0 0 5.7 5.7l1.4-1.9 4 1.3v3a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 3.5 6.1 1.5 1.5 0 0 1 5 4.5Z" />
    </svg>
  );
}

export function DropletIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5s5.5 6.4 5.5 10.3a5.5 5.5 0 1 1-11 0c0-3.9 5.5-10.3 5.5-10.3Z" />
    </svg>
  );
}

export function WindIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 9h10.8a2.6 2.6 0 1 0-2.4-3.6" />
      <path d="M3.5 14h14.8a2.6 2.6 0 1 1-2.4 3.6" />
      <path d="M3.5 17.5h7.3a2 2 0 1 1-1.8 2.8" />
    </svg>
  );
}

export function LeafIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M19.5 4.5c.6 6-1 10.6-4.3 13.9-3.3 3.3-8 4.6-10.7 4-.6-2.7.7-7.4 4-10.7C11.8 8.4 16.5 3.9 19.5 4.5Z" />
      <path d="M5.5 18.5c2-3.6 4.6-6.4 8-8.4" />
    </svg>
  );
}

export function BackpackIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M8 8.5V6a4 4 0 0 1 8 0v2.5" />
      <path d="M6.5 8.5h11a2 2 0 0 1 2 2V19a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-8.5a2 2 0 0 1 2-2Z" />
      <path d="M9.5 12.5h5M9.5 15.5h5" />
    </svg>
  );
}

export function CameraIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 8.5a1.5 1.5 0 0 1 1.5-1.5h2l1.2-1.8h6.6L16.5 7h2a1.5 1.5 0 0 1 1.5 1.5V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18Z" />
      <circle cx="12" cy="13" r="3.3" />
    </svg>
  );
}

export function WarningIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 4.5 21 19H3Z" strokeLinejoin="round" />
      <path d="M12 10.5v3.2" />
      <circle cx="12" cy="16.3" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PoliceBadgeIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5 5.5 6v5c0 5 2.8 8 6.5 9 3.7-1 6.5-4 6.5-9V6L12 3.5Z" />
      <path d="M9.3 11.5 11 13.2l3.7-3.7" />
    </svg>
  );
}

export function CaiIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 20V10.5L12 5l7.5 5.5V20Z" />
      <path d="M9.5 20v-5.5h5V20" />
    </svg>
  );
}

export function TourismIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="m14.8 9.2-1.6 4-4 1.6 1.6-4Z" strokeLinejoin="round" />
    </svg>
  );
}

export function MegaphoneIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 10.5v3a1.5 1.5 0 0 0 1.5 1.5H7l2 5 2-.7-1.7-4.3 8.2-2.7V6.2L9 8.5H5.5A1.5 1.5 0 0 0 4 10.5Z" strokeLinejoin="round" />
    </svg>
  );
}

export function SirenIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 20v-4.5A6 6 0 0 1 12 9.5v0A6 6 0 0 1 18 15.5V20Z" />
      <path d="M4.5 20h15M12 9.5V7M9 5l1-1.5M15 5l-1-1.5" />
    </svg>
  );
}

export function HospitalIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 20V6.5A1.5 1.5 0 0 1 6.5 5h11A1.5 1.5 0 0 1 19 6.5V20" />
      <path d="M9 20v-4.5h6V20M12 8v5M9.5 10.5h5" />
    </svg>
  );
}

export function FireIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5c1 2.3-.5 3.4-1.4 4.6-1 1.3-1.5 2.6-1.5 4a3.9 3.9 0 0 0 7.8 0c0-1.6-.7-2.6-1.4-3.6-.3 1.4-1 2-1.7 2 .4-2.6-.6-4.8-1.8-7Z" strokeLinejoin="round" />
    </svg>
  );
}

export function AmbulanceIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 16.5v-6a1.5 1.5 0 0 1 1.5-1.5h7.5v7.5Z" />
      <path d="M12.5 11h4.8l2.2 2.8v2.7h-7Z" />
      <circle cx="7.5" cy="18" r="1.7" />
      <circle cx="16" cy="18" r="1.7" />
      <path d="M7.5 10.5v3M6 12h3" />
    </svg>
  );
}

export function RedCrossIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8.5v7M8.5 12h7" />
    </svg>
  );
}

export function MailIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 6.5 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.3-.5-.5-1-1.1-1.4-1.8-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.8c.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2c-2.7 0-3.1 0-4.1.1-1.1 0-1.8.2-2.4.5A4.8 4.8 0 0 0 2.6 5.5c-.3.6-.4 1.3-.5 2.4C2 8.9 2 9.3 2 12s0 3.1.1 4.1c0 1.1.2 1.8.5 2.4a4.8 4.8 0 0 0 2.9 2.9c.6.3 1.3.4 2.4.5C8.9 22 9.3 22 12 22s3.1 0 4.1-.1c1.1 0 1.8-.2 2.4-.5a4.8 4.8 0 0 0 2.9-2.9c.3-.6.4-1.3.5-2.4.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c0-1.1-.2-1.8-.5-2.4a4.8 4.8 0 0 0-2.9-2.9c-.6-.3-1.3-.4-2.4-.5C15.1 2 14.7 2 12 2Zm0 2.2c2.6 0 3 0 4 .1.9 0 1.5.2 1.8.3.5.2.8.4 1.1.7.3.3.5.6.7 1.1.1.3.3.9.3 1.8.1 1 .1 1.4.1 4s0 3-.1 4c0 .9-.2 1.5-.3 1.8-.2.5-.4.8-.7 1.1-.3.3-.6.5-1.1.7-.3.1-.9.3-1.8.3-1 .1-1.4.1-4 .1s-3 0-4-.1c-.9 0-1.5-.2-1.8-.3a3 3 0 0 1-1.1-.7 3 3 0 0 1-.7-1.1c-.1-.3-.3-.9-.3-1.8-.1-1-.1-1.4-.1-4s0-3 .1-4c0-.9.2-1.5.3-1.8.2-.5.4-.8.7-1.1.3-.3.6-.5 1.1-.7.3-.1.9-.3 1.8-.3 1-.1 1.4-.1 4-.1Zm0 3.7a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2Zm0 6.8a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.2-7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 22v-8.4h2.8l.4-3.3h-3.2V8.1c0-.9.3-1.6 1.6-1.6h1.7V3.5C16.5 3.4 15.4 3.3 14.2 3.3c-2.6 0-4.4 1.6-4.4 4.5v2.5H7v3.3h2.8V22Z" />
    </svg>
  );
}

export function TiktokIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.5 2h-3v13.5a2.8 2.8 0 1 1-2-2.7v-3.1a5.8 5.8 0 1 0 5 5.8V9.2a7.5 7.5 0 0 0 4.4 1.4V7.6a4.5 4.5 0 0 1-4.4-4.4Z" />
    </svg>
  );
}

export function TwitterIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1a4.1 4.1 0 0 0 3.3 4 4.2 4.2 0 0 1-1.8.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1Z" />
    </svg>
  );
}

export function LinkIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9 15l6-6" />
      <path d="M8.5 16.5 6 19a3.5 3.5 0 0 1-5-4.9l3.5-3.5a3.5 3.5 0 0 1 5 0" />
      <path d="M15.5 7.5 18 5a3.5 3.5 0 0 1 5 4.9l-3.5 3.5a3.5 3.5 0 0 1-5 0" />
    </svg>
  );
}

export function GlobeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.3 3.5 5.3 3.5 8.5s-1.3 6.2-3.5 8.5c-2.2-2.3-3.5-5.3-3.5-8.5S9.8 5.8 12 3.5Z" />
    </svg>
  );
}

export function ShareIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="18" cy="5.5" r="2.3" />
      <circle cx="6" cy="12" r="2.3" />
      <circle cx="18" cy="18.5" r="2.3" />
      <path d="m8 10.8 8-4.2M8 13.2l8 4.2" />
    </svg>
  );
}

export function SortIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 4v16M7 4 3.5 7.5M7 4l3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 20V4M17 20l-3.5-3.5M17 20l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SearchIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

export function SlidersIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" strokeLinecap="round" />
      <circle cx="13" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </svg>
  );
}

export function ThermometerIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 14.5V5a2 2 0 1 0-4 0v9.5a3.5 3.5 0 1 0 4 0Z" strokeLinejoin="round" />
      <circle cx="10" cy="16.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export type WeatherKind = "clear" | "partly-cloudy" | "cloudy" | "rain" | "storm" | "snow" | "mist";

export function getWeatherKind(icon: string): WeatherKind {
  const code = icon.slice(0, 2);
  if (code === "01") return "clear";
  if (code === "02") return "partly-cloudy";
  if (code === "03" || code === "04") return "cloudy";
  if (code === "09" || code === "10") return "rain";
  if (code === "11") return "storm";
  if (code === "13") return "snow";
  return "mist";
}

export function WeatherIcon({ kind, className = "h-16 w-16" }: { kind: WeatherKind; className?: string }) {
  if (kind === "clear") {
    return (
      <svg {...base} className={className}>
        <circle cx="12" cy="12" r="5" />
        <path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </svg>
    );
  }

  if (kind === "partly-cloudy") {
    return (
      <svg {...base} className={className}>
        <circle cx="8.5" cy="8.5" r="3.2" />
        <path d="M8.5 3.3v1.5M3.9 5.3l1.1 1.1M2.9 9.4h1.5" />
        <path d="M7.5 18.5h9a3.2 3.2 0 0 0 .4-6.4 4.8 4.8 0 0 0-8.8-1.7A3.5 3.5 0 0 0 7.5 18.5Z" />
      </svg>
    );
  }

  if (kind === "cloudy") {
    return (
      <svg {...base} className={className}>
        <path d="M6.5 17.5h11.2a3.4 3.4 0 0 0 .5-6.8 5.3 5.3 0 0 0-10.2-1.4 4 4 0 0 0-1.5 8.2Z" />
      </svg>
    );
  }

  if (kind === "rain") {
    return (
      <svg {...base} className={className}>
        <path d="M6.5 13.5h11.2a3.4 3.4 0 0 0 .5-6.8 5.3 5.3 0 0 0-10.2-1.4 4 4 0 0 0-1.5 8.2Z" />
        <path d="M8.5 17.5 7 20.5M12.5 17.5 11 20.5M16.5 17.5 15 20.5" />
      </svg>
    );
  }

  if (kind === "storm") {
    return (
      <svg {...base} className={className}>
        <path d="M6.5 12.5h10.7a3.2 3.2 0 0 0 .5-6.4 5 5 0 0 0-9.7-1.3 3.8 3.8 0 0 0-1.5 7.7Z" />
        <path d="m13 13-3 5h3l-2 4" />
      </svg>
    );
  }

  if (kind === "snow") {
    return (
      <svg {...base} className={className}>
        <path d="M6.5 12.5h10.7a3.2 3.2 0 0 0 .5-6.4 5 5 0 0 0-9.7-1.3 3.8 3.8 0 0 0-1.5 7.7Z" />
        <path d="M9 17v4M12 17v4M15 17v4M7.7 19h2.6M10.7 19h2.6M13.7 19h2.6" />
      </svg>
    );
  }

  return (
    <svg {...base} className={className}>
      <path d="M4 8.5h14M3 12h16M5 15.5h12M6.5 19h9" />
    </svg>
  );
}
