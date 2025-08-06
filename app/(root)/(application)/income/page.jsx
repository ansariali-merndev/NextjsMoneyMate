"use client";

import { Title } from "@/components/block/Title";
import { AddFinance } from "@/components/reusable/AddFinance";
import { Card } from "@/components/reusable/Card";
import Chart from "@/components/reusable/Chart";
import { useUserContext } from "@/context/UserContext";

export default function Income() {
  const { incomeData } = useUserContext();

  return (
    <section>
      <div className="flex justify-between items-center">
        <Title title={"Income Dashboard"} />
        <AddFinance income={true} />
      </div>
      <Chart data={incomeData} />
      <Card income={true} />
    </section>
  );
}
