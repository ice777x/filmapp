import React from "react";
import CategoryTab from "./CategoryTab";

export default function CategoryTabGroup({categories}: {categories: string[]}) {
  return (
    <div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-2.5">
        {categories.map((category: string, i: number) => (
          <CategoryTab key={i} category={category} />
        ))}
      </div>
    </div>
  );
}
