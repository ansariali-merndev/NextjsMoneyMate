import { connectDB } from "@/config/db";
import { financeDB } from "@/model/FinanceModel";
import { handleRouteHandlerError } from "@/utils/constant";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectDB();
    const {email} = await request.json();
    try {
        const data = await financeDB.findOne({userEmail: email});
        return NextResponse.json({
            success: true,
            data,
        })
    } catch (error) {
        handleRouteHandlerError(error, "Unable to get finance");
    }
}