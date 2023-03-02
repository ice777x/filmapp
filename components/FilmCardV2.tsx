"use client";
import {Film, Cast, Source} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {Inter} from "next/font/google";
import {BsStarFill} from "react-icons/bs";

export interface FilmCardV2Props {
  film: Film & {
    cast: Cast[];
    source: Source[];
  };
}
const inter = Inter({
  subsets: ["latin"],
});
export default function FilmCardV2({film}: FilmCardV2Props) {
  const cast = film.cast[0];
  return (
    <div className="overflow-hidden relative group w-full flex flex-col justify-center items-center">
      <Link
        href="/film/[id]"
        as={`/film/${film.id}`}
        className="mx-auto flex justify-center items-center w-full h-full"
      >
        <Image
          src={film.image || "/placeholder.png"}
          alt={film.title}
          width={1920}
          height={1080}
          className="object-cover  hover:scale-[1.08] transition-transform transform-gpu duration-300 ease-linear"
        />
        <div
          className={`${inter.className} absolute opacity-0 top-0 space-y-1 transition-opacity duration-500 ease-linear group-hover:opacity-100 -z-50 group-hover:z-50 px-4 py-3 w-full`}
        >
          <h1 className="text-xs md:text-sm font-medium 2xl:text-base text-blue-600">
            {film.title.replace("izle", "").trim()}
          </h1>
          <p
            className={`text-[10px text-xs xl:text-sm text-gray-400 line-clamp-4 lg:line-clamp-5 2xl:[-webkit-line-clamp:7]`}
          >
            {film.description?.split(".").slice(0, 3).join(".")}
          </p>

          {cast.actor && (
            <p className="text-[13px] leading-normal xl:text-sm text-blue-600">
              <span className="font-medium">Oyuncular</span> <br />
              {cast.actor &&
                cast.actor.slice(0, 4).map((actor, i) => {
                  return (
                    <span key={i} className="text-gray-400">
                      {actor}
                      {i !== cast.actor.slice(0, 4).length - 1 && ", "}
                      {i === cast.actor.slice(0, 4).length - 1 && "..."}
                    </span>
                  );
                })}
            </p>
          )}
          {cast.director && (
            <p className="text-xs md:text-sm text-blue-600">
              Yönetmen <br />
              {cast.director &&
                cast.director.slice(0, 4).map((director, i) => {
                  return (
                    <span key={i} className="text-gray-400">
                      {director}
                      {i !== cast.director.slice(0, 4).length - 1 && ", "}
                      {cast.actor.length > 3 && i === 3 && "..."}
                    </span>
                  );
                })}
            </p>
          )}
          <div className="flex space-x-3 items-start">
            {film.year && (
              <p className="text-xs md:text-sm text-gray-500">{film.year}</p>
            )}
            {film.rating && (
              <div className="text-xs md:text-sm text-amber-500 flex space-x-1 items-center">
                <BsStarFill />
                <p>{film.rating}</p>
              </div>
            )}
            {film.country && (
              <p className="text-xs md:text-sm text-gray-300 font-medium">
                {film.country}
              </p>
            )}
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 backdrop-filter backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-linear"></div>
      </Link>
    </div>
  );
}
