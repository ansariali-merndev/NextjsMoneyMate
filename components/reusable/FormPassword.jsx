"use client";

import { useState } from "react";
import { MdLock } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const FormPassword = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center border rounded-md px-3 py-2 bg-gray-100">
      <MdLock className="text-gray-600 mr-2" size={20} />
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="min (8 character)"
        required
        value={value}
        onChange={onChange}
        autoComplete="off"
        className="bg-transparent outline-none w-full text-sm text-gray-700"
      />
      <div
        className="cursor-pointer text-gray-600 ml-2"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
      </div>
    </div>
  );
};
