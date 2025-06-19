'use client';

import MultipleItems from "@/components/MultipleItems";
import { DataType } from "@/components/MultipleItems";

const suppliesData: DataType[] = [
  {
    time: 'Buy',
    heading: 'Simbar Benang',
    heading2: 'Untuk ikat batang tanaman',
    name: 'SimbarCare',
    date: 'June 2025',
    imgSrc: '/images/product/item1.jpg',
    price: '25000',
  },
  {
    time: 'Buy',
    heading: 'Kawat Bonsai',
    heading2: 'Melengkungkan batang artistik',
    name: 'SimbarCare',
    date: 'June 2025',
    imgSrc: '/images/product/item2.jpg',
    price: '40000',
  },
];

export default function SuppliesPage() {
  return (
    <div>
      <MultipleItems
        title="Our Simbar Care Supplies Variants"
        data={suppliesData}
      />
    </div>
  );
}
