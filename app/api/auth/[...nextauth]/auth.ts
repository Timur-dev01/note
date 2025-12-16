// auth.ts
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { AuthOptions } from "next-auth";
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
        // expose role to client session
        userObj.role = token.role ?? userObj.role ?? undefined;
        session.user = userObj;
        (session as any).accessToken = token.accessToken;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      // Respect callback url when provided (e.g. redirect to /admin)
      try {
        if (!url) return baseUrl;
        // If url is relative (starts with '/') return baseUrl + url
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        // If url is absolute and starts with baseUrl, allow it
        if (url.startsWith(baseUrl)) return url;
      } catch (e) {
        // fallback
      }
      return baseUrl;
    },
  },
};
