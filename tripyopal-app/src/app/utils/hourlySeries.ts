import type { HourlyForecast } from "../api/weather/route";

export type HourlyPoint = {
  label: string;
  temp: number;
  icon: string;
  rainChance: number;
  uvIndex: number;
  isNow: boolean;
};

type Anchor = { hourOffset: number; temp: number; icon: string; rainChance: number };

function estimateUv(hourOfDay: number, peak: number): number {
  if (hourOfDay <= 6 || hourOfDay >= 18) return 0;
  const angle = ((hourOfDay - 12) / 6) * (Math.PI / 2);
  return Math.max(0, Math.round(peak * Math.cos(angle)));
}

function interpolateAt(anchors: Anchor[], hourOffset: number): Anchor {
  if (hourOffset <= anchors[0].hourOffset) return anchors[0];
  for (let i = 0; i < anchors.length - 1; i++) {
    const a = anchors[i];
    const b = anchors[i + 1];
    if (hourOffset >= a.hourOffset && hourOffset <= b.hourOffset) {
      const t = (hourOffset - a.hourOffset) / (b.hourOffset - a.hourOffset || 1);
      return {
        hourOffset,
        temp: Math.round(a.temp + (b.temp - a.temp) * t),
        icon: t < 0.5 ? a.icon : b.icon,
        rainChance: Math.round(a.rainChance + (b.rainChance - a.rainChance) * t),
      };
    }
  }
  return anchors[anchors.length - 1];
}

/** Derives an hourly-resolution series from the 3h-step API forecast by interpolating between real data points. */
export function buildHourlySeries(
  current: { temp: number; icon: string; rainChance: number; uvIndex: number },
  forecastSteps: HourlyForecast[],
  count = 12,
): HourlyPoint[] {
  const anchors: Anchor[] = [
    { hourOffset: 0, temp: current.temp, icon: current.icon, rainChance: current.rainChance },
    ...forecastSteps.map((step, index) => ({
      hourOffset: (index + 1) * 3,
      temp: step.temp,
      icon: step.icon,
      rainChance: step.rainChance,
    })),
  ];

  const now = new Date();
  const uvPeak = current.uvIndex > 0 ? current.uvIndex / Math.max(0.1, Math.cos(((now.getHours() - 12) / 6) * (Math.PI / 2))) : 9;

  return Array.from({ length: count }, (_, i) => {
    const point = interpolateAt(anchors, i);
    const time = new Date(now.getTime() + i * 3600000);
    const label = i === 0 ? "Ahora" : time.toLocaleTimeString("es-CO", { hour: "numeric", minute: "2-digit" });

    return {
      label,
      temp: point.temp,
      icon: point.icon,
      rainChance: Math.max(0, Math.min(100, point.rainChance)),
      uvIndex: estimateUv(time.getHours(), uvPeak),
      isNow: i === 0,
    };
  });
}
