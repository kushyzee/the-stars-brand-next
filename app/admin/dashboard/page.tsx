import { DashboardStats } from "@/features/admin/components/DashboardStats";
import { getDashboardStats } from "../data/dashboard.data";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-8 lg:px-8 lg:py-12 flex flex-col gap-6 sm:gap-8">
      <h1 className="font-montserrat text-2xl font-bold text-foreground-black">
        Dashboard
      </h1>
      <DashboardStats stats={stats} />
    </div>
  );
}
