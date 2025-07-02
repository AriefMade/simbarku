import { NextResponse } from 'next/server';
import { db, transactions, users, products } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

// Definisikan tipe data untuk tabel detail_transaksi
// Ini hanya digunakan untuk TypeScript, tidak mempengaruhi database
const detail_transaksi = {
  id_detail: 'id_detail',
  id_transaksi: 'id_transaksi',
  id_product: 'id_product',
  qty: 'qty',
  harga_satuan: 'harga_satuan'
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, total } = body;
    
    if (!customer || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Data tidak lengkap' },
        { status: 400 }
      );
    }
    
    // 1. Periksa ketersediaan stok
    for (const item of items) {
      const product = await db.select({ stock: products.stock })
        .from(products)
        .where(eq(products.id, item.id))
        .limit(1);
      
      if (product.length === 0 || product[0].stock < item.qty) {
        return NextResponse.json(
          { 
            error: 'Stok tidak mencukupi untuk produk: ' + item.name,
            productId: item.id
          },
          { status: 400 }
        );
      }
    }
    
    // 2. Simpan atau ambil data customer
    let userId;
    const existingUser = await db.select()
      .from(users)
      .where(eq(users.email, customer.email))
      .limit(1);
      
    if (existingUser.length > 0) {
      userId = existingUser[0].idUser;
    } else {
      // Gunakan raw SQL karena struktur schema mungkin tidak cocok persis
      const result = await db.execute(
        sql`INSERT INTO user (nama, email, alamat, no_telp) 
            VALUES (${customer.nama}, ${customer.email}, ${customer.alamat}, ${customer.no_telp})`
      );
      
      // Ambil id yang baru dibuat
      const newUser = await db.select()
        .from(users)
        .where(eq(users.email, customer.email))
        .limit(1);
      
      userId = newUser[0].idUser;
    }
    
    // 3. Buat transaksi
    const result = await db
      .insert(transactions)
      .values({
        id_user: userId,
        harga: total,
        tanggal: new Date(),
        status: 'pending'
      });
    
    // Get the last inserted ID using a separate query
    const [newTransaction] = await db
      .select({ id_transaksi: transactions.id_transaksi })
      .from(transactions)
      .orderBy(sql`${transactions.id_transaksi} DESC`)
      .limit(1);
    
    const transactionId = newTransaction.id_transaksi;
    
    if (!transactionId) {
      console.error("Failed to get transaction ID");
      return NextResponse.json(
        { error: 'Gagal mendapatkan ID transaksi' },
        { status: 500 }
      );
    }
    
    console.log("Using transaction ID:", transactionId);
    
    
    for (const item of items) {
      await db.execute(
        sql`INSERT INTO detail_transaksi (id_transaksi, id_product, qty, harga_satuan) 
            VALUES (${transactionId}, ${item.id}, ${item.qty}, ${item.price})`
      );
      
      // Update stok produk
      await db.execute(
        sql`UPDATE products SET stock = stock - ${item.qty} WHERE id = ${item.id}`
      );
    }
    
    return NextResponse.json({ 
      success: true,
      orderId: transactionId
    });
    
  } catch (error) {
    console.error('Error processing checkout:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memproses pesanan' },
      { status: 500 }
    );
  }
}