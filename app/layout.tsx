import '../styles/globals.css';
import Navbar from '../components/common/layout/Navbar';
import Footer from '../components/common/layout/Footer';

export const metadata = {
  title: 'Simbarku.co',
  description: 'Tempat jual beli simbar online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
