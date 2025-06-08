import '../styles/globals.css';
import LayoutWrapper from '../components/common/layout/LayoutWrapper';
import { Suspense } from 'react';

export const metadata = {
  title: 'Simbarku.co',
  description: 'Tempat jual beli simbar online',
}

// Use dynamic rendering to avoid hydration errors
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Suspense>
      </body>
    </html>
  )
}
