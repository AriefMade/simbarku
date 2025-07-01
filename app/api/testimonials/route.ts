import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { testimonials } from '@/lib/db';
import { desc } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const result = await db.select()
      .from(testimonials)
      .orderBy(desc(testimonials.rating)) // Urutkan berdasarkan rating tertinggi
      .limit(12); // Batasi jumlah item untuk performa
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'gagal konek ke testimonials' },
      { status: 500 }
    );
  }
}