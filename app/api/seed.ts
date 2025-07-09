import { NextResponse } from 'next/server';
import { db, products } from '@/lib/db';

export async function GET() {
  try {
    // Hapus data yang ada jika diperlukan
    await db.delete(products);
    
    // Tambahkan data contoh dengan semua field yang diperlukan
    await db.insert(products).values([
      {
        imageUrl: '/placeholder.svg',
        name: 'Product 1',
        status: 'active' as const,
        price: '19.99',
        stock: 10,
        kategori: 'tanaman', // Tambahkan field kategori
        availableAt: new Date()
      },
      {
        imageUrl: '/placeholder.svg',
        name: 'Product 2',
        status: 'inactive' as const,
        price: '29.99',
        stock: 5,
        kategori: 'mediaTanaman', // Tambahkan field kategori
        availableAt: new Date()
      }
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}