"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BOOK_AMAZON_PRODUCT } from "@/data/brand-assets";

export function Book3D() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center py-4 md:py-6">
      {/* Soft spotlight behind the product */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        aria-hidden
      >
        <div className="h-[88%] w-[92%] max-w-[340px] rounded-[2rem] bg-brand-purple/8 dark:bg-brand-gold/10 blur-2xl" />
        <div className="absolute h-[70%] w-[75%] max-w-[280px] rounded-full bg-brand-gold/12 dark:bg-brand-gold/8 blur-3xl" />
      </div>

      <motion.div
        className="relative w-full max-w-[min(100%,340px)] sm:max-w-[380px] cursor-default"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ y: -4, scale: 1.02 }}
      >
        {/* Product shot — already 3D; no fake spine needed */}
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={BOOK_AMAZON_PRODUCT}
            alt="Young AI Explorers book — available on Amazon"
            fill
            unoptimized
            priority
            sizes="(max-width: 640px) 85vw, 380px"
            className="object-contain object-center drop-shadow-[0_28px_56px_rgba(26,15,46,0.35)] dark:drop-shadow-[0_28px_56px_rgba(0,0,0,0.55)]"
          />
        </div>
      </motion.div>

      {/* Ground shadow */}
      <div
        className="mt-5 h-3 w-[min(72%,260px)] rounded-[100%] bg-brand-purple/20 dark:bg-black/40 blur-xl"
        aria-hidden
      />
    </div>
  );
}
