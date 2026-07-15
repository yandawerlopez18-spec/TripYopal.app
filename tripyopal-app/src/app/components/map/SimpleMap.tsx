"use client";

import { useEffect, useState } from "react";
import { getMapConfig } from "../../services/external/maps";

export default function SimpleMap() {
  const [config, setConfig] = useState<{
    center: { lat: number; lng: number };
    zoom: number;
    embedUrl: string;
  } | null>(null);

  useEffect(() => {
    const data = getMapConfig();
    setConfig(data);
  }, []);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">Mapa interactivo de Yopal</h3>
      <p className="mt-2 text-sm text-slate-600">
        Explora la ciudad con un mapa en vivo vinculado a Google Maps.
      </p>
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
        {config ? (
          <iframe
            src={config.embedUrl}
            className="h-72 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de Yopal"
          />
        ) : (
          <div className="flex h-72 items-center justify-center bg-slate-50 text-center">
            <p className="text-lg font-semibold text-slate-900">Cargando mapa...</p>
          </div>
        )}
      </div>
      {config ? (
        <p className="mt-3 text-sm text-slate-500">
          Centro aproximado: {config.center.lat.toFixed(2)}, {config.center.lng.toFixed(2)} · Zoom {config.zoom}
        </p>
      ) : null}
    </div>
  );
}
