import './admin.css';
import { Analytics } from '@vercel/analytics/react';
import { initDatabase } from '@/lib/db';

export const metadata = {
  title: 'Admin Simbarku',
  description:
    'Admin dashboard for managing Simbarku application, including orders, products, and user management.'
};

export const dynamic = 'force-dynamic'; // Enable dynamic rendering for database operations

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Initialize database connection
  try {
    await initDatabase();
  } catch (error) {
    console.error("Failed to initialize database connection:", error);
    // Error will be handled by error.tsx
  }

  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
