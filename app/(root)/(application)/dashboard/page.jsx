import { DashboardCard } from "@/components/block/DashboardCard";
import DashboardChart from "@/components/block/DashboardChart";
import { Title } from "@/components/block/Title";

export default function Dashboard() {
  return (
    <section>
      <Title title={"Dashboard Overview"} />
      <DashboardCard />
      <section className="grid grid-cols-1 md:grid-cols-2 my-12">
        <div>Expense Summary</div>
        <DashboardChart />
      </section>
    </section>
  );
}
