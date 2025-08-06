"use client";

import { getUserCategories, getUserDetail } from "@/app/action/GetUser";
import { handlePostFetch } from "@/utils/constant";
import { createContext, useContext, useEffect, useState } from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
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

  useEffect(() => {
    const func = async () => {
      const res = await handlePostFetch("/api/get_finance", {
        email: user.email,
      });

      if (res.success) {
        setIncomeData(res?.data?.incomeData);
        setExpenseData(res?.data?.expenseData);
      }
    };

    if (user.email) {
      func();
    }
  }, [user.email]);

  useEffect(() => {
    if (expenseData.length > 0) {
      const total = expenseData.reduce((acc, curr) => {
        return acc + Number(curr.amount);
      }, 0);
      setTotalExpense(total);
    }
  }, [expenseData]);

  useEffect(() => {
    if (incomeData.length > 0) {
      const total = incomeData.reduce((acc, curr) => {
        return acc + Number(curr.amount);
      }, 0);
      setTotalIncome(total);
    }
  }, [incomeData]);

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
