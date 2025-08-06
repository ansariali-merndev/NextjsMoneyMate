"use client";

import { getUserFinance } from "@/app/action/FinanceAction";
import { getUserCategories, getUserDetail } from "@/app/action/GetUser";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [totalIncome, setTotalIncome] = useState(40000);
  const [totalExpense, setTotalExpense] = useState(16000);
  const [user, setUser] = useState({ name: "", email: "", isVerified: "" });
  const [categories, setCategories] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const handleGet = async () => {
    const res = await getUserCategories(user.email);
    if (res.success) setCategories(res.data);
  };

  const handleFinance = async () => {
    const res = await getUserFinance(user.email);
    if (!res?.success) return;

    setExpenseData(res.expenseData);
    setIncomeData(res.incomeData);
  };

  useEffect(() => {
    const handleAuth = async () => {
      const res = await getUserDetail();
      if (!res?.success) {
        router.push("/login");
        return;
      }

      setUser({
        name: res.data.name,
        email: res.data.email,
        isVerified: res.data.isVerified,
      });
    };
    handleAuth();
  }, []);

  useEffect(() => {
    if (user?.email) {
      handleGet();
      handleFinance();
    }
  }, [user?.email]);

  const value = {
    totalIncome,
    totalExpense,
    categories,
    setCategories,
    user,
    setUser,
    incomeData,
    setIncomeData,
    expenseData,
    setExpenseData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
