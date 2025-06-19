"use client";
import React, { Component } from "react";
import Image from "next/image";

interface Testimonial {
  name: string;
  country: string;
  comment: string;
  imgSrc: string;
}

//ambil dari data testimonials yang sudah ada
const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    country: "United Kingdom",
    comment:
      "The fern arrived in perfect condition! It's now the centerpiece of my living room. Thank you for the great service!",
    imgSrc: "/images/testimonial/user1.svg",
  },
  {
    name: "Emily Smith",
    country: "Thailand",
    comment:
      "As a beginner, I really appreciate the care guide included. Everything was easy to set up. Highly recommended!",
    imgSrc: "/images/testimonial/user1.svg",
  },
  {
    name: "Michael Johnson",
    country: "Malaysia",
    comment:
      "Beautiful, healthy plant and fast delivery. The frame and accessories make it look so elegant on my wall!",
    imgSrc: "/images/testimonial/user3.svg",
  },
  {
    name: "Sarah Anderson",
    country: "Canada",
    comment:
      "Finally found a trusted place to get quality staghorn ferns online. Definitely ordering again soon!",
    imgSrc: "/images/testimonial/user3.svg",
  },
];

export default function TestimonialSection() {
  return (
    <section 
    id="testimonial-section"
    className="mx-auto max-w-7xl py-24 lg:px-8 bg-faqblue rounded-2xl my-16 faq-bg">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h3 className="text-[#007BFF] font-sans font-semibold text-lg">Testimonial</h3>
        <h2 className="text-xl md:text-5xl font-bold mt-2">What the people think about us?</h2>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {testimonials.map((item, i) => (
          <div
            key={i}
            className="bg-[#007BFF] text-white rounded-xl p-6 pt-10 relative shadow-md"
          >
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <Image
                src={item.imgSrc}
                alt={item.name}
                width={60}
                height={60}
                className="rounded-full border-4 border-white shadow-md"
              />
            </div>
            <div className="text-4xl leading-none mb-4">“</div>
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-sm mb-3">{item.country}</p>
            <p className="text-sm">{item.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
