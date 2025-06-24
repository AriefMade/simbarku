'use client';

import { SelectTransaksi } from '@/lib/db-types';
import { TableCell, TableRow } from '@/components/common/ui/ui/table';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/common/ui/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/common/ui/ui/dropdown-menu';
import { Badge } from '@/components/common/ui/ui/badge';
import { MoreHorizontal, Eye, FileText, Clock } from 'lucide-react';

export function TransactionRow({ 
  transaction, 
  userName 
}: { 
  transaction: SelectTransaksi,
  userName: string
}) {
  const formattedDate = typeof transaction.tanggal === 'string'
    ? new Date(transaction.tanggal).toLocaleDateString('id-ID')
    : transaction.tanggal.toLocaleDateString('id-ID');
  
  const formattedPrice = formatPrice(Number(transaction.harga));

  // Status transaksi dengan warna dan ikon
  const statusConfig = {
    completed: { label: 'Selesai', color: 'bg-green-100 text-green-800', icon: <Eye className="h-3.5 w-3.5 mr-1" /> },
    pending: { label: 'Diproses', color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="h-3.5 w-3.5 mr-1" /> },
    canceled: { label: 'Dibatalkan', color: 'bg-red-100 text-red-800', icon: null }
  };

  // Gunakan status dari database, dengan fallback ke 'pending'
  const status = transaction.status || 'pending';
  const statusInfo = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

  return (
    <TableRow>
      <TableCell className="font-medium">{transaction.id_transaksi}</TableCell>
      <TableCell>{userName}</TableCell>
      <TableCell>{formattedPrice}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>
        <Badge variant="outline" className={`${statusInfo.color} flex items-center w-fit`}>
          {statusInfo.icon}
          {statusInfo.label}
        </Badge>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a href={`/admin/orders/${transaction.id_transaksi}`}>Detail Transaksi</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href={`/admin/orders/${transaction.id_transaksi}/invoice`}>Cetak Invoice</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href={`/admin/users/${transaction.id_user}`}>Lihat Pelanggan</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}