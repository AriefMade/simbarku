'use client';

import { signOut } from '@/lib/auth';
import { useState } from 'react';
import { LogOut } from 'lucide-react'; 

export function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {;
    
    try {
      setIsLoading(true);
      
      // Hapus state yang mungkin disimpan di browser
      localStorage.removeItem('authToken');
      sessionStorage.clear();
      
      await signOut({ redirectTo: '/' });
      
    } catch (error) {
      console.error('Failed to sign out:', error);
      setIsLoading(false);
      alert('Gagal keluar. Silakan coba lagi.');
    }
  };

  return (
    <button 
      onClick={handleSignOut}
      disabled={isLoading}
      className="w-full text-left flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
      aria-label="Sign out"
      type="button"
    >
      {isLoading ? (
        <>
          <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          <span>Keluar...</span>
        </>
      ) : (
        <>
          <LogOut size={16} className="text-gray-500" /> 
          <span>Keluar</span>
        </>
      )}
    </button>
  );
}