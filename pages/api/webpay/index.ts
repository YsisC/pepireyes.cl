import { WebPayOrderConfirmResponse } from "@/interfaces/webpay";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
type Data = {
  message: string | WebPayOrderConfirmResponse;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "PUT":
      return webpay_respuesta(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}
const headers = {
  "Content-Type": "application/json",
  "Tbk-Api-Key-Id": process.env.WEBPAY_ID,
  "Tbk-Api-Key-Secret": process.env.WEBPAY_SECRET,
};
const webpay_respuesta = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { token_ws } = req.query;
  console.log(token_ws);

  const data = {};
  try {
    if (typeof token_ws === "string") {
      const urlToken = process.env.WEBPAY_URL + "/" + token_ws;
      console.log("toma el url token", urlToken);
      const response = await axios.put(urlToken, data, {
        headers: headers,
      });
      console.log("data api put", response.data);
      return res.status(200).json(response.data);
    }
    // Send a successful response with the data from the external API
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
