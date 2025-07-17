import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma/client";
import { compare } from "bcrypt";
import { loginSchema } from "@/app/validationSchemas";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    };
  }
  interface User {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("Credentials:", credentials);

          if (!credentials?.email || !credentials?.password) return null;

          // Validate input
          const validation = loginSchema.safeParse(credentials);
          if (!validation.success) return null;

          // Find user
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (!user) return null;

          // Verify password
          const passwordMatches = await compare(
            credentials.password,
            user.password
          );
          if (!passwordMatches) return null;

          return {
            id: user.id.toString(),
          };
        } catch (e) {
          console.error("Error in authorize:", e);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
