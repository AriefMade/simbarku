import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

// This middleware runs in the Edge Runtime - no native Node modules allowed
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  
  // Protect admin routes
  if (nextUrl.pathname.startsWith('/admin') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login?callbackUrl=' + encodeURIComponent(nextUrl.pathname), nextUrl));
  }
  
  return NextResponse.next();
});

// Only run middleware for admin and login routes
export const config = {
  matcher: ['/admin/:path*', '/login']
};