import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between px-6 py-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 px-6 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-4">
            <Skeleton className="mb-2 h-3 w-20" />
            <Skeleton className="h-8 w-12" />
          </div>
        ))}
      </div>

      {/* Image list */}
      <div className="mt-8 px-6 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-border pb-4"
          >
            <Skeleton className="h-20 w-20 rounded shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
