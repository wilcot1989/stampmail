import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      if (account) {
        token.provider = account.provider;
      }
      // Store user in D1 on first sign-in
      if (user && account) {
        try {
          const { getRequestContext } = await import("@cloudflare/next-on-pages");
          const { env } = getRequestContext();
          const db = env.DB as D1Database;

          const existing = await db.prepare("SELECT id FROM users WHERE email = ?")
            .bind(user.email!).first();

          if (!existing) {
            await db.prepare(
              "INSERT INTO users (id, email, name, avatar_url) VALUES (?, ?, ?, ?)"
            ).bind(
              user.id || crypto.randomUUID(),
              user.email!,
              user.name || null,
              user.image || null
            ).run();
          } else {
            // Update name/avatar on each login
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
