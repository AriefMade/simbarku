import { NextResponse } from 'next/server';
import { db, products } from '@/lib/db';
import { desc, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';

// GET all products
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse query parameters
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    
    // Get products with pagination
    const result = await db.select()
      .from(products)
      .orderBy(desc(products.id))
      .limit(limit)
      .offset(offset);
    
    // Count total products
    const countResult = await db.select({ count: sql`count(*)` }).from(products);
    const totalProducts = countResult[0]?.count || 0;
    
    return NextResponse.json({
      products: result,
      total: totalProducts
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - create new product
export async function POST(request: Request) {
  try {
    // Check auth
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Validate required fields
    const { name, imageUrl, price, stock, kategori, status } = body;
    if (!name || !imageUrl || price === undefined || stock === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Insert new product
    const result = await db.insert(products).values({
      name,
      imageUrl,
      price,
      stock,
      kategori: kategori || '',
      status: status || 'active',
      availableAt: new Date()
    });
    
    return NextResponse.json({
      success: true,
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}