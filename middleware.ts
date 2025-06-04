import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export default auth((req) => {
  // Rute yang memerlukan autentikasi
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  
  // Jika halaman admin dan tidak ada session, arahkan ke halaman login
  if (isAdminRoute && !req.auth) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
  
  return NextResponse.next();
});

// Konfigurasi untuk middleware
export const config = {
  matcher: ['/admin/:path*']
};