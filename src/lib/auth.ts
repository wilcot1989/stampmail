import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "./password";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      id: "credentials",
      name: "Email & Password",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const email = (credentials?.email as string)?.toLowerCase().trim();
        const password = credentials?.password as string;
        if (!email || !password) return null;

        try {
          const { getRequestContext } = await import("@cloudflare/next-on-pages");
          const { env } = getRequestContext();
          const db = env.DB as D1Database;

          const user = await db.prepare(
            "SELECT id, email, name, avatar_url, password_hash FROM users WHERE email = ?"
          ).bind(email).first<{ id: string; email: string; name: string | null; avatar_url: string | null; password_hash: string | null }>();

          if (!user || !user.password_hash) return null;

          const valid = await verifyPassword(password, user.password_hash);
          if (!valid) return null;

          return { id: user.id, email: user.email, name: user.name, image: user.avatar_url };
        } catch (err) {
          console.error("Auth error:", err);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      if (account) {
        token.provider = account.provider;
      }
      if (user && account?.provider === "google") {
        try {
          const { getRequestContext } = await import("@cloudflare/next-on-pages");
          const { env } = getRequestContext();
          const db = env.DB as D1Database;

          const existing = await db.prepare("SELECT id FROM users WHERE email = ?")
            .bind(user.email!).first();

          if (!existing) {
            await db.prepare(
              "INSERT INTO users (id, email, name, avatar_url) VALUES (?, ?, ?, ?)"
            ).bind(user.id || crypto.randomUUID(), user.email!, user.name || null, user.image || null).run();
          } else {
            await db.prepare(
              "UPDATE users SET name = ?, avatar_url = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?"
            ).bind(user.name || null, user.image || null, user.email!).run();
          }
        } catch (err) {
          console.error("D1 user sync error (non-fatal):", err);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || "";
        session.user.email = (token.email as string) || "";
        session.user.name = (token.name as string) || "";
        session.user.image = (token.picture as string) || "";
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
});
