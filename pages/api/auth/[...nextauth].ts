import NextAuth, { NextAuthOptions, RequestInternal, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { dbUsers } from "../../../database";
import { ISession, IUser } from "@/interfaces";


// https://next-auth.js.org/configuration/options
export default NextAuth({
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
      async authorize(credentials)  {
        console.log({ credentials });
        // return { name: 'Juan', correo: 'juan@google.com', role: 'admin' };
        const user = await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
        if (user) {
          return user;
        } else {
          return null;
        }
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
    signIn: '/auth/login',
    newUser: '/auth/register'
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

        switch( account.type ) {

          case 'oauth': 
            token.user = await dbUsers.oAUthToDbUser( user?.email || '', user?.name || '' );
          break;

          case 'credentials':
            token.user = {
              _id: user._id,
              email: user.email,
              name: user.name,
              role: 'client'
            };
          break;
        }

      }

      return token;
    },
 

    async session({ session, token,user }:any) {
    
      console.log({ session, token, user });
       // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
      if (token) {
      session.user = token.user;
      }
      session.accessToken = token?.accessToken as ISession["accessToken"]; // <-- Corregido
    
      return session;
    }
  },
});