import { NextResponse } from 'next/server';
import { getAdminByUsername } from '@/lib/db';
import { verifyPassword } from '@/lib/password-utils';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Kredensial tidak lengkap' }, { status: 400 });
    }
    
    // Ambil admin dari database
    const admin = await getAdminByUsername(username);
    
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Kredensial tidak valid' }, { status: 401 });
    }
    
    let isPasswordValid = false;
    
    // Periksa apakah password di database sudah di-hash atau masih plaintext
    if (admin.password.length < 20) {
      // Asumsi masih plaintext (solusi sementara)
      isPasswordValid = admin.password === password;
    } else {
      // Password sudah di-hash
      isPasswordValid = await verifyPassword(password, admin.password);
    }
    
    if (isPasswordValid) {
      return NextResponse.json({ 
        success: true, 
        user: {
          id: admin.id_user.toString(),
          name: admin.username,
          email: `${admin.username}@simbarku.com`
        }
      });
    }
    
    return NextResponse.json({ success: false, message: 'Kredensial tidak valid' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Kesalahan server' }, { status: 500 });
  }
}