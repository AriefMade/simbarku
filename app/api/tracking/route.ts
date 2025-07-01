import { NextResponse } from 'next/server';
import { db, transactions, users, detail_transaksi, products } from '@/lib/db';
import { eq, and } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const email = url.searchParams.get('email');
    
    if (!id || !email) {
      return NextResponse.json(
        { error: 'ID transaksi dan email diperlukan' },
        { status: 400 }
      );
    }
    
    // Get user by email
    const user = await db.select({ idUser: users.idUser })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    
    if (user.length === 0) {
      return NextResponse.json(null);
    }
    
    // Get transaction with validation
    const transactionData = await db.select()
      .from(transactions)
      .where(
        and(
          eq(transactions.id_transaksi, Number(id)),
          eq(transactions.id_user, user[0].idUser)
        )
      )
      .limit(1);
    
    if (transactionData.length === 0) {
      return NextResponse.json(null);
    }
    
    // Get transaction details
    const details = await db.select({
      id_detail: detail_transaksi.id_detail,
      qty: detail_transaksi.qty,
      harga_satuan: detail_transaksi.harga_satuan,
      name: products.name
    })
    .from(detail_transaksi)
    .leftJoin(products, eq(detail_transaksi.id_product, products.id))
    .where(eq(detail_transaksi.id_transaksi, Number(id)));
    
    // Return combined data
    return NextResponse.json({
      ...transactionData[0],
      items: details
    });
    
  } catch (error) {
    console.error('Error tracking order:', error);
    return NextResponse.json(
      { error: 'Failed to track order' },
      { status: 500 }
    );
  }
}