'use client';

import { useState } from 'react';
import MultipleItems from '@/components/MultipleItems';
import { DataType } from '@/components/MultipleItems';
import { useRouter } from 'next/navigation';

const shopData: DataType[] = [
  {
    time: 'Buy',
    heading: 'Simbar Mini',
    heading2: 'Dengan moss alami',
    name: 'SimbarPlants',
    date: 'June 2025',
    imgSrc: '/images/product/item1.jpg',
    price: '55000',
  },
  {
    time: 'Buy',
    heading: 'Simbar Premium',
    heading2: 'Tanaman hias eksklusif',
    name: 'SimbarPlants',
    date: 'June 2025',
    imgSrc: '/images/product/item2.jpg',
    price: '85000',
  },
];

export default function ShopPage() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DataType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<{ item: DataType; qty: number }[]>([]);

  const handleBuy = (item: DataType) => {
    setSelectedProduct(item);
    setShowPopup(true);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      setCart(prev => {
        const idx = prev.findIndex(c => c.item.heading === selectedProduct.heading);
        if (idx > -1) {
          const updated = [...prev];
          updated[idx].qty += quantity;
          return updated;
        }
        return [...prev, { item: selectedProduct, qty: quantity }];
      });
    }
    setShowPopup(false);
    
  };

  const handleClose = () => setShowPopup(false);

  // Button Cart
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  return (
    <div>
      {/* Cart Button */}
      <button
        className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
        onClick={() => setShowCart(true)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 0 0 7.48 19h9.04a2 2 0 0 0 1.83-1.3L21 13M7 13V6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v7" />
        </svg>
        Cart ({cartCount})
      </button>

      <MultipleItems
        title="Our Simbar Plants & Media Variants"
        data={shopData}
        onBuy={handleBuy}
      />

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 min-w-[400px] shadow-lg max-w-xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Keranjang</h2>
              <button
                className="text-gray-500 hover:text-gray-700 text-2xl"
                onClick={() => setShowCart(false)}
              >×</button>
            </div>
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 py-8">Keranjang kosong.</div>
            ) : (
              <>
                {cart.map((c, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b py-2 last:border-b-0">
                    <div>
                      <div className="font-semibold">{c.item.heading}</div>
                      <div className="text-gray-500 text-sm">Qty: {c.qty}</div>
                    </div>
                    <div className="font-semibold">
                      Rp {(Number(c.item.price) * c.qty).toLocaleString('id-ID')}
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-lg">Total:</span>
                  <span className="font-bold text-lg">
                    Rp {cart.reduce((sum, c) => sum + Number(c.item.price) * c.qty, 0).toLocaleString('id-ID')}
                  </span>
                </div>
                <button
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl"
                  onClick={() => {
                    localStorage.setItem('cart', JSON.stringify(cart)); // simpan cart ke localStorage
                    setShowCart(false);
                    router.push('/checkout');
                  }}
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Popup Buy */}
      {showPopup && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-8 min-w-[400px] shadow-lg">
            <h2 className="text-xl font-bold mb-2">{selectedProduct.heading}</h2>
            <p className="mb-4">How many do you want to buy?</p>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              className="border rounded px-2 py-1 w-20 text-center mb-4"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => {
                  // Redirect langsung ke checkout dengan data produk & qty
                  router.push(
                    `/checkout?product=${selectedProduct.heading}&qty=${quantity}&price=${selectedProduct.price}&imgSrc=${selectedProduct.imgSrc}`
                  );
                  setShowPopup(false);
                }}
              >
                Checkout
              </button>
              <button
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}