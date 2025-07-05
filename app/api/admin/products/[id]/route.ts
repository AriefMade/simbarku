import { NextResponse } from 'next/server';
import { db, products } from '@/lib/db';
import { eq } from 'drizzle-orm';
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

// GET specific product by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }
    
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);
    
    if (!product.length) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT - update a product
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }
    
    // Parse formData dari request
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const price = Number(formData.get('price'));
    const stock = Number(formData.get('stock'));
    const kategori = formData.get('kategori') as string;
    const status = formData.get('status') as string; 
    
    // Validasi status agar sesuai dengan enum yang diharapkan
    let validStatus: 'active' | 'inactive' | 'archived' = 'active';
    if (status === 'inactive' || status === 'archived') {
      validStatus = status;
    }
    
    // Periksa apakah produk ada
    const existingProduct = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);
    
    if (!existingProduct || existingProduct.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Dapatkan file gambar jika ada
    const productImage = formData.get('productImage') as File | null;
    let imageUrl = formData.get('imageUrl') as string || existingProduct[0].imageUrl || '';
    
    // Simpan gambar baru jika diunggah
    if (productImage) {
      imageUrl = await saveImage(productImage);
    }
    
    // Update produk di database dengan tipe data yang benar
    await db.update(products)
      .set({
        name: name,
        imageUrl: imageUrl,
        price: String(price), // Konversi ke string karena skema mengharapkan string
        stock: stock,
        kategori: kategori || '',
        status: validStatus
      })
      .where(eq(products.id, id));
    
    return NextResponse.json({
      success: true,
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE - delete a product
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }
    
    // Delete product
    await db.delete(products)
      .where(eq(products.id, id));
    
    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}