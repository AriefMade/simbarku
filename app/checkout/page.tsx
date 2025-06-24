'use client';

import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  // Ambil cart dari localStorage
  const [items, setItems] = useState<{ name: string; price: number; qty: number; imgSrc?: string }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      // Data cart dari ShopPage: { item: DataType, qty: number }[]
      // Ubah ke bentuk yang dibutuhkan checkout
      const parsed = JSON.parse(storedCart).map((c: any) => ({
        name: c.item.heading,
        price: Number(c.item.price),
        qty: c.qty,
        imgSrc: c.item.imgSrc,
      }));
      setItems(parsed);
    }
  }, []);

  // Update quantity handler
  const handleQtyChange = (idx: number, delta: number) => {
    setItems(items =>
      items.map((item, i) =>
        i === idx
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  // Remove item handler
  const handleRemove = (idx: number) => {
    setItems(items => items.filter((_, i) => i !== idx));
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lakukan submit ke backend di sini
    alert('Order berhasil!\n' + JSON.stringify(form, null, 2));
    setShowForm(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <div className="flex items-center mb-6">
          <svg className="w-8 h-8 mr-2 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 0 0 7.48 19h9.04a2 2 0 0 0 1.83-1.3L21 13M7 13V6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v7" />
          </svg>
          <h1 className="text-3xl font-bold">Keranjang Belanja</h1>
        </div>
        <div>
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-8">Keranjang kosong.</div>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="flex items-center py-4 border-b last:border-b-0">
                <img
                  src={item.imgSrc || '/images/product/item1.jpg'}
                  alt={item.name ?? 'Product'}
                  className="w-20 h-20 object-cover rounded-lg border mr-4"
                />
                <div className="flex-1">
                  <div className="font-semibold text-lg">{item.name}</div>
                  <div className="text-gray-600">Rp {item.price.toLocaleString('id-ID')}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold flex items-center justify-center"
                    onClick={() => handleQtyChange(idx, -1)}
                  >-</button>
                  <span className="w-6 text-center">{item.qty}</span>
                  <button
                    className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold flex items-center justify-center"
                    onClick={() => handleQtyChange(idx, 1)}
                  >+</button>
                </div>
                <div className="w-24 text-right font-semibold text-lg ml-4">
                  Rp {(item.price * item.qty).toLocaleString('id-ID')}
                </div>
                <button
                  className="ml-4 text-red-500 hover:text-red-700"
                  onClick={() => handleRemove(idx)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-between items-center mt-6 mb-4">
          <span className="text-2xl font-bold">Total:</span>
          <span className="text-2xl font-bold">Rp {total.toLocaleString('id-ID')}</span>
        </div>
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-xl mt-2"
          disabled={items.length === 0}
          onClick={() => setShowForm(true)}
        >
          Checkout
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <form
            className="bg-white rounded-xl p-8 min-w-[350px] shadow-lg flex flex-col gap-4"
            onSubmit={handleFormSubmit}
          >
            <h2 className="text-xl font-bold mb-2">Formulir Pemesanan</h2>
            <input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              value={form.name}
              onChange={handleFormChange}
              className="border rounded px-3 py-2"
              required
            />
            <textarea
              name="address"
              placeholder="Alamat Pengiriman"
              value={form.address}
              onChange={handleFormChange}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Nomor Telepon"
              value={form.phone}
              onChange={handleFormChange}
              className="border rounded px-3 py-2"
              required
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowForm(false)}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Kirim Pesanan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}