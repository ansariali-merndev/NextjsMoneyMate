"use client";

import { CategoryCard } from "@/components/block/CategoryCard";
import { CategoryModel } from "@/components/block/CategoryModel";
import { Title } from "@/components/block/Title";
import { CategoryShimmer } from "@/components/shimmer/CategoryCardShimmer";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";

export default function Category() {
  const { categories, isLoaded } = useUserContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(categories);
  }, [categories]);

  return (
    <section>
      <div className="flex justify-between items-center">
        <Title title={"Manage Categories"} />
        <CategoryModel />
      </div>
      {isLoaded ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <CategoryCard item={item} key={index} />
          ))}
        </div>
      ) : (
        <CategoryShimmer />
      )}
    </section>
  );
}
