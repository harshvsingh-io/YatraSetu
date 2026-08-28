"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons in Next.js
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapPin {
  lat: number;
  lng: number;
  name: string;
  description?: string;
}

interface LeafletMapProps {
  center?: [number, number];
  zoom?: number;
  pins?: MapPin[];
  className?: string;
  height?: string;
}

// India center coordinates
const INDIA_CENTER: [number, number] = [20.5937, 78.9629];

// Predefined restoration site pins for the hero
const RESTORATION_SITES: MapPin[] = [
  {
    lat: 15.4989,
    lng: 73.8278,
    name: "Goa Beach Cleanup",
    description: "Weekly coastal restoration",
  },
  {
    lat: 26.9124,
    lng: 75.7873,
    name: "Rajasthan Heritage Care",
    description: "Fort & monument restoration",
  },
  {
    lat: 10.8505,
    lng: 76.2711,
    name: "Kerala Backwater Revival",
    description: "Wetland ecosystem care",
  },
  {
    lat: 19.076,
    lng: 72.8777,
    name: "Mumbai Creek Restoration",
    description: "Mangrove plantation drive",
  },
  {
    lat: 12.9716,
    lng: 77.5946,
    name: "Karnataka Forest Care",
    description: "Western Ghats reforestation",
  },
  {
    lat: 13.0827,
    lng: 80.2707,
    name: "Chennai Coast Revival",
    description: "Marine litter cleanup",
  },
  {
    lat: 22.5726,
    lng: 88.3639,
    name: "Kolkata Wetlands",
    description: "East Kolkata wetland restoration",
  },
  {
    lat: 30.7333,
    lng: 76.7794,
    name: "Chandigarh Green Drive",
    description: "Urban forestry project",
  },
];

function MapRecenter({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function LeafletMap({
  center = INDIA_CENTER,
  zoom = 5,
  pins = RESTORATION_SITES,
  className = "",
  height = "100%",
}: LeafletMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`bg-ink-100 rounded-2xl flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-ink-400 text-sm animate-pulse">Loading map...</div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl overflow-hidden ${className}`} style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        zoomControl={false}
        className="w-full h-full"
        style={{ background: "#1a1613" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <MapRecenter center={center} zoom={zoom} />
        {pins.map((pin, i) => (
          <Marker
            key={i}
            position={[pin.lat, pin.lng]}
            icon={markerIcon}
          >
            <Popup>
              <div className="p-1">
                <p className="font-semibold text-sm">{pin.name}</p>
                {pin.description && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {pin.description}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export { RESTORATION_SITES };
export type { MapPin };
