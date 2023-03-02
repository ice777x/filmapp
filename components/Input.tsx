"use client";
import {Film} from "@prisma/client";
import React from "react";
import FilmCard from "./FilmCard";
import useDebounce from "./useDebounce";

export default function Input({films}: {films: any}) {
  const [filteredData, setFilteredData] = React.useState([]);

  const [value, setValue] = React.useState("");
  const debouncedSearch = useDebounce(value, 1000);
  React.useEffect(() => {
    if (!debouncedSearch || debouncedSearch.length < 3) {
      setFilteredData([]);
      return;
    }
    if (value.length < 3) return;
    let data = films.filter((film: any) =>
      film.title.toLowerCase().includes(debouncedSearch)
    );
    data = data.sort((a: any, b: any) => {
      if (a.title.toLowerCase().startsWith(debouncedSearch)) return -1;
      if (b.title.toLowerCase().startsWith(debouncedSearch)) return 1;
    });
    setFilteredData(data);
  }, [debouncedSearch]);
  return (
    <div className="divide-y-2 divide-gray-500">
      <div className="mb-6 w-full x-auto flex flex-col items-center">
        <div className="flex flex-col max-w-2xl w-full">
          <label htmlFor="search" className="text-gray-400 mb-1">
            Search
          </label>
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Search for a film"
            onChange={(e) => setValue(e.target.value)}
            className="border-gray-600 hover:border-gray-500 bg-gray-700 w-full px-2 py-1.5 caret-blue-600 rounded-md border focus:outline-none focus:ring-2 focus:border-blue-700 focus:hover:border-blue-700 focus:ring-blue-700"
          />
        </div>
        <div className="mt-4 self-start">
          {filteredData.length === 0 ? (
            <p className="text-gray-400">No results found</p>
          ) : (
            <p className="text-gray-400">
              {filteredData.length} result{filteredData.length > 1 && "s"} found
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 py-6">
        {filteredData.slice(0, 60).map((film: Film, i: number) => (
          <FilmCard key={i} film={film} />
        ))}
      </div>
    </div>
  );
}
