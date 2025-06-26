'use client';

import { useState } from 'react';

export default function TrackPage() {
  const [orderId, setOrderId] = useState('');
  const [tracking, setTracking] = useState<null | { status: string; lat: number; lng: number }>(null);

  // Simulasi fetch tracking dari backend
  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // Ganti dengan fetch ke backend sesuai orderId
    setTracking({
      status: 'Kurir sedang menuju lokasi Anda',
      lat: -6.200000, // contoh: Jakarta
      lng: 106.816666,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Lacak Pesanan</h1>
        <form onSubmit={handleTrack} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Masukkan Nomor Order"
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
          >
            Lacak
          </button>
        </form>
        {tracking && (
          <div className="mt-6">
            <div className="mb-2 font-semibold text-center">{tracking.status}</div>
            {/* Google Maps Embed */}
            <iframe
              title="Lokasi Kurir"
              width="100%"
              height="250"
              style={{ border: 0, borderRadius: '12px' }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${tracking.lat},${tracking.lng}&z=15&output=embed`}
            />
          </div>
        )}
      </div>
    </div>
  );
}