"use client";
import React, {useState} from "react";
import {BsPlus, BsX, BsXDiamond, BsXLg} from "react-icons/bs";
import AddStoryInput from "./AddStoryInput";

export default function AddStory({
  className,
  films,
  show,
  setLoadingFilms,
  loadingFilms,
}: {
  className?: string;
  films: any;
  show: boolean;
  setLoadingFilms: any;
  loadingFilms: any;
}) {
  const [showInput, setShowInput] = useState(false);
  return (
    <>
      {showInput && (
        <>
          <div className="z-50 fixed top-0 -left-2 w-full h-screen flex justify-center items-center">
            <div
              onClick={(e) => setShowInput(!showInput)}
              className="w-full h-full flex-none inset-0 absolute bg-black opacity-30"
            />
            <div
              onClick={(e) => {
                e.preventDefault();
              }}
              className="bg-gray-900 p-4 max-w-2xl lg:max-w-4xl rounded-xl z-50 relative"
            >
              <button
                onClick={() => setShowInput(!showInput)}
                className="absolute right-3"
              >
                <BsXLg className="text-sm text-gray-300" />{" "}
              </button>
              <AddStoryInput
                loadingFilms={loadingFilms}
                setLoadingFilms={setLoadingFilms}
                setShowInput={setShowInput}
                films={films}
              />
            </div>
          </div>
        </>
      )}
      <button
        onClick={() => setShowInput(!showInput)}
        className={`${className} group pb-8 pt-2 flex items-center justify-center min-h-[200px]`}
      >
        <div className="flex border flex-col items-center justify-center h-full w-full border-gray-600 hover:border-blue-600 rounded-xl">
          <div className="group-hover:text-blue-600">Add Story</div>
          <BsPlus className="text-2xl group-hover:text-blue-600" />
        </div>
      </button>
    </>
  );
}
