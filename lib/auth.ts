import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Use implementation without native modules for Edge runtime
export const { handlers, auth, signIn } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        
        try {
          // Call the API route instead of direct DB access
          const response = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });
          
          const data = await response.json();
          
          if (data.success && data.user) {
            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              image: '/placeholder-user.jpg'
            };
          }
          
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  
  secret: process.env.AUTH_SECRET,
  
  pages: {
    signIn: '/login',
    error: '/login'
  },
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  }
});

// lib/auth.ts
export async function signOut({ redirectTo = '/' } = {}) {
  try {
    // Clear localStorage dan sessionStorage
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    
    // Hapus cookies jika ada
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Force redirect ke homepage
    window.location.href = redirectTo;
    
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}