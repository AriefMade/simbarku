import { NextResponse } from 'next/server';
import { hashPassword, verifyPassword } from '@/lib/password-utils';
import { getAdminByUsername, updateAdminPassword } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Verifikasi bahwa pengguna sudah login
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: 'Tidak terautentikasi' }, { status: 401 });
    }
    
    const { currentPassword, newPassword } = await request.json();
    
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, message: 'Data tidak lengkap' }, { status: 400 });
    }
    
    // Ambil data admin dari database
    const admin = await getAdminByUsername(session.user.name);
    
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Admin tidak ditemukan' }, { status: 404 });
    }
    
    // Verifikasi password lama
    // Jika masih menggunakan plaintext, bandingkan langsung
    let passwordValid = false;
    
    if (admin.password.length < 20) {
      // Asumsi ini masih plaintext
      passwordValid = admin.password === currentPassword;
    } else {
      // Password sudah di-hash
      passwordValid = await verifyPassword(currentPassword, admin.password);
    }
    
    if (!passwordValid) {
      return NextResponse.json({ success: false, message: 'Password lama tidak sesuai' }, { status: 400 });
    }
    
    // Hash password baru
    const hashedPassword = await hashPassword(newPassword);
    
    // Update password di database
    await updateAdminPassword(admin.id_user, hashedPassword);
    
    return NextResponse.json({ success: true, message: 'Password berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json({ success: false, message: 'Kesalahan server' }, { status: 500 });
  }
}