"use client";

import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Logo } from "@/components/Logo";

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Explore", href: "#topics" },
    { name: "Topics", href: "#topics" },
    { name: "Assistant", href: "#assistant" },
    { name: "Book", href: "#book" },
    { name: "Schools", href: "#schools" },
    { name: "Parents", href: "#parents" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-brand-cream/90 dark:bg-brand-purple-dark/90 backdrop-blur-xl border-b border-brand-purple/10 dark:border-brand-gold/10 py-3 shadow-[0_4px_30px_rgba(74,45,110,0.06)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="group">
          <Logo showWordmark size="md" />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-brand-purple/70 dark:text-brand-cream/70 hover:text-brand-purple dark:hover:text-brand-cream transition-colors rounded-lg hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-full border border-brand-purple/10 dark:border-brand-gold/15 hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5 transition-all text-brand-purple/60 dark:text-brand-gold/70 hover:text-brand-purple dark:hover:text-brand-gold"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            href="/login"
            className="text-sm font-medium text-brand-purple/70 dark:text-brand-cream/70 hover:text-brand-purple dark:hover:text-brand-cream transition-colors px-4 py-2"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2.5 bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold text-sm rounded-full hover:opacity-90 transition-all shadow-[0_4px_20px_rgba(74,45,110,0.2)] dark:shadow-[0_4px_20px_rgba(201,160,78,0.15)]"
          >
            Start Learning
          </Link>
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
            <div className="flex flex-col px-6 py-6 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-brand-purple/80 dark:text-brand-cream/80 hover:text-brand-purple dark:hover:text-brand-cream py-3 px-2 rounded-lg hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-brand-purple/10 dark:border-brand-gold/10 my-3" />
              <button
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-base font-medium text-brand-purple/80 dark:text-brand-cream/80 py-3 px-2"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-brand-purple/80 dark:text-brand-cream/80 py-3 px-2"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center rounded-full px-6 py-3.5 bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold text-base mt-2"
              >
                Start Learning
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
