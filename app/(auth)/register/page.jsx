"use client";

import { InputOTPControlled } from "@/components/block/ShadcnOtp";
import { AlertShadcn } from "@/components/reusable/AlertBox";
import { Submit } from "@/components/reusable/FormBTN";
import { FormEmail } from "@/components/reusable/FormEmail";
import { FormHeading } from "@/components/reusable/FormHeading";
import { FormName } from "@/components/reusable/FormName";
import { FormPassword } from "@/components/reusable/FormPassword";
import { handlePostFetch } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(12, { message: "Name must not exceed 12 characters" }),

  email: z.email({ message: "Please enter a valid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(15, { message: "Password must not exceed 15 characters" })
    .regex(passwordRegex, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),
});

export default function Register() {
  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [otpModel, setOtpModel] = useState(false);
  const [email, setEmail] = useState("");
  const [resend, setResend] = useState(false);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  // OnChange handler
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  // Register Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail(formdata.email);
    const { success, data, error } = registerSchema.safeParse(formdata);

    if (!success) {
      setOpen(true);
      setMessage(error.issues[0].message);
    }

    setIsPending(true);
    const res = await handlePostFetch("/api/register", data);
    setIsPending(false);

    if (res.success) {
      setOtpModel(true);
    } else {
      setOpen(true);
      setMessage(res.message);
    }
  };

  // Otp Submit form
  const handleOtpSubmit = async (e, value) => {
    e.preventDefault();
    const res = await handlePostFetch("/api/verify_otp", {
      email: formdata.email,
      otp: value,
    });
    if (!res?.success) {
      return alert(res?.message || "Your Otp is wrong or expire");
    }
    router.push("/");
  };

  // Resend Otp
  const handleResendOtp = async () => {
    setResend(true);
    const res = await handlePostFetch("/api/resend_otp", { email });
    setResend(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border border-rose-400 px-8 py-18 rounded-md"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        {/* form heading */}
        <FormHeading isLogin={false} />

        {/* form content */}
        <FormName value={formdata.name} onChange={handleOnchange} />
        <FormEmail value={formdata.email} onChange={handleOnchange} />
        <FormPassword value={formdata.password} onChange={handleOnchange} />

        {/* form footer */}
        <Submit isLogin={false} isPending={isPending} />
      </form>

      <AlertShadcn open={open} onOpen={setOpen} message={message} />
      {otpModel && (
        <InputOTPControlled
          handleCTA={handleOtpSubmit}
          handleResend={handleResendOtp}
          resend={resend}
        />
      )}
    </>
  );
}
