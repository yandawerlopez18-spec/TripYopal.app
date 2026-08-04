"use client";

import { useId } from "react";

type RingGaugeProps = {
  value: number;
  max: number;
  color: string;
  gradientTo?: string;
  size?: number;
  strokeWidth?: number;
  label: string;
};

export function RingGauge({ value, max, color, gradientTo, size = 68, strokeWidth = 7, label }: RingGaugeProps) {
  const gradientId = useId();
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(1, Math.max(0, max === 0 ? 0 : value / max));
  const dash = circumference * percent;
  const stroke = gradientTo ? `url(#${gradientId})` : color;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {gradientTo ? (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={gradientTo} />
          </linearGradient>
        </defs>
      ) : null}
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="var(--color-forest-800)" strokeWidth={strokeWidth} />
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circumference}`}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={size * 0.24} fontWeight={700} fill="#f1f5f9">
        {label}
      </text>
    </svg>
  );
}

export function CompassGauge({ deg, size = 68 }: { deg: number; size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size - 8) / 2;
  const ticks = [
    { label: "N", angle: 0 },
    { label: "E", angle: 90 },
    { label: "S", angle: 180 },
    { label: "O", angle: 270 },
  ];

  const needleLength = radius - 6;
  const angleRad = ((deg - 90) * Math.PI) / 180;
  const tipX = cx + needleLength * Math.cos(angleRad);
  const tipY = cy + needleLength * Math.sin(angleRad);
  const tailX = cx - needleLength * 0.4 * Math.cos(angleRad);
  const tailY = cy - needleLength * 0.4 * Math.sin(angleRad);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="var(--color-forest-800)" strokeWidth={2} />
      {ticks.map((tick) => {
        const rad = ((tick.angle - 90) * Math.PI) / 180;
        const x = cx + (radius - 9) * Math.cos(rad);
        const y = cy + (radius - 9) * Math.sin(rad);
        return (
          <text key={tick.label} x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={8} fontWeight={700} fill="#64748b">
            {tick.label}
          </text>
        );
      })}
      <line x1={tailX} y1={tailY} x2={tipX} y2={tipY} stroke="#38bdf8" strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={tipX} cy={tipY} r={3} fill="#38bdf8" />
      <circle cx={cx} cy={cy} r={2.5} fill="#94a3b8" />
    </svg>
  );
}

export function Sparkline({ values, color }: { values: number[]; color: string }) {
  if (values.length < 2) return null;
  const width = 56;
  const height = 24;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <polyline points={points} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
