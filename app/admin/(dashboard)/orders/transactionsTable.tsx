'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/common/ui/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/common/ui/ui/card';
import { SelectTransaksi, SelectUser } from '@/lib/db-types';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/common/ui/ui/button';
import { TransactionRow } from './transactionsRow';

export function TransactionsTable({
  transactions,
  users,
  offset,
  totalTransactions
}: {
  transactions: SelectTransaksi[];
  users: SelectUser[];
  offset: number;
  totalTransactions: number;
}) {
  let router = useRouter();
  let transactionsPerPage = 10;

  function prevPage() {
    const prevOffset = Math.max(0, offset - transactionsPerPage);
    router.push(`/admin/orders?offset=${prevOffset}`, { scroll: false });
  }

  function nextPage() {
    const nextOffset = offset + transactionsPerPage;
    router.push(`/admin/orders?offset=${nextOffset}`, { scroll: false });
  }

  const start = offset + 1;
  const end = Math.min(offset + transactionsPerPage, totalTransactions);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaksi</CardTitle>
        <CardDescription>
          Kelola dan pantau transaksi pelanggan Simbarku.co
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Pembeli</TableHead>
              <TableHead>Total Harga</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Aksi</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TransactionRow 
                  key={transaction.id_transaksi} 
                  transaction={transaction}
                  userName={users.find(user => user.id_user === transaction.id_user)?.nama || 'Pengguna Tamu'}
                />
              ))
            ) : (
              <TableRow>
                <TableHead colSpan={6} className="text-center py-6 text-gray-500">
                  Belum ada transaksi
                </TableHead>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Menampilkan{' '}
            <strong>
              {transactions.length > 0 ? `${start}-${end}` : '0'}
            </strong>{' '}
            dari <strong>{totalTransactions}</strong> transaksi
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={end >= totalTransactions}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}