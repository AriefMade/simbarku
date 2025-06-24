"use client";

import { Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ShoppingCart,
  Package,
  Users2,
  LineChart,
  MenuIcon,
  X,
} from 'lucide-react';
import { User } from './user';
import { SearchInput } from './search';

import '../admin.css';
import Providers from './providers';

export default function AdminDashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Providers>
      <div className="admin-layout min-h-screen flex flex-col">
        {/* Header - Fixed at top - SIMPLIFIED WITHOUT NAVBAR ICONS */}
        <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex">
              <Link href="/admin" className="mr-6 flex items-center">
                <span className="text-lg font-bold">Admin Simbarku.co</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
                <MenuIcon className="h-5 w-5" />
              </button>
              <Suspense fallback={<div className="h-10 w-10 rounded-full bg-gray-200" />}>
                <User />
              </Suspense>
            </div>
          </div>
        </header>
        
        {/* Main content area with sidebar */}
        <div className="flex flex-1">
          {/* Desktop Sidebar - Visible on md screens and up */}
          <aside className="hidden md:block w-64 bg-white border-r shadow-sm">
            <div className="fixed h-[calc(100vh-4rem)] w-64 pt-6 px-4 overflow-y-auto">
              <nav className="space-y-2">
                <div className="pb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Dashboard
                  </p>
                  <div className="space-y-1">
                    <Link 
                      href="/admin/analytics" 
                      className={`flex items-center px-3 py-2 text-sm rounded-md ${
                        pathname === '/admin/analytics' 
                          ? 'bg-gray-100 text-gray-900 font-medium' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Home className={`h-5 w-5 mr-3 ${
                        pathname === '/admin/analytics' ? 'text-gray-700' : 'text-gray-500'
                      }`} />
                      Dashboard
                    </Link>
                  </div>
                </div>
                
                <div className="pb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Products
                  </p>
                  <div className="space-y-1">
                    <Link 
                    href="/admin" 
                    className={`flex items-center px-3 py-2 text-sm rounded-md ${
                      pathname === '/admin' && !pathname.includes('/admin/orders') 
                        ? 'bg-gray-100 text-gray-900 font-medium' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Package className={`h-5 w-5 mr-3 ${
                      pathname === '/admin' && !pathname.includes('/admin/orders') ? 'text-gray-700' : 'text-gray-500'
                    }`} />
                    All Products
                  </Link>
                  </div>
                </div>
                
                <div className="pb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Orders
                </p>
                <div className="space-y-1">
                  <Link 
                    href="/admin/orders" 
                    className={`flex items-center px-3 py-2 text-sm rounded-md ${
                      pathname.includes('/admin/orders') 
                        ? 'bg-gray-100 text-gray-900 font-medium' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <ShoppingCart className={`h-5 w-5 mr-3 ${
                      pathname.includes('/admin/orders') ? 'text-gray-700' : 'text-gray-500'
                    }`} />
                    All Orders
                  </Link>
                </div>
              </div>
                
                <div className="pb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Customers
                  </p>
                  <div className="space-y-1">
                    <Link 
                      href="/admin/customers" 
                      className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
                    >
                      <Users2 className="h-5 w-5 mr-3 text-gray-500" />
                      All Customers
                    </Link>
                  </div>
                </div>
                
                {/* <div className="pb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Analytics
                  </p>
                  <div className="space-y-1">
                    <Link 
                      href="/admin/analytics" 
                      className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
                    >
                      <LineChart className="h-5 w-5 mr-3 text-gray-500" />
                      Overview
                    </Link>
                  </div>
                </div> */}
              </nav>
            </div>
          </aside>
          
          {/* Mobile sidebar - hidden by default, would be controlled by a menu button */}
          <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform -translate-x-full transition-transform duration-200 ease-in-out md:hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-bold">Menu</span>
              <button className="p-2 rounded-md hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <nav className="space-y-4">
                {/* Same sidebar content as desktop */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Dashboard
                  </p>
                  <Link 
                    href="/admin/analytics" 
                    className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
                  >
                    <Home className="h-5 w-5 mr-3 text-gray-500" />
                    Dashboard
                  </Link>
                </div>
                
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Products
                  </p>
                  <Link 
                    href="/admin" 
                    className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
                  >
                    <Package className="h-5 w-5 mr-3 text-gray-500" />
                    All Products
                  </Link>
                </div>
                
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Orders
                  </p>
                  <Link 
                    href="/admin/orders" 
                    className={`flex items-center px-3 py-2 text-sm rounded-md ${
                      pathname.includes('/admin/orders') 
                        ? 'bg-gray-100 text-gray-900 font-medium' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <ShoppingCart className={`h-5 w-5 mr-3 ${
                      pathname.includes('/admin/orders') ? 'text-gray-700' : 'text-gray-500'
                    }`} />
                    All Orders
                  </Link>
                </div>
                
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Customers
                  </p>
                  <Link 
                    href="/admin/customers" 
                    className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
                  >
                    <Users2 className="h-5 w-5 mr-3 text-gray-500" />
                    All Customers
                  </Link>
                </div>
                
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Analytics
                  </p>
                  <Link 
                    href="/admin/analytics" 
                    className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
                  >
                    <LineChart className="h-5 w-5 mr-3 text-gray-500" />
                    Overview
                  </Link>
                </div>
              </nav>
            </div>
          </aside>
          
          {/* Main content */}
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="container max-w-screen-xl mx-auto p-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <SearchInput />
                </div>
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>
    </Providers>
  );
}
