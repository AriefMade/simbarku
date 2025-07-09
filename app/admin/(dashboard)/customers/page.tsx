import { CustomersTable } from './customersTable';
import { getAllUsers } from '@/lib/db';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/common/ui/ui/card';
import { Tabs, TabsContent } from '@/components/common/ui/ui/tabs';

export default async function CustomersPage({
  searchParams
}: {
  searchParams: { q?: string; offset?: string; }
}) {
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ? parseInt(searchParams.offset) : 0;
  
  const { users, totalUsers } = await getAllUsers(offset);
  
  const transformedCustomers = users.map(customer => ({
    idUser: customer.idUser,
    nama: customer.nama,
    no_telp: customer.no_telp.toString(),
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
