import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../lib/db";
import {scraperAllPages, sourceScraper} from "../../../lib/films";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const films = await scraperAllPages(1, 1);
  const promisFilm = [];
  for (const i of films) {
    const filmFunction = async (film: any) => {
      try {
        const filmSource = await sourceScraper(film.url);
        return {
          details: filmSource.details,
          current: filmSource.current,
          alternatives: filmSource.alternatives,
        };
      } catch (e) {
        return null;
      }
    };
    promisFilm.push(filmFunction(i));
  }
  const createFilms = (await Promise.all(promisFilm)).filter(
    (i) => i !== null
  ) as any;

  const created = [];
  for (const i of createFilms) {
    if (await prisma.film.findUnique({where: {url: i.details.url}})) continue;
    if (i.details.url === "" || i.details.url === undefined) continue;
    if (i.details.url === "https://www.fullhdizle.me/top-gun-2-izle/") continue;
    if (i.details.title === "") continue;
    const createFunc = async (i: any) => {
      await prisma.film.create({
        data: {
          url: i.details.url,
          country: i.details.country,
          description: i.details.description,
          duration: i.details.duration,
          genre: i.details.genres,
          image: i.details.image,
          originalName: i.details.originalName,
          rating: i.details.rating,
          title: i.details.title,
          year: i.details.year,
          cast: {
            create: {
              director: i.details.cast.director,
              scriptwriter: i.details.cast.scriptwriter,
              actor: i.details.cast.actors,
              reward: i.details.cast.rewards,
            },
          },
          source: {
            createMany: {
              data: [i.current, ...i.alternatives].map((i: any) => ({
                url: i.url,
                text: i.text,
                video: i.video,
              })),
            },
          },
        },
      });
      return;
    };
    created.push(createFunc(i));
  }
  await Promise.all(created);
  res.status(200).json({message: "ok"});
}
