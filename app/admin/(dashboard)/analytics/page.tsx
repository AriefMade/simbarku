import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/ui/ui/card';
import { getTransactionAnalytics, getUsersByIds } from '@/lib/db';
import { formatPrice } from '@/lib/utils';
import { AnalisaDashboard } from './analyticsDashboard';

export default async function AnalyticsPage() {
  // Ambil data untuk analytics
  const { monthlyTransactions, transactionsByStatus, topCustomers } = await getTransactionAnalytics();
  
  // Ambil data user untuk top customers
  const topCustomerIds = topCustomers.map(customer => customer.id_user);
  const customerUsers = await getUsersByIds(topCustomerIds);
  
  // Hitung total pendapatan
  const totalRevenue = transactionsByStatus.reduce(
    (total, item) => total + Number(item.revenue), 
    0
  );
  
  // Hitung total transaksi
  const totalTransactions = transactionsByStatus.reduce(
    (total, item) => total + Number(item.count), 
    0
  );
  
  // Hitung data untuk doughnut chart
  const statusCounts = {
    completed: transactionsByStatus.find(t => t.status === 'completed')?.count || 0,
    pending: transactionsByStatus.find(t => t.status === 'pending')?.count || 0,
    canceled: transactionsByStatus.find(t => t.status === 'canceled')?.count || 0,
  };
  
  // Format data untuk charts - konversi month ke string
  const monthlyData = monthlyTransactions.map(item => ({
    month: String(item.month), // Konversi month ke string
    sales: Number(item.total),
    revenue: Number(item.revenue)
  }));
  
  // Gabungkan data top customers dengan username - konversi totalSpent ke number
  const topCustomersWithNames = topCustomers.map(customer => {
    const user = customerUsers.find(u => u.idUser === customer.id_user);
    return {
      ...customer,
      name: user?.nama || `User ID: ${customer.id_user}`,
      totalSpent: Number(customer.totalSpent) // Konversi totalSpent ke number
    };
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Analisis Penjualan dan Transaksi</h1>
      <p className="text-muted-foreground">
        Pantau performa bisnis Anda dengan data analitik penjualan dan transaksi.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
            <CardDescription>Total pendapatan dari semua transaksi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
            <CardDescription>Jumlah seluruh transaksi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Transaksi Selesai</CardTitle>
            <CardDescription>Jumlah transaksi dengan status selesai</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.completed}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Transaksi</CardTitle>
            <CardDescription>Nilai rata-rata per transaksi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(totalTransactions ? totalRevenue / totalTransactions : 0)}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <AnalisaDashboard 
        monthlyData={monthlyData}
        statusCounts={statusCounts}
        topCustomers={topCustomersWithNames}
      />
    </div>
  );
}