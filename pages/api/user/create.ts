import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({message: "Method not allowed"});
    return;
  }
  const {name} = req.body;
  if (!name) {
    res.status(400).json({message: "Bad request"});
    return;
  }

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        name: name,
      },
    });
    if (findUser) {
      res.status(200).json({message: "User already exists", user: findUser});
      return;
    }
    const createUser = await prisma.user.create({
      data: {
        name: name,
      },
    });
    res.status(200).json({message: "User created", user: createUser});
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    return;
  }
}
