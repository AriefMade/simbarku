import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    // Ambil session dari auth helper
    const session = await auth();
    
    // Return user jika ada session
    if (session?.user) {
      return NextResponse.json({
        user: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image || '/placeholder-user.jpg'
        }
      });
    }
    
    // Tidak ada session
    return NextResponse.json({ user: null });
  } catch (error) {
    console.error('Error getting session:', error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}