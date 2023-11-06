import { paypalApi } from "@/axiosApi";
import { IWebPayOrder } from "@/interfaces/webpay";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

type Data = { message: string } | IWebPayOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "PUT":
      return webpayResponse(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

let webpay_respuesta;
const webpayResponse = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { token_ws } = req.query;

  // Vericar que tengamos un usuario

  try {

  let args = {
    data: {},
    headers: {
      "Content-Type": "application/json",
      "Tbk-Api-Key-Id": process.env.WEBPAY_ID,
      "Tbk-Api-Key-Secret": process.env.WEBPAY_SECRET,
    },
  };
  const { data } = await axios.put( process.env.WEBPAY_URL, "/" + token_ws, args); 
  console.log(data);
  return res.status(200).json(data);

} catch (error) {
  if ( axios.isAxiosError(error) ) {
    console.log(error.response?.data);
} else {
    console.log(error);
}

return null;
}
};
