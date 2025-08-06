"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [totalIncome, setTotalIncome] = useState(40000);
  const [totalExpense, setTotalExpense] = useState(16000);

  const value = {
    totalIncome,
    totalExpense,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
