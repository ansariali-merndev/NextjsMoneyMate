import { connectDB } from "@/config/db";
import { sendMail } from "@/config/nodemailer";
import { userDB } from "@/model/UserModel";
import { handleRouteHandlerError } from "@/utils/constant";
import { generateOTP } from "@/utils/crypto";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  const { email } = await request.json();

  const errorResponse = NextResponse.json({
    success: false,
    message: "Cannot resend OTP. Please verify email or try again later.",
  });

  try {
    let user = await userDB.findOne({ email });

    if (!user) return errorResponse;
    if (user.isVerified) return errorResponse;

    const resendOtp = generateOTP();
    await sendMail(email, user.username, resendOtp);

    user.otp = resendOtp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully on your Email",
    });
  } catch (error) {
    handleRouteHandlerError(error, "Unable to Resend OTP");
  }
}
