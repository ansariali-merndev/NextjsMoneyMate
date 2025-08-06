import { DashboardCard } from "@/components/block/DashboardCard";
import DashboardChart from "@/components/block/DashboardChart";
import { ExpenseSummary } from "@/components/block/ExpenseSummary";
import { Title } from "@/components/block/Title";

export default function Dashboard() {
  return (
    <section>
      <Title title={"Dashboard Overview"} />
      <DashboardCard />
      <section className="grid grid-cols-1 md:grid-cols-2 my-12 gap-6">
        <div>
          <Title title={"Expense Summary"} />
          <ExpenseSummary />
        </div>
        <DashboardChart />
      </section>
    </section>
  );
}
