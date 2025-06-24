"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { User } from 'lucide-react'; // Menggunakan ikon user sebagai pengganti avatar

interface Testimonial {
  id_testimoni: number;
  nama: string;
  deskripsi: string;
  rating: number;
}

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/testimonials');
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback ke data dummy jika API gagal
        setTestimonials([
          { id_testimoni: 1, nama: "John Doe", deskripsi: "Pelayanan sangat memuaskan dan produk berkualitas tinggi!", rating: 5 },
          { id_testimoni: 2, nama: "Jane Smith", deskripsi: "Pengiriman cepat dan aman. Produk sesuai dengan deskripsi.", rating: 4 },
          { id_testimoni: 3, nama: "David Johnson", deskripsi: "Sangat puas dengan pembelian saya. Akan berbelanja lagi di sini.", rating: 5 },
          { id_testimoni: 4, nama: "Sarah Williams", deskripsi: "Kualitas produk luar biasa dengan harga yang sangat terjangkau.", rating: 5 },
        ]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl py-24 lg:px-8 bg-faqblue rounded-2xl my-16">
        <div className="text-center">
          <h3 className="text-[#007BFF] font-sans font-semibold text-lg">Testimonial</h3>
          <h2 className="text-xl md:text-5xl font-bold mt-2">Memuat testimonial...</h2>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="testimonial-section"
      className="mx-auto max-w-7xl py-24 lg:px-8 bg-faqblue rounded-2xl my-16 faq-bg"
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h3 className="text-[#007BFF] font-sans font-semibold text-lg">Testimonial</h3>
        <h2 className="text-xl md:text-5xl font-bold mt-2">What the people think about us?</h2>
      </div>

      <div className="px-4">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ 
            clickable: true,
            bulletActiveClass: 'swiper-pagination-bullet-active bg-[#007BFF]'
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id_testimoni}>
              <div className="bg-white text-gray-800 rounded-xl p-6 shadow-lg h-[300px] flex flex-col">
                {/* Icon container */}
                <div className="bg-[#007BFF] w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <User className="text-white" size={24} />
                </div>
                
                {/* Testimonial content - fixed height */}
                <div className="flex-1 overflow-y-auto">
                  <h3 className="font-bold text-lg text-center mb-2">{item.nama}</h3>
                  
                  {/* Star rating */}
                  <div className="flex items-center justify-center mb-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg 
                        key={index}
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill={index < item.rating ? '#FFD700' : 'none'} 
                        stroke="#FFD700"
                        strokeWidth="1.5"
                        className="mx-0.5"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  
                  {/* Testimonial text with quote marks */}
                  <div className="relative">
                    <span className="absolute top-0 left-0 text-4xl text-[#007BFF] opacity-20 -mt-4 -ml-2"></span>
                    <p className="text-sm text-gray-600 px-4 text-center">
                      {item.deskripsi}
                    </p>
                    <span className="absolute bottom-0 right-0 text-4xl text-[#007BFF] opacity-20 -mb-8 -mr-2"></span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}