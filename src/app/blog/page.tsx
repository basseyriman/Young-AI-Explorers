import { getBlogPosts } from "@/app/dashboard/admin/actions";
import { BlogClient } from "./BlogClient";

export const revalidate = 60; // Revalidate page data every 60 seconds (ISR)

export default async function BlogPage() {
  const dbPosts = await getBlogPosts();
  return <BlogClient dbPosts={dbPosts} />;
}
