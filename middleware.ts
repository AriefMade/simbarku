import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  
  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*']
};