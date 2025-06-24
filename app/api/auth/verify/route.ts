import { NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/password-utils';

// This API route runs in Node.js environment where bcrypt works
export async function POST(request: Request) {
  try {
    const { password, hash } = await request.json();
    
    if (!password || !hash) {
      return NextResponse.json({ success: false, message: 'Missing parameters' }, { status: 400 });
    }
    
    const isValid = await verifyPassword(password, hash);
    return NextResponse.json({ success: isValid });
  } catch (error) {
    console.error('Password verification error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}