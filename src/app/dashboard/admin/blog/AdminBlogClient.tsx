"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, BookOpen, AlertCircle, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { createBlogPost, deleteBlogPost } from "../actions";

interface Post {
  id: string;
  title: string;
  category: "Education" | "Parenting" | "Safety" | "Projects";
  summary: string;
  content: string;
  read_time: string;
  author_name: string;
  published_at: string;
}

interface Props {
  initialPosts: any[];
}

export function AdminBlogClient({ initialPosts }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<"write" | "manage">("write");

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"Education" | "Parenting" | "Safety" | "Projects">("Education");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [readTime, setReadTime] = useState("5 min read");
  const [authorName, setAuthorName] = useState("Bassey Riman");
  const [imageUrl, setImageUrl] = useState("");

  // Status feedback
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !summary || !content) {
      setError("Please fill out all fields (Title, Summary, and Content) before publishing.");
      return;
    }

    startTransition(async () => {
      const res = await createBlogPost({
        title,
        category,
        summary,
        content,
        readTime,
        authorName,
        imageUrl,
      });

      if (res.success && res.post) {
        setSuccess(`Successfully published "${title}"!`);
        setPosts([res.post, ...posts]);
        
        // Reset form
        setTitle("");
        setSummary("");
        setContent("");
        setReadTime("5 min read");
        setAuthorName("Bassey Riman");
        setImageUrl("");
        
        // Switch to manage list
        setTimeout(() => setActiveTab("manage"), 1500);
      } else {
        setError(res.error || "Failed to publish article. Check database connections.");
      }
    });
  };

  const handleDelete = async (id: string, postTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${postTitle}"?`)) return;

    setError("");
    setSuccess("");

    startTransition(async () => {
      const res = await deleteBlogPost(id);
      if (res.success) {
        setPosts(posts.filter((p) => p.id !== id));
        setSuccess(`Deleted article "${postTitle}"`);
      } else {
        setError(res.error || "Failed to delete article.");
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-brand-purple/10 dark:border-brand-gold/10 pb-px">
        <button
          onClick={() => { setError(""); setSuccess(""); setActiveTab("write"); }}
          className={`pb-4 px-4 text-sm font-semibold tracking-wide border-b-2 transition-all ${
            activeTab === "write"
              ? "border-brand-purple dark:border-brand-gold text-brand-purple dark:text-brand-gold"
              : "border-transparent text-brand-purple/50 dark:text-brand-cream/50 hover:text-brand-purple dark:hover:text-brand-cream"
          }`}
        >
          ✍️ Write New Article
        </button>
        <button
          onClick={() => { setError(""); setSuccess(""); setActiveTab("manage"); }}
          className={`pb-4 px-4 text-sm font-semibold tracking-wide border-b-2 transition-all ${
            activeTab === "manage"
              ? "border-brand-purple dark:border-brand-gold text-brand-purple dark:text-brand-gold"
              : "border-transparent text-brand-purple/50 dark:text-brand-cream/50 hover:text-brand-purple dark:hover:text-brand-cream"
          }`}
        >
          📋 Manage Live Articles ({posts.length})
        </button>
      </div>

      {/* Feedback Alerts */}
      {error && (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 flex items-center gap-3 text-sm animate-in fade-in duration-200">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 flex items-center gap-3 text-sm animate-in fade-in duration-200">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Tab: Write */}
      {activeTab === "write" && (
        <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl border border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface dark:bg-brand-purple-dark/40 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-brand-purple/50 dark:text-brand-cream/50">Article Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 5 Fun AI Projects for Kids"
                className="w-full px-4 py-3 rounded-xl border border-brand-purple/10 dark:border-brand-gold/15 bg-brand-warm/20 dark:bg-brand-purple-dark/50 text-sm focus:outline-none focus:border-brand-gold text-brand-purple dark:text-brand-cream font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-brand-purple/50 dark:text-brand-cream/50">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl border border-brand-purple/10 dark:border-brand-gold/15 bg-brand-warm/20 dark:bg-brand-purple-dark/50 text-sm focus:outline-none focus:border-brand-gold text-brand-purple dark:text-brand-cream font-semibold"
              >
                <option value="Education">Education</option>
                <option value="Parenting">Parenting</option>
                <option value="Safety">Safety</option>
                <option value="Projects">Projects</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-brand-purple/50 dark:text-brand-cream/50">Estimated Read Time</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="e.g. 5 min read"
                className="w-full px-4 py-3 rounded-xl border border-brand-purple/10 dark:border-brand-gold/15 bg-brand-warm/20 dark:bg-brand-purple-dark/50 text-sm focus:outline-none focus:border-brand-gold text-brand-purple dark:text-brand-cream font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-brand-purple/50 dark:text-brand-cream/50">Author Name</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Bassey Riman"
                className="w-full px-4 py-3 rounded-xl border border-brand-purple/10 dark:border-brand-gold/15 bg-brand-warm/20 dark:bg-brand-purple-dark/50 text-sm focus:outline-none focus:border-brand-gold text-brand-purple dark:text-brand-cream font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-brand-purple/50 dark:text-brand-cream/50">Featured Image URL (Optional)</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="e.g. https://images.unsplash.com/... or /assets/hero-robot-kids.png"
              className="w-full px-4 py-3 rounded-xl border border-brand-purple/10 dark:border-brand-gold/15 bg-brand-warm/20 dark:bg-brand-purple-dark/50 text-sm focus:outline-none focus:border-brand-gold text-brand-purple dark:text-brand-cream font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-brand-purple/50 dark:text-brand-cream/50">Short Summary</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Provide a compelling 2-3 sentence overview that lists in the article card..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-brand-purple/10 dark:border-brand-gold/15 bg-brand-warm/20 dark:bg-brand-purple-dark/50 text-sm focus:outline-none focus:border-brand-gold text-brand-purple dark:text-brand-cream font-medium leading-relaxed resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-brand-purple/50 dark:text-brand-cream/50">Article Body Content (Markdown Supported)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your rich article here. You can use markdown for styling (like headings, bullet lists, strong text, etc.)..."
              rows={12}
              className="w-full px-4 py-3 rounded-xl border border-brand-purple/10 dark:border-brand-gold/15 bg-brand-warm/20 dark:bg-brand-purple-dark/50 text-sm focus:outline-none focus:border-brand-gold text-brand-purple dark:text-brand-cream font-medium leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="px-8 py-3.5 bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark rounded-full font-bold text-sm shadow-md hover:opacity-90 transition-all flex items-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Publishing...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" /> Publish Article
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Tab: Manage */}
      {activeTab === "manage" && (
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="p-16 text-center rounded-2xl border border-dashed border-brand-purple/20 dark:border-brand-gold/20 bg-brand-surface/40">
              <FileText className="h-12 w-12 text-brand-purple/30 dark:text-brand-gold/30 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-1">No published articles yet</h3>
              <p className="text-sm text-brand-purple/50 dark:text-brand-cream/50">Use the write editor tab to publish your first post!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-5 rounded-xl border border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface dark:bg-brand-purple-dark/40 flex justify-between items-center gap-6 hover:border-brand-gold/25 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 text-xs text-brand-purple/55 dark:text-brand-cream/55 mb-2">
                      <span className="font-bold text-brand-gold uppercase tracking-wider">{post.category}</span>
                      <span>·</span>
                      <span>{post.read_time}</span>
                      <span>·</span>
                      <span>Published {new Date(post.published_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-bold text-base truncate">{post.title}</h3>
                    <p className="text-xs text-brand-purple/60 dark:text-brand-cream/60 truncate mt-1 max-w-xl">{post.summary}</p>
                  </div>

                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={isPending}
                    className="p-3 rounded-lg border border-red-500/10 hover:bg-red-500/10 text-red-500 hover:text-red-600 transition-colors shrink-0"
                    title="Delete Post"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
