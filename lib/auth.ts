import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Gunakan implementasi sederhana untuk static export
export const { handlers, auth, signIn, signOut } = NextAuth({
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
          // Static implementation untuk output: export
          if (credentials.username === 'admin' && credentials.password === 'admin123') {
            return {
              id: '1',
              name: 'Admin User',
              email: 'admin@simbarku.com',
              image: '/placeholder-user.jpg'
            };
          }
        } catch (error) {
          console.error('Auth error:', error);
        }
        
        return null;
      }
    })
  ],
  
  secret: process.env.AUTH_SECRET,
  
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
  },
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 hari
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