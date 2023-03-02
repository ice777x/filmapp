import Image from "next/image";
import Link from "next/link";
import React from "react";
import {BsArrowRight} from "react-icons/bs";
import FilmCard from "../../components/FilmCard";
import CategoryTabGroup from "../../components/CategoryTabGroup";
import type {Metadata} from "next";
import Stories from "../../components/Stories";
import useSession from "../../lib/useSession";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Film Arşivi | Ox",
};

async function getData() {
  const resp = await fetch("http://filmapp-five.vercel.app/api/films", {
    cache: "no-store",
  });
  const data = await resp.json();
  const categories: any = [
    ...new Set(
      data.data
        .map((film: any) => {
          return film?.genre.map((x: any) =>
            x.replace(/Filmler[i]?/g, "").trim()
          );
        })
        .flat()
    ),
  ];
  return [data.data, categories];
}
export default async function Home({params: {category}}: {params: any}) {
  const [films, categories] = await getData();
  const randomValues = Math.floor(Math.random() * categories.length - 1);
  let currentCategory = "";
  if (category) {
    if (categories.includes(decodeURI(category[0]))) {
      currentCategory = decodeURI(category[0]);
    }
  }
  return (
    <div className="px-4 lg:container mx-auto mt-4">
      <div className="mb-8">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/ice.png"
            alt="logo"
            width={150}
            height={150}
            className="rounded-xl object-cover"
          />
          <h1 className="text-4xl font-bold text-center mt-4">Film Arşivi</h1>
          <p className="text-gray-400 text-center mt-2">
            Film arşivimizde 1000'den fazla film bulunmaktadır.
          </p>
        </div>
      </div>
      <div className="mb-8">
        <CategoryTabGroup categories={categories.sort()} />
      </div>
      {currentCategory && (
        <div className="mb-8">
          <h1 className="text-2xl lg:text-4xl mb-4 font-medium">
            {currentCategory}
          </h1>
          <div className="flex flex-row snap-x space-x-2 snap-mandatory overflow-x-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-gray-800/5 scrollbar-track-rounded-full scrollbar-thumb-rounded-full ">
            {films
              .filter((film: any) => {
                const filtered = film.genre.find((x: any) =>
                  x.toLowerCase().includes(currentCategory.toLowerCase())
                );
                return filtered;
              })
              .slice(0, 60)
              .map((film2: any, i: number) => (
                <FilmCard
                  key={i}
                  film={film2}
                  className="snap-start flex-[40%_0_0] sm:flex-[33%_0_0] md:flex-[24%_0_0] lg:flex-[18%_0_0] xl:flex-[15%_0_0] py-3 p-1"
                />
              ))}
          </div>
        </div>
      )}
      {categories.length > 0 && !currentCategory && (
        <div className="mb-8">
          <h1 className="text-2xl lg:text-4xl mb-4 font-medium">
            {categories[randomValues]}
          </h1>
          <div className="flex flex-row snap-x space-x-2 snap-mandatory overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent scrollbar-thumb-rounded-full ">
            {films
              .filter((film: any) => {
                const filtered = film.genre.find((x: any) =>
                  x
                    .toLowerCase()
                    .includes(categories[randomValues].toLowerCase())
                );
                return filtered;
              })
              .slice(0, 60)
              .map((film2: any, i: number) => (
                <FilmCard
                  key={i}
                  film={film2}
                  className="snap-start flex-[40%_0_0] sm:flex-[33%_0_0] md:flex-[24%_0_0] lg:flex-[18%_0_0] xl:flex-[15%_0_0] py-3 p-1"
                />
              ))}
          </div>
        </div>
      )}
      {films.length > 0 && (
        <div className="mb-8">
          <Stories films={films} />
        </div>
      )}

      {films.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl lg:text-4xl mb-4 font-medium">
              Son Eklenen
            </h1>
            <Link
              href="/son-eklenen"
              className="text-gray-400 hover:text-white transition-colors duration-200 ease-in inline"
            >
              Tümünü Gör <BsArrowRight className="inline" />
            </Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
            {films &&
              films
                .slice(0, 24)
                .map((film: any, i: number) => (
                  <FilmCard key={i} film={film} className="p-2" />
                ))}
          </div>
        </div>
      )}
    </div>
  );
}
