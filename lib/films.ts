import axios from "axios";
import cheerio from "cheerio";
import {Film, Source} from "../types";

const replaced = (text: string, filmName: string) => {
  return text
    .replace(
      `Film izle sayfamızda ${filmName} filmi Türkçe Dublaj ve altyazılı yayınlandı. Full hd film izleme keyfini bizimle yaşayın.`,
      ""
    )
    .replace("Keyifli seyirler dileriz..", "")
    .replace("Keyifli seyirler dileriz..!", "");
};

const sourceScraper = async (url: string) => {
  const resp = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  });
  if (resp.status !== 200) throw new Error("status not 200");
  const data = resp.data;
  const $ = cheerio.load(data);
  const sources = $(".keremiya_part a")
    .map((i, el) => {
      return {url: $(el).attr("href") as string, text: $(el).text()};
    })
    .toArray();
  const pro = [];
  for (let i of sources) {
    const alternativesF = async (x: any) => {
      return {
        url: x.url,
        text: x.text,
        video: await videoScraper(x),
      };
    };
    pro.push(alternativesF(i));
  }
  const alternatives = await Promise.all(pro);
  const video = (url: string) => {
    if (!url) throw new Error("url not found");
    if (url.startsWith("https") || url.startsWith("http")) return url;
    const videoUrl = "https:" + url;
    return videoUrl;
  };
  return {
    details: {
      url: url,
      title: $(".film > h1").text(),
      originalName: $(".original-name > span").text(),
      image: $(".poster > .img > img").attr("src") as string,
      year: $(".release > span").text(),
      country: $(".country > span").text(),
      genres: $(".post-categories > li")
        .map((i, el) => $(el).text())
        .toArray(),
      duration: $(".time > span").text(),
      rating: $(".imdb-count").text().split(" ")[0].trim(),
      description: replaced(
        $(".description").text().replace($(".description > h1").text(), ""),
        $(".film > h1").text().split(" izle")[0]
      ).trim(),
      cast: {
        director: $(".director > a")
          .map((i, el) => $(el).text())
          .toArray(),
        scriptwriter: $(".senaryo").text()
          ? $(".senaryo").text().split("Senaryo")[1].trim()
          : "",
        actors: $(".actors > a")
          .map((i, el) => $(el).text())
          .toArray(),
        rewards: $(".oduller") ? $(".oduller").text() : null,
      },
    },
    current: {
      url: url,
      text: $(".keremiya_part > span").text(),
      video: video($("iframe").attr("src") as string) || null,
    },
    alternatives,
  };
};

const videoScraper = async (source: Source) => {
  const resp = await axios.get(source.url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  });
  if (resp.status !== 200) throw new Error("status not 200");
  const data = resp.data;
  const $ = cheerio.load(data);
  const video = $("iframe").attr("src") as string;
  if (!video) return null;
  if (video.startsWith("https") || video.startsWith("http")) return video;
  const videoUrl = "https:" + video;
  return videoUrl;
};

const getAllFilms = async (page: string) => {
  const resp = await axios.get(
    `https://www.fullhdizle.me/film-arsivi/page/${page}`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    }
  );
  if (resp.status !== 200) throw new Error("status not 200");
  const data = resp.data;
  const $ = cheerio.load(data);
  const films = $(".movie-box")
    .map((i, el) => {
      return {
        url: $(el).find("a").attr("href") as string,
        title: $(el).find(".movie-details .name").text().trim(),
        image: $(el).find("img").attr("src") as string,
        rating: $(el).find(".poster .rating").text().trim(),
        year: $(el).find(".movie-details .category").text().trim(),
      };
    })
    .toArray();
  return films;
};

const pageCount = async () => {
  const {data} = await axios.get("https://www.fullhdizle.me/film-arsivi/");
  return data.split('title="Son">')[1].split("</a>")[0];
};
const scraperAllPages = async (
  start?: number,
  stop?: number
): Promise<Film[]> => {
  const pro = [];
  const pages = await pageCount();
  if (stop) {
    for (let i = start || 1; i <= stop; i++) {
      pro.push(getAllFilms(i.toString()));
    }
    const promis = await Promise.all(pro);
    const films = promis.flat();
    return films;
  }
  for (let i = start || 1; i <= 1; i++) {
    pro.push(getAllFilms(i.toString()));
  }
  const promis = await Promise.all(pro);
  const films = promis.flat();
  return films;
};

export {sourceScraper, videoScraper, scraperAllPages};
