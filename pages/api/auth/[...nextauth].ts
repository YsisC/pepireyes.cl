
import NextAuth from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"


import { dbUsers } from "../../../database";
import { ISession, IUser } from "@/interfaces";


export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [

    // ...add more providers here

    CredentialsProvider({
      id: "credentials",
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
      async authorize(credentials: any) {
        // console.log({ credentials });
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
      checks: ["state"],
      profile(profile) {
        return {
          _id: profile.sub,
          email: profile.email,
          name: null,
          password: null,
          emailVerified: null,
        };
      },
    }),
    
  ]
  




  return await NextAuth(req, res, {
    providers,
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
  async signIn({ user, account, profile, email, credentials }) {
    const isAllowedToSignIn = true
    if (isAllowedToSignIn) {
      return true
    } else {
      // Return false to display a default error message
      return false
    }
  },
  async redirect({ url, baseUrl }) {
    if (url.startsWith("/")) return `${baseUrl}${url}`
    // Allows callback URLs on the same origin
    else if (new URL(url).origin === baseUrl) return url
    return baseUrl
  },

  async jwt({ token, account, user, profile  }) {
    console.log("jwt",  profile)
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


  async session({ session, token,user }) {
  
    // console.log({ session, token, user });

    session.user = token.user as any;
  
    session.accessToken = token?.accessToken as ISession["accessToken"]; // <-- Corregido
  
    return session;
  }
},
  })
 

 
  
};

