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
import { Product } from './product';
import { SelectProduct } from '@/lib/db';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/common/ui/ui/button';


export function ProductsTable({
  products,
  offset,
  totalProducts,
}: {
  products: SelectProduct[];
  offset: number;
  totalProducts: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'all';
  const productsPerPage = 5;
  const currentPage = Math.floor(offset / productsPerPage);

  function prevPage() {
    const prevPage = Math.max(0, currentPage - 1);
    const prevOffset = prevPage * productsPerPage;
    router.push(`/admin?offset=${prevOffset}`, { scroll: false });
  }

  function nextPage() {
    const nextPage = currentPage + 1;
    const nextOffset = nextPage * productsPerPage;
    router.push(`/admin?offset=${nextOffset}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Sales
              </TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <Product 
                key={product.id} 
                product={{
                  ...product,
                  status: product.status || "active"
                }} 
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {totalProducts === 0 ? 0 : offset + 1}-{Math.min(offset + products.length, totalProducts)}
            </strong>{' '}
            of <strong>{totalProducts}</strong> products
          </div>
          <div className="flex">
            <Button
              onClick={prevPage}
              variant="ghost"
              size="sm"
              type="button"
              disabled={offset === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              onClick={nextPage}
              variant="ghost"
              size="sm"
              type="button"
              disabled={offset + products.length >= totalProducts}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
