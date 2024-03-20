import bcrypt from "bcryptjs";

import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "./schemas";

export default {
  // TODO: implement OAuth providers logi
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/email/${email}`;

        const response = await fetch(url);
        const user = await response.json();

        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (passwordsMatch) {
          return user;
        }

        return null;
      },
    }),
  ],
  trustHost: true,
} satisfies NextAuthConfig;
