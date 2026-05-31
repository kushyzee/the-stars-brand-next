"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ActionResult = {
  error?: string;
  success?: boolean;
};

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

// ----------------------------------------
// Upload image
// ----------------------------------------

export async function uploadImage(data: {
  file: File;
  title: string;
  description?: string;
  categoryId?: string;
}): Promise<ActionResult> {
  const supabase = await createClient();

  // Validate file size server-side
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  if (data.file.size > MAX_SIZE) {
    return { error: "Image must be 5MB or less" };
  }

  // Upload to Supabase Storage
  const fileExt = data.file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const storagePath = `gallery/${fileName}`;

  const { error: storageError } = await supabase.storage
    .from("gallery")
    .upload(storagePath, data.file, {
      contentType: data.file.type,
      upsert: false,
    });

  if (storageError) {
    return { error: "Failed to upload image. Please try again." };
  }

  // Save metadata to DB
  const { error: dbError } = await supabase.from("gallery_images").insert({
    title: data.title,
    description: data.description ?? null,
    category_id: data.categoryId ?? null,
    storage_path: storagePath,
  });

  if (dbError) {
    // Storage upload succeeded but DB failed, clean up the orphaned file
    await supabase.storage.from("gallery").remove([storagePath]);
    return { error: "Failed to save image details. Please try again." };
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/dashboard");

  return { success: true };
}

// ----------------------------------------
// Create category
// ----------------------------------------

export async function createCategory(data: {
  name: string;
}): Promise<
  ActionResult & { category?: { id: string; name: string; slug: string } }
> {
  const supabase = await createClient();

  const slug = generateSlug(data.name);

  const { data: category, error } = await supabase
    .from("categories")
    .insert({ name: data.name.trim(), slug })
    .select("id, name, slug")
    .single();

  if (error) {
    if (error.code === "23505") {
      return { error: "A category with this name already exists" };
    }
    return { error: "Failed to create category. Please try again." };
  }

  revalidatePath("/admin/dashboard");

  return { success: true, category };
}
