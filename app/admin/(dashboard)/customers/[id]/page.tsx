import { getById as getUserById, getTransactionsByUser } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/ui/ui/card';
import { Badge } from '@/components/common/ui/ui/badge';
import { Button } from '@/components/common/ui/ui/button';
import { formatPrice } from '@/lib/utils';

export default async function CustomerDetailPage({
  params
}: {
  params: { id: string }
}) {
  const userId = parseInt(params.id, 10);
  
  if (isNaN(userId)) {
    notFound();
  }
  
  const user = await getUserById(userId);
  const transactions = await getTransactionsByUser(userId);
  
  if (!user) {
    notFound();
  }
  
  const totalSpent = transactions.reduce((total, t) => total + t.harga, 0);
  const completedTransactions = transactions.filter(t => t.status === 'completed').length;
  const pendingTransactions = transactions.filter(t => t.status === 'pending').length;
  const canceledTransactions = transactions.filter(t => t.status === 'canceled').length;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-500">
        <Link href="/admin/customers" className="hover:underline">
          Pelanggan
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span>{user.nama}</span>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Pelanggan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{user.nama}</h3>
                <p className="text-sm text-gray-500">ID: {user.idUser}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{user.no_telp}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{user.email}</span>
              </div>
              
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                <span>{user.alamat}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Transaksi</p>
                <p className="text-2xl font-semibold">{transactions.length}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Pembelian</p>
                <p className="text-2xl font-semibold">{formatPrice(totalSpent)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status Transaksi</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className="bg-green-500">{completedTransactions} Selesai</Badge>
                  <Badge className="bg-yellow-500">{pendingTransactions} Proses</Badge>
                  <Badge className="bg-red-500">{canceledTransactions} Batal</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Histori Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 font-medium">ID Transaksi</th>
                  <th className="py-3 px-4 font-medium">Tanggal</th>
                  <th className="py-3 px-4 font-medium">Total</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                      Belum ada transaksi untuk pelanggan ini.
                    </td>
                  </tr>
                ) : (
                  transactions.map((transaction) => (
                    <tr key={transaction.id_transaksi} className="border-b">
                      <td className="py-3 px-4 font-medium">#{transaction.id_transaksi}</td>
                      <td className="py-3 px-4">
                        {new Date(transaction.tanggal).toLocaleDateString('id-ID')}
                      </td>
                      <td className="py-3 px-4">{formatPrice(transaction.harga)}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            transaction.status === 'completed' 
                              ? 'bg-green-500' 
                              : transaction.status === 'pending' 
                                ? 'bg-yellow-500' 
                                : 'bg-red-500'
                          }
                        >
                          {transaction.status === 'completed' 
                            ? 'Selesai' 
                            : transaction.status === 'pending' 
                              ? 'Diproses' 
                              : 'Dibatalkan'
                          }
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-start">
        <Link href="/admin/customers">
          <Button variant="outline" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Kembali ke Daftar Pelanggan
          </Button>
        </Link>
      </div>
    </div>
  );
}