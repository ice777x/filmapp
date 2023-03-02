import clsx from "clsx";
import React from "react";

export default function FilmCardSkeleton({className}: {className?: string}) {
  return (
    <div className={`bg-gray-600 aspect-[2/3] rounded-xl ${className}`}></div>
  );
}
