"use client";
import {Film} from "@prisma/client";
import React from "react";
import useSession from "../lib/useSession";
import AddStoryCard from "./AddStoryCard";
import useDebounce from "./useDebounce";

export default function AddStoryInput({
  films,
  setShowInput,
  setLoadingFilms,
  loadingFilms,
}: {
  films: any;
  setShowInput: any;
  setLoadingFilms: any;
  loadingFilms: any;
}) {
  const [filteredData, setFilteredData] = React.useState([]);

  const [value, setValue] = React.useState("");
  const debouncedSearch = useDebounce(value, 500);
  const [show, setShow] = React.useState(false);
  const {session, loading} = useSession();
  React.useEffect(() => {
    if (!debouncedSearch || debouncedSearch.length < 3) {
      setFilteredData([]);
      return;
    }
    if (value.length < 3) return;
    let data = films.filter((film: any) =>
      film.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    data = data.sort((a: any, b: any) => {
      if (a.title.toLowerCase().startsWith(debouncedSearch.toLowerCase()))
        return -1;
      if (b.title.toLowerCase().startsWith(debouncedSearch.toLowerCase()))
        return 1;
    });
    if (data.length === 0) {
      setShow(true);
    }
    setFilteredData(data);
  }, [debouncedSearch]);
  return (
    <div className="divide-y-2 divide-gray-500">
      <div className="mb-6 max-w-md x-auto flex flex-col items-center">
        <div className="flex flex-col w-full">
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
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 w-full py-6 overflow-y-auto p-3 max-h-[500px]">
        {value.length < 3 && filteredData.length === 0 && (
          <div className="text-gray-400 col-span-full">
            Please enter at least 3 characters to search...
          </div>
        )}
        {value.length >= 3 && filteredData.length === 0 && (
          <div className="text-gray-400 col-span-full">Searching...</div>
        )}
        {session &&
          filteredData.map((film: Film, i: number) => (
            <AddStoryCard
              key={i}
              loadingFilms={loadingFilms}
              setLoadingFilms={setLoadingFilms}
              setShowInput={setShowInput}
              film={film}
              session={session}
            />
          ))}
      </div>
    </div>
  );
}
