import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { Product } from "../../../../models";

type Data = { message: string } | { price: number };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getPriceBySlug(req, res);

    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}

async function getPriceBySlug(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log("REQ PRICE");
  await new Promise((f) => {
    setTimeout(f, 1000);
  });
  await db.connect();
  const { slug } = req.query;
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return res.status(404).json({
      message: "Producto no encontrado",
    });
  }

  return res.json({ price: product.price });
}
