import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { users, account, session, verificationToken } from "../../../../db/schema";
import { eq } from "drizzle-orm";
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
const authOptions = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: account,
    sessionsTable: session,
    verificationTokensTable: verificationToken,
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, account, profile }: any) {
      console.log("=== JWT CALLBACK ===");
      console.log("Account:", account);
      console.log("Profile:", profile);
      console.log("Profile Email:", profile?.email);
      console.log("Token before processing:", token);
      
      if (account && profile) {
        console.log("Processing new login for email:", profile.email);
        
        // Find or create user
        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, profile.email))
          .limit(1);

        console.log("Existing user found:", existingUser);

        if (existingUser.length === 0) {
          console.log("Creating new user for email:", profile.email);
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

          console.log("New user created:", newUser);
          token.userId = newUser.id;
        } else {
          console.log("Using existing user:", existingUser[0]);
          token.userId = existingUser[0].id;
        }
      }
      
      console.log("Token after processing:", token);
      console.log("=== END JWT CALLBACK ===");
      return token;
    },
    async session({ session, token }: any) {
      console.log("=== SESSION CALLBACK ===");
      console.log("Session before processing:", session);
      console.log("Token in session:", token);
      
      if (token) {
        session.userId = token.userId;
        session.user = {
          ...session.user,
          id: token.userId,
        };
      }
      
      console.log("Session after processing:", session);
      console.log("=== END SESSION CALLBACK ===");
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
