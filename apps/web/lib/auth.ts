import GoogleProvider from "next-auth/providers/google";
import { DefaultSession, NextAuthOptions, SessionStrategy } from "next-auth";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID  ||"",
      clientSecret: process.env.CLIENT_SECRET || "",
    }),
  ],
  secret: "something2148feeoi",
  session: { strategy: "jwt" as SessionStrategy },
  callbacks: {
    async signIn({ user }: { user: any }) {
      if (!user || !user.email) {
        return false; 
      }

      try {
        const existingUser = await db.user.findUnique({
          where: {
            email: user.email,
          },
        });

        if (existingUser) {
          return true; 
        }

      
        await db.user.create({
          data: {
            email: user.email,
            name: user.name,
          },
        });

        return true; 
      } catch (e) {
        console.log(e);
        return false; 
      }
    },

    async jwt({ token, user }: any) {
      if (user && user.email) {
        const dbUser = await db.user.findUnique({
          where: {
            email: user.email,
          },
        });

        if (!dbUser) {
          return token;
        }

        return {
          ...token,
          id: dbUser.id,
        };
      }
      return token;
    },

    async session({ session, token }: any) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  },
} satisfies NextAuthOptions;


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
