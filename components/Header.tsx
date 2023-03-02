import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logout from "./Logout";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import User from "./User";

export default function Header() {
  return (
    <div className="z-[400]">
      <div className="flex py-4 px-4 text-gray-500 space-x-4 justify-between md:justify-start items-center font-medium border-b border-gray-700">
        <div className="home">
          <Link
            href="/"
            className="hover:text-white flex gap-x-2 items-center group"
          >
            <Image
              src="/ice.png"
              width={50}
              height={50}
              alt="logo"
              className="object-contain transform group-hover:scale-110 transition-transform duration-150 ease-linear"
            />
            ICE
          </Link>
        </div>
        <div className="block md:hidden">
          <Menu />
        </div>
        <div className="flex justify-between w-full">
          <div className="space-x-4 items-center hidden md:flex">
            <Link href="/son-eklenen" className="hover:text-white">
              Son Eklenen
            </Link>
            <Link href="/search" className="hover:text-white">
              Search
            </Link>
          </div>
          <SearchBar />
          <div className="hidden md:flex ml-4 space-x-4 items-center">
            <User />
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
}
