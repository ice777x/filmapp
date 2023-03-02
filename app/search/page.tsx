import React from "react";
import Input from "../../components/Input";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Search | Ox",
  description: "Welcome to Next.js",
};

async function getFilms() {
  const resp = await fetch("http://filmapp-five.vercel.app/api/films", {
    cache: "no-store",
  });
  const data = await resp.json();
  return data.data;
}

export default async function Page() {
  const films = await getFilms();
  return (
    <div className="container mx-auto py-12 ">
      <Input films={films} />
    </div>
  );
}
