"use client";

import { MdPerson } from "react-icons/md";

export const FormName = ({ value, onChange }) => {
  return (
    <div className="flex items-center border rounded-md px-3 py-2 bg-gray-100">
      <MdPerson className="text-gray-600 mr-2" size={20} />
      <input
        type="text"
        name={"name"}
        placeholder={"Full Name"}
        required
        value={value}
        onChange={onChange}
        autoComplete="off"
        className="bg-transparent outline-none w-full text-sm text-gray-700"
      />
    </div>
  );
};
