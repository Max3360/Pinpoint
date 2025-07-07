'use client';
import React from 'react';
import Link from 'next/link';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Field, Label, Textarea } from '@headlessui/react';
type Location = {
    id: number;
    lat: number;
    lng: number;
    name: string;
};

export default function CreatePinForm() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [name, setName] = useState('');


    useEffect(() => {
        fetch('/api/locations')
            .then((res) => res.json())
            .then((data) => setLocations(data));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
    };

    return (
        <main className="flex flex-col items-center h-screen w-screen bg-white font-sans overflow-hidden">
            {/* ส่วนแผนที่ */}
            <div className="w-full h-[40vh] w-[30vw] relative">
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
            </MapContainer>
            {/* หมุดกลางจอ */}
            <div
                className="pointer-events-none absolute left-1/2 top-1/2 z-10"
                style={{
                transform: 'translate(-50%, -100%)',
                }}
            >
                {/* SVG หมุด */}
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                    d="M16 2C10.477 2 6 6.477 6 12c0 7.732 8.285 17.03 8.642 17.414a1 1 0 0 0 1.716 0C17.715 29.03 26 19.732 26 12c0-5.523-4.477-10-10-10zm0 13.5A3.5 3.5 0 1 1 16 8a3.5 3.5 0 0 1 0 7z"
                    fill="#FF0000"
                />
                </svg>
            </div>
            </div>

            {/* ส่วนฟอร์ม */}
            <div className="flex flex-col items-center justify-start w-full flex-1 overflow-auto px-4 py-6">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4"
                >
                    <div>
                        <Link href="/" className="inline-flex items-center px-2 py-1 rounded hover:bg-gray-100 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="sr-only">Back to home</span>
                        </Link>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">ชื่อหมุด</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">หมวดหมู่</label>
                        <select
                            className="w-full p-2 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">เลือกหมวดหมู่ Pin</option>
                            <option value="ร้านอาหาร">ร้านอาหาร</option>
                            <option value="ท่องเที่ยว">ท่องเที่ยว</option>
                            <option value="ธรรมชาติ">ธรรมชาติ</option>
                            <option value="คาเฟ่">คาเฟ่</option>
                            <option value="แหล่งเรียนรู้">แหล่งเรียนรู้</option>
                            <option value="กิจกรรม">กิจกรรม</option>
                            <option value="วัฒนธรรม">วัฒนธรรม</option>
                            <option value="ช้อปปิ้ง">ช้อปปิ้ง</option>
                            <option value="สถานที่ท่องเที่ยว">สถานที่ท่องเที่ยว</option>
                            <option value="ค่าเฟ่">คาเฟ่</option>
                            <option value="เเหล่งเรียนรู้">เเหล่งเรียนรู้</option>
                            <option value="กิจกรรมกลางเเจ้ง">กิจกรรมกลางเเจ้ง</option>
                            <option value="กิจกรรมกลางคืน">กิจกรรมกลางคืน</option>
                            <option value="กีฬา">กีฬา</option>
                            <option value="มวยสด">มวยสด</option>
                            <option value="บอลสด">บอลสด</option>
                            <option value="โชกี้ๆ">โชกี้ๆ</option>
                            <option value="ศิลปะ">ศิลปะ</option>
                            <option value="อุบัติเหตุ">อุบัติเหตุ</option>
                            <option value="ของหาย">ดนตรีกลางคืน</option>
                            <option value="อื่นๆ">อื่นๆ</option>
                        </select>
                    </div>

                    <div className="rounded-lg mb-4">
                        <Field>
                            <Label className="block text-gray-700 font-medium mb-1">รายละเอียดเพิ่มเติม</Label>
                            <Textarea
                                name="description"
                                rows={4}
                                placeholder="รายละเอียดเพิ่มเติมเกี่ยวกับหมุดนี้"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </Field>
                    </div>

                    <label className="rounded-lg block cursor-pointer">
                        <div className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg p-4 justify-center hover:border-blue-400 transition">
                            <span className="block text-gray-700 font-medium mb-2 text-center">อัปโหลดรูปภาพ</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full mb-1 hidden"
                            />
                        </div>
                    </label>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        สร้างหมุด
                    </button>

                </form>
            </div>
        </main>

    );
}
