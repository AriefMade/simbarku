import { notFound } from "next/navigation";
import { db, transactions, users } from "@/lib/db";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/ui/card";
import { Badge } from "@/components/common/ui/ui/badge";

// Define interfaces for the transaction items
interface TransactionItem {
  id_detail: number;
  id_product: number;
  qty: number;
  harga_satuan: number;
  name: string;
  imageUrl: string;
}

// Define the database result type
interface DatabaseResult {
  rows?: TransactionItem[];
}

async function getTransactionDetails(id: number) {
  const transaction = await db
    .select()
    .from(transactions)
    .where(eq(transactions.id_transaksi, id))
    .limit(1);

  if (!transaction.length) return null;

  // Get user details
  const user = await db
    .select()
    .from(users)
    .where(eq(users.idUser, transaction[0].id_user))
    .limit(1);

  // Get transaction items with proper typing
  const items = await db.execute(
    sql`SELECT dt.*, p.name, p.imageUrl 
        FROM detail_transaksi dt
        JOIN products p ON dt.id_product = p.id
        WHERE dt.id_transaksi = ${id}`
  ) as DatabaseResult | TransactionItem[];

  // Handle the result with proper type checking
  let data: TransactionItem[];
  if (Array.isArray(items)) {
    data = items;
  } else if (items && typeof items === 'object' && 'rows' in items && items.rows) {
    data = items.rows;
  } else {
    data = [];
  }

  return {
    transaction: transaction[0],
    user: user.length > 0 ? user[0] : null,
    items: data
  };
}

export default async function TransactionDetailPage({
  params
}: {
  params: { id: string }
}) {
  const id = parseInt(params.id, 10);
  
  if (isNaN(id)) {
    notFound();
  }
  
  const details = await getTransactionDetails(id);
  
  if (!details) {
    notFound();
  }
  
  const { transaction, user, items } = details;
  
  // Format tanggal
  const formattedDate = typeof transaction.tanggal === 'string'
    ? new Date(transaction.tanggal).toLocaleDateString('id-ID')
    : transaction.tanggal.toLocaleDateString('id-ID');
    
  // Status badges
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-500">Selesai</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Diproses</Badge>;
      case 'canceled':
        return <Badge className="bg-red-500">Dibatalkan</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-500">
        <Link href="/admin" className="hover:underline">Dashboard</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/admin/orders" className="hover:underline">Orders</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span>Order #{id}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Detail Transaksi #{id}</h1>
        <div>
          {getStatusBadge(transaction.status || 'pending')}
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Transaksi</CardTitle>
            <CardDescription>Detail transaksi yang dilakukan</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">ID Transaksi</dt>
                <dd className="mt-1 text-sm">#{transaction.id_transaksi}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Tanggal</dt>
                <dd className="mt-1 text-sm">{formattedDate}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Total</dt>
                <dd className="mt-1 text-sm font-medium">{formatPrice(transaction.harga)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm">{getStatusBadge(transaction.status || 'pending')}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Informasi Pelanggan</CardTitle>
            <CardDescription>Detail pelanggan yang melakukan transaksi</CardDescription>
          </CardHeader>
          <CardContent>
            {user ? (
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Nama</dt>
                  <dd className="mt-1 text-sm">{user.nama}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">No. Telepon</dt>
                  <dd className="mt-1 text-sm">{user.no_telp}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Alamat</dt>
                  <dd className="mt-1 text-sm">{user.alamat}</dd>
                </div>
              </dl>
            ) : (
              <p className="text-sm text-gray-500">Data pelanggan tidak ditemukan</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Item Transaksi</CardTitle>
          <CardDescription>Daftar produk dalam transaksi ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.length > 0 ? (
                  items.map((item: any) => (
                    <tr key={item.id_detail}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {item.imageUrl && (
                            <div className="flex-shrink-0 h-10 w-10 mr-4">
                              <img 
                                className="h-10 w-10 rounded-md object-cover" 
                                src={item.imageUrl} 
                                alt={item.name} 
                              />
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-xs text-gray-500">ID: {item.id_product}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatPrice(item.harga_satuan)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.qty}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        {formatPrice(item.harga_satuan * item.qty)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Tidak ada item dalam transaksi ini
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td colSpan={3} className="px-4 py-3 text-sm font-medium text-right">Total</td>
                  <td className="px-4 py-3 text-sm font-bold">{formatPrice(transaction.harga)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}