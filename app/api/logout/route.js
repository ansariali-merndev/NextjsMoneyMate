import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");

    return NextResponse.redirect(new URL("/login", request.url))
}