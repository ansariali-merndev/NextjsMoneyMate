"use server";

import { categoryDB } from "@/model/CategoryModel";

export async function SaveDefaultCategory(id, email) {
     const defaultCategory = [
    { name: "Salary", emoji: "💰", type: "income" },
    { name: "Bonus", emoji: "🎁", type: "income" },
    { name: "Utility", emoji: "💡", type: "expense" },
    { name: "Groceries", emoji: "🛒", type: "expense" },
    { name: "Cashback", emoji: "💵", type: "income" },
  ];

  const docs  = await new categoryDB({
    userId: id,
    userEmail: email,
    categories : defaultCategory,
  })

  await docs.save();
}