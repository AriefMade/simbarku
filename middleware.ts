import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

// This middleware function handles authentication checks
export default auth((req) => {
  // Get the path from the URL
  const { pathname } = req.nextUrl;
  
  // Check if this is an admin route
  const isAdminPath = pathname.startsWith('/admin');
  
  // If trying to access admin routes and not authenticated, redirect to login
  if (isAdminPath && !req.auth) {
    // Store the original URL to redirect back after login
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }
  
  return NextResponse.next();
});

// Configure matcher for paths that should trigger this middleware
export const config = {
  matcher: ['/admin', '/admin/:path*']
};