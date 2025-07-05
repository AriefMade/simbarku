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
              <div className="ml-auto flex items-center gap-2">
                <div className="flex items-center rounded-md border px-3">
                  <input
                  type="search"
                  placeholder="Cari pelanggan..."
                  className="h-8 w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <button className="h-8 w-8 flex items-center justify-center"></button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 opacity-50">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
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
                customers={transformedCustomers.filter(user =>true)}
                offset={0}
                totalCustomers={transformedCustomers.filter(user => true).length}
              />
            </TabsContent>
            <TabsContent value="inactive" className="mt-4">
              <CustomersTable
                customers={transformedCustomers.filter(user => false)}
                offset={0}
                totalCustomers={transformedCustomers.filter(user => false).length}
              />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
