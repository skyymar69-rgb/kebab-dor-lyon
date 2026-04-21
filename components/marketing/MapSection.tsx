"use client";

import { useEffect, useRef } from "react";

export function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (typeof window === "undefined" || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      import("leaflet/dist/leaflet.css");

      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: [45.7676, 4.8113],
        zoom: 16,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        html: `<div style="background:#8b1a1a;width:36px;height:36px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"><span style="transform:rotate(45deg);display:block;text-align:center;line-height:30px;font-size:16px">🥙</span></div>`,
        className: "",
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -40],
      });

      L.marker([45.7676, 4.8113], { icon })
        .addTo(map)
        .bindPopup(
          `<strong>Kebab d'Or – La Mer Égée</strong><br>37 rue Marietton<br>69009 Lyon<br><a href="tel:+33478472426">+33 4 78 47 24 26</a>`
        )
        .openPopup();

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-80 lg:h-96 rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-sm"
      role="application"
      aria-label="Carte interactive — Kebab d'Or, 37 rue Marietton, Lyon 9e"
    />
  );
}
