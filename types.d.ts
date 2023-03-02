export type Source = {
  url: string;
  text: string;
};

export type Film = {
  url: string;
  title: string;
  image: string;
  rating: string;
  year: string;
};

export type Data = {
  details: {
    title: string;
    originalName: string;
    image: string;
    year: string;
    country: string;
    genres: string[];
    duration: string;
    rating: string;
    description: string;
    cast: {
      director: string;
      scriptwriter: string;
      actors: string[];
      rewards: string | null;
    };
  };
  current: Video;
  alternatives: Video[];
};
export type Video = {
  url: string;
  text: string;
  video: string;
};
