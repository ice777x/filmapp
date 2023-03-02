"use client";
import {useRouter} from "next/navigation";
import React from "react";
import {BsTrash} from "react-icons/bs";
import useSession from "../lib/useSession";
import AddStory from "./AddStory";
import FilmCard from "./FilmCard";

export default function Stories({films}: {films: any}) {
  const router = useRouter();
  const {session, loading} = useSession();
  const [userFilms, setUserFilms] = React.useState([]);
  const [loadingFilms, setLoadingFilms] = React.useState(true);
  React.useEffect(() => {
    const fetchFilms = async () => {
      if (!session) return;
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session: session?.session,
        }),
      });
      if (!res.ok) throw new Error("Error fetching user films");
      const data = await res.json();

      const filteredFilms = data.user.story.map((film: any) => {
        return films.find((f: any) => Number(f.id) === Number(film.filmId));
      });
      setUserFilms(filteredFilms);
    };
    fetchFilms();
  }, [session, loadingFilms]);
  if (!session) return null;

  const handleClick = async (e: any, film: any) => {
    e.preventDefault();
    const res = await fetch("/api/story/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filmId: film.id,
      }),
    });
    if (!res.ok) throw new Error("Error deleting story");
    const data = await res.json();
    router.refresh();
  };
  return (
    <div>
      <h1 className="text-2xl lg:text-4xl font-medium mb-4">Your Stories</h1>
      <div className="flex flex-row snap-x space-x-2 snap-mandatory overflow-x-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-gray-800/5 scrollbar-track-rounded-full scrollbar-thumb-rounded-full ">
        {userFilms.length > 0 &&
          userFilms.map((film: any, i: number) => (
            <FilmCard
              film={film}
              key={i}
              className="snap-start flex-[40%_0_0] sm:flex-[33%_0_0] md:flex-[24%_0_0] lg:flex-[18%_0_0] xl:flex-[15%_0_0] py-3 p-1 group relative"
            >
              <div className="absolute top-1 right-1 z-[49] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in">
                <button
                  onClick={(e) => handleClick(e, film)}
                  className="bg-transparent/60 rounded-lg px-3 py-1.5"
                >
                  <BsTrash className="text-red-600" />
                </button>
              </div>
            </FilmCard>
          ))}
        <AddStory
          show={false}
          loadingFilms={loadingFilms}
          setLoadingFilms={setLoadingFilms}
          films={films}
          className="snap-start flex-[40%_0_0] sm:flex-[33%_0_0] md:flex-[24%_0_0] lg:flex-[18%_0_0] xl:flex-[15%_0_0]"
        />
      </div>
    </div>
  );
}
