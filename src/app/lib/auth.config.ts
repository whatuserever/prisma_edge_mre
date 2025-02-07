import type { NextAuthConfig } from "next-auth";
import CredentialProvider from 'next-auth/providers/credentials';
import prisma from "./prisma";

export const authConfig = {
  providers: [
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst();
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return {
            ...user,
            id: user.id.toString()
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
} satisfies NextAuthConfig

export default authConfig;