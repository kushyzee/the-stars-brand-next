import { createClient } from "@/lib/supabase/server";

export type DashboardStats = {
  totalImages: number;
  publishedImages: number;
  unpublishedImages: number;
  totalCategories: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();

  const [
    { count: totalImages },
    { count: publishedImages },
    { count: unpublishedImages },
    { count: totalCategories },
  ] = await Promise.all([
    supabase.from("gallery_images").select("*", { count: "exact", head: true }),
    supabase
      .from("gallery_images")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true),
    supabase
      .from("gallery_images")
      .select("*", { count: "exact", head: true })
      .eq("is_published", false),
    supabase.from("categories").select("*", { count: "exact", head: true }),
  ]);

  return {
    totalImages: totalImages ?? 0,
    publishedImages: publishedImages ?? 0,
    unpublishedImages: unpublishedImages ?? 0,
    totalCategories: totalCategories ?? 0,
  };
}
