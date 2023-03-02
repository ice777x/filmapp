import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  const films = await prisma.film.findUnique({
    select: {
      id: true,
      image: true,
      rating: true,
      originalName: true,
      url: true,
      title: true,
      year: true,
      country: true,
      description: true,
      duration: true,
      genre: true,
      cast: {
        select: {
          actor: true,
          director: true,
          reward: true,
          scriptwriter: true,
        },
      },
      source: {
        select: {
          text: true,
          url: true,
          video: true,
        },
      },
    },
    where: {
      id: Number(id),
    },
  });
  if (!films) {
    res.status(404).json({error: "Film not found"});
    return;
  }
  res.status(200).json({
    status_code: 200,
    message: "Successfully fetched film",
    data: films,
  });
  return;
}
