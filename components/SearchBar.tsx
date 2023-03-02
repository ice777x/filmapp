"use client";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {BsSearch} from "react-icons/bs";

export default function SearchBar() {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [films, setFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  useEffect(() => {
    const getFilms = async () => {
      const res = await fetch("https://filmapp-five.vercel.app/api/films");
      const data = await res.json();
      setFilms(data.data);
    };
    getFilms();
  }, []);

  const handleSearch = (e: any) => {
    if (e.target.value !== "" && e.target.value.length >= 3) {
      const filtered = films
        .filter((film: any) => {
          return film.title
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        })
        .sort();
      setFilteredFilms(filtered);
    } else {
      setFilteredFilms([]);
    }
    setShow(true);
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="w-full max-w-xl 2xl:max-w-3xl relative z-[60] hidden xl:block">
        <div
          className={`flex items-center border border-gray-700 rounded-lg ${
            show && "rounded-b-none"
          } bg-[#293462 bg-slate-800 w-full h-full`}
        >
          <input
            className="py-1.5 px-3 focus:outline-none rounded-l-lg bg-transparent text-gray-200 w-full text-base placeholder:text-sm font-normal"
            onChange={handleSearch}
            onClick={() => {
              setShow(true);
            }}
            type="text"
            value={search}
            placeholder="Search..."
          />
          <div className="pr-2">
            <BsSearch className="text-xl" />
          </div>
        </div>
        {show && (
          <>
            <div className="absolute left-0 w-full bg-slate-800 shadow-lg rounded-lg rounded-t-none border border-gray-700 border-t-0 overflow-hidden">
              <div className="flex flex-col divide-y-2 divide-gray-700 overflow-y-auto max-h-[600px]">
                {filteredFilms.length > 0
                  ? filteredFilms.map((film: any, i: number) => (
                      <section
                        key={i}
                        onClick={() => {
                          setShow(false);
                          setSearch("");
                          setFilteredFilms([]);
                        }}
                        className="flex items-center px-4 py-2 hover:bg-[#25316D]"
                      >
                        <Link href={"/film/[id]"} as={`/film/${film.id}`}>
                          <div className="flex w-full h-full">
                            <Image
                              src={film.image}
                              width={200}
                              height={200}
                              alt=""
                              className="object-cover rounded-lg w-full h-28 flex-[12.5%_0_0]"
                            />
                            <div className="ml-2">
                              <div className="text-sm font-medium text-gray-200">
                                {film.title}
                              </div>
                              <div className="text-xs text-gray-400 line-clamp-2 lg:line-clamp-4">
                                {film.description}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </section>
                    ))
                  : films.slice(0, 5).map((film: any, i: number) => (
                      <section
                        key={i}
                        onClick={() => {
                          setShow(false);
                          setSearch("");
                          setFilteredFilms([]);
                        }}
                        className="flex items-center px-4 py-2 hover:bg-[#25316D] group"
                      >
                        <Link href={`/film/${film.id}`}>
                          <div className="flex flex-row w-full h-full">
                            <Image
                              src={film.image}
                              width={600}
                              height={600}
                              quality={100}
                              alt=""
                              className="object-cover rounded-md shadow-lg shadow-black/40  drop-shadow h-32 flex-[12%_0_0]"
                            />
                            <div className="ml-2">
                              <div className="text-sm font-medium text-gray-200">
                                {film.title}
                              </div>
                              <div className="text-xs text-gray-400 font-normal line-clamp-2 lg:line-clamp-4">
                                {film.description}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </section>
                    ))}
              </div>
            </div>
          </>
        )}
      </div>
      {show && (
        <div
          onClick={(e) => {
            setShow(false);
            setSearch("");
            setFilteredFilms([]);
          }}
          className="absolute w-full h-full inset-0"
        />
      )}
    </>
  );
}
