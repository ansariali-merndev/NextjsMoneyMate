"use client";

import Image from "next/image";
import profile from "../../assets/profile.webp";
import { useUserContext } from "@/context/UserContext";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";

export const Logout = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUserContext();
  const dropdownRef = useRef(null); // ref to track dropdown

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleCTA = async () => {
    window.location.href = "/api/logout";
  };

  return (
    <div className="w-8 h-8 relative" ref={dropdownRef}>
      <Image
        onClick={() => setOpen(true)}
        src={profile}
        alt="Profile Images"
        style={{ height: "auto", width: "auto" }}
        priority={true}
      />
      {open && (
        <div className="absolute right-0 rounded-md bg-rose-200 px-6 py-2">
          <h2>{user.email}</h2>
          <Button onClick={handleCTA} variant={"outline"} className={"mt-2"}>
            logout
          </Button>
        </div>
      )}
    </div>
  );
};
