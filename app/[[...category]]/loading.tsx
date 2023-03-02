import React from "react";
import FilmCardSkeleton from "../../components/skeleton/FilmCardSkeleton";

export default function page() {
  return (
    <div className="animate-pulse px-4 lg:container mx-auto">
      <div className="w-full h-[200px]"></div>
      <div className="mb-9">
        <div className="w-40 h-4 rounded-lg bg-gray-700 mb-4" />
        <div className="flex flex-row snap-x space-x-4 snap-mandatory overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-700 py-4 pb-6">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <FilmCardSkeleton
                key={i}
                className="snap-start flex-[50%_0_0] sm:flex-[33%_0_0] md:flex-[24%_0_0] lg:flex-[18%_0_0] xl:flex-[15%_0_0] py-3 p-1"
              />
            ))}
        </div>
      </div>

      <div className="mb-9">
        <div className="w-40 h-4 rounded-lg bg-gray-700 mb-4" />
        <div className="flex flex-row snap-x space-x-4 snap-mandatory overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-700 py-4 pb-6">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <FilmCardSkeleton
                key={i}
                className="snap-start flex-[50%_0_0] sm:flex-[33%_0_0] md:flex-[24%_0_0] lg:flex-[18%_0_0] xl:flex-[15%_0_0] py-3 p-1"
              />
            ))}
        </div>
      </div>
      <div className="mb-9">
        <div className="w-40 h-4 rounded-lg bg-gray-700 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <FilmCardSkeleton key={i} />
            ))}
        </div>
      </div>
    </div>
  );
}
