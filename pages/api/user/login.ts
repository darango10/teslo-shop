import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import bcrypt from "bcryptjs";
import { jwt } from "../../../utils";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        name: string;
        email: string;
        role: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return loginUser(req, res);

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = "", password = "" } = req.body;
  await db.connect();
  const user = await User.findOne({ email }).lean();
  await db.disconnect();

  if (!user) {
    return res.status(401).json({ message: "Email o password no válidos" });
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return res.status(401).json({ message: "Password incorrecto" });
  }

  const { name, role } = user;

  return res.status(200).json({
    token: jwt.signToken(user._id, email),
    user: {
      name,
      email,
      role,
    },
  });
};
