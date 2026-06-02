"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type AuthResult = {
  error: string;
};

export async function login(data: {
  email: string;
  password: string;
}): Promise<AuthResult | null> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    if (error.message.includes("Invalid email or password")) {
      return { error: "Invalid email or password" };
    }
    return { error: "An error occurred. Please try again later." };
  }

  revalidatePath("/", "layout");
  redirect("/admin/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/admin/login");
}
