import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account && profile) {
        // Find or create user
        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, profile.email))
          .limit(1);

        if (existingUser.length === 0) {
          // Create new user
          const [newUser] = await db
            .insert(users)
            .values({
              email: profile.email,
              address: "",
              createdAt: new Date(),
              updatedAt: new Date(),
            })
            .returning();

          token.userId = newUser.id;
        } else {
          token.userId = existingUser[0].id;
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.userId = token.userId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session?.user?.email) {
    return null;
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);
  return user;
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();

  if (!user.isAdmin) {
    throw new Error("Forbidden: Admin access required");
  }

  return user;
}
