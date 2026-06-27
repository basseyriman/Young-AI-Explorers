"use client";

import { useState, useMemo } from "react";

export interface CountryOption {
  code: string;
  name: string;
  flag_emoji: string;
  is_featured?: boolean;
}

interface Props {
  countries: CountryOption[];
  name?: string;
  defaultValue?: string;
  required?: boolean;
  onChange?: (code: string) => void;
}

export function CountrySelect({ countries, name = "countryCode", defaultValue = "GB", required = true, onChange }: Props) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(defaultValue);

  const featured = useMemo(() => countries.filter((c) => c.is_featured), [countries]);
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return countries;
    return countries.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [countries, search]);

  const selectedCountry = countries.find((c) => c.code === selected);

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={selected} required={required} />
      <div className="relative">
        <input
          type="text"
          placeholder="Search all countries…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex h-12 w-full rounded-xl border-2 border-brand-purple/15 dark:border-brand-gold/15 bg-brand-warm dark:bg-brand-purple-dark/50 px-4 text-sm font-medium text-brand-purple dark:text-brand-cream placeholder:text-brand-purple/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40"
        />
      </div>
      {selectedCountry && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-gold/10 border border-brand-gold/20 text-sm font-medium">
          <span>{selectedCountry.flag_emoji}</span>
          <span>{selectedCountry.name}</span>
        </div>
      )}
      {!search && featured.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {featured.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => { setSelected(c.code); setSearch(""); onChange?.(c.code); }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                selected === c.code
                  ? "bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark border-transparent"
                  : "border-brand-purple/15 dark:border-brand-gold/15 hover:border-brand-gold/40"
              }`}
            >
              {c.flag_emoji} {c.name}
            </button>
          ))}
        </div>
      )}
      <div className="max-h-40 overflow-y-auto rounded-xl border border-brand-purple/10 dark:border-brand-gold/10 divide-y divide-brand-purple/5 dark:divide-brand-gold/5">
        {filtered.slice(0, 50).map((c) => (
          <button
            key={c.code}
            type="button"
            onClick={() => { setSelected(c.code); setSearch(""); }}
            className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5 transition-colors ${
              selected === c.code ? "bg-brand-gold/10 font-semibold" : ""
            }`}
          >
            <span>{c.flag_emoji}</span>
            <span>{c.name}</span>
            <span className="ml-auto text-xs text-brand-purple/40">{c.code}</span>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="px-4 py-3 text-sm text-brand-purple/50">No countries found</p>
        )}
      </div>
    </div>
  );
}
