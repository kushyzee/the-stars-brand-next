import { createClient } from "@/lib/supabase/server";
import type { GalleryImageWithCategory } from "@/lib/types";
import type { Category } from "@/lib/types";

export async function getPublishedImages(
  categorySlug?: string,
): Promise<GalleryImageWithCategory[]> {
  const supabase = await createClient();

  let query = supabase
    .from("gallery_images")
    .select(
      `
      *,
      categories (
        id,
        name,
        slug
      )
    `,
    )
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (categorySlug) {
    query = query.eq("categories.slug", categorySlug);
  }

  const { data, error } = await query;

  if (error) return [];

  // Filter out images where category didn't match
  if (categorySlug) {
    return data.filter((image) => image.categories !== null);
  }

  return data;
}

export async function getPublishedCategories(): Promise<Category[]> {
  const supabase = await createClient();

  // Only return categories that have at least one published image
  const { data, error } = await supabase
    .from("categories")
    .select(
      `
      id,
      name,
      slug,
      created_at,
      gallery_images!inner (
        id,
        is_published
      )
    `,
    )
    .eq("gallery_images.is_published", true)
    .order("name", { ascending: true });

  if (error) return [];

  return data.map(({ gallery_images: _, ...category }) => category);
}
