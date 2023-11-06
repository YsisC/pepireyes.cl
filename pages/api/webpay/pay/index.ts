// import { paypalApi } from "@/axiosApi";
import { paypalApi } from "@/axiosApi";
import { IWebPayOrder, WebPayOrderConfirmResponse, WebPayOrderCreateResponse } from "@/interfaces/webpay";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string }
 | WebPayOrderCreateResponse
 | WebPayOrderConfirmResponse;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return webpayPagar(req, res);
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
const webpayPagar = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const body = req.body as IWebPayOrder;
  console.log("body", body);
  // Vericar que tengamos un usuario

  try {

    const data = body;

    console.log(data)

    const response = await axios.post<WebPayOrderCreateResponse>(
      process.env.WEBPAY_URL || "",
      data,
      {
        headers: headers,
      }
    );


    // Send a successful response with the data from the external API
    return res.status(200).json(response.data);
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

const webpay_respuesta = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
 
  const { token_ws } = req.query;
  console.log(token_ws)
  const urlToken = process.env.WEBPAY_URL + "/" + token_ws
  console.log("toma el url token", urlToken)
  const data = {};
  try {
  const response = await axios.put(
    process.env.WEBPAY_URL + "/" + token_ws,
    data,
    {
      headers: headers,
    }
  );

  console.log("data api put", response.data);
     // Send a successful response with the data from the external API
     return res.status(200).json(response.data);
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.log(error.response?.data);
    return res.status(500).json({ message: "Internal Server Error" });
  } else {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


}