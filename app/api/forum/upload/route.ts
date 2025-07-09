import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

// Fungsi untuk menyimpan gambar ke folder public
async function saveImage(file: File): Promise<string> {
  // Buat direktori jika belum ada
  const uploadDir = join(process.cwd(), 'public/images/forum');
  
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }
  
  // Generate nama file unik
  const timestamp = Date.now();
  const fileExtension = file.name.split('.').pop();
  const fileName = `${timestamp}-${uuidv4().slice(0, 8)}.${fileExtension}`;
  
  // Path lengkap dimana file akan disimpan
  const filePath = join(uploadDir, fileName);
  
  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  // Simpan file ke disk
  await writeFile(filePath, buffer);
  
  // Return path relatif untuk disimpan di database
  return `/images/forum/${fileName}`;
}

// POST /api/forum/upload - Upload gambar
export async function POST(request: NextRequest) {
  try {
    // Parse formData dari request
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Image file is required' },
        { status: 400 }
      );
    }
    
    // Validasi tipe file
    if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
      return NextResponse.json(
        { error: 'File type not supported. Use JPG, PNG, GIF, or WebP' },
        { status: 400 }
      );
    }
    
    // Validasi ukuran file (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB' },
        { status: 400 }
      );
    }
    
    // Simpan gambar dan dapatkan URL nya
    const imageUrl = await saveImage(file);
    
    return NextResponse.json({
      success: true,
      imageUrl
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}