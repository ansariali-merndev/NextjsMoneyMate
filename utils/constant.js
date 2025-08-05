import { NextResponse } from "next/server";

export const handleRouteHandlerError = (error, msg) => {
  console.log(error.message, msg);
  return NextResponse.json({
    success: false,
    message: msg,
  });
};

export const handlePostFetch = async (uri, data) => {
  const res = await fetch(uri, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })

  return await res.json()
}