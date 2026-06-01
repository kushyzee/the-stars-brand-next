import { createClient } from "@/lib/supabase/server";
import type { GalleryImageWithCategory } from "@/lib/types";

export async function getAdminImages(): Promise<GalleryImageWithCategory[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
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
    .order("created_at", { ascending: false });

  if (error) return [];

  return data;
}

export async function getImageById(
  id: string,
): Promise<GalleryImageWithCategory | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
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
    .eq("id", id)
    .single();

  if (error) return null;

  return data;
}
