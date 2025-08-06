"use server";

import { connectDB } from "@/config/db";
import { categoryDB } from "@/model/CategoryModel";

export async function AddCategories(category, email) {
    await connectDB();
    let user = await categoryDB.findOne({userEmail: email});
    user.categories.push(category);
    await user.save();
}