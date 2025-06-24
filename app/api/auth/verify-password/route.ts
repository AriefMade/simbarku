import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { password, hash } = await request.json();
    
    if (!password || !hash) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }
    
    const isValid = await bcrypt.compare(password, hash);
    return NextResponse.json({ valid: isValid });
  } catch (error) {
    console.error('Password verification error:', error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}