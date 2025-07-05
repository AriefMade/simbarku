import { NextResponse } from 'next/server';
import { db, products } from '@/lib/db';
import { desc, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Helper function untuk menyimpan gambar
async function saveImage(file: File): Promise<string> {
  // Buat direktori jika belum ada
  const uploadDir = join(process.cwd(), 'public/images/product');
  
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }
  
  // Generate nama file unik: timestamp + nama produk tanpa spasi + ekstensi asli
  const timestamp = Date.now();
  const originalName = file.name.replace(/\s+/g, '-').toLowerCase();
  const fileExtension = originalName.split('.').pop();
  const fileName = `${timestamp}-${originalName}`;
  
  // Path lengkap dimana file akan disimpan
  const filePath = join(uploadDir, fileName);
  
  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  // Simpan file ke disk
  await writeFile(filePath, buffer);
  
  // Return path relatif untuk disimpan di database
  return `/images/product/${fileName}`;
}

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
    
    // Parse formData dari request
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const price = Number(formData.get('price'));
    const stock = Number(formData.get('stock'));
    const kategori = formData.get('kategori') as string;
    
    // Dapatkan file gambar jika ada
    const productImage = formData.get('productImage') as File | null;
    let imageUrl = '';
    
    // Simpan gambar jika diunggah
    if (productImage) {
      imageUrl = await saveImage(productImage);
    } else {
      return NextResponse.json(
        { error: 'Product image is required' },
        { status: 400 }
      );
    }
    
    // Sisipkan produk ke database dengan tipe data yang benar
    const result = await db.insert(products).values({
      name: name,
      imageUrl: imageUrl,
      price: String(price), // Konversi ke string karena skema mengharapkan string
      stock: stock,
      kategori: kategori || '',
      status: 'active' as const, // Gunakan 'as const' untuk memastikan tipe literal
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