"use client";

import { useEffect, useRef, useState } from "react";
import { Aside } from "./Aside";
import { FiMenu } from "react-icons/fi";

export const MobileAside = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        <FiMenu size={28} />
      </span>
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-black z-20 transform transition-opacity duration-150 ${
          open ? "opacity-30" : "opacity-0 hidden"
        }`}
      ></div>
      <aside
        onClick={() => setOpen(false)}
        className={`absolute left-0 bottom-0 h-full bg-zinc-300 z-30 w-64 flex flex-col items-center justify-center transform transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Aside />
      </aside>
    </div>
  );
};
