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
  object_position: "top" | "center" | "bottom";
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
    object_position: data.object_position,
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

// ----------------------------------------
// Delete image
// ----------------------------------------

export async function deleteImage(id: string): Promise<ActionResult> {
  const supabase = await createClient();

  const { data: image, error: fetchError } = await supabase
    .from("gallery_images")
    .select("storage_path")
    .eq("id", id)
    .single();

  if (fetchError || !image) {
    return { error: "Image not found" };
  }

  // Delete from DB first
  const { error: dbError } = await supabase
    .from("gallery_images")
    .delete()
    .eq("id", id);

  if (dbError) {
    return { error: "Failed to delete image. Please try again." };
  }

  // Then delete from storage
  await supabase.storage.from("gallery").remove([image.storage_path]);

  revalidatePath("/gallery");
  revalidatePath("/admin/dashboard");

  return { success: true };
}

// ----------------------------------------
// Toggle published
// ----------------------------------------

export async function togglePublished(
  id: string,
  currentValue: boolean,
): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("gallery_images")
    .update({ is_published: !currentValue })
    .eq("id", id);

  if (error) {
    return { error: "Failed to update image. Please try again." };
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/dashboard");

  return { success: true };
}

// ----------------------------------------
// Update image
// ----------------------------------------

export async function updateImage(
  id: string,
  data: {
    title: string;
    description?: string;
    categoryId?: string;
    object_position: "top" | "center" | "bottom";
  },
): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("gallery_images")
    .update({
      title: data.title,
      description: data.description ?? null,
      category_id: data.categoryId ?? null,
    })
    .eq("id", id);

  if (error) {
    return { error: "Failed to update image. Please try again." };
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/dashboard");

  return { success: true };
}

// ----------------------------------------
// Delete category
// ----------------------------------------

export async function deleteCategory(id: string): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    return { error: "Failed to delete category. Please try again." };
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/dashboard");

  return { success: true };
}

export async function updateCategory(
  id: string,
  data: { name: string },
): Promise<ActionResult> {
  const supabase = await createClient();

  const slug = data.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  const { error } = await supabase
    .from("categories")
    .update({ name: data.name.trim(), slug })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return { error: "A category with this name already exists" };
    }
    return { error: "Failed to update category. Please try again." };
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/dashboard");

  return { success: true };
}
