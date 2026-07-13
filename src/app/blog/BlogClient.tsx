"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight, BookOpen, MessageCircle } from "lucide-react";
import { NavBar } from "@/components/NavBar";

interface Article {
  id: string;
  title: string;
  category: "Education" | "Parenting" | "Safety" | "Projects";
  date: string;
  readTime: string;
  summary: string;
  content?: string;
  image_url?: string;
  featured?: boolean;
}

interface Props {
  dbPosts: any[];
}

export function BlogClient({ dbPosts }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const fallbackArticles: Article[] = [
    {
      id: "neural-networks-kids",
      title: "How to Teach Neural Networks to Elementary School Kids",
      category: "Education",
      date: "July 8, 2026",
      readTime: "5 min read",
      summary: "Teaching complex AI concepts doesn't require calculus. Discover play-based physical classroom activities to explain weights, neurons, and inputs through simple human-nodes connections.",
      image_url: "/assets/hero-robot-kids.png", // Use fallback assets
      featured: true,
    },
    {
      id: "parent-guide-llm",
      title: "Demystifying Large Language Models: A Parent's Guide",
      category: "Parenting",
      date: "June 25, 2026",
      readTime: "7 min read",
      summary: "What actually happens when your child chats with Vision Vee? Learn the difference between simple autocomplete and machine reasoning, and how to foster safe, critical digital exploration habits.",
    },
    {
      id: "coppa-compliance-schools",
      title: "AI Safety in Classrooms: Understanding COPPA Guidelines",
      category: "Safety",
      date: "June 14, 2026",
      readTime: "6 min read",
      summary: "A practical guide for school administrators evaluating digital AI tools. Learn the essential checkboxes for child safety, data minimization, and privacy-first student dashboard management.",
    },
    {
      id: "five-weekend-projects",
      title: "5 Fun AI Mini-Projects to Build with Your Child This Weekend",
      category: "Projects",
      date: "May 29, 2026",
      readTime: "4 min read",
      summary: "From training local image classifiers on household toys to generating digital sticker sheets, try these simple, free web tools to learn machine learning concepts hands-on.",
    },
  ];

  // Convert DB posts to match the Article interface format
  const mappedDbPosts: Article[] = dbPosts.map((post) => ({
    id: post.slug,
    title: post.title,
    category: post.category,
    date: new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    readTime: post.read_time,
    summary: post.summary,
    content: post.content,
    image_url: post.image_url,
    featured: false, // Custom posts added later aren't featured banner posts by default
  }));

  // Merge database articles first, then fallback seeds
  const allArticles = [...mappedDbPosts, ...fallbackArticles];

  const filteredArticles = allArticles.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase()) || 
                          art.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || art.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredArticles.find(a => a.featured) || filteredArticles[0];
  const regularPosts = filteredArticles.filter(a => a.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-brand-gradient dark:bg-brand-gradient-dark text-brand-purple dark:text-brand-cream">
      <NavBar />

      <main className="container mx-auto px-6 pt-36 pb-24 max-w-5xl">
        {/* Header Title */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/5 dark:bg-brand-gold/5 border border-brand-purple/10 dark:border-brand-gold/15 mb-4">
            <BookOpen className="h-4 w-4 text-brand-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple/80 dark:text-brand-cream/80">Exploring The AI Frontier</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">The Explorer Blog</h1>
          <p className="text-brand-purple/65 dark:text-brand-cream/65 text-lg">
            Articles, updates, and research-backed guides on teaching Artificial Intelligence to children, managing safety, and using platform tools.
          </p>
        </div>

        {/* Featured Post (Only if no search/category filter is active) */}
        {featuredPost && !search && activeCategory === "All" && (
          <div className="mb-16 p-8 md:p-10 rounded-3xl border border-brand-gold/25 dark:border-brand-gold/15 bg-brand-surface dark:bg-brand-purple-dark/60 shadow-[0_16px_48px_rgba(74,45,110,0.06)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
              <div className="max-w-2xl">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-brand-gold text-brand-purple-dark mb-4 inline-block shadow-sm">
                  Featured Article
                </span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 group-hover:text-brand-gold transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-brand-purple/60 dark:text-brand-cream/60 text-sm leading-relaxed mb-6">
                  {featuredPost.summary}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-brand-purple/50 dark:text-brand-cream/50">
                  <span className="font-semibold text-brand-gold uppercase tracking-wider">{featuredPost.category}</span>
                  <span>·</span>
                  <div className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {featuredPost.date}</div>
                  <span>·</span>
                  <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featuredPost.readTime}</div>
                </div>
              </div>
              
              <Link 
                href="/signup" 
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-bold text-sm hover:opacity-90 transition-all shadow-[0_6px_20px_rgba(74,45,110,0.18)]"
              >
                Read Article <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark/40 border border-brand-purple/10 dark:border-brand-gold/10 mb-10 shadow-sm">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {["All", "Education", "Parenting", "Safety", "Projects"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark shadow-sm"
                    : "hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5 text-brand-purple/70 dark:text-brand-cream/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-purple/40 dark:text-brand-cream/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-purple/10 dark:border-brand-gold/15 bg-brand-warm/20 dark:bg-brand-purple-dark/50 text-sm focus:outline-none focus:border-brand-gold text-brand-purple dark:text-brand-cream font-medium"
            />
          </div>
        </div>

        {/* Articles List */}
        {filteredArticles.length === 0 ? (
          <div className="p-16 text-center rounded-2xl border border-dashed border-brand-purple/20 dark:border-brand-gold/20 bg-brand-surface/40">
            <MessageCircle className="h-12 w-12 text-brand-purple/30 dark:text-brand-gold/30 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-1">No articles found</h3>
            <p className="text-sm text-brand-purple/50 dark:text-brand-cream/50">Try searching for other keywords or categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(search || activeCategory !== "All" ? filteredArticles : regularPosts).map((art) => (
              <div
                key={art.id}
                className="group p-6 rounded-2xl border border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface dark:bg-brand-purple-dark/40 flex flex-col justify-between hover:border-brand-gold/45 hover:shadow-[0_12px_40px_rgba(74,45,110,0.05)] transition-all duration-300"
              >
                <div>
                  {/* Article Card Image Cover */}
                  <div className="w-full h-44 rounded-xl overflow-hidden mb-5 relative bg-brand-purple/5 dark:bg-brand-gold/5 border border-brand-purple/10 dark:border-brand-gold/10">
                    {art.image_url ? (
                      <img 
                        src={art.image_url} 
                        alt={art.title} 
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                      />
                    ) : (
                      // Sleek gradient fallback representing category
                      <div className="w-full h-full bg-gradient-to-br from-brand-purple/10 to-brand-gold/20 flex items-center justify-center relative">
                        <BookOpen className="h-10 w-10 text-brand-gold/30 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                        <div className="absolute bottom-2.5 right-3 text-[9px] font-extrabold uppercase tracking-widest text-brand-gold/30">
                          {art.category} Exploration
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4 mb-4 text-xs text-brand-purple/55 dark:text-brand-cream/55">
                    <span className="font-semibold text-brand-gold uppercase tracking-wider">{art.category}</span>
                    <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {art.readTime}</div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-brand-gold transition-colors leading-snug">{art.title}</h3>
                  <p className="text-sm text-brand-purple/60 dark:text-brand-cream/60 leading-relaxed mb-6">
                    {art.summary}
                  </p>
                </div>

                <div className="border-t border-brand-purple/8 dark:border-brand-gold/8 pt-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1 text-xs text-brand-purple/45 dark:text-brand-cream/45">
                    <Calendar className="h-3.5 w-3.5" /> {art.date}
                  </div>

                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-purple dark:text-brand-gold group-hover:gap-2.5 transition-all"
                  >
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
