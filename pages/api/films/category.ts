import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await prisma.film.findMany({
    select: {
      id: true,
      url: true,
      image: true,
      title: true,
      description: true,
      genre: true,
      country: true,
      year: true,
      duration: true,
      originalName: true,
      rating: true,
      cast: {
        select: {
          id: true,
          actor: true,
          director: true,
          scriptwriter: true,
          reward: true,
        },
      },
      source: {
        select: {
          id: true,
          text: true,
          url: true,
          video: true,
        },
      },
    },
  });
  const categories: any = [
    ...new Set(
      data
        .map((film: any) => {
          return film?.genre.map((x: any) =>
            x.replace(/Filmler[i]?/g, "").trim()
          );
        })
        .flat()
    ),
  ];
  res.status(200).json({status_code: 200, data: categories});
}
