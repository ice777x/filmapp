import React from "react";
import LightButton from "../../../components/LightButton";
import Video from "../../../components/Video";
import {notFound} from "next/navigation";
import type {Metadata} from "next";

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const product = await getFilm(params.id);
  return {title: product.title + " | Ox"};
}

async function getFilm(id: number) {
  const films = await fetch(`http://filmapp-five.vercel.app/api/films/${id}`, {
    cache: "no-store",
  });
  const data = await films.json();
  if (data.error) return;
  return data.data;
}
export default async function Page({params}: {params: {id: string}}) {
  const {id} = params;
  if (!id) return <div>Film Arşivde bulunamadı.</div>;
  const film = await getFilm(Number(id));
  if (!film) return notFound();
  return (
    <div className="md:container mx-auto py-12 px-4 h-full">
      {film ? (
        <Video film={film}>
          <LightButton />
        </Video>
      ) : (
        <div className="text-4xl">Film Arşivde bulunamadı.</div>
      )}
    </div>
  );
}
