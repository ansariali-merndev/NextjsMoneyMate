import { NextResponse } from "next/server";

export const handleRouteHandlerError = (error, msg) => {
  console.log(error.message, msg);
  return NextResponse.json({
    success: false,
    message: msg,
  });
};
