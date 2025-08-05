"use client";

import { Submit } from "@/components/reusable/FormBTN";
import { FormEmail } from "@/components/reusable/FormEmail";
import { FormHeading } from "@/components/reusable/FormHeading";
import { FormPassword } from "@/components/reusable/FormPassword";
import { handlePostFetch } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Login() {
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  // OnChange Handler
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  // Form Submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsPending(true);
    const res = await handlePostFetch("/api/login", formdata);
    setIsPending(false);

    if (!res?.success) {
      return Swal.fire({
        icon: "error",
        title: "Oops! Something went wrong",
        text: res?.message || "Check your Credential or Internal Server Error",
      });
    }

    router.push("/");
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="space-y-4 border border-rose-400 px-8 py-18 rounded-md"
      style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    >
      {/* form heading */}
      <FormHeading isLogin={true} />

      {/* form content */}
      <FormEmail value={formdata.email} onChange={handleOnChange} />
      <FormPassword value={formdata.password} onChange={handleOnChange} />

      {/* form footer */}
      <Submit isLogin={true} isPending={isPending} />
    </form>
  );
}
