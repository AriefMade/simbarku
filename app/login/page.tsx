"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Login(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';
  
  // State untuk menyimpan input form & error handling
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Username atau password salah');
        setLoading(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (error) {
      setError('Terjadi kesalahan saat login');
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-green-900 overflow-hidden flex">
      {/* Left side - White background with form */}
      <div className="w-[60%] min-h-screen bg-white relative flex items-center justify-center">
        <div className="w-full max-w-[500px] px-12">
          {/* Logo/Brand */}
          <div className="text-center mb-12">
            <h1 className="text-black text-4xl font-bold">SIMBARKU.CO</h1>
          </div>

          {/* Greeting and Title */}
          <div className="mb-8">
            <div className="text-black/50 text-base font-normal leading-snug tracking-wide mb-2">
              Hello, Admin!
            </div>
            <h2 className="text-black text-6xl font-bold">
              Sign In
            </h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="text-red-700">
                {error}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-black text-base font-light mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-blue-600 text-black text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="text-black text-base font-light">
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-blue-600 text-black text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-36 h-11 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-base font-semibold capitalize hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'sign In'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Green background with illustration */}
      <div className="w-[40%] min-h-screen bg-green-900 relative overflow-hidden">
        {/* Abstract geometric shapes and elements */}
        <div className="absolute inset-0">
          {/* Main illustration container */}
          <div className="w-full h-full relative">
            {/* White panel behind illustration */}
            <div className="w-[464px] h-[736px] absolute right-[100px] top-[50px] bg-white" />
            
            {/* Geometric shapes - simplified version */}
            <div className="w-14 h-14 absolute right-[200px] top-[400px] bg-blue-600 rotate-[26deg]" />
            <div className="w-24 h-24 absolute right-[220px] top-[320px] bg-red-400 rounded-[50px] rotate-[11deg]" />
            
            {/* Building/chart elements */}
            <div className="w-32 h-64 absolute right-[150px] top-[300px] bg-zinc-800" />
            <div className="w-20 h-52 absolute right-[200px] top-[200px] bg-red-400" />
            <div className="w-16 h-52 absolute right-[120px] top-[180px] bg-red-400" />
            
            {/* Small decorative elements */}
            <div className="w-16 h-20 absolute right-[160px] top-[120px] bg-orange-200" />
            <div className="w-12 h-20 absolute right-[100px] top-[280px] bg-orange-200" />
            
            {/* Chart/graph lines */}
            <div className="w-24 h-[2px] absolute right-[180px] top-[150px] bg-orange-200" />
            <div className="w-24 h-[2px] absolute right-[140px] top-[220px] bg-orange-200" />
            <div className="w-24 h-[2px] absolute right-[200px] top-[350px] bg-orange-200" />
            <div className="w-24 h-[2px] absolute right-[160px] top-[450px] bg-orange-200" />
            
            {/* Vertical lines */}
            <div className="w-[2px] h-14 absolute right-[170px] top-[140px] bg-orange-200" />
            <div className="w-[2px] h-14 absolute right-[130px] top-[210px] bg-orange-200" />
            <div className="w-[2px] h-14 absolute right-[190px] top-[340px] bg-orange-200" />
            
            {/* Person silhouette area - simplified */}
            <div className="absolute right-[50px] bottom-[100px] w-[150px] h-[300px]">
              {/* Simplified person representation */}
              <div className="w-12 h-12 bg-gray-800 rounded-full absolute top-0 left-[50%] transform -translate-x-1/2" />
              <div className="w-16 h-32 bg-red-400 rounded-lg absolute top-12 left-[50%] transform -translate-x-1/2" />
              <div className="w-14 h-40 bg-gray-900 absolute top-44 left-[50%] transform -translate-x-1/2" />
            </div>
            
            {/* Laptop/device representation */}
            <div className="w-44 h-20 absolute right-[80px] bottom-[200px] bg-zinc-800 rotate-[11deg]" />
            <div className="w-36 h-20 absolute right-[90px] bottom-[180px] bg-teal-400 rotate-1" />
          </div>
        </div>
      </div>
    </div>
  );
}