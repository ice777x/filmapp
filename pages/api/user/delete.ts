import {NextApiRequest} from "next";
import {NextApiResponse} from "next/types";
import {prisma} from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.id) {
    const stories = await prisma.stories.deleteMany({
      where: {
        userId: Number(req.query.id),
      },
    });
    const users = await prisma.user.delete({where: {id: Number(req.query.id)}});
    res.status(200).json({users});
    return;
  }
  const users = await prisma.user.findMany();
  res.status(200).json({users});
}
