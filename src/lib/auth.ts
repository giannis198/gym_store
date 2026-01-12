import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  callbacks: {
    // @ts-ignore
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          role: (user as any).role, // Ensure role is passed to the client
        },
      };
    },
  },
});
