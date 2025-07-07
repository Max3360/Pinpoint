'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./globals.css";



interface Location { // // โครงสร้างของวัตถุ location
  id: number;
  lat: number;
  lng: number;
  name: string;
}

export default function Home() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [customIcon, setCustomIcon] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-white font-sans">
      {/* ส่วนหัว */}
      <header className="h-[8vh] flex items-center justify-between px-4 shadow bg-white z-40">
        <h1 className="font-bold text-3xl text-black">PINPOINT</h1>
        <nav className="flex gap-4">
          <Link href="/category" className="btn-primary">หมวดหมู่</Link>
          <Link href="/login" className="btn-primary">เข้าสู่ระบบ</Link>
          <Link href="/pinconfig" className="btn-primary">+ สร้างหมุด</Link>
        </nav>
      </header>

      {/* ส่วนแผนที่ */}
      <main className="flex-grow h-[88vh]">
        <MapContainer
          center={[13.7563, 100.5018]}
          zoom={13}
          className="w-full h-full z-0"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locations.map((loc) => (
            <Marker key={loc.id} position={[loc.lat, loc.lng]}>
              <Popup>{loc.name}</Popup>
            </Marker>
          ))}

            {customIcon && (
            <Marker
              position={[13.7563, 100.5018]}
              icon={L.icon({
              iconUrl: "public/location.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              })}
            >
              <Popup>Custom Icon Marker</Popup>
            </Marker>
            )}
        </MapContainer>
      </main>
    </div>
  );
}
