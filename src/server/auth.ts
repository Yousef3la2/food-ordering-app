import { Environments, Pages, Routes } from "@/constants/enums";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/prisma";
import { DefaultSession, NextAuthOptions } from "next-auth";
import { Locale } from "@/i18n.config";
import { login } from "./_actions/auth";
import { JWT } from "next-auth/jwt";
import { User, UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Partial<User> {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.image = token.image as string;
        session.user.country = token.country as string;
        session.user.city = token.city as string;
        session.user.postalCode = token.postalCode as string;
        session.user.streetAddress = token.streetAddress as string;
        session.user.phone = token.phone as string;
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
          image: token.image,
        },
      };
    },
    jwt: async ({ token }): Promise<JWT> => {
      const dbUser = await db.user.findUnique({
        where: { email: token?.email },
    },);
    if (!dbUser) {
      return token;
    }
    return {
      id  : dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role,
      image: dbUser.image,
      country: dbUser.country,
      city: dbUser.city,
      postalCode: dbUser.postalCode,
      streetAddress: dbUser.streetAddress,
      phone: dbUser.phone,
    };
  },},
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        updateAge: 24 * 60 * 60, // 24 hours
      },
      secret: process.env.NEXTAUTH_SECRET,
      debug: process.env.NODE_ENV === Environments.DEV,
      providers: [
        Credentials({
          name: "credentials",
          credentials: {
            email: {
              label: "Email",
              type: "email",
              placeholder: "hello@example.com",
            },
            password: { label: "Password", type: "password" },
          },
        authorize: async(credentials,req) => {
            const currentUrl = req?.headers?.referer;

            const locale = currentUrl?.split("/")[3] as Locale;
            const result = await login(credentials, locale);
            if (result.status === 200 && result.user) {
              return result.user;
            } else {
              throw new Error(
                JSON.stringify({
                  validationError: result.error,
                  responseError: result.message,
                })
              );
            }
          }
    })],
    adapter: PrismaAdapter(db),
    pages: {
        signIn: `/${Routes.AUTH}/${Pages.LOGIN}`,
      },
}