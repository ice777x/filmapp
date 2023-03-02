import {Film} from "@prisma/client";
import Image from "next/image";
import {useRouter} from "next/navigation";
import React from "react";
import useSession from "../lib/useSession";

export default function AddStoryCard({
  film,
  className = "",
  session,
  setShowInput,
  setLoadingFilms,
  loadingFilms,
}: {
  film: Film;
  className?: string;
  session: {
    id: number;
    name: string;
    session: string;
  };
  setShowInput: any;
  setLoadingFilms: any;
  loadingFilms: any;
}) {
  const router = useRouter();
  const handleClick = async () => {
    try {
      const res = await fetch("/api/story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: film.id,
          userId: session.id,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      return;
    }
    setShowInput(false);
    setLoadingFilms(!loadingFilms);
    router.refresh();
  };
  return (
    <section className={`group ${className}`}>
      <button onClick={handleClick} className="w-full relative">
        <div className="relative transform-gpu group-hover:[transform:rotateY(180deg)] transition-transform ease-in duration-300">
          <div className="absolute h-full w-full bg-black/70 opacity-0 group-hover:z-10 group-hover:opacity-100 rounded-lg transition-opacity duration-300 ease-in"></div>
          {film.rating && (
            <div className="absolute z-50 text-xs opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-linear bg-amber-700/80 px-2 py-px rounded-md right-2 bottom-2">
              {film.rating}
            </div>
          )}

          {film.year && (
            <div className="absolute z-50 text-xs opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-linear  bg-gray-700/80 px-2 py-px rounded-md left-2 top-2">
              {film.year}
            </div>
          )}

          <div className="overflow-hidden rounded-lg">
            <Image
              src={film.image || "/placeholder.png"}
              width={600}
              height={600}
              alt={film.title}
              quality={100}
              className="object-cover aspect-[2/3] w-full group-hover:scale-105 transition-all duration-300 ease-in-out"
            />
          </div>
        </div>
        <div className="absolute top-0 p-2 sm:p-3 opacity-0 group-hover:opacity-100 z-30 transition-all duration-150 delay-75 ease-in h-full rounded-lg">
          <p className="text-[#ddd] font-light text-xs sm:text-sm line-clamp-4 lg:line-clamp-5 xl:[-webkit-line-clamp:8]">
            {film.description}
          </p>
        </div>
        <h2 className="text-center py-1 text-[#999] group-hover:text-white text-xs lg:text-sm font-medium transition-colors duration-300 ease-in">
          {film.title.replace("izle", "").trim()}
        </h2>
      </button>
    </section>
  );
}
