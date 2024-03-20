import NextAuth from "next-auth";

import authOptions from "@/auth.config";

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
      console.log(token);

      if (!token.sub) {
        return token;
      }

      if (token.iat) {
        return token;
      }

      try {
        const url = `${process.env.BASE_URL}/api/v1/users/id/${token.sub}`;

        const response = await fetch(url);
        const user = await response.json();

        if (!user) {
          return token;
        }

        // assign a role
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }

      return token;
    },
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  ...authOptions,
});
