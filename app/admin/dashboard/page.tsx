import { DashboardStats } from "@/features/admin/components/DashboardStats";
import { getDashboardStats } from "../data/dashboard.data";
import { getAdminImages } from "@/features/admin/data/images.data";
import { ImageTable } from "@/features/admin/components/ImageTable";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Eye, UploadCloud } from "lucide-react";

export default async function DashboardPage() {
  const [stats, images] = await Promise.all([
    getDashboardStats(),
    getAdminImages(),
  ]);

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-8 lg:px-8 lg:py-12 flex flex-col gap-6 sm:gap-8">
      <div>
        <h1 className="font-montserrat text-2xl font-bold text-foreground-black">
          Dashboard
        </h1>
        <div className="flex gap-2 w-full">
          <Link
            href="/admin/dashboard/upload"
            className={cn(buttonVariants(), "px-5 flex-1")}
          >
            <UploadCloud /> Upload image
          </Link>
          <Link
            href="/gallery"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "px-5 flex-1",
            )}
          >
            <Eye /> Gallery
          </Link>
        </div>
      </div>

      <DashboardStats stats={stats} />
      <ImageTable images={images} />
    </div>
  );
}
