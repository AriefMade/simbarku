'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/ui/ui/card';
import { formatPrice } from '@/lib/utils';
import dynamic from 'next/dynamic';

// Dynamic import untuk chart components
const DynamicBarChart = dynamic(
  () => import('./chartComponents/barChart').then((mod) => mod.BarChart),
  { ssr: false }
);

const DynamicLineChart = dynamic(
  () => import('./chartComponents/lineChart').then((mod) => mod.LineChart),
  { ssr: false }
);

const DynamicDoughnutChart = dynamic(
  () => import('./chartComponents/donatChart').then((mod) => mod.DoughnutChart),
  { ssr: false }
);

interface MonthlyData {
  month: string;
  sales: number;
  revenue: number;
}

interface StatusCounts {
  completed: number;
  pending: number;
  canceled: number;
}

interface TopCustomer {
  id_user: number;
  totalPurchases: number;
  totalSpent: number;
  name: string;
}

export interface AnalyticsDashboardProps {
  monthlyData: MonthlyData[];
  statusCounts: StatusCounts;
  topCustomers: TopCustomer[];
}

export function AnalisaDashboard({ 
  monthlyData, 
  statusCounts, 
  topCustomers 
}: AnalyticsDashboardProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Data untuk Monthly Revenue Chart
  const revenueChartData = {
    labels: monthlyData.map(item => {
      // Format YYYY-MM to MMM YYYY (Jan 2025)
      const [year, month] = String(item.month).split('-');
      if (!year || !month) return String(item.month);
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleString('id-ID', { month: 'short', year: 'numeric' });
    }),
    datasets: [
      {
        label: 'Pendapatan',
        data: monthlyData.map(item => item.revenue),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  // Data untuk Monthly Sales Count Chart
  const salesChartData = {
    labels: monthlyData.map(item => {
      const [year, month] = String(item.month).split('-');
      if (!year || !month) return String(item.month);
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleString('id-ID', { month: 'short', year: 'numeric' });
    }),
    datasets: [
      {
        label: 'Jumlah Transaksi',
        data: monthlyData.map(item => item.sales),
        fill: false,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      },
    ],
  };

  // Data untuk Status Distribution Doughnut Chart
  const statusChartData = {
    labels: ['Selesai', 'Diproses', 'Dibatalkan'],
    datasets: [
      {
        data: [statusCounts.completed, statusCounts.pending, statusCounts.canceled],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Tampilkan skeleton loader saat di server atau sebelum hydration
  if (!isClient) {
    return (
      <div className="space-y-6">
        <div className="h-80 bg-gray-100 rounded-md animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-80 bg-gray-100 rounded-md animate-pulse" />
          <div className="h-80 bg-gray-100 rounded-md animate-pulse" />
        </div>
        <div className="h-60 bg-gray-100 rounded-md animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Monthly Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Pendapatan Bulanan</CardTitle>
          <CardDescription>
            Pendapatan bulanan dalam setahun terakhir
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <DynamicBarChart data={revenueChartData} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Jumlah Transaksi Bulanan</CardTitle>
            <CardDescription>
              Tren jumlah transaksi per bulan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <DynamicLineChart data={salesChartData} />
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Status Transaksi</CardTitle>
            <CardDescription>
              Persentase transaksi berdasarkan status
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-80 w-80">
              <DynamicDoughnutChart data={statusChartData} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Customers Card */}
      <Card>
        <CardHeader>
          <CardTitle>Pelanggan Terbaik</CardTitle>
          <CardDescription>
            Pelanggan dengan nilai transaksi tertinggi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 font-medium">Nama</th>
                  <th className="py-3 px-4 font-medium">Jumlah Transaksi</th>
                  <th className="py-3 px-4 font-medium text-right">Total Belanja</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-4 px-4 text-center text-gray-500">
                      Belum ada data pelanggan
                    </td>
                  </tr>
                ) : (
                  topCustomers.map((customer, index) => (
                    <tr key={index} className={index < topCustomers.length - 1 ? "border-b" : ""}>
                      <td className="py-3 px-4">{customer.name}</td>
                      <td className="py-3 px-4">{customer.totalPurchases}</td>
                      <td className="py-3 px-4 text-right">{formatPrice(Number(customer.totalSpent))}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}