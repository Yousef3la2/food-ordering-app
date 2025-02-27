import { Environments, Pages, Routes } from "@/constants/enums";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import { Locale } from "@/i18n.config";
import { login } from "./_actions/auth";

export const authOptions: NextAuthOptions = {
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