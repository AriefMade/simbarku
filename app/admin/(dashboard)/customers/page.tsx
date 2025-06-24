import { Metadata } from 'next';
import { CustomersTable } from './customersTable';
import { getAllUsers } from '@/lib/db';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/common/ui/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/ui/ui/tabs';
import { Button } from '@/components/common/ui/ui/button';
import { PlusCircle, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pelanggan | Simbarku Admin',
  description: 'Manajemen pelanggan Simbarku',
};

export default async function CustomersPage({
  searchParams
}: {
  searchParams: { q?: string; offset?: string; }
}) {
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ? parseInt(searchParams.offset) : 0;
  
  const { users, totalUsers } = await getAllUsers(offset);
  
  // Transform data untuk menyesuaikan dengan interface Customer di CustomersTable
  const transformedCustomers = users.map(customer => ({
    idUser: customer.idUser,
    nama: customer.nama,
    no_telp: customer.no_telp.toString(), // Convert noTelp dari DB ke no_telp
    alamat: customer.alamat,
    email: customer.email
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pelanggan Simbarku</CardTitle>
        <CardDescription>Menampilkan seluruh pelanggan beserta pesanannya</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">Semua Pelanggan</TabsTrigger>
                <TabsTrigger value="active">Aktif</TabsTrigger>
                <TabsTrigger value="inactive">Non-aktif</TabsTrigger>
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
                    Pelanggan Baru
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all" className="mt-4">
              <CustomersTable
                customers={transformedCustomers}
                offset={offset}
                totalCustomers={totalUsers}
              />
            </TabsContent>
            <TabsContent value="active" className="mt-4">
              <CustomersTable
                customers={transformedCustomers.filter(user => /* kriteria aktif */true)}
                offset={0}
                totalCustomers={transformedCustomers.filter(user => /* kriteria aktif */true).length}
              />
            </TabsContent>
            <TabsContent value="inactive" className="mt-4">
              <CustomersTable
                customers={transformedCustomers.filter(user => /* kriteria non-aktif */false)}
                offset={0}
                totalCustomers={transformedCustomers.filter(user => /* kriteria non-aktif */false).length}
              />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
