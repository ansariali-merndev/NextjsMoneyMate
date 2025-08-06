"use client";

import { useUserContext } from "@/context/UserContext";

export const Card = ({ income }) => {
  const { expenseData, incomeData } = useUserContext();

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-8 my-12">
      {(income ? incomeData : expenseData)?.map((item, index) => (
        <li
          key={index}
          className="border border-rose-300 rounded-xl p-4 flex items-center gap-4 relative"
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
        >
          <span className="text-3xl">{item.emoji}</span>
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-green-600">
              ₹ {item.amount}
            </p>
            <p className="text-sm text-gray-600 capitalize">{item.type}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
