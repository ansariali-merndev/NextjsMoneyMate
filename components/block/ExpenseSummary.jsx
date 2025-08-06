"use client";

import { useUserContext } from "@/context/UserContext";

export const ExpenseSummary = () => {
  const { expenseData } = useUserContext();

  return (
    <ul className="space-y-4">
      {expenseData.slice(0, 4).map((item, index) => (
        <li
          key={index}
          className="flex gap-2 items-center px-4 py-2 rounded-md"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <span className="text-xl">{item.emoji}</span>
          <div>
            <h2 className="text-gray-600 font-semibold text-xl">
              {item.amount}
            </h2>
            <p className="text-sm">{item.type}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
