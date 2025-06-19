'use client';

import MultipleItems from '@/components/MultipleItems';
import type { DataType } from '@/components/MultipleItems';

const accessoriesData: DataType[] = [
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

export default function AccessoriesPage() {
  return (
    <div>
      <MultipleItems
        title="Our Accessories & Display Variants"
        data={accessoriesData}
      />
    </div>
  );
}
