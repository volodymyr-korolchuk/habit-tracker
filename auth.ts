import NextAuth from "next-auth";

import authOptions from "@/auth.config";
import { getUserById } from "./data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const user = await getUserById(token.sub);

      if (!user) {
        return token;
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  ...authOptions,
});
