import { NextResponse } from 'next/server';
import { db, products } from '@/lib/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    // Ambil kategori unik dari products
    const categories = await db.select({
      kategori: products.kategori
    })
    .from(products)
    .groupBy(products.kategori);
    
    // Transform hasil
    const result = categories.map(item => item.kategori).filter(Boolean);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}