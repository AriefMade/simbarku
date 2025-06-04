import { Suspense } from 'react';
import Link from 'next/link';
import {
  Home,
  ShoppingCart,
  Package,
  Users2,
  LineChart,
  MenuIcon,
  SearchIcon,
  X
} from 'lucide-react';
import { User } from './user';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/common/ui/ui/breadcrumb';
import { NavItem } from './nav-item';
import { SearchInput } from './search';

import '../admin.css';
import Providers from './providers';
export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <div className="hidden md:flex">
              <Link href="/admin" className="mr-6 flex items-center">
                <span className="text-lg font-bold">SIMBARKU Admin</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <NavItem href="/admin" label="Dashboard">
                  <Home className="h-5 w-5" />
                </NavItem>
                <NavItem href="/admin/orders" label="Orders">
                  <ShoppingCart className="h-5 w-5" />
                </NavItem>
                <NavItem href="/admin" label="Products">
                  <Package className="h-5 w-5" />
                </NavItem>
                <NavItem href="/admin/customers" label="Customers">
                  <Users2 className="h-5 w-5" />
                </NavItem>
                <NavItem href="/admin/analytics" label="Analytics">
                  <LineChart className="h-5 w-5" />
                </NavItem>
              </nav>
            </div>
            <div className="md:hidden">
              <Link href="/admin" className="flex items-center">
                <span className="text-lg font-bold">SIMBARKU Admin</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Suspense fallback={<div className="h-10 w-10 rounded-full bg-gray-200" />}>
                <User />
              </Suspense>
            </div>
          </div>
        </header>
        <div className="flex flex-1">
          <main className="flex-1">
            <div className="container max-w-screen-xl mx-auto p-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <Breadcrumb className="overflow-hidden">
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/admin">Dashboard</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/admin">Products</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
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
