// d:\Aplikasi\simbarku\app\admin\orders\page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/ui/ui/card';

export default function OrdersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>Manage and track customer orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Order content will be displayed here.</p>
      </CardContent>
    </Card>
  );
}