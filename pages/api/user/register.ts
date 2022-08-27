import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import bcrypt from "bcryptjs";
import { jwt } from "../../../utils";
import { isEmail } from "../../../utils/validations";

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
      return registerUser(req, res);

    default:
      res.status(405).json({message: "Method not allowed"});
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {email = "", password = "", name = ""} = req.body;
  await db.connect();
  const user = await User.findOne({email}).lean();

  if (password.length < 6) {
    return res
      .status(401)
      .json({message: "Password debe tener al menos 6 caracteres"});
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json({message: "Nombre debe tener al menos 3 caracteres"});
  }

  if (isEmail(email)) {
    return res.status(400).json({message: "El correo no parece ser válido"});
  }

  if (user) {
    await db.disconnect();
    return res.status(400).json({message: "Usuario ya existe"});
  }

  const newUser = new User({
    name,
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password),
    role: "client",
  });

  try {
    await newUser.save({validateBeforeSave: true});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Error al crear usuario"});
  }
  await db.disconnect();

  return res.status(200).json({
    token: jwt.signToken(newUser._id, email),
    user: {
      name,
      email,
      role: "client",
    },
  });
};
