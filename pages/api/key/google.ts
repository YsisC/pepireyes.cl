import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";


type Data = { message: string } | {key: string};
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    switch (req.method) {
      case "GET":
        return responseGoogle(req, res);
  
      default:
        return res.status(400).json({ message: "Bad request" });
    }
  }

  const responseGoogle = async(req: NextApiRequest, res: NextApiResponse<Data>) =>{

    // Vericar que tengamos un usuario

  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session?.user) {
    return res
      .status(401)
      .json({ message: "Debe de estar autenticado para hacer esto" });
  }



  return res.json({ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''  });

  }