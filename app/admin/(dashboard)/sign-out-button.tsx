'use client';

import { signOut } from '@/lib/auth';

export function SignOutButton() {
  return (
    <button 
      onClick={async () => {
        await signOut({ redirectTo: '/' });
      }}
      className="w-full text-left"
    >
      Sign Out
    </button>
  );
}