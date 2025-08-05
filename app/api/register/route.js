import { connectDB } from "@/config/db";
import { sendMail } from "@/config/nodemailer";
import { userDB } from "@/model/UserModel";
import { hashedPassword } from "@/utils/bcrypt";
import { handleRouteHandlerError } from "@/utils/constant";
import { generateOTP } from "@/utils/crypto";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  const { name, email, password } = await request.json();
  
  const errorResponse = NextResponse.json({
    success: false,
    message: "This user is already registered. Please login to continue",
  });
  try {
    const existingUser = await userDB.findOne({ email });

    if (existingUser) return errorResponse;

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    const hashing = await hashedPassword(password);

    await sendMail(email, name, otp);

    let user = new userDB({
      name,
      email,
      password: hashing,
      otp,
      otpExpires,
    });
    await user.save();

    return NextResponse.json({
      success: true,
      message: "User Register Successfully",
    });
  } catch (error) {
    handleRouteHandlerError(error, "Unable to user Register");
  }
}
