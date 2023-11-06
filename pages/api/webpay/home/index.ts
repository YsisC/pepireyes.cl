
import type { NextApiRequest, NextApiResponse } from "next";

type Data = 
  | { message: string }


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return webpayHome(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const webpayHome = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  res.json({ message: "webpay" });
};
