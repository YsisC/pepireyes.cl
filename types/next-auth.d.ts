import { IUser } from "@/interfaces"
import NextAuth from "next-auth"

declare module "next-auth" {
  
    interface Session {
        accessToken?: string;
        user: IUser
    }
    interface User {
        id?: string
        _id: string
    }

}

// declare module "next-auth/jwt" {
//     /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//     interface JWT {
//       /** OpenID ID Token */
//       idToken?: string
//     }
//   }