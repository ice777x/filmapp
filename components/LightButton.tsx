"use client";
import React, {useState} from "react";
import {BsSun, BsMoon} from "react-icons/bs";
export default function LightButton() {
  const [light, setLight] = useState(false);
  return (
    <>
      {light && (
        <div className="top-0 left-0 bottom-0 fixed bg-black opacity-50 z-10  min-h-full h-full w-full"></div>
      )}
      <button
        onClick={() => setLight(!light)}
        className="flex gap-x-2 items-center justify-center px-4 py-2 rounded-lg sticky z-30 bg-indigo-800/50 hover:bg-indigo-800 active:outline active:outline-blue-900"
      >
        {light ? <BsSun className="text-lg" /> : <BsMoon className="text-lg" />}
        <span className="text-sm lg:text-lg font-semibold">
          {light ? "Işıkları Aç" : "Işıkları Kapat"}
        </span>
      </button>
    </>
  );
}
