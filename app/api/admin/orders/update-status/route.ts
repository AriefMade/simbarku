import { NextResponse } from 'next/server';
import { db, transactions } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Verifikasi bahwa user adalah admin
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id, status } = await request.json();

    if (!id || !status || !['completed', 'pending', 'canceled'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid data provided' },
        { status: 400 }
      );
    }

    // Update status transaksi
    await db.update(transactions)
      .set({ status })
      .where(eq(transactions.id_transaksi, id));

    return NextResponse.json({ 
      success: true, 
      message: `Status transaksi #${id} berhasil diubah menjadi ${status}`
    });
  } catch (error) {
    console.error('Error updating transaction status:', error);
    return NextResponse.json(
      { error: 'Failed to update transaction status' },
      { status: 500 }
    );
  }
}