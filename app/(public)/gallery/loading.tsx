import { Skeleton } from "@/components/ui/skeleton";

export default function GalleryLoading() {
  return (
    <div>
      {/* Page header skeleton */}
      <Skeleton className="h-64 w-full md:h-80" />

      {/* Category filter skeleton */}
      <div className="flex gap-2 overflow-hidden px-6 py-6 md:px-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 shrink-0 rounded-full" />
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="mb-20 grid grid-cols-1 gap-2 px-6 sm:grid-cols-2 md:grid-cols-3 md:px-10">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton key={i} className="h-80 w-full" />
        ))}
      </div>
    </div>
  );
}
