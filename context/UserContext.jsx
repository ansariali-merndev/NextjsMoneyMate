"use client";

import { getUserFinance } from "@/app/action/FinanceAction";
import { getUserCategories, getUserDetail } from "@/app/action/GetUser";
import { createContext, useContext, useEffect, useState } from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [totalIncome, setTotalIncome] = useState(40000);
  const [totalExpense, setTotalExpense] = useState(16000);
  const [user, setUser] = useState({ name: "", email: "", isVerified: "" });
  const [categories, setCategories] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const handleAuth = async () => {
      const res = await getUserDetail();
      // console.log(res);

      if (!res?.success) return;

      const userdata = {
        name: res.data.name,
        email: res.data.email,
        isVerified: res.data.isVerified,
      };

      // console.log(userdata);
      setUser(userdata);

      const resCategory = await getUserCategories(userdata.email);
      // console.log(resCategory);
      if (!resCategory?.success) return;

      setCategories(resCategory.data);
    };
    handleAuth();
  }, []);

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
