import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/ui/ui/card';

export default function AnalyticsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>Track business performance and data insights.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Analytics data will be displayed here.</p>
      </CardContent>
    </Card>
  );
}