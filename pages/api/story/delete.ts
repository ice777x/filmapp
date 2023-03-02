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
  const {filmId} = req.body;
  if (!filmId) {
    res.status(400).json({message: "Bad request"});
    return;
  }
  try {
    await prisma.stories.delete({
      where: {
        filmId: String(filmId),
      },
    });
    res.status(200).json({message: "ok"});
    return;
  } catch (e) {
    res.status(500).json({message: "Internal server error"});
    return;
  }
}
