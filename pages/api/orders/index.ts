import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { db } from "../../../database";
import { IOrder, IUser } from "../../../interfaces";
import { Order, Product } from "../../../models";
import { getServerSession } from "next-auth";
import Cookies from "js-cookie";

type Data = { message: string } | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total, delivery } = req.body as IOrder;

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

  // Crear un arreglo con los productos que la persona quiere
  const productsIds = orderItems.map((product) => product._id);
  await db.connect();

  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find(
        (prod) => prod.id === current._id
      )?.price;
      if (!currentPrice) {
        throw new Error("Verifique el carrito de nuevo, producto no existe");
      }

      return currentPrice * current.quantity + prev;
    }, 0);

  
    const backendTotal = subTotal + delivery;


    if (total !== backendTotal) {
      throw new Error("El total no cuadra con el monto");
    }

    // Todo bien hasta este punt

    const user = session?.user as IUser;
    const userId = user._id;
    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
    newOrder.total = Math.round(newOrder.total * 100) / 100;

    await newOrder.save();
    await db.disconnect();

    return res.status(201).json(newOrder);
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    res.status(400).json({
      message: error.message || "Revise logs del servidor",
    });
  }

  // return res.status(201).json( req.body );
};
