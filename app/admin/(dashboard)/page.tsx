import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/ui/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/common/ui/ui/button';
import { ProductsTable } from './products/products-table';
import { getProducts } from '@/lib/db';
import Link from 'next/link';

export default async function ProductsPage(
  props: {
    searchParams: { q?: string; offset?: string; status?: string };
  }
) {
  const search = props.searchParams.q ?? '';
  const offset = props.searchParams.offset ? parseInt(props.searchParams.offset, 10) : 0;
  const status = props.searchParams.status ?? 'all';

  try {
    const { products, newOffset, totalProducts } = await getProducts(
      search,
      offset,
      status
    );

    return (
      <Tabs defaultValue={status}>
        <div className="flex items-center">
          <div className="ml-auto flex items-center gap-2">
            <Link href="/admin/products/new">
              <Button 
                size="sm" 
                className="h-8 gap-1 hover:bg-[#7294C6] hover:text-white"
                variant="outline"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <TabsContent value={status} className="mt-4">
          <ProductsTable
            products={products}
            offset={offset}
            totalProducts={totalProducts}
          />
        </TabsContent>
      </Tabs>
    );
  } catch (error) {
    console.error("Error in ProductsPage:", error);
    return <div>Error loading products. Please check server logs.</div>;
  }
}
