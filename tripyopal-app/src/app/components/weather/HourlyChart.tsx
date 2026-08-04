"use client";

import type { HourlyPoint } from "../../utils/hourlySeries";
import { DropletIcon } from "../home/infoIcons";

const CHART_HEIGHT = 140;
const CHART_MIN = 15;
const CHART_MAX = 35;
const GRID_LINES = [35, 30, 25, 20, 15];

function temperatureToY(temp: number) {
  const clamped = Math.min(CHART_MAX, Math.max(CHART_MIN, temp));
  const percent = (clamped - CHART_MIN) / (CHART_MAX - CHART_MIN);
  return CHART_HEIGHT - percent * CHART_HEIGHT;
}

export default function HourlyChart({ hours }: { hours: HourlyPoint[] }) {
  const columnWidth = 100 / hours.length;
  const points = hours.map((hour, index) => ({
    x: (index + 0.5) * columnWidth,
    y: temperatureToY(hour.temp),
  }));

  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

  return (
    <div>
      <div className="flex gap-4 text-xs">
        <div className="flex w-8 shrink-0 flex-col justify-between py-1 text-right text-slate-500" style={{ height: CHART_HEIGHT }}>
          {GRID_LINES.map((line) => (
            <span key={line}>{line}°</span>
          ))}
        </div>
        <div className="relative min-w-0 flex-1" style={{ height: CHART_HEIGHT }}>
          {GRID_LINES.map((line) => (
            <div
              key={line}
              className="absolute left-0 right-0 border-t border-forest-800"
              style={{ top: temperatureToY(line) }}
            />
          ))}
          <svg viewBox={`0 0 100 ${CHART_HEIGHT}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            <path d={linePath} fill="none" stroke="var(--color-brand-400)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
            {points.map((point, index) => (
              <circle key={index} cx={point.x} cy={point.y} r={1.6} fill="var(--color-brand-400)" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
        </div>
      </div>

      <div className="mt-2 flex gap-4">
        <div className="w-8 shrink-0" />
        <div className="flex min-w-0 flex-1">
          {hours.map((hour, index) => (
            <div key={index} className="flex flex-1 items-center justify-center gap-0.5 text-[10px] text-sky-400">
              <DropletIcon className="h-2.5 w-2.5" />
              {hour.rainChance}%
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-brand-400" /> Temperatura
        </span>
        <span className="flex items-center gap-1.5">
          <DropletIcon className="h-3 w-3 text-sky-400" /> Probabilidad de lluvia
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-400" /> Índice UV
        </span>
      </div>
    </div>
  );
}
