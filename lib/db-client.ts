// Ini adalah versi db yang aman untuk client components

import type { 
  SelectProduct, 
  SelectAdmin,
  SelectUser,
  SelectForum,
  SelectTestimoni,
  SelectTransaksi
} from './db-types';

// Export tipe untuk digunakan di client
export type {
  SelectProduct,
  SelectAdmin,
  SelectUser,
  SelectForum,
  SelectTestimoni,
  SelectTransaksi
};

// Fungsi untuk memformat harga
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}