import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/ui/ui/tabs';
import { PlusCircle, FileText, ChevronRight } from 'lucide-react';
import { Button } from '@/components/common/ui/ui/button';
import { TransactionsTable } from './transactionsTable';
import { getTransactionsWithUserData, getUsers } from '@/lib/db';
import Link from 'next/link';
import { SearchInput } from '../search';

export default async function OrdersPage(props: {
  searchParams: Promise<{ q?: string; offset?: string; status?: string }>
}) {
  const searchParams = await props.searchParams; // Await searchParams
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ? parseInt(searchParams.offset) : 0;
  const statusFilter = searchParams.status || 'all';

  const { transactions, totalTransactions } = await getTransactionsWithUserData(offset);
  const { users } = await getUsers(search);
  
  const filteredTransactions = statusFilter === 'all' 
    ? transactions 
    : transactions.filter(t => t.status === statusFilter);
  
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">Transaksi</h1>
      
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
