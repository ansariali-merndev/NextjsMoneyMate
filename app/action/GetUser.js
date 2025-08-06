"use server";

import { connectDB } from "@/config/db";
import { categoryDB } from "@/model/CategoryModel";
import { userDB } from "@/model/UserModel";
import { cookies } from "next/headers";


export async function getUserCategories(email) {
    await connectDB();
    const docs =  await categoryDB.findOne({userEmail: email }, {categories : 1, _id: 0});
    
    const plainCategories = docs?.categories?.map((cat) => ({
    name: cat.name,
    emoji: cat.emoji,
    type: cat.type,
  })) || [];


    return {
        success: true,
        data: plainCategories,
    }
}

export async function getUserDetail() {
    await connectDB();
    const errorResponse = ({
        success: false,
    });

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if(!token) return errorResponse;

    const id = token.split(".")[1];
    if(!id) return errorResponse;

    const user = await userDB.findById(id);
    if(!user) return errorResponse;

    return ({
        success: true,
        data: {
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
        },
    });
}