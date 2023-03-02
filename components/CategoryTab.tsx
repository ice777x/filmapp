import Link from "next/link";
import React from "react";

export default function CategoryTab({category}: {category: string}) {
  return (
    <Link
      href={`/${category}`}
      className="px-3 py-2 bg-indigo-900 text-gray-300 rounded-xl shadow-md hover:-translate-y-1 transform-gpu transition-transform hover:scale-105 duration-20 ease-in shadow-black/40"
    >
      {category}
    </Link>
  );
}
