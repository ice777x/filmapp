import {NextApiRequest, NextApiResponse} from "next";
import {scraperAllPages, sourceScraper, videoScraper} from "../../../lib/films";
import {prisma} from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.url) {
    const film = await sourceScraper(req.query.url as string);
    const video = await videoScraper(film.current);
    const alternatives = await Promise.all(
      film.alternatives.map(async (source) => {
        const video = await videoScraper(source);
        return {...source, video};
      })
    );
    res.status(200).json({
      data: {
        details: film.details,
        current: {...film.current, video},
        alternatives,
      },
    });
    return;
  }
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
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({status_code: 200, length: data.length, data});
}
