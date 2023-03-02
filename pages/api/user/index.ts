import {NextApiRequest} from "next";
import {NextApiResponse} from "next/types";
import {prisma} from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {session} = req.body;
    if (!session) {
      res.status(400).json({message: "Bad request"});
      return;
    }
    const user = await prisma.user.findUnique({
      where: {session},
      include: {
        story: true,
      },
    });
    if (!user) {
      res.status(400).json({message: "Bad request"});
      return;
    }
    res.status(200).json({message: "ok", user});
    return;
  }
  const users = await prisma.user.findMany({
    include: {
      story: true,
    },
  });
  res.status(200).json({users});
}
