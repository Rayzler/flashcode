import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Extend the adapter to automatically generate username for OAuth users
const customAdapter = {
  ...PrismaAdapter(prisma),
  async createUser(user: {
    email: string;
    name?: string | null;
    image?: string | null;
    emailVerified?: Date | null;
  }) {
    // Generate username from email (everything before @)
    const baseUsername = user.email
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    let username = baseUsername;
    let counter = 1;

    // Retry until we find a unique username (handles race conditions)
    while (true) {
      try {
        return await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            emailVerified: user.emailVerified,
            username,
            avatar: user.image
          }
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // If username collision, try next counter
        if (
          error.code === "P2002" &&
          error.meta?.target?.includes("username")
        ) {
          username = `${baseUsername}${counter}`;
          counter++;
        } else {
          throw error;
        }
      }
    }
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: customAdapter,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string
          }
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.avatar
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  debug: process.env.NODE_ENV === "development"
});
