"use client";
import {Cast, Film, Source} from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Video({
  children,
  film,
}: {
  children: React.ReactNode;
  film: any;
}) {
  if (!film) return null;
  const [current, setCurrent] = React.useState(film.source[0]);
  const handleClick = (e: any, alternative: any) => {
    e.preventDefault();
    setCurrent(alternative);
  };
  const cast = film.cast[0];
  const [light, setLight] = React.useState(false);
  return (
    <>
      {light && (
        <div className="absolute bg-black opacity-50 -z-50  min-h-full h-full w-full"></div>
      )}
      <div className="space-y-6 h-full">
        <div className="flex gap-x-2 bg-indigo-900 px-2 lg:px-4 py-2 lg:py-3 rounded-lg">
          {film.source.map((alternative: any, i: number) => (
            <button
              key={i}
              onClick={(e) => handleClick(e, alternative)}
              name={alternative.text}
              className={clsx("px-3 py-2.5 rounded-lg text-xs md:text-sm", {
                "bg-indigo-800": alternative === current,
                "hover:bg-indigo-700": alternative !== current,
              })}
            >
              {alternative.text === "" ? "Alternatif" : alternative.text}
            </button>
          ))}
        </div>
        <div className="video">
          <h1 className="text-xl lg:text-3xl font-bold text-center mb-4">
            {film.title}{" "}
            <span className="text-[#999]">({film.originalName})</span>
          </h1>
          <span className="text-sm text-gray-500">Source: {current.text}</span>
          {current.video ? (
            <iframe
              src={current.video}
              allowFullScreen
              width="100%"
              height="100%"
              className="aspect-[20/10] w-full rounded-lg shadow-lg shadow-black/30 opacity-[1] sticky z-[50]"
            />
          ) : (
            <div className="aspect-[20/10] w-full rounded-lg shadow-lg shadow-black/30 opacity-[1] sticky z-[50] flex items-center justify-center">
              <div className="flex flex-col gap-y-2">
                <div className="text-xl font-bold text-center text-gray-400">
                  Video Bulunamadı
                </div>
                <div className="text-sm text-center text-gray-400">
                  Lütfen daha sonra tekrar deneyiniz.
                </div>
              </div>
            </div>
          )}
        </div>
        <div>{children}</div>
        <div className="film">
          <div className="flex flex-col lg:flex-row gap-4 w-full items-center lg:items-start">
            <div className="aspect-[2/1] lg:flex-[27%_0_0] xl:flex-[22%_0_0]">
              <Image
                src={film.image || "/placeholder.png"}
                width={1920}
                height={1080}
                quality={100}
                alt={film.title}
                className="object-cover rounded-lg aspect-[30/15] lg:aspect-auto max-w-[360px shadow-lg shadow-black/30"
              />
            </div>
            <div className="">
              <h1 className="text-xl lg:text-2xl font-bold mb-4">
                {film.title}{" "}
                <span className="text-[#999]">({film.originalName})</span>
              </h1>
              <p className="text-sm lg:text-base xl:text-lg mb-4 text-gray-400">
                {film.description}
              </p>
              <div className="flex flex-col gap-y-4 divide-y-2 divide-gray-700">
                <div className="flex flex-col gap-y-1">
                  {film.year && (
                    <div className="text-sm lg:text-base xl:text-lg text-indigo-600">
                      Yıl: <span className="text-gray-400">{film.year}</span>
                    </div>
                  )}
                  {film.rating && (
                    <div className="text-xs lg:text-base xl:text-lg text-indigo-600">
                      Puan: <span className="text-gray-400">{film.rating}</span>
                    </div>
                  )}
                  {film.genre && (
                    <div className="text-sm lg:text-base xl:text-lg text-indigo-600">
                      Kategori:{" "}
                      {film.genre.map((x: string, i: number) => (
                        <span
                          key={i}
                          className="text-sm lg:text-base xl:text-lg text-gray-400 mr-2"
                        >
                          {x.replace("Filmleri", "").trim()}
                          {film.genre.indexOf(x) !== film.genre.length - 1 &&
                            ","}
                        </span>
                      ))}
                    </div>
                  )}

                  {film.country && (
                    <div className="text-sm lg:text-base xl:text-lg text-indigo-600">
                      Ülke:{" "}
                      <span className="text-gray-400">{film.country}</span>
                    </div>
                  )}
                  {film.duration && (
                    <div className="text-sm lg:text-base xl:text-lg text-indigo-600">
                      Süre:{" "}
                      <span className="text-gray-400">{film.duration}</span>
                    </div>
                  )}
                </div>
                <div className="py-2">
                  {cast.actor && (
                    <div className="text-sm lg:text-base xl:text-lg text-indigo-600">
                      Oyuncu{cast.actor.length > 1 ? "lar" : ""}:{" "}
                      {cast.actor.map((x: string, i: number) => (
                        <Link
                          key={i}
                          href={`/cast/${x}`}
                          className="text-sm lg:text-base xl:text-lg text-gray-400 mr-2"
                        >
                          {x}
                          {cast.actor.indexOf(x) !== cast.actor.length - 1 &&
                            ","}
                        </Link>
                      ))}
                    </div>
                  )}
                  {cast.director && (
                    <div className="text-sm lg:text-base xl:text-lg text-indigo-600">
                      Yönetmen{cast.director.length > 1 ? "ler" : ""}:{" "}
                      {cast.director.map((x: string, i: number) => (
                        <span
                          key={i}
                          className="text-sm lg:text-base xl:text-lg text-gray-400 mr-2"
                        >
                          {x}{" "}
                          {cast.director.indexOf(x) !==
                            cast.director.length - 1 && ","}
                        </span>
                      ))}
                    </div>
                  )}
                  {cast.reward && (
                    <div className="text-sm lg:text-base xl:text-lg text-indigo-600">
                      Ödüller{cast.reward.length > 1 ? "ler" : ""}:{" "}
                    </div>
                  )}
                  {cast.scriptwriter && (
                    <div className="text-sm lg:text-base xl:text-lg text-indigo-600">
                      Senarist
                      {cast.scriptwriter.split(",").length > 1
                        ? "ler"
                        : ""}:{" "}
                      <span className="text-sm lg:text-base xl:text-lg text-gray-400">
                        {cast.scriptwriter}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
