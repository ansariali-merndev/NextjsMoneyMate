import { SaveDefaultCategory } from "@/app/action/DefaultCategoryAction";
import { connectDB } from "@/config/db";
import { userDB } from "@/model/UserModel";
import { handleRouteHandlerError } from "@/utils/constant";
import { generateToken } from "@/utils/crypto";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  const { email, otp } = await request.json();

  const errorResponse = NextResponse.json({
    success: false,
    message: "Unable to verify. Please ensure email and OTP are correct.",
  });

  try {
    let user = await userDB.findOne({ email });

    if (!user) return errorResponse;
    if (user.isVerified) return errorResponse;
    if (user.otp !== otp || user.otpExpires < new Date()) return errorResponse;

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();
    await SaveDefaultCategory(user._id, user.email)

    const token = generateToken(user._id, user.username, user.email);

    const response = NextResponse.json({
      success: true,
      message: "Email Verified Successfully",
      data: {
        email: user.email,
        isVerified : user.isVerified,
        name: user.name,
      }
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    handleRouteHandlerError(error, "Failed to verify OTP");
  }
}
