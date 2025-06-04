import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const offset = parseInt(url.searchParams.get('offset') || '0');

    const { products, newOffset, totalProducts } = await getProducts(search, offset);

    return NextResponse.json({
      products,
      offset: newOffset,
      totalProducts
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}