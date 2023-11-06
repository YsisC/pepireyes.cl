import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";


import {
  IWebPayOrder,
  WebPayOrderConfirmResponse,
  WebPayOrderCreateResponse,
} from "@/interfaces/webpay";
import { db } from '../../../../database';
import { Order } from '../../../../models';
import { useRouter } from "next/router";

type Data =
  | { message: string }
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

    console.log(data);

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

const webpay_respuesta = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { token_ws } = req.body;
  console.log("token", token_ws);

  const urlToken = process.env.WEBPAY_URL + "/" + token_ws;
  console.log("toma el url token", urlToken);
  const body = {};
  try {
    const { data } = await axios.put(urlToken, body, {
      headers: headers,
    });

    console.log("data api put", data);
    if (data.status !== "AUTHORIZED") {
      return res.status(401).json({ message: "Orden no reconocida" });
    }
    const orderId = data.buy_order.substring(1);
    console.log("numero de orden", orderId);
    await db.connect();
    const dbOrder = await Order.findById(orderId);
    console.log("deorden", dbOrder);
    if (!dbOrder) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "Orden no existe en nuestra base de datos" });
    }

    if (dbOrder.total !== Number(data.amount)) {
      await db.disconnect();
      return res
        .status(400)
        .json({
          message: "Los montos de webpay y nuestra orden no son iguales",
        });
    }
    dbOrder.session_id = data.session_id;
    dbOrder.isPaid = true;
    await dbOrder.save();
    await db.disconnect();
    
    // Send a successful response with the data from the external API
    return res.status(200).json(data);
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
