"use client";

import { getUserCategories, getUserDetail } from "@/app/action/GetUser";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { email } from "zod";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [totalIncome, setTotalIncome] = useState(40000);
  const [totalExpense, setTotalExpense] = useState(16000);
  const [user, setUser] = useState({ name: "", email: "", isVerified: "" });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const handleAuth = async () => {
      const res = await getUserDetail();
      if (!res?.success) router.push("/login");

      setUser({
        name: res.data.name,
        email: res.data.email,
        isVerified: res.data.isVerified,
      });
    };
    handleAuth();
  }, []);

  useEffect(() => {
    const handleGet = async () => {
      const res = await getUserCategories(user.email);
      if (res.success) setCategories(res.data);
    };
    if (user.email) handleGet();
  }, [user.email]);

  const value = {
    totalIncome,
    totalExpense,
    categories,
    setCategories,
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
