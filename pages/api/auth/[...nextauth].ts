
import NextAuth, { NextAuthOptions, RequestInternal } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { Session } from "next-auth";


import { dbUsers } from "../../../database";

interface CustomSession extends Session {
  accessToken?: string;
  
}
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  providers: [
    // ...add more providers here

    Credentials({
      name: "Custom Login",
      credentials: {
        email: {
          label: "Correo:",
          type: "email",
          placeholder: "correo@google.com",
        },
        password: {
          label: "Contraseña:",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">)  {
        console.log({ credentials });
        // return { name: 'Juan', correo: 'juan@google.com', role: 'admin' };

        return await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        ) as any;
      },
    }),
   
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "", // Optional chaining and nullish coalescing
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    
  ],
  // Custom Pages
  pages: {
    signIn: "/auth/login",
    newUser: '/auth/register',
    error: '/auth/error', // Error code passed in query string as ?error=
  },
  jwt: {},
  session: {
    maxAge: 2592000,
    strategy: "jwt",
    updateAge: 86400,
  },
 
  callbacks: {
    async jwt({ token, account, user }) {
      
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "oauth":
            token.user = await dbUsers.oAUthToDbUser(
              user?.email || "",
              user?.name || ""
            );
            break;

          case "credentials":
            token.user = user;
            break;
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      console.log({ session, token, user });
      const customSession: CustomSession = session;
      customSession.user = token.user as any;
      customSession.accessToken = token?.accessToken as string | undefined;;
    
      return customSession;
    },
  },
};

export default NextAuth(authOptions);
