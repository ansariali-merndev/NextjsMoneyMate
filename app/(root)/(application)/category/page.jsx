"use client";

import { CategoryCard } from "@/components/block/CategoryCard";
import { CategoryModel } from "@/components/block/CategoryModel";
import { Title } from "@/components/block/Title";
import { useUserContext } from "@/context/UserContext";

export default function Category() {
  const { categories } = useUserContext();

  return (
    <section>
      <div className="flex justify-between items-center">
        <Title title={"Manage Categories"} />
        <CategoryModel />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((item, index) => (
          <CategoryCard item={item} key={index} />
        ))}
      </div>
    </section>
  );
}
