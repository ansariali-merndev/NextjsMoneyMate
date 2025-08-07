"use client";

import { useUserContext } from "@/context/UserContext";
import { FaMoneyBillWave, FaMoneyCheckAlt, FaPiggyBank } from "react-icons/fa";
import { DashboardShimmerCard } from "../shimmer/DashboardShimmerCard";

export const DashboardCard = () => {
  const { totalIncome, totalExpense, isLoaded } = useUserContext();

  if (!isLoaded) {
    return <DashboardShimmerCard />;
  }

  const util = [
    { label: "Total Income", value: totalIncome, icon: <FaMoneyBillWave /> },
    { label: "Total Expense", value: totalExpense, icon: <FaMoneyCheckAlt /> },
    {
      label: "Total Saving",
      value: totalIncome - totalExpense,
      icon: <FaPiggyBank />,
    },
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {util.map((item, index) => (
        <Card item={item} key={index} />
      ))}
    </section>
  );
};

const Card = ({ item }) => {
  return (
    <div
      className="flex items-center gap-4 p-6 rounded-xl border border-rose-300 text-gray-700 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
      style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 4px 10px" }}
    >
      <div className="text-2xl md:text-3xl text-rose-400">{item.icon}</div>

      <div className="flex flex-col">
        <h2 className="text-md md:text-lg font-semibold text-gray-600">
          {item.label}
        </h2>
        <p className="text-sm md:text-xl font-bold text-gray-900">
          {item.value}
        </p>
      </div>
    </div>
  );
};
