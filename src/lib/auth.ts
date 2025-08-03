import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

type User = {
  id: string;
  name?: string | null;
};


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) : Promise<User | null> {
        const username = credentials?.username;
        const password = credentials?.password;

        if (
          username === process.env.ADMIN_PAGE_USERNAME &&
          password === process.env.ADMIN_PAGE_PASSWORD
        ) {
          return { id: "1", name: "Raunak" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
