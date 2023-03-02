import React from "react";

async function getCast(id: string) {
  const res = await fetch(`http://localhost:3000/api/cast?id=${id}`);
  const cast = await res.json();
  return cast;
}

export default async function Page({params: {id}}: {params: {id: string}}) {
  const cast = await getCast(id);
  console.log(id);
  console.log(cast);
  return <div>page</div>;
}
