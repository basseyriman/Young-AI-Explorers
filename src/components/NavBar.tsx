"use client";

import Link from "next/link";
import { Sparkles, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Explore", href: "#map" },
    { name: "Topics", href: "#topics" },
    { name: "AI Assistant", href: "#assistant" },
    { name: "Book", href: "#book" },
    { name: "Schools", href: "#schools" },
    { name: "Parents", href: "#parents" },
    { name: "Teachers", href: "#teachers" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#020617]/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,200,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,200,255,0.6)] transition-all">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-heading font-bold text-xl text-white tracking-wide">Young AI Explorers</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/signin" className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2">
            Sign In
          </Link>
          <Link href="/signup" className="relative group overflow-hidden rounded-full px-6 py-2.5 bg-white text-slate-900 font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all">
            <span className="relative z-10">Start Learning</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-white opacity-0 group-hover:opacity-100 transition-opacity z-0" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#020617]/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-6">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-300 hover:text-white">
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/10" />
              <Link href="/signin" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-300 hover:text-white">
                Sign In
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="text-center rounded-full px-6 py-3 bg-white text-slate-900 font-bold text-lg">
                Start Learning
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
