import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {id} = req.query;
  const resp = await fetch(
    `https://v3.sg.media-imdb.com/suggestion/x/${id}.json?includeVideos=1`
  );
  const data = await resp.json();
  res.status(200).json({message: "ok", data});
}
