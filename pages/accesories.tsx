"use client";
import Slider from "react-slick";
import React, { Component } from "react";
import Link from "next/link";
import Image from "next/image";

interface DataType {
    time: string;
    heading: string;
    heading2: string;
    date: string;
    imgSrc: string;
    name: string;
    price: string;
}

// Ambil dari database rif
const postData: DataType[] = [
    {
        time: "Buy",
        heading: 'We Launch Delia',
        heading2: 'Webflow this Week!',
        name: "Published on Startupon",
        date: 'August 19, 2021',
        imgSrc: '/images/product item/item 1.jpg',
        price: '100000',
    },
    {
        time: "Buy",
        heading: 'We Launch Delia',
        heading2: 'Webflow this Week!',
        name: "Published on Startupon",
        date: 'August 19, 2021',
        imgSrc: '/images/product item/item 2.jpg',
        price: '100000',
    },
    {
        time: "Buy",
        heading: 'We Launch Delia',
        heading2: 'Webflow this Week!',
        name: "Published on Startupon",
        date: 'August 19, 2021',
        imgSrc: '/images/product item/item 3.jpg',
        price: '100000',
    },
];

export default class MultipleItems extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 2,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 500,
            cssEase: "linear",
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false,
                    },
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false,
                    },
                },
            ],
        };

        return (
            <div className="bg-lightgrey py-20" id="supplies-section">
                <div className="mx-auto max-w-7xl sm:py-4 lg:px-8">
                    <div className="text-center">
                        <h3 className="text-blue text-lg font-normal tracking-widest">Product</h3>
                        <h3 className="text-4xl sm:text-6xl font-bold">Our Simbar Accessories & Displays Variants.</h3>
                    </div>

                    <Slider {...settings}>
                        {postData.map((items, i) => (
                            <div key={i}>
                                <div className="bg-white m-3 px-3 pt-3 pb-12 my-10 shadow-lg rounded-3xl relative h-[520px] flex flex-col">
                                    {/* Kontainer gambar dengan tinggi tetap */}
                                    <div className="w-full h-[262px] relative overflow-hidden rounded-xl">
                                        <Image
                                            src={items.imgSrc}
                                            alt={`product-${i}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>

                                    <span className="absolute bottom-16 right-4 bg-brightblue text-white text-sm font-semibold px-4 py-1 rounded-full shadow">
                                        Rp {Number(items.price).toLocaleString('id-ID')}
                                    </span>

                                    {/* Tombol buy */}
                                    <Link href="/" className="absolute bottom-4 right-4">
                                        <h3 className="bg-blue text-black hover:bg-brightblue hover:shadow-xl py-2 px-4 rounded-full text-sm">
                                            {"Buy"} 
                                        </h3>
                                    </Link>

                                    {/* Konten teks */}
                                    <div className="pt-6 px-1 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-2xl font-bold text-black">{items.heading}</h4>
                                            <h4 className="text-2xl font-bold text-black mt-1">{items.heading2}</h4>
                                        </div>
                                        <div className="mt-4">
                                            <h3 className="text-base font-normal opacity-75">{items.name}</h3>
                                            <h3 className="text-base font-normal opacity-75">{items.date}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        );
    }
}
