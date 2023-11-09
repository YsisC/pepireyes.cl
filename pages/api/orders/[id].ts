import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { db } from "../../../database";
import { IOrder, IUser } from "../../../interfaces";
import { Order,  } from "../../../models";
import { getServerSession } from "next-auth";

type Data = { message: string } | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "PUT":
      return updatedOrder(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const updatedOrder = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
 
    const { id } = req.query;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if( !order ) {
        return res.status(404).json({
            message: 'Orden no encontrada'
        })
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({message: 'No se encontro'});
  }
};
