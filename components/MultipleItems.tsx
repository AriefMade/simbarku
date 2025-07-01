'use client';

import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ShoppingBag } from 'lucide-react';

export interface DataType {
  id?: number; // Tambahkan ID produk
  time: string;
  heading: string;
  heading2: string;
  name?: string;
  date: string;
  imgSrc: string;
  price: string;
  stock?: number; // Tambahkan stok
}

interface MultipleItemsProps {
  title?: string;
  data: DataType[];
  onBuyClick: (item: DataType) => void;
  showCart?: () => void;
  cartItemCount?: number;
}

export default function MultipleItems({
  title = 'Our Products',
  data,
  onBuyClick,
  showCart,
  cartItemCount = 0,
}: MultipleItemsProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">{title}</h2>
        {showCart && (
          <button
            onClick={showCart}
            className="relative bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <ShoppingBag size={20} className="mr-2" />
            Keranjang
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            )}
          </button>
        )}
      </div>

      <Slider {...settings}>
        {data.map((item, index) => (
          <div key={index} className="px-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
              <div className="h-48 relative">
                <img
                  src={item.imgSrc}
                  alt={item.heading}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs">
                  {item.time}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-1">{item.heading}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.heading2}</p>
                <div className="text-gray-500 text-sm">{item.name}</div>
                <div className="text-gray-500 text-sm mb-2">{item.date}</div>
                {item.stock !== undefined && (
                  <div className="text-sm mb-2">
                    Stock:{' '}
                    <span
                      className={
                        item.stock > 5
                          ? 'text-green-500'
                          : 'text-orange-500'
                      }
                    >
                      {item.stock} tersedia
                    </span>
                  </div>
                )}
                <div className="mt-auto">
                  <div className="font-bold text-lg mb-2">
                    Rp {Number(item.price).toLocaleString('id-ID')}
                  </div>
                  <button
                    className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition-colors"
                    onClick={() => onBuyClick(item)}
                  >
                    Beli Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
