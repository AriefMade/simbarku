'use client';

import Slider from 'react-slick';
import Link from 'next/link';
import Image from 'next/image';

export interface DataType {
  time: string;
  heading: string;
  heading2: string;
  name: string;
  date: string;
  imgSrc: string;
  price: string;
}

interface MultipleItemsProps {
  title: string;
  data: DataType[];
}

const MultipleItems = ({ title, data }: MultipleItemsProps) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    cssEase: 'linear',
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="bg-lightgrey py-20">
      <div className="mx-auto max-w-7xl sm:py-4 lg:px-8">
        <div className="text-center">
          <h3 className="text-blue text-lg font-normal tracking-widest">Product</h3>
          <h3 className="text-4xl sm:text-6xl font-bold">{title}</h3>
        </div>

        <Slider {...settings}>
          {data.map((item, i) => (
            <div key={i}>
              <div className="bg-white m-3 px-3 pt-3 pb-12 my-10 shadow-lg rounded-3xl relative h-[520px] flex flex-col">
                <div className="w-full h-[262px] relative overflow-hidden rounded-xl">
                  <Image
                    src={item.imgSrc}
                    alt={`product-${i}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <span className="absolute bottom-16 right-4 bg-[#007BFF] text-white text-sm font-semibold px-4 py-1 rounded-full shadow">
                  Rp {Number(item.price).toLocaleString('id-ID')}
                </span>
                <Link href="/" className="absolute bottom-4 right-4">
                  <h3 className="bg-[#007BFF] text-white  hover:shadow-xl py-2 px-4 rounded-full text-sm">
                    Buy
                  </h3>
                </Link>
                <div className="pt-6 px-1 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-2xl font-bold text-black">{item.heading}</h4>
                    <h4 className="text-2xl font-bold text-black mt-1">{item.heading2}</h4>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-base font-normal opacity-75">{item.name}</h3>
                    <h3 className="text-base font-normal opacity-75">{item.date}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MultipleItems;
