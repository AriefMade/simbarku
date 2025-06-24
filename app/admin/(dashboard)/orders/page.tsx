import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/ui/ui/tabs';
import { PlusCircle, FileText, ChevronRight } from 'lucide-react';
import { Button } from '@/components/common/ui/ui/button';
import { TransactionsTable } from './transactionsTable';
import { getTransactionsWithUserData, getUsers } from '@/lib/db';
import Link from 'next/link';

export default async function OrdersPage(
  props: {
    searchParams: { q?: string; offset?: string; status?: string };
  }
) {
  const search = props.searchParams.q ?? '';
  const offset = props.searchParams.offset ? parseInt(props.searchParams.offset) : 0;
  const statusFilter = props.searchParams.status || 'all';
  
  // Ambil data transaksi dan user
  const { transactions, totalTransactions } = await getTransactionsWithUserData(offset);
  const { users } = await getUsers();
  
  // Filter transaksi berdasarkan status jika diperlukan
  const filteredTransactions = statusFilter === 'all' 
    ? transactions 
    : transactions.filter(t => t.status === statusFilter);
  
  // Pastikan mengembalikan elemen JSX
  return (
    <>
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Link href="/admin" className="hover:underline">Dashboard</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span>Orders</span>
      </div>
      
      <h1 className="text-2xl font-bold tracking-tight">Orders Management</h1>
      <p className="text-muted-foreground mb-4">
        Manage customer orders and transactions
      </p>
      
      <div className="mt-6">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="completed">Selesai</TabsTrigger>
              <TabsTrigger value="pending">Diproses</TabsTrigger>
              <TabsTrigger value="canceled" className="hidden sm:flex">
                Dibatalkan
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <FileText className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Ekspor
                </span>
              </Button>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Transaksi Baru
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <TransactionsTable
              transactions={filteredTransactions}
              users={users.map(user => ({
                id_user: user.idUser,
                nama: user.nama,
                no_telp: user.no_telp,
                alamat: user.alamat,
                email: user.email
              }))}
              offset={offset}
              totalTransactions={totalTransactions}
            />
          </TabsContent>
          <TabsContent value="completed">
            <TransactionsTable
              transactions={transactions.filter(t => t.status === 'completed')}
              users={users.map(user => ({
                id_user: user.idUser,
                nama: user.nama,
                no_telp: user.no_telp,
                alamat: user.alamat,
                email: user.email
              }))}
              offset={0}
              totalTransactions={transactions.filter(t => t.status === 'completed').length}
            />
          </TabsContent>
          <TabsContent value="pending">
            <TransactionsTable
              transactions={transactions.filter(t => t.status === 'pending' || !t.status)}
              users={users.map(user => ({
                id_user: user.idUser,
                nama: user.nama,
                no_telp: user.no_telp,
                alamat: user.alamat,
                email: user.email
              }))}
              offset={0}
              totalTransactions={transactions.filter(t => t.status === 'pending' || !t.status).length}
            />
          </TabsContent>
          <TabsContent value="canceled">
            <TransactionsTable
              transactions={transactions.filter(t => t.status === 'canceled')}
              users={users.map(user => ({
                id_user: user.idUser,
                nama: user.nama,
                no_telp: user.no_telp,
                alamat: user.alamat,
                email: user.email
              }))}
              offset={0}
              totalTransactions={transactions.filter(t => t.status === 'canceled').length}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

// Jika ingin menyimpan fungsi getTransactionsByStatus, pindahkan ke file terpisah
// atau tambahkan setelah komponen utama