'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/common/ui/ui/tooltip';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from '@headlessui/react';

export function NavItem({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={clsx(
            'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
            {
              'bg-accent text-black': pathname === href
            }
          )}
        >
          {children}
          <span className="sr-only">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

export function DropdownMenu() {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2">
        Admin Menu
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg">
        <Menu.Item>
          {({ active }) => (
            <a href="#" className={active ? 'bg-blue-500 text-white' : ''}>
              Menu Item
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
