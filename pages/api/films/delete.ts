import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.id) {
    const source = await prisma.source.deleteMany({
      where: {
        filmUrl: req.query.id as string,
      },
    });
    const cast = await prisma.cast.deleteMany({
      where: {
        filmUrl: req.query.id as string,
      },
    });
    const film = await prisma.film.delete({
      where: {
        url: String(req.query.id),
      },
    });
    if (!film) {
      return res.status(404).json({message: "Film not found"});
    }
    return res.status(200).json({
      status_code: 200,
      message: "Film successfully deleted",
      data: film,
    });
  }
  const sources = await prisma.source.deleteMany({});
  const casts = await prisma.cast.deleteMany({});
  const films = await prisma.film.deleteMany({});
  if (films.count === 0) {
    return res.status(404).json({message: "Films not found"});
  }
  res.status(200).json({data: films});
}
