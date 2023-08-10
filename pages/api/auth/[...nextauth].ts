import NextAuth, { NextAuthOptions, RequestInternal, Session } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import Credentials from 'next-auth/providers/credentials';

import { dbUsers } from '../../../database';
import { IUser } from "@/interfaces";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    
    // ...add more providers here

    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com'  },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña'  },
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
      clientId: process.env.GOOGLE_CLIENT_ID ?? "", 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    



  ],
  secret: process.env.JWT_SECRET,
  // Custom Pages
  pages: {
    signIn: '/auth/signin',  // Displays signin buttons
    signOut: '/auth/signout', // Displays form with sign out button
    error: '/auth/error', // Error code passed in query string as ?error=
    newUser:'/auth/register', // If set, new users will be directed here on first sign in
  },

  // Callbacks
  jwt: {
    // secret: process.env.JWT_SECRET_SEED, // deprecated
  },
  
  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // cada día
  },


  callbacks: {
    async signIn({ user, account, profile, email, credentials }) { return true },
    async redirect({ url, baseUrl }) { return baseUrl },
    async jwt({ token, account, user }) {
      // console.log({ token, account, user });

      if ( account ) {
        token.accessToken = account.access_token;

        switch( account.type ) {

          case 'oauth': 
            token.user = await dbUsers.oAUthToDbUser( user?.email || '', user?.name || '' );
          break;

          case 'credentials':
            token.user = user;
          break;
        }

      }

      return token;
    },


    async session({ session, token, user }){
      // console.log({ session, token, user });

      session.accessToken = token.accessToken as any;;
      session.user = token.user as any;

      return session;
    }
    

  }

});