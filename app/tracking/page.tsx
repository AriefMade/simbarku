'use client';

import { useState } from 'react';

export default function TrackingPage() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const response = await fetch(
        `/api/tracking?id=${orderId}&email=${encodeURIComponent(email)}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch order');
      }

      const data = await response.json();

      if (!data) {
        setError('Pesanan tidak ditemukan');
      } else {
        setOrder(data);
      }
    } catch (error) {
      console.error('Error tracking order:', error);
      setError('Terjadi kesalahan saat melacak pesanan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Lacak Pesanan</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="orderId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nomor Pesanan
            </label>
            <input
              id="orderId"
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nomor pesanan"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan email yang digunakan saat memesan"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
          >
            {loading ? 'Memproses...' : 'Lacak Pesanan'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {order && (
          <div className="mt-6 border border-gray-200 rounded-md p-4">
            <h2 className="text-lg font-semibold mb-2">
              Informasi Pesanan #{order.id_transaksi}
            </h2>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="text-gray-600">Status:</div>
              <div
                className={`font-medium ${
                  order.status === 'completed'
                    ? 'text-green-600'
                    : order.status === 'pending'
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}
              >
                {order.status === 'completed'
                  ? 'Selesai'
                  : order.status === 'pending'
                  ? 'Diproses'
                  : 'Dibatalkan'}
              </div>

              <div className="text-gray-600">Tanggal:</div>
              <div>{new Date(order.tanggal).toLocaleDateString('id-ID')}</div>

              <div className="text-gray-600">Total:</div>
              <div className="font-medium">
                Rp {Number(order.harga).toLocaleString('id-ID')}
              </div>
            </div>

            <h3 className="font-semibold text-sm uppercase text-gray-500 mb-2">
              Detail Item
            </h3>
            <div className="space-y-2">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between border-b pb-2">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">Qty: {item.qty}</div>
                  </div>
                  <div className="font-medium">
                    Rp {(
                      Number(item.harga_satuan) * item.qty
                    ).toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}