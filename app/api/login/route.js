import { connectDB } from "@/config/db";
import { userDB } from "@/model/UserModel";
import { comparePassword } from "@/utils/bcrypt";
import { handleRouteHandlerError } from "@/utils/constant";
import { generateToken } from "@/utils/crypto";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  const { email, password } = await request.json();

  const errorResponse = NextResponse.json({
    success: false,
    message: "Invalid Credentials, Please try again.",
  });

  try {
    let user = await userDB.findOne({ email });
    if (!user) return errorResponse;

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) return errorResponse;

    const token = generateToken(user._id, user.username, user.email);

    const response = NextResponse.json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    handleRouteHandlerError(error, "Unable to login");
  }
}
