import { DashboardStats } from "@/features/admin/components/DashboardStats";
import { getDashboardStats } from "../data/dashboard.data";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1>Dashboard</h1>
      <DashboardStats stats={stats} />
    </div>
  );
}
