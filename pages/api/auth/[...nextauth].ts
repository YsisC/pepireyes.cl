
import NextAuth, { NextAuthOptions, RequestInternal, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";


import { dbUsers } from "../../../database";
import { ISession, IUser } from "@/interfaces";


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
        if (!credentials?.email || !credentials.password) {
           return null;
        }
        return await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        ) as any;
      },
    }),
   
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "", // Optional chaining and nullish coalescing
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // Custom Pages
  pages: {
    signIn: "/auth/login",
    signOut: '/auth/signout',
    newUser: '/auth/register',
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
    
      session.user = token.user as any;
      session.accessToken = token?.accessToken as ISession["accessToken"]; // <-- Corregido
    
      return session;
    },
  },
};

export default NextAuth(authOptions);