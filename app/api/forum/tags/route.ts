import { NextResponse } from 'next/server';
import { getForumTags } from '@/lib/db';

// GET /api/forum/tags - Mendapatkan semua tag unik
export async function GET() {
  try {
    const tags = await getForumTags();
    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error in GET /api/forum/tags:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}