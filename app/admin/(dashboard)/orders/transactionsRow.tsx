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
import { MoreHorizontal, Eye, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function TransactionRow({ 
  transaction, 
  userName 
}: { 
  transaction: SelectTransaksi,
  userName: string
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  
  const formattedDate = typeof transaction.tanggal === 'string'
    ? new Date(transaction.tanggal).toLocaleDateString('id-ID')
    : transaction.tanggal.toLocaleDateString('id-ID');
  
  const formattedPrice = formatPrice(Number(transaction.harga));

  // Status transaksi dengan warna dan ikon
  const statusConfig = {
    completed: { label: 'Selesai', color: 'bg-green-100 text-green-800', icon: <Eye className="h-3.5 w-3.5 mr-1" /> },
    pending: { label: 'Diproses', color: 'bg-yellow-100 text-yellow-800', icon: <Eye className="h-3.5 w-3.5 mr-1" /> },
    canceled: { label: 'Dibatalkan', color: 'bg-red-100 text-red-800', icon: <XCircle className="h-3.5 w-3.5 mr-1" /> }
  };
  
  // Gunakan status dari database, dengan fallback ke 'pending'
  const status = transaction.status || 'pending';
  const statusInfo = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

  // Fungsi untuk mengubah status transaksi
  async function updateTransactionStatus(newStatus: 'completed' | 'canceled') {
    if (transaction.status === newStatus) return;
    
    setIsLoading(newStatus);
    
    try {
      const response = await fetch('/api/admin/orders/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: transaction.id_transaksi,
          status: newStatus
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update status');
      }
      
      // Refresh halaman untuk mendapatkan data terbaru
      router.refresh();
    } catch (error) {
      console.error('Error updating transaction status:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to update status'}`);
    } finally {
      setIsLoading(null);
    }
  }

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
            
            {transaction.status !== 'completed' && (
              <DropdownMenuItem disabled={isLoading === 'completed'}>
                <button 
                  className="w-full text-left flex items-center text-green-600" 
                  onClick={() => updateTransactionStatus('completed')}
                  disabled={isLoading !== null}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {isLoading === 'completed' ? 'Memproses...' : 'Terima'}
                </button>
              </DropdownMenuItem>
            )}
            
            {transaction.status !== 'canceled' && (
              <DropdownMenuItem disabled={isLoading === 'canceled'}>
                <button 
                  className="w-full text-left flex items-center text-red-600" 
                  onClick={() => updateTransactionStatus('canceled')}
                  disabled={isLoading !== null}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  {isLoading === 'canceled' ? 'Memproses...' : 'Batalkan'}
                </button>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}