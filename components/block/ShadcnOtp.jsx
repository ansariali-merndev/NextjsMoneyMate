"use client";

import { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";

export function InputOTPControlled({ handleCTA, handleResend, resend }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.length === 6) {
      handleCTA(e, value);
    } else {
      alert("Your OTP is wrong or OTP is less tha 6 digit");
    }
  };

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl py-12 px-20 max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Enter OTP
        </h2>

        <InputOTP maxLength={6} value={value} onChange={(val) => setValue(val)}>
          <InputOTPGroup className="flex justify-center gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <div className="text-center text-sm text-gray-500">
          Please enter the one-time password (OTP) sent to your registered email
          address.
        </div>

        <div>
          <Button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Submit OTP
          </Button>
          <p
            onClick={handleResend}
            className="text-end text-sm pr-2 cursor-pointer text-zinc-600"
          >
            {resend ? "Sending" : "Resend"}
          </p>
        </div>
      </form>
    </div>
  );
}
