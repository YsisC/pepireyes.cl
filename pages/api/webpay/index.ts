import { WebPayOrderCreate } from '@/interfaces/webpay';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
    | WebPayOrderCreate
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case "GET":
          return webpayPagar(req, res);
    
        default:
          return res.status(400).json({ message: "Bad request" });
      }
   
}

const webpayPagar = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) => {
    res.json({ message: "webpay principal" });
  };
  