'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Check if the current path is admin or login
  const isAdminPath = pathname?.startsWith('/admin');
  const isLoginPath = pathname === '/login';
  
  // Only show navbar and footer on regular pages
  const showNavFooter = !isAdminPath && !isLoginPath;
  
  return (
    <>
      {showNavFooter && <Navbar />}
      {children}
      {showNavFooter && <Footer />}
    </>
  );
}