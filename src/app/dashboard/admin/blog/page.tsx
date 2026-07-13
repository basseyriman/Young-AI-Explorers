import Link from "next/link";
import { ArrowLeft, BookOpen, Trash2, Plus, AlertCircle, FileText, CheckCircle2 } from "lucide-react";
import { requireRole } from "@/lib/auth/dashboard-access";
import { getBlogPosts } from "../actions";
import { AdminBlogClient } from "./AdminBlogClient";

export default async function AdminBlogPage() {
  // Ensure only authenticated admins can access this page
  const { user } = await requireRole(["admin"]);
  const initialPosts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-brand-gradient dark:bg-brand-gradient-dark text-brand-purple dark:text-brand-cream">
      {/* Admin Nav */}
      <header className="border-b border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface/90 dark:bg-brand-purple-dark/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-6 max-w-5xl">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/admin" className="p-2 rounded-full hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold tracking-tight">Admin Blog CMS</h1>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-brand-gold uppercase tracking-wider">
            Publisher Panel
          </span>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <AdminBlogClient initialPosts={initialPosts} />
      </main>
    </div>
  );
}
