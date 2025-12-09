// auth.ts
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Dotlabs",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Basic credentials flow backed by Prisma.
        // NOTE: This implementation does NOT validate passwords — add hashing and verification for production.
        if (!credentials?.username) return null;

        const email = credentials.username;

        // Try to find an existing user by email, otherwise create one (simple registration)
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              name: email.includes("@") ? email.split("@")[0] : email,
            },
          });
        }

        return {
          id: String(user.id),
          name: user.name ?? undefined,
          email: user.email,
        } as any;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      // Persist the OAuth access token and user id to the JWT
      if (account) {
        token.accessToken =
          account.access_token ?? account.id_token ?? token.accessToken;
        // when using OAuth the `user` is only available the first time; ensure id exists
        token.id = user?.id ?? token.sub;
      }

      // include email from profile when available
      if (profile && (profile as any).email) {
        token.email = (profile as any).email;
      }

      return token;
    },
    async session({ session, token }) {
      // Attach token fields to session so client can read them
      if (token) {
        const userObj = (session.user ?? ({} as any)) as any;
        userObj.id = token.id ?? token.sub;
        userObj.email = token.email ?? userObj.email;
        session.user = userObj;
        (session as any).accessToken = token.accessToken;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      // After sign in/registration always redirect to the homepage
      return baseUrl;
    },
  },
};
