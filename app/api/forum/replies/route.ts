import { NextRequest, NextResponse } from 'next/server';
import { createThreadReply, getThreadReplies } from '@/lib/db';

// GET /api/forum/replies?threadId=123 - Mendapatkan semua reply untuk thread tertentu
export async function GET(request: NextRequest) {
  try {
    const threadId = request.nextUrl.searchParams.get('threadId');
    if (!threadId) {
      return NextResponse.json({ error: 'Thread ID is required' }, { status: 400 });
    }
    
    const replies = await getThreadReplies(parseInt(threadId));
    
    // Format output untuk klien
    const formattedReplies = replies.map(reply => ({
      id: reply.idReply,
      content: reply.content,
      createdAt: reply.createdAt,
      userName: reply.userName || 'Anonymous'
    }));
    
    return NextResponse.json(formattedReplies);
  } catch (error) {
    console.error('Error in GET /api/forum/replies:', error);
    return NextResponse.json({ error: 'Failed to fetch replies' }, { status: 500 });
  }
}

// POST /api/forum/replies - Membuat reply baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { threadId, content } = body;
    
    // Validasi
    if (!threadId || !content) {
      return NextResponse.json(
        { error: 'Thread ID and content are required' },
        { status: 400 }
      );
    }
    
    // Simpan reply baru
    const result = await createThreadReply({
      idThread: parseInt(threadId),
      content
    });
    
    if (result.success) {
      return NextResponse.json({ success: true, idReply: result.idReply });
    } else {
      throw new Error('Failed to create reply');
    }
  } catch (error) {
    console.error('Error in POST /api/forum/replies:', error);
    return NextResponse.json({ error: 'Failed to create reply' }, { status: 500 });
  }
}