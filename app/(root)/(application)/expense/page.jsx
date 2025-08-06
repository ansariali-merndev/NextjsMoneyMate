"use client";

import { Title } from "@/components/block/Title";
import { AddFinance } from "@/components/reusable/AddFinance";
import { Card } from "@/components/reusable/Card";
import Chart from "@/components/reusable/Chart";
import { useUserContext } from "@/context/UserContext";

export default function Expense() {
  const { expenseData } = useUserContext();

  return (
    <section>
      <div className="flex justify-between items-center">
        <Title title={"Expense Dashboard"} />
        <AddFinance income={false} />
      </div>
      <Chart data={expenseData} />
      <Card income={false} />
    </section>
  );
}
