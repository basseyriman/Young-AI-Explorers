"use server";

import { requireRole } from "@/lib/auth/dashboard-access";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export async function createBlogPost(data: {
  title: string;
  category: "Education" | "Parenting" | "Safety" | "Projects";
  summary: string;
  content: string;
  readTime: string;
  authorName?: string;
}) {
  try {
    // 1. Enforce Admin Access
    await requireRole(["admin"]);
    const supabase = await createClient();

    const slug = `${slugify(data.title)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const { data: inserted, error } = await supabase
      .from("blog_posts")
      .insert({
        title: data.title,
        slug,
        category: data.category,
        summary: data.summary,
        content: data.content,
        read_time: data.readTime,
        author_name: data.authorName || "Bassey Riman",
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/blog");
    return { success: true, post: inserted };
  } catch (e: any) {
    return { success: false, error: e.message || "Failed to authenticate" };
  }
}

export async function deleteBlogPost(id: string) {
  try {
    // 1. Enforce Admin Access
    await requireRole(["admin"]);
    const supabase = await createClient();

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/blog");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message || "Failed to authenticate" };
  }
}

export async function getBlogPosts() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) {
      return [];
    }
    return data || [];
  } catch {
    return [];
  }
}
