'use client';

import { useState, useEffect } from 'react';
import MultipleItems from '@/components/MultipleItems';
import { DataType } from '@/components/MultipleItems';
import { useRouter } from 'next/navigation';

export default function ShopPage() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DataType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<{ item: DataType; qty: number }[]>([]);
  const [products, setProducts] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch('/api/shop');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform API data to DataType format
        const formattedProducts: DataType[] = data.map((product: any) => ({
          id: product.id,
          time: 'Buy',
          heading: product.name,
          heading2: `Kategori: ${product.kategori}`,
          name: 'SimbarPlants',
          date: new Date(product.availableAt).toLocaleDateString('id-ID', {month: 'long', year: 'numeric'}),
          imgSrc: product.imageUrl || '/images/product/item1.jpg',
          price: String(product.price),
          stock: product.stock
        }));
        
        setProducts(formattedProducts);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching products:', err);
        // Fallback ke data dummy jika gagal
        setProducts([
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
        ]);
      } finally {
        setLoading(false);
      }
    }

    // Get cart from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
      } catch (e) {
        console.error('Error parsing stored cart:', e);
      }
    }
    
    fetchProducts();
  }, []);

  // Fetch categories in useEffect
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    
    fetchCategories();
  }, []);

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
      setShowPopup(false);
    }
  };

  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleClose = () => setShowPopup(false);

  // Function to handle category change
  const handleCategoryChange = async (category: string) => {
    setActiveCategory(category);
    setLoading(true);
    
    try {
      const url = category ? `/api/shop?kategori=${encodeURIComponent(category)}` : '/api/shop';
      const response = await fetch(url);
      const data = await response.json();
      
      // Transform data...
      const formattedProducts: DataType[] = data.map((product: any) => ({
        id: product.id,
        time: 'Buy',
        heading: product.name,
        heading2: `Kategori: ${product.kategori}`,
        name: 'SimbarPlants',
        date: new Date(product.availableAt).toLocaleDateString('id-ID', {month: 'long', year: 'numeric'}),
        imgSrc: product.imageUrl || '/images/product/item1.jpg',
        price: String(product.price),
        stock: product.stock
      }));
      
      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products by category:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Filter by Category */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => handleCategoryChange('')} 
            className={`px-3 py-1 rounded ${activeCategory === '' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1 rounded ${activeCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <MultipleItems 
        data={products} 
        onBuyClick={handleBuy}
        showCart={() => setShowCart(true)}
        cartItemCount={cart.reduce((sum, item) => sum + item.qty, 0)}
      />

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
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

      {/* Product Buy Popup */}
      {showPopup && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-md w-full relative">
            <button
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={handleClose}
            >×</button>
            <h2 className="text-2xl font-bold mb-4">{selectedProduct.heading}</h2>
            <div className="flex mb-4">
              <img
                src={selectedProduct.imgSrc}
                alt={selectedProduct.heading}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="ml-4">
                <p className="text-gray-600">{selectedProduct.heading2}</p>
                <p className="font-bold mt-2">Rp {Number(selectedProduct.price).toLocaleString('id-ID')}</p>
              </div>
            </div>
            <div className="flex items-center mb-6">
              <span className="mr-4">Jumlah:</span>
              <button
                className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold flex items-center justify-center"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >-</button>
              <span className="mx-4 w-8 text-center">{quantity}</span>
              <button
                className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold flex items-center justify-center"
                onClick={() => setQuantity(quantity + 1)}
              >+</button>
            </div>
            <div className="flex justify-between gap-2">
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 flex-1"
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
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 flex-1"
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