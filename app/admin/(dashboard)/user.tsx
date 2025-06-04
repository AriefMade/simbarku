"use client";

import { Button } from '@/components/common/ui/ui/button';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/common/ui/ui/dropdown-menu';
import Link from 'next/link';
import { SignOutButton } from './sign-out-button';

interface UserData {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
}

export function User() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSession();
  }, []);

  if (isLoading) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="overflow-hidden rounded-full"
      >
        <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse"></div>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={user?.image ?? '/placeholder-user.jpg'}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user?.name || 'My Account'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/admin/settings" className="w-full">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/admin/profile" className="w-full">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href="/login" className="w-full">Sign In</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
