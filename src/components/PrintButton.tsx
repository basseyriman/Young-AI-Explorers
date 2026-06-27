"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-purple/15 dark:border-brand-gold/15 text-sm font-medium hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5 transition-colors"
    >
      <Printer className="h-4 w-4" /> Print / Save PDF
    </button>
  );
}
