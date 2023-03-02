import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const getStories = await prisma.stories.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).json({data: getStories});
    return;
  }
  const {id, userId} = req.body;
  if (!id || !userId) {
    res.status(400).json({message: "Bad request"});
    return;
  }
  const createStory = await prisma.stories.create({
    data: {
      filmId: String(id),
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  res.status(200).json({message: "ok"});
}
