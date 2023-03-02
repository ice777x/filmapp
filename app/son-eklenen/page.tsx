import React from "react";
import type {Metadata} from "next";
import FilmCardV2 from "../../components/FilmCardV2";

export const metadata: Metadata = {
  title: "Son Eklenenler | Ox",
};

const getFilms = async () => {
  const resp = await fetch("http://filmapp-five.vercel.app/api/films", {
    cache: "no-store",
  });
  const films = await resp.json();
  return films.data;
};

export default async function Page() {
  const films = await getFilms();
  return (
    <div className="py-6 ">
      <h1 className="text-2xl lg:text-4xl mb-5 pl-2 font-medium text-gray-300">
        Son Eklenenler
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  2xl:grid-cols-6">
        {films.slice(0, 42).map((film: any, i: number) => {
          return <FilmCardV2 key={i} film={film} />;
        })}
      </div>
    </div>
  );
}
