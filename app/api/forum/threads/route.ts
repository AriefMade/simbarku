import { NextRequest, NextResponse } from 'next/server';
import { createForumThread, getForumThreads } from '@/lib/db';

// GET /api/forum/threads - Mendapatkan semua thread atau difilter berdasarkan tag
export async function GET(request: NextRequest) {
  try {
    const tag = request.nextUrl.searchParams.get('tag') || undefined;
    const threads = await getForumThreads(tag);
    
    // Format output untuk klien
    const formattedThreads = threads.map(thread => {
      // Parse tags dari string menjadi array
      const tags = thread.tags?.split(',').filter(Boolean) || [];
      return {
        id: thread.idThread,
        title: thread.title,
        content: thread.content,
        category: thread.category,
        tags,
        createdAt: thread.createdAt,
        userName: thread.userName || 'Anonymous'
      };
    });
    
    return NextResponse.json(formattedThreads);
  } catch (error) {
    console.error('Error in GET /api/forum/threads:', error);
    return NextResponse.json({ error: 'Failed to fetch threads' }, { status: 500 });
  }
}

// POST /api/forum/threads - Membuat thread baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, category, tags } = body;
    
    // Validasi
    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'Title, content, and category are required' },
        { status: 400 }
      );
    }
    
    // Format tags jika perlu
    const formattedTags = Array.isArray(tags) ? tags.join(',') : tags;
    
    // Simpan thread baru
    const result = await createForumThread({
      title,
      content,
      category,
      tags: formattedTags
    });
    
    if (result.success) {
      return NextResponse.json({ success: true, idThread: result.idThread });
    } else {
      throw new Error('Failed to create thread');
    }
  } catch (error) {
    console.error('Error in POST /api/forum/threads:', error);
    return NextResponse.json({ error: 'Failed to create thread' }, { status: 500 });
  }
}