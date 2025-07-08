import '../styles/globals.css';
import { Suspense } from 'react';


export const metadata = {
  title: 'Simbarku.co',
  description: 'Tempat jual beli simbar online',
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
