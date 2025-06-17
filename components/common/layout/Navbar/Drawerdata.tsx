'use client' // Tambahkan jika kamu pakai Next.js App Router

import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

interface NavigationItem {
  name: string;
  href: string;
}

const navigation: NavigationItem[] = [
  { name: 'Product', href: '#product-section' },
  { name: 'About Us', href: '#aboutus-section' },
  { name: 'FAQ', href: '#faq-section' },
  // { name: 'Shop', href: '#shop-section' },
  { name: 'Testimonial', href: '#testimonial-section' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Admin', href: '/login' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Data = () => {
  const pathname = usePathname();

  return (
    <div className="rounded-md max-w-sm w-full mx-auto">
      <div className="flex-1 space-y-4 py-1">
        <div className="sm:block">
          <div className="space-y-1 px-5 pt-2 pb-3">
            {navigation.map((item) => {
              // Untuk anchor links (#...), kita tidak bisa cocokkan dengan pathname
              const isInternalLink = item.href.startsWith('/');
              const isActive = isInternalLink ? pathname === item.href : false;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    isActive
                      ? 'bg-gray-900 text-purple'
                      : 'text-black hover:bg-gray-700 hover:text-purple',
                    'block py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="mt-4">
              <Link
                href="/login"
                className="bg-navyblue w-full block text-center hover:text-white text-white border border-purple font-medium py-2 px-4 rounded"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
