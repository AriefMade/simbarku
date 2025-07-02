'use client';

import { SelectProduct } from '@/lib/db-types';
import { formatPrice } from '@/lib/db-client'; 
import { TableCell, TableRow } from '@/components/common/ui/ui/table';
import Image from 'next/image';
import { Button } from '@/components/common/ui/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/common/ui/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Product({ product }: { product: SelectProduct }) {
  const router = useRouter();
  const formattedPrice = formatPrice(Number(product.price));
  const formattedDate = typeof product.availableAt === 'string'
    ? new Date(product.availableAt).toLocaleDateString()
    : product.availableAt.toLocaleDateString();
  
  const idString = String(product.id || '');

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <div className="h-11 w-11 rounded-md overflow-hidden">
          <Image
            src={product.imageUrl || '/placeholder.svg'}
            width={44}
            height={44}
            alt={product.name}
            className="object-cover"
          />
        </div>
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              product.status === 'active'
                ? 'bg-green-600'
                : product.status === 'inactive'
                ? 'bg-yellow-600'
                : 'bg-gray-400'
            }`}
          />
          <span className="capitalize">{product.status}</span>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">{formattedPrice}</TableCell>
      <TableCell className="hidden md:table-cell">{product.stock} units</TableCell>
      <TableCell className="hidden md:table-cell">{formattedDate}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <button 
                className="w-full text-left"
                onClick={() => router.push(`/admin/products/edit/${product.id}`)}
              >
                Edit
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                className="w-full text-left text-red-600"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this product?')) {
                    // Call delete API
                    fetch(`/api/admin/products/${product.id}`, {
                      method: 'DELETE',
                    })
                    .then(response => {
                      if (response.ok) {
                        // Refresh page to show updated list
                        router.refresh();
                      } else {
                        throw new Error('Failed to delete product');
                      }
                    })
                    .catch(error => {
                      console.error('Error deleting product:', error);
                      alert('Failed to delete product');
                    });
                  }
                }}
              >
                Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
