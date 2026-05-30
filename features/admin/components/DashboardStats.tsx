import { type DashboardStats } from "@/app/admin/data/dashboard.data";

type Props = {
  stats: DashboardStats;
};

const statCards = (stats: DashboardStats) => [
  { label: "Total Images", value: stats.totalImages },
  { label: "Published", value: stats.publishedImages },
  { label: "Unpublished", value: stats.unpublishedImages },
  { label: "Categories", value: stats.totalCategories },
];

export function DashboardStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {statCards(stats).map((card) => (
        <div
          key={card.label}
          className="bg-card border border-border px-5 py-4 flex flex-col gap-1"
        >
          <p className="font-montserrat text-2xl font-bold text-foreground-black leading-none">
            {card.value}
          </p>
          <p className="font-montserrat text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
            {card.label}
          </p>
        </div>
      ))}
    </div>
  );
}
