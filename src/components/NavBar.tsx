"use client";

import Link from "next/link";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { NavWordmark } from "@/components/Logo";
import { SiteLink } from "@/components/SiteLink";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hubOpen, setHubOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hubLinks = [
    { name: "Home", href: "/", emoji: "🏠", desc: "Start explorer map" },
    { name: "Read the book", href: "/#book", emoji: "📖", desc: "Available on Amazon" },
    { name: "Learn AI", href: "/signup", emoji: "🤖", desc: "Interactive lessons" },
    { name: "Games", href: "/match-quiz", emoji: "🎮", desc: "Classroom Arena" },
    { name: "Quizzes", href: "/signup", emoji: "🧩", desc: "Earn certificates" },
    { name: "Activity Pack", href: "/activity-pack", emoji: "✏️", desc: "Book 1 Workbook" },
    { name: "Teachers", href: "/dashboard/teacher", emoji: "👩‍🏫", desc: "Curriculum control" },
    { name: "Schools", href: "/school/pilot", emoji: "🏫", desc: "Register school pilots" },
    { name: "Free resources", href: "/free-resources", emoji: "📥", desc: "Classroom PDFs" },
    { name: "Blog", href: "/blog", emoji: "📰", desc: "Educational articles" },
    { name: "Community", href: "/community", emoji: "🌐", desc: "Explorer network" },
  ];

  const mainLinks = [
    { name: t("nav.book"), href: "/#book" },
    { name: t("nav.schools"), href: "/#schools" },
    { name: t("nav.community"), href: "/community" },
  ];

  return (
    <motion.nav
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-brand-cream/90 dark:bg-brand-purple-dark/90 backdrop-blur-xl border-b border-brand-purple/10 dark:border-brand-gold/10 py-3 shadow-[0_4px_30px_rgba(74,45,110,0.06)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="group shrink-0 min-w-0" aria-label="Young AI Explorers home" suppressHydrationWarning>
          <NavWordmark />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {/* Explorer Hub Dropdown */}
          <div className="relative">
            <button
              onClick={() => setHubOpen(!hubOpen)}
              onMouseEnter={() => setHubOpen(true)}
              className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-brand-purple/70 dark:text-brand-cream/70 hover:text-brand-purple dark:hover:text-brand-cream transition-all rounded-lg hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5"
            >
              Explorer Hub <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${hubOpen ? "rotate-180" : ""}`} />
            </button>
            
            {/* Dropdown Menu Panel */}
            <AnimatePresence>
              {hubOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setHubOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-[480px] bg-brand-cream dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/15 rounded-2xl shadow-xl z-20 p-4 grid grid-cols-2 gap-2"
                    onMouseLeave={() => setHubOpen(false)}
                  >
                    {hubLinks.map((link) => (
                      <SiteLink
                        key={link.name}
                        href={link.href}
                        onClick={() => setHubOpen(false)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5 transition-all group text-left"
                      >
                        <span className="text-2xl shrink-0">{link.emoji}</span>
                        <div>
                          <div className="text-sm font-bold text-brand-purple dark:text-brand-cream group-hover:text-brand-gold transition-colors">{link.name}</div>
                          <div className="text-[11px] text-brand-purple/50 dark:text-brand-cream/55 mt-0.5 leading-snug">{link.desc}</div>
                        </div>
                      </SiteLink>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {mainLinks.map((link) => (
            <SiteLink
              key={link.name}
              href={link.href}
              className="px-4 py-2 text-sm font-semibold text-brand-purple/70 dark:text-brand-cream/70 hover:text-brand-purple dark:hover:text-brand-cream transition-colors rounded-lg hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5"
            >
              {link.name}
            </SiteLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSelector showLabel={false} />

          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="p-2.5 rounded-full border border-brand-purple/10 dark:border-brand-gold/15 hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5 transition-all text-brand-purple/60 dark:text-brand-gold/70 hover:text-brand-purple dark:hover:text-brand-gold"
            aria-label="Toggle theme"
            suppressHydrationWarning
          >
            {mounted && isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <SiteLink
            href="/login"
            className="text-sm font-medium text-brand-purple/70 dark:text-brand-cream/70 hover:text-brand-purple dark:hover:text-brand-cream transition-colors px-4 py-2"
          >
            {t("nav.sign_in")}
          </SiteLink>
          <SiteLink
            href="/signup"
            className="px-6 py-2.5 bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold text-sm rounded-full hover:opacity-90 transition-all shadow-[0_4px_20px_rgba(74,45,110,0.2)] dark:shadow-[0_4px_20px_rgba(201,160,78,0.15)]"
          >
            {t("nav.start_learning")}
          </SiteLink>
        </div>

        <button
          className="lg:hidden text-brand-purple dark:text-brand-cream p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-cream/98 dark:bg-brand-purple-dark/98 backdrop-blur-2xl border-b border-brand-purple/10 dark:border-brand-gold/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-1 max-h-[80vh] overflow-y-auto">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-gold px-2 mb-2">Explorer Hub</span>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {hubLinks.map((link) => (
                  <SiteLink
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-brand-purple/5 bg-brand-purple/5 dark:bg-brand-gold/5 text-sm font-bold text-brand-purple dark:text-brand-cream"
                  >
                    <span className="text-xl shrink-0">{link.emoji}</span>
                    <span>{link.name}</span>
                  </SiteLink>
                ))}
              </div>
              <hr className="border-brand-purple/10 dark:border-brand-gold/10 my-3" />
              
              <div className="flex items-center justify-between py-2 px-2">
                <span className="text-sm font-semibold text-brand-purple/60 dark:text-brand-cream/60">{t("general.language")}</span>
                <LanguageSelector showLabel={true} />
              </div>

              <button
                onClick={() => {
                  setTheme(isDark ? "light" : "dark");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-base font-medium text-brand-purple/80 dark:text-brand-cream/80 py-3 px-2 text-left"
              >
                {mounted && isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                {mounted && isDark ? "Light Mode" : "Dark Mode"}
              </button>
              <SiteLink
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-brand-purple/80 dark:text-brand-cream/80 py-3 px-2"
              >
                {t("nav.sign_in")}
              </SiteLink>
              <SiteLink
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center rounded-full px-6 py-3.5 bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold text-base mt-2"
              >
                {t("nav.start_learning")}
              </SiteLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
