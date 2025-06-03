import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from './db'; 

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Validasi sederhana - hardcoded
        if (credentials?.username === 'admin' && credentials?.password === 'admin123') {
          return { 
            id: '1', 
            name: 'Admin User', 
            email: 'admin@example.com',
            image: '/placeholder-user.jpg'
          };
        }
        
        // Opsi untuk validasi database (komen untuk saat ini)
        // try {
        //   const user = await db.query("SELECT * FROM users WHERE username = ?", [credentials?.username]);
        //   if (user && user.password === credentials?.password) { // Gunakan bcrypt di produksi
        //     return { id: user.id, name: user.name, email: user.email };
        //   }
        // } catch (error) {
        //   console.error('Database error:', error);
        // }
        
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
  },
  session: {
    strategy: "jwt"
  }
});